import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CustomizationCombinations from './CustomizationCombinations';
import RenderedCustomizationCombinationList from './RenderedCustomizationCombinationList';

class UploadProduct extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state = {};
  }

  buildCustomization( customization )
  {
    return {
      customization_presentation: customization.name,
      customization_id: customization.id,
      customization_name: customization.name.parameterize,
      required_by: {"lengths": this.buildLengthsRequiredFor( customization )},
      price_usd: customization.priceUSD,
      price_aud: customization.priceAUD,
      group_name: customization.group_name,
      new_silhouette_name: customization.new_silhouette_name,
      new_neckline_name: customization.new_neckline_name
    };
  }
  
  buildCustomizationList()
  {
    if( this.state.product.customizations )
    {
      return this.state.product.customizations.map( (element) => this.buildCustomization( element ) );
    } else
    {
      return [];
    }
    
  }

  buildCustomizationVisualizationList()
  {
    let toReturn = null;
    let self = this;
    this.state.product.details.lengths.forEach( function( length )
                                                {
                                                  let list = new CustomizationCombinations(
                                                    length.name,
                                                    self.state.product.customizations,
                                                    self.state.product.invalidCombinations[length.name],
                                                    self.state.product.validCombinations[ length.name ]);
                                                  if( toReturn == null )
                                                  {
                                                    toReturn = list.list();
                                                  } else
                                                  {
                                                    toReturn = toReturn.combine( list.list() );
                                                  }
                                                } );
    return new RenderedCustomizationCombinationList( toReturn, this.state.product.details.colors ).toArray();
  }
  
  buildDetails()
  {
    return {
      colors: this.state.product.details.colors ? this.state.product.details.colors : [],
      lengths: this.state.product.details.lengths ? this.state.product.details.lengths.map( (element) => this.buildLength( element )) : [],
      name: this.state.product.details.name,
      price_aud: this.state.product.details.priceAUD,
      price_usd: this.state.product.details.priceUSD,
      style_notes: this.state.product.details.style_notes,
      fit: this.state.product.details.fit,
      fabric: this.state.product.details.fabric,
      short_description: this.state.product.details.short_description,
      factory: this.state.product.details.factory,
      primary_image: this.state.product.details.primaryImage ? "https://d1msb7dh8kb0o9.cloudfront.net/spree/products/38022/original/fp2615-navy-1.jpg?1509656449" : "",
      secondary_images: this.state.product.details.secondaryImages ? this.state.product.details.secondaryImages.map( () => "https://d1msb7dh8kb0o9.cloudfront.net/spree/products/38021/original/fp2615-navy-2.jpg?1509656448" ) : "",
      taxons: this.state.product.details.taxons ? this.state.product.details.taxons : []
      
    };
  }

  buildLength( length )
  {
    return { name: length.name,
             required_customizations: length.requiredCustomizations ? length.requiredCustomizations : []
           } ;
  }

  buildLengthsRequiredFor( customization )
  {
    let toReturn = [];
    if( this.state.product.details.lengths )
    {
      for( let i = 0; i < this.state.product.details.lengths.length; i++ )
      {
        if( this.state.product.details.lengths[i].requiredCustomizations && this.state.product.details.lengths[i].requiredCustomizations.includes( customization.id ) )
        {
          toReturn.push( this.state.product.details.lengths[i].name );
        }
      }
    }

    return toReturn;
      
  }
  
  buildStyleNumber()
  {
    return this.state.product.details.id;
  }

  buildVersion()
  {
    return this.state.product.version;
  }
  
  post()
  {
    console.log( 'Posting to ' + this.url.value );
    let toPost = {
      details: this.buildDetails(),
      style_number: this.buildStyleNumber(),
      version: this.buildVersion(),
      customization_list: this.buildCustomizationList(),
      customization_visualization_list: this.buildCustomizationVisualizationList()
    };
    console.log(  toPost );    
    request.put( this.url.value )
      .withCredentials()    
      .type( 'application/json' )
      .send( toPost )
      .end((error, response) =>
           {
             console.log( error );
             console.log( response );
           } );


  }


  updateWithLatestState( props )
  {
    this.setState( {
      product: props.product
    } );
  }

  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }
  
  render()
  {
    return (
      <div className="container">
        <div className="row top-margin">
          <div className="col-md-2">
            Url To Post To
          </div>
          <div className="col-md-4">
            <input type="text" ref={(input) => { this.url = input;  }}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <button onClick={this.post}>Post</button>
          </div>
        </div>
      </div>
    );
  }
}

function stateToProps(state)
{

  if( state.product.details )
  {
    if( state.product.details.lengths == null )
    {
      state.product.details.lengths = [];
    }
  }
  return { 
    showProductDetails: state.product && state.product.version != null,
    showCustomizations: state.product && state.product.version != null && state.product.version > 0,
    product: state.product
  };
}

function dispatchToProps(dispatch)
{
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(UploadProduct);
