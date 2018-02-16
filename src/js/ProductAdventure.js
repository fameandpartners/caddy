import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CustomizationCombinations from './CustomizationCombinations';
import RenderedCustomizationCombinationList from './RenderedCustomizationCombinationList';
import HeirarchyRow from './HeirarchyRow';

class ProductAdventure extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state =
      {
        heirarchy: {}
      };
 
  }

  updateHeirarchy(  name ,data )
  {
    console.log( 'updating' );
    let heirarchy = this.state.heirarchy;
    
    heirarchy[name] = data;
    console.log( heirarchy );
    this.setState( {
      heirarchy: heirarchy
    } );
    
  }
  render()
  {
    return (
      <div className="container heirarchy">
        <div className="row top-margin">
          <div className="col-md-2">
            Base Top
          </div>
        </div>
        <HeirarchyRow name="Base Top" data={this.state.heirarchy} update={this.updateHeirarchy}/>
        <div className="row top-margin">
          <div className="col-md-2">
            Front
          </div>
        </div>
        <HeirarchyRow name="Front" data={this.state.heirarchy} update={this.updateHeirarchy}/>
        
        <div className="row top-margin">
          <div className="col-md-2">
            Straps & Sleeves 
          </div>
        </div>
        <div className="row top-margin">
          <div className="col-md-2">
            Back
          </div>
        </div>
        <div className="row top-margin">
          <div className="col-md-2">
            Extras
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

export default connect(stateToProps, dispatchToProps)(ProductAdventure);
