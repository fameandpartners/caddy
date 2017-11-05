/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';


export default class ProductsList extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {
            productsJSON: null
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
        console.log( products );
    }
    
    render()
    {
        return (<div>Products</div>);
    }

    
}
