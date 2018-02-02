/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';
import ThemeList from './ThemeList';
import ThemePage from './ThemePage';

const FIREBASE_URL = process.env.FIREBASE_URL;

class ThemePageList extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      currentPage: 'list',
      pageState: null
    };

  }

  changeCurrentPage( newState, pageState )
  {
    this.setState( {
      currentPage: newState,
      pageState: pageState
    } );
  }

  renderState()
  {
    if( this.state.currentPage  === 'list' )
    {
      return <ThemeList changeCurrentPage={this.changeCurrentPage}/>;
    } else if( this.state.currentPage == 'new' )
    {
      return <ThemePage changeCurrentPage={this.changeCurrentPage}/>;
    } else if( this.state.currentPage == 'load' )
    {
      return <ThemePage changeCurrentPage={this.changeCurrentPage} pageJSON={this.state.pageState}/>;
    }
    else
    {
      return <div></div>;
    }

    
  }
  
  render()
  {
    return (
      <div>{this.renderState()}</div>
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

export default connect(stateToProps, dispatchToProps)(ThemePageList);
