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

        this.customizationTextBoxes = [];
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
        console.log( props.product );
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

        this.state.product.customizations[0].name = this.customizationTextBoxes[number].value;
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
                    <input type="text" defaultValue={customization.name} onKeyUp={() => this.updateCustomizatioName( number ) } ref={(input) => { this.customizationTextBoxes.push( input );  }} />
                  </div>
                  <div className="col-md-2 text-right">
                    AUD Price:
                  </div>
                  <div className="col-md-1">
                    <input type="text"  />
                  </div>
                  <div className="col-md-2 text-right">
                    USD Price:
                  </div>
                  <div className="col-md-1">
                    <input type="text"  />
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
              <div className="row">
                <div className="col-md-6">
                  <b>Upload Default Base Image:</b> <input type="file" id="baseLayerUpload" name='baseLayerUpload' onChange={this.imageUploadDefaultBase} />
                </div>                  
              </div>
              <div className="row">
                <CanvasImage imageData={this.state.baseImage} width={236} height={200}/>
              </div>
            </div>
        );
    }
}

function stateToProps(state)
{
    let product = state.product;
    console.log( product );
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
