/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import * as AppActions from './actions/AppActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getBase64} from './Utils';
import CanvasImage from './CanvasImage';

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
    render()
    {
        return (
            <div className="container">
              <div className="row">
                <div className="col-md-6">
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
                    
                    <div>
                      <button onClick={this.save}>Save</button>
                    </div>
                  </div>
                  
                </div>
                <div className="col-md-6">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3">
                        <center>Product Ref Image</center>
                      </div>
                      
                      <div className="col-md-12">
                        {this.renderProductRefImage()}
                        
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
