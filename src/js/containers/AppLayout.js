/* eslint-disable */

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Switch, Route } from 'react-router';
import App from '../App';
import Home from '../Home';

class AppLayout extends Component
{
  constructor(props)
  {
    super(props);
    autoBind(this);
  }
  
  sampleTest()
  {
    return true;
  }

  loadHome(props)
  {
    
    return (<Home productToLoad={props.match.params.productId}/>);
  }

  render()
  {
    return (
      <Switch>
        <Route exact path="/" component={this.loadHome} />
        <Route path="/product/:productId" component={this.loadHome} />
        
      </Switch>
    );
  }
}

export default AppLayout;
