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
    this.state = {
      workingOn: null
    };
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
      new_neckline_name: customization.new_neckline_name,
      code: customization.code
    };
  }
  
  buildCustomizationList()
  {
    if( this.state.product.customizations )
    {
      return this.addLengthsToCustomiations( this.state.product.customizations, this.state.product.details.lengths).map( (element) => this.buildCustomization( element ) );
    } else
    {
      return [];
    }
    
  }

  addLengthsToCustomiations( customizations, lengths )
  {
    let toReturn = [];
    toReturn = toReturn.concat( customizations );
    for( let i = 0; i < lengths.length; i++ )
    {
      toReturn.push( { code: `L${i}`, id: lengths[i].id, name: `Change to ${lengths[i].name}`, order: toReturn.length, priceAUD: lengths[i].priceAUD, priceUSD: lengths[i].priceUSD, group_name: 'Lengths' } );
    }

    return toReturn;
  }

  addOtherLengthsAsInvalid( validCombinations, currentLength, allLengths )
  {
    let toReturn = {};
    toReturn = Object.assign({},toReturn,  validCombinations );
    toReturn[currentLength.id] = {};
    for( let i = 0; i < allLengths.length; i++ )
    {
      if( allLengths[i] !== currentLength )
      {
        toReturn[currentLength.id][allLengths[i].id] = false;
      }
    }

    return toReturn;
  }

  addOtherLengthsToInvalidCombinations( invalidCombinations, currentLength, allLengths )
  {
    let toReturn = {};
    toReturn = Object.assign({},toReturn,  invalidCombinations );
    for( let i = 0; i < allLengths.length; i++ )
    {
      if( allLengths[i] !== currentLength )
      {
        toReturn[allLengths[i].id] = true;
      }
    }

    return toReturn;
  }
  buildCustomizationVisualizationList()
  {
    let toReturn = null;

    let self = this;
    for( let i = 0; i < this.state.product.details.lengths.length; i++ )
    {
      let length = this.state.product.details.lengths[i];
      console.log( "Working on: " + length.name );
      this.setState( {
        workingOn: length.name
      } );
      console.log( this.state.workingOn );
      let list = new CustomizationCombinations(
        length.name,
        self.addLengthsToCustomiations( self.state.product.customizations,
                                        self.state.product.details.lengths ),
        self.addOtherLengthsToInvalidCombinations(self.state.product.invalidCombinations[length.name], length, self.state.product.details.lengths ),
        self.state.product.validCombinations[ length.name ] );
      if( toReturn == null )
      {
        toReturn = list.list();
      } else
      {
        toReturn = toReturn.combine( list.list() );
      }

    }

    
    return new RenderedCustomizationCombinationList( toReturn, this.state.product.details.colors ).toArray();
  }
  
  buildDetails()
  {
    return {
      colors: this.state.product.details.colors ? this.state.product.details.colors : [],
      lengths: this.state.product.details.lengths ? this.state.product.details.lengths.map( (element) => this.buildLength( element )) : [],
      name: this.state.product.details.name,
      style_notes: this.state.product.details.style_notes,
      fit: this.state.product.details.fit,
      fabric: this.state.product.details.fabric,
      silhouette: this.state.product.details.silhouette,
      neckline: this.state.product.details.neckline,
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
             required_customizations: length.requiredCustomizations ? length.requiredCustomizations : [],
             price_usd: length.priceUSD,
             price_aud: length.priceAUD
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
    console.log( "ToPost = " );
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

  renderWorkingOn()
  {
    if( this.state.workingOn != null )
    {
      return <span>Working on {this.state.workingOn}</span>;
    } else
    {
      return <span></span>;
    }
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
        <div className="row">
          <div className="col-md-2">
            { this.renderWorkingOn() }
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
