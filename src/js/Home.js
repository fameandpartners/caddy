/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';

import CustomizationList from './CustomizationList';
import CombinationList from './CombinationList';
import ProductsList from './ProductsList';

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        autoBind(this);
        this.state =
            {
                activeTab: 0,
                customizationList: []
            };
    }

    swapToTab(index)
    {
        this.setState(
            {
                activeTab: index
            }
        );
    }

    updateCustomizationList( newList )
    {
        this.setState(
            {
                customizationList: newList
            }
        );
    }
    
    render() {
        return (
            <div>
              <div id="exTab2" className="container">	
                <ul className="nav nav-tabs">
		  <li className={this.state.activeTab == 0  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(0)} href="#1">Products</a>
		  </li>
                  
		  <li className={this.state.activeTab == 1  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(1)} href="#1">Customization List</a>
		  </li>
		  <li className={this.state.activeTab == 2  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(2)} href="#2">Combinations</a>
		  </li>
		  <li className={this.state.activeTab == 3  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(3)} href="#3">Cads</a>
		  </li>
		</ul>

		<div className="tab-content ">
		  <div className={this.state.activeTab == 0 ? "tab-pane active" : "tab-pane"} id="1">
                    <ProductsList />
		  </div>
                  
		  <div className={this.state.activeTab == 1 ? "tab-pane active" : "tab-pane"} id="1">
                    <CustomizationList updateCustomizations={this.updateCustomizationList} customizationList={this.state.customizationList} />
		  </div>
		  <div className={this.state.activeTab == 2 ? "tab-pane active" : "tab-pane"} id="2">
                    <CombinationList customizationList={this.state.customizationList}/>
		  </div>
                  <div className={this.state.activeTab == 3 ? "tab-pane active" : "tab-pane"} id="3">
                    <h3>add clearfix to tab-content (see the css)</h3>
		  </div>
		</div>
              </div>
              
            </div>
        );
    }
}

export default Home;
