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
            products: {
            }
        };
    }
    componentDidMount()
    {
        let url = 'https://product-management-dev.firebaseio.com/products.json';
        request.get( url ).end((error, response) => {
            this.setState(
                {
                    products:  JSON.parse( response.text )
                }
            );
        } );

    }
    renderProducts( productsJSON )
    {
        let toReturn = [];
        
        Object.keys(productsJSON).map(function(styleNumber, keyIndex) {
            toReturn.push( <li key={styleNumber}>{styleNumber}</li> );
        });

        return toReturn;
    }
    render()
    {
        return (
            <div>
              Products To Load
              <ol>
                {this.renderProducts( this.state.products )}
              </ol>
              <button>New Product</button>
            </div>
        );
    }
}

