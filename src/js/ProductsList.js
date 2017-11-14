/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';

export default class ProductsList extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {
            product: {
            }
        };
    }
    componentDidMount()
    {
        let url = 'https://product-management-dev.firebaseio.com/products.json';
        request.get( url ).end((error, response) => {
            console.log( 'done with  get' );
            console.log( response.text );
        } );

    }
    render()
    {
        return (
            <div>
              Products To Load
            </div>
        );
    }
}

