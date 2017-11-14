/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';

import CustomizationList from './CustomizationList';
import CombinationList from './CombinationList';
import ProductsList from './ProductsList';
import ProductDetails from './ProductDetails';
import CombinationGrid from './CombinationGrid';
import RenderLayers from './RenderLayers';

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
                    <a onClick={() => this.swapToTab(0)} href="#1">Load Products</a>
		  </li>
		  <li className={this.state.activeTab == 1  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(1)} href="#1">Product Details</a>
		  </li>
                  
		  <li className={this.state.activeTab == 2  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(2)} href="#1">Customization List</a>
		  </li>
		  <li className={this.state.activeTab == 3  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(3)} href="#2">Combinations</a>
		  </li>
		  <li className={this.state.activeTab == 4  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(4)} href="#3">Combination Grid</a>
	          </li>
		  <li className={this.state.activeTab == 5  ? 'active' : ''}>
                    <a onClick={() => this.swapToTab(5)} href="#3">Render Test</a>
	    </li>
                  
		</ul>

		<div className="tab-content ">
		  <div className={this.state.activeTab == 0 ? "tab-pane active" : "tab-pane"} id="1">
                    <ProductsList />
		  </div>

		  <div className={this.state.activeTab == 1 ? "tab-pane active" : "tab-pane"} id="1">
                    <ProductDetails />
		  </div>
          
		  <div className={this.state.activeTab == 2 ? "tab-pane active" : "tab-pane"} id="1">
                    <CustomizationList updateCustomizations={this.updateCustomizationList} customizationList={this.state.customizationList} />
		  </div>
		  <div className={this.state.activeTab == 3 ? "tab-pane active" : "tab-pane"} id="2">
		  </div>
                  <div className={this.state.activeTab == 4 ? "tab-pane active" : "tab-pane"} id="3">
                    <CombinationGrid customizationList={this.state.customizationList}/>
		  </div>
                  <div className={this.state.activeTab == 5 ? "tab-pane active" : "tab-pane"} id="4">
                    <RenderLayers/>
		  </div>
                  
		</div>
              </div>
              
            </div>
        );
    }
}

export default Home;
