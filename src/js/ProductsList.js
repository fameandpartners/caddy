/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';
import { Link } from 'react-router-dom';

const FIREBASE_URL = process.env.FIREBASE_URL;

class ProductsList extends React.Component
{
  constructor( props, context )
  {
    super( props, context );
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
    this.context.router.history.push( "/" + styleNumber );
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
                  <span>{productsJSON[styleNumber].name}</span>
                </div>
                <div className="col-md-2">
                  <span>
                    <Link to={{pathname: '/product/' + styleNumber + "/2" } }>Load Product</Link>
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
        <div className="bottom-margin">Products To Load</div>
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
