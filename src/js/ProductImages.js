import React from 'react';
import autoBind from 'react-autobind';
import * as AppActions from './actions/AppActions';
import { connect } from 'react-redux';

import CanvasImage from './CanvasImage';
import {getBase64} from './Utils';

class ProductImages extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      product: {details: {secondaryImages: []}}
    };
  }

  deletePrimaryImage()
  {
    let product = this.state.product;
    product.details.primaryImage = null;
    this.setState(
      {
        product: product
      }
    );
  }
  
  renderPrimaryImage()
  {
    if( this.state.product.details.primaryImage )
    {
      return(
        <div className="row">
          <div className="col-md-6">
            <CanvasImage imageData={this.state.product.details.primaryImage} width={768} height={653}/>
          </div>
          <div className="col-md-1">
            <button onClick={this.deletePrimaryImage}>Delete</button>
          </div>
        </div>
        
         );

    } else
    {
      return(
        <div className="row">
          <div className="col-md-6">
            <span><input type="file" id="productImage" name='productImage' onChange={this.uploadProductImage} /></span>
          </div>
        </div>
     );
    }
  }

  deleteSecondaryImage( number )
  {
    let product = this.state.product;

    this.state.product.details.secondaryImages.splice( number, 1 );
    this.setState(
      {
        product: product
      }
    );

  }
  renderSecondaryItem( item, number )
  {
    return(
        <div className="row" key={"secondary-image" + number}>
          <div className="col-md-6">
            <CanvasImage  imageData={item} width={768} height={653}/>
          </div>
          <div className="col-md-1">
            <button onClick={() => this.deleteSecondaryImage( number )}>Delete</button>
          </div>
          
        </div>
       );
  }
  
  uploadSecondaryImage( e )
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let product = this.state.product;
      product.details.secondaryImages = product.details.secondaryImages.concat( [base64] );
      context.setState( {
        product: product
      } );
    });
  }
  
  uploadProductImage( e )
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let product = this.state.product;
      product.details.primaryImage = base64;
      context.setState( {
        product: product
      } );
    });
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
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            Primary Image
          </div>
        </div>
        {this.renderPrimaryImage()}        
        <div className="row top-margin">
          <div className="col-md-6">
            Secondary Images
          </div>
        </div>
        {this.state.product.details.secondaryImages.map( this.renderSecondaryItem ) }        
        <div className="row">
          <div className="col-md-12">
            <span>
              <input type="file" id="productImage" name='productImage' onChange={this.uploadSecondaryImage} />
            </span>
          </div>
        </div>
        <div className="row top-margin">
          <div className="col-md-4">
            <button onClick={()=>this.props.save( this.state.product)}>Save</button>
          </div>
        </div>
        
      </div>
    );
  }
  
  
}

function stateToProps(state)
{
  if( state.product.details.secondaryImages == null )
  {
    state.product.details.secondaryImages = [];
  }
  return { product: state.product };
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


export default connect(stateToProps, dispatchToProps)(ProductImages);
