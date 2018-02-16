import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CustomizationCombinations from './CustomizationCombinations';
import RenderedCustomizationCombinationList from './RenderedCustomizationCombinationList';
import HeirarchyRow from './HeirarchyRow';
import * as AppActions from './actions/AppActions';

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

  save()
  {
    let product = this.state.product;
    product.heirarchy = this.state.heirarchy;
    
    this.setState(
      {
        product
      }
    );
    this.props.save( product );
  }

  updateWithLatestState( props )
  {
    this.setState( {
      product: props.product,
      heirarchy: props.heirarchy
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
      <div className="container heirarchy">
        <div className="row top-margin">
          <div className="col-md-2">
            <button onClick={this.save}>Save</button>
          </div>
        </div>        
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

  return { 
    product: state.product,
    heirarchy: state.product.heirarchy || {}
  };
}

function dispatchToProps(dispatch)
{
  return {
    save: ( value ) =>
      {
        dispatch(AppActions.updateProductDetails( value ));
      }
  };
}

export default connect(stateToProps, dispatchToProps)(ProductAdventure);
