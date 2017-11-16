/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CustomizationItem from './CustomizationItem';
import CanvasImage from './CanvasImage';
import * as AppActions from './actions/AppActions';
import {getBase64} from './Utils';

class CustomizationList extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {
            product: {
                customizations: []
            }
        };

        this.customizationTextBoxes = {};
        this.priceAUDTextBoxes = {};
        this.priceUSDTextBoxes = {};
        
    }

    addCustomization()
    {
        let product = this.state.product;
        product.customizations = product.customizations.concat([ {
            name: null,
            priceAUD: null,
            priceUSD: null,
            frontTopRenderImage: null,
            frontBottomRenderImage: null,
            backTopRenderImage: null,
            backBottomRenderImage: null
        } ] );
        this.setState( 
            {
                product: product
            }
        );
    }


    removeFromCustomizationValues ( index )
    {
        
        this.state.customizationValues.splice( index, 1 );
        this.setState(
            {
                customizationValues: this.state.customizationValues
            }
        );
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

    updateCustomizatioName( number )
    {
        let product = this.state.product;

        this.state.product.customizations[number].name = this.customizationTextBoxes[number].value;
        this.setState(
            {
                product: product
            }
        );
    }
    
    updateAUDPrice( number )
    {
        let product = this.state.product;

        this.state.product.customizations[number].priceAUD = this.priceAUDTextBoxes[number].value;
        this.setState(
            {
                product: product
            }
        );
    }

    updateUSDPrice( number )
    {
        let product = this.state.product;

        this.state.product.customizations[number].priceUSD = this.priceUSDTextBoxes[number].value;
        this.setState(
            {
                product: product
            }
        );
    }
    
    renderCustomizationItem( customization, number )
    {
        return (
            <li key={"customization-" + number }>
              <div className="container">
                <div className="row">
                  <div className="col-md-2">
                    Customization Name:
                  </div>
                  <div className="col-md-2">
                    <input type="text"
                           defaultValue={customization.name}
                           onKeyUp={() => this.updateCustomizatioName( number ) }
                           ref={(input) => { this.customizationTextBoxes[number] = input; }} />
                  </div>
                  <div className="col-md-2 text-right">
                    AUD Price:
                  </div>
                  <div className="col-md-1">
                    <input type="text"
                           defaultValue={customization.priceAUD}
                           onKeyUp={() => this.updateAUDPrice( number ) }                           
                           ref={(input) => { this.priceAUDTextBoxes[number] =  input; }} />

                  </div>
                  <div className="col-md-2 text-right">
                    USD Price:
                  </div>
                  <div className="col-md-1">
                    <input type="text"
                           defaultValue={customization.priceUSD}
                           onKeyUp={() => this.updateUSDPrice( number ) }                                                      
                           ref={(input) => { this.priceUSDTextBoxes[number] = input; }} />
                           
                  </div>
                </div>
              </div>
            </li>
        );
    }
    
    render()
    {
        return(
            <div className="container customization-item">
              <div className="row">
                <ol>
                  {this.state.product.customizations.map( this.renderCustomizationItem ) }
                </ol>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <button onClick={this.addCustomization}>Add Customization</button>
                </div>
                <div className="col-md-2">
                  <button onClick={() => this.props.save(this.state.product) }>Save</button>
                </div>
              </div>
            </div>
        );
    }
}

function stateToProps(state)
{
    let product = state.product;
    if( product.customizations == null )
    {
        product.customizations = [];
    }
    return { product: product };
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


export default connect(stateToProps, dispatchToProps)(CustomizationList);
