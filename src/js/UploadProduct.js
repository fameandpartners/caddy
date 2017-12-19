import React from 'react';
import autoBind from 'react-autobind';
import * as AppActions from './actions/AppActions';
import { connect } from 'react-redux';

import CanvasImage from './CanvasImage';
import {getBase64} from './Utils';

class UploadProduct extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state = {};
  }

  buildCustomizationList()
  {
    return [];
  }

  buildCustomizationVisualizationList()
  {
    return [];
  }
  
  buildDetails()
  {
    return {
      colors: this.state.product.details.colors ? this.state.product.details.colors : [],
      lengths: this.state.product.details.lengths ? this.state.product.details.lengths.map( (element) => this.buildLength( element )) : [],
      name: this.state.product.details.name,
      price_aud: this.state.product.details.priceAUD,
      price_usd: this.state.product.details.priceUSD,
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
  buildStyleNumber()
  {
    return 'FP-BLAH';
  }

  buildVersion()
  {
    return 1;
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

    console.log( JSON.stringify( toPost ) );
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
