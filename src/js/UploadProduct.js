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
    return {};
  }

  buildStyleNumber()
  {
    return 'FP-BLAH';
  }

  
  post()
  {
    console.log( 'Posting to ' + this.url.value );
    let toPost = {
      details: this.buildDetails(),
      style_number: this.buildStyleNumber(),
      customization_list: this.buildCustomizationList(),
      customization_visualization_list: this.buildCustomizationVisualizationList()
    };

    console.log( JSON.stringify( toPost ) );
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
