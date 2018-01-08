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
    product.details.style_notes = this.style_notes.value;
    product.details.fit = this.fit.value;
    product.details.fabric = this.fabric.value;
    product.details.short_description = this.short_description.value;
    product.details.factory = this.factory.value;
    product.details.silhouette = this.silhouette.value;
    product.details.neckline = this.neckline.value;
    
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
    this.productUSDPrice.value=  this.clean( props.product.details.priceUSD);
    this.style_notes.value = this.clean( props.product.details.style_notes );
    this.fit.value = this.clean( props.product.details.fit );
    this.fabric.value = this.clean( props.product.details.fabric );
    this.short_description.value = this.clean( props.product.details.short_description );
    this.factory.value = this.clean( props.product.details.factory );
    this.silhouette.value = this.clean( props.product.details.silhouette );
    this.neckline.value = this.clean( props.product.details.neckline );
    
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
  indexOfLength( product, lengthName )
  {
    let toReturn = -1;
    if( product.details.lengths )
    {
      product.details.lengths.forEach( function( lengthObject, index )
                                       {
                                         if( lengthObject.name === lengthName )
                                         {
                                           toReturn = index;
                                         }
                                       } );
    }
    return toReturn;

  }
  addOrRemove( lengthName )
  {
    let product = this.state.product;
    let indexOfLength = this.indexOfLength( product, lengthName );
    if( indexOfLength > -1 )
    {
      product.details.lengths.splice( indexOfLength, 1 );
    } else
    {
      product.details.lengths.push( { name: lengthName } );
    }

    this.setState(
      {
        product: product
      }
    );
  }

  lengthExists( lengthName )
  {
    return this.state.product.details.lengths && this.indexOfLength(this.state.product, lengthName ) > -1;
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
              <div className="row">
                <div className="col-md-2 text-right">
                  Cheeky: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Cheeky' )} onClick={ () => this.addOrRemove( 'Cheeky' ) }type="checkbox"/>                        
                </div>
                <div className="col-md-2 text-right">
                  Short: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Short' )} onClick={ () => this.addOrRemove( 'Short' ) }type="checkbox"/>                        
                </div>
                <div className="col-md-2 text-right">
                  Full: 
                </div>
                <div className="col-md-1">
                  <input checked={this.lengthExists( 'Full' )} onClick={ () => this.addOrRemove( 'Full' ) }type="checkbox"/>                        
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
              <div className="col-md-2">
                Style Notes:
              </div>
              <div className="col-md-10">
                <textarea cols="50" rows="4" type="text" ref={(input) => { this.style_notes = input;  }}/>
              </div>
              
            </div>
            <div className="row top-margin">
              <div className="col-md-2">
                Fit:
              </div>
              <div className="col-md-10">
                <textarea cols="50" rows="4" type="text" ref={(input) => { this.fit = input;  }}/>
              </div>
              
            </div>
            <div className="row top-margin">
              <div className="col-md-2">
                Fabric: 
              </div>
              <div className="col-md-10">
                <textarea cols="50" rows="4" type="text" ref={(input) => { this.fabric = input;  }}/>
              </div>
              
            </div>
            <div className="row top-margin">
              <div className="col-md-2">
                Short Description: 
              </div>
              <div className="col-md-10">
                <textarea cols="50" rows="4" type="text" ref={(input) => { this.short_description = input;  }}/>
              </div>
              
            </div>
            <div className="row top-margin">
              <div className="col-md-2">
                Default Silhouette:
              </div>
              <div className="col-md-3">
                <input type="text" ref={(input) => { this.silhouette = input;  }}/>
              </div>
            </div>
            <div className="row top-margin">
              <div className="col-md-2">
                Default Neckline:
              </div>
              <div className="col-md-3">
                <input type="text" ref={(input) => { this.neckline = input;  }}/>
              </div>
            </div>            
            <div className="row top-margin">
              <div className="col-md-2">
                Factory:
              </div>
              <div className="col-md-3">
                <input type="text" ref={(input) => { this.factory = input;  }}/>
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
