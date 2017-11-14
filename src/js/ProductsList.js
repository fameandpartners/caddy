/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import * as AppActions from './actions/AppActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProductsList extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
    }

    componentDidMount()
    {
        let products = localStorage.getItem( 'caddy.products.json' );
        if( !products )
        {
            products = { products: [] };
            localStorage.setItem( 'caddy.products.json', JSON.stringify( products ) );
        } else
        {
            products = JSON.parse( products );
        }
        
        this.setState(
            {
                productsJSON: products
            }
        );
    }

    save()
    {
        this.props.save( this.textInput.value );
    }
    
    render()
    {
        return (
            <div>
              <div>Products</div>
              <div>
                <input type="text" ref={(input) => { this.textInput = input;  }}/>
                  <button onClick={this.save}>Save</button>
              </div>
              <div>
                Product Name: {this.props.product.name}
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
                dispatch(AppActions.updateProductName( value ));
            }
    };
}


export default connect(stateToProps, dispatchToProps)(ProductsList);
