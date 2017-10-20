/* eslint-disable */

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';

// App Components
import AppMain from './components/nocom/AppMain';

import '../css/components/App.scss';
class App extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div className="App">
              <AppMain />
            </div>
        );
    }
}

export default App;
