/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';

class ProductsList extends React.Component
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
    
    componentWillMount()
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
    
    loadProduct( styleNumber, versionNumber )
    {
        console.log( 'load product called' );
        this.props.load( styleNumber, versionNumber );
    }
    
    renderProducts( productsJSON )
    {
        let toReturn = [];
        let context = this;
        Object.keys(productsJSON).map(function(styleNumber, keyIndex) {
            toReturn.push(
                <li key={styleNumber}>
                  <div className="row">
                    <div className="col-md-2">
                      <span>{styleNumber}</span>
                    </div>
                    <div className="col-md-2">
                      <span>
                        <button onClick={() => context.loadProduct( styleNumber, productsJSON[styleNumber].version )}>Load Product</button>
                      </span>
                    </div>
                  </div>
                </li> );
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



function stateToProps(state)
{
    return { };
}

function dispatchToProps(dispatch)
{
    return {
        load: ( styleNumber, versionNumber ) =>
            {
                dispatch( AppActions.loadProduct( styleNumber, versionNumber ) );
            }
    };
}

export default connect(stateToProps, dispatchToProps)(ProductsList);
