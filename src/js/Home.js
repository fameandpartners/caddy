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

    generateTab( index, text )
    {
        return( <li key={"tab-" + index} className={this.state.activeTab == index ? 'active' : ''}><a onClick={() => this.swapToTab(index)} href={"#" + index}>{text}</a></li>);
    }
    
    generateTabs()
    {
        let toReturn = [];
        toReturn.push( this.generateTab( 0, "Load Product" )  );
        toReturn.push( this.generateTab( 1, "Product Details" )  );
        toReturn.push( this.generateTab( 2, "Customization List" )  );
        toReturn.push( this.generateTab( 3, "Combinations" )  );
        toReturn.push( this.generateTab( 4, "Combination Grid" )  );
        toReturn.push( this.generateTab( 5, "Render Test" )  );

        return toReturn;
    }

    generateSingleTabContent( index, object )
    {
        return( <div key={"tab-content-" + index} className={this.state.activeTab == index ? "tab-pane active" : "tab-pane"} id={index}>{object}</div> );
        
    }
    generateAllTabContent()
    {
        let toReturn = [];
        toReturn.push( this.generateSingleTabContent( 0, <ProductsList /> ) );
        toReturn.push( this.generateSingleTabContent( 1, <ProductDetails /> ) );
        toReturn.push( this.generateSingleTabContent( 2, <CustomizationList updateCustomizations={this.updateCustomizationList} customizationList={this.state.customizationList} />) );
        toReturn.push( this.generateSingleTabContent( 3, "" ) );
        toReturn.push( this.generateSingleTabContent( 4, <CombinationGrid customizationList={this.state.customizationList}/> ) );
        toReturn.push( this.generateSingleTabContent( 5, <RenderLayers/> ) );
        
        return toReturn;
    }
    
    render() {
        return (
            <div>
              <div id="exTab2" className="container">	
                <ul className="nav nav-tabs">
                  {this.generateTabs()};
		</ul>

		<div className="tab-content ">
                  {this.generateAllTabContent()}
		</div>
              </div>
              
            </div>
        );
    }
}

export default Home;
