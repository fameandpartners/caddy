/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import * as AppActions from './actions/AppActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getBase64} from './Utils';
import CanvasImage from './CanvasImage';
import ExpandableList from './ExpandableList';

class ProductDetails extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      product: {
        details: {}
      }
    };

  }

  save()
  {
    let product = this.state.product;
    product.details.id = this.productId.value;
    product.details.name = this.productName.value;
    product.details.priceAUD = this.productAUDPrice.value;
    product.details.priceUSD = this.productUSDPrice.value;
    
    this.setState(
      {
        product
      }
    );
    this.props.save( product );
  }

  clean( value )
  {
    if( value )
    {
      return value;
    }
    else
    {
      return '';
    }
    
  }
  updateWithLatestState( props )
  {
    this.setState( {
      product: props.product
    } );
    
    this.productId.value = this.clean(props.product.details.id);
    this.productName.value = this.clean(props.product.details.name);
    this.productAUDPrice.value = this.clean( props.product.details.priceAUD );
    this.productUSDPrice.value = this.clean( props.product.details.priceUSD);
  }

  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }
  
  uploadProductRefImage( e )
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let product = context.state.product;
      product.details.productRefImage = base64;
      context.setState( {
        product: product
      } );
    });
  }
  renderProductRefImage()
  {
    if( this.state.product.details.productRefImage )
    {
      return( <CanvasImage imageData={this.state.product.details.productRefImage} width={236} height={200}/> );

    } else
    {
      return( <span>Upload: <input type="file" id="productRefImageUpload" name='prodRefImageUpload' onChange={this.uploadProductRefImage} /></span> );
    }
    
    
  }
  addOrRemove( lengthName )
  {
    let product = this.state.product;
    if( product.details.lengths.indexOf( lengthName ) > -1 )
    {
      product.details.lengths.splice( product.details.lengths.indexOf( lengthName ), 1 );
    } else
    {
      product.details.lengths.push( lengthName );
    }

    this.setState(
      {
        product: product
      }
    );
  }

  lengthExists( lengthName )
  {
    return this.state.product.details.lengths && this.state.product.details.lengths.indexOf( lengthName ) > -1;
  }

  updateDetail( detailName, value )
  {
    let product = this.state.product;
    product.details[detailName] = value;

    this.setState(
      {
        product: product
      }
    );
  }
  
  render()
  {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  Style Number:
                </div>
                <div className="col-md-2">
                  <input type="text" ref={(input) => { this.productId = input;  }}/>
                </div>
              </div>              
              <div className="row">
                <div className="col-md-2">
                  Product Name:
                </div>
                <div className="col-md-2">
                  <input type="text" ref={(input) => { this.productName = input;  }}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  Price AUD:
                </div>
                <div className="col-md-1 text-right">
                  $
                </div>
                <div className="col-md-1">
                  <input type="text" ref={(input) => { this.productAUDPrice = input;  }}/>
                </div>
                
              </div>
              <div className="row">
                <div className="col-md-2">
                  Price USD:
                </div>
                <div className="col-md-1 text-right">
                  $
                </div>
                <div className="col-md-1">
                  <input type="text" ref={(input) => { this.productUSDPrice = input;  }}/>
                </div>
                
              </div>
              <div className="row">
                <div className="col-md-12">
                  Available Lengths
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 text-right">
                  Micro-Mini: </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Micro-Mini' )} onClick={ () => this.addOrRemove( 'Micro-Mini' ) }type="checkbox"/>                        
                </div>                
                <div className="col-md-2 text-right">
                  Mini: </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Mini' )} onClick={ () => this.addOrRemove( 'Mini' ) }type="checkbox"/>                        
                </div>
                <div className="col-md-2 text-right">
                  Knee: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Knee' )} onClick={ () => this.addOrRemove( 'Knee' ) }type="checkbox"/>                        
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 text-right">
                  Midi: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Midi' )} onClick={ () => this.addOrRemove( 'Midi' ) }type="checkbox"/>                        
                </div>
                <div className="col-md-2 text-right">
                  Ankle: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Ankle' )} onClick={ () => this.addOrRemove( 'Ankle' ) }type="checkbox"/>
                </div>                      
                <div className="col-md-2 text-right">
                  Maxi: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Maxi' )} onClick={ () => this.addOrRemove( 'Maxi' ) }type="checkbox"/>
                </div>
        
              </div>
            </div>

            <div className="row top-margin">
              <div className="col-md-12">
                Colors
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ExpandableList addType="Color" contentUpdate={( value ) => this.updateDetail( 'colors', value )} startingValue={this.state.product.details.colors}/>
              </div>
            </div>
            <div className="row top-margin">
              <div className="col-md-12">
                Taxons
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ExpandableList addType="Taxon" contentUpdate={( value ) => this.updateDetail( 'taxons', value )} startingValue={this.state.product.details.taxons}/>
              </div>
            </div>

            <div className="row top-margin">
              <div>
                <button onClick={this.save}>Save</button>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <center>Product Ref Image</center>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <center>
                    {this.renderProductRefImage()}
                  </center>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }                      
}

function stateToProps(state)
{
  if( state.product.details.lengths == null )
  {
    state.product.details.lengths = [];
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


export default connect(stateToProps, dispatchToProps)(ProductDetails);
