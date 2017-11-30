/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';

const FIREBASE_URL = process.env.FIREBASE_URL;

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
    let url = FIREBASE_URL + '/products.json';
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
    this.props.load( styleNumber, versionNumber );
  }
  
  renderProducts( productsJSON )
  {
    let toReturn = [];
    let context = this;
    if( productsJSON )
    {
      Object.keys(productsJSON).map(function(styleNumber, keyIndex) {
        toReturn.push(
          <li key={styleNumber}>
            <div className="container product-list-entry">
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

            </div>
          </li> );
      });
      return toReturn;
    } else
    {
      return "";
    }
  }
  
  render()
  {
    return (
      <div>
        Products To Load
        <ol>
          {this.renderProducts( this.state.products )}
        </ol>
        <button onClick={() => this.props.newProduct()}>New Product</button>
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
      },
    newProduct: () =>
      {
        dispatch(AppActions.newProduct());
      }
  };
}

export default connect(stateToProps, dispatchToProps)(ProductsList);
