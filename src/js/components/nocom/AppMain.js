/* eslint-disable */

import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Motion, spring } from 'react-motion';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';


// Actions
import * as AppActions from '../../actions/AppActions';
import React from 'react';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  return {
    activateSideMenu: actions.activateSideMenu,
  };
}
class AppMain extends React.Component {

  render() {
    return (
      <div className="App__main u-height--full grid-middle layout-container">blank</div>
    );
  }
}


export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
