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
        this.state = {
            product: {
                details: {}
            }
        };
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
        this.props.save( {
            id: this.productId.value,
            name: this.productName.value
        } );
    }
    
    render()
    {
        return (
            <div>
              <div>
                Product id: <input type="text" ref={(input) => { this.productId = input;  }}/>
              </div>
              <div>
                Product Name: <input type="text" ref={(input) => { this.productName = input;  }}/>
              </div>
              
              <div>
                  <button onClick={this.save}>Save</button>
              </div>
              <div>
                Product Name: {this.props.product.details.name}
              </div>
            </div>
        );
    }
}

function stateToProps(state)
{
    console.log( state.product );
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


export default connect(stateToProps, dispatchToProps)(ProductsList);
