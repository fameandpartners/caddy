/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';

const FIREBASE_URL = process.env.FIREBASE_URL;

class ThemeList extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      themePages: {
      },
      state: 'list'
    };

  }
  
  componentWillMount()
  {
    let url = FIREBASE_URL + '/themePages.json';
    request.get( url ).end((error, response) => {
      this.setState(
        {
          themePages:  JSON.parse( response.text )
        }
      );
    } );
  }
  
  loadProduct( styleNumber, versionNumber )
  {
    this.props.load( styleNumber, versionNumber );
  }
  
  renderThemes( themesJSON )
  {
    let toReturn = [];
    let keys = Object.keys( themesJSON );
    for( let i = 0; i < keys.length; i++ )
    {
      toReturn.push( <li key={keys[i]} >{themesJSON[keys[i]].pageName} <button onClick={ () => this.props.changeCurrentPage( 'load', themesJSON[keys[i]] )}>Load</button></li> );
    }
    return toReturn;
  }
  
  render()
  {
    return (
      <div>
        Themes To Load
        <ol>
          {this.renderThemes( this.state.themePages )}
        </ol>
        <button onClick={() => this.props.changeCurrentPage( 'new' )}>New Page</button>
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

export default connect(stateToProps, dispatchToProps)(ThemeList);
