/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

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
                customizationList: [],
                product: null
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
        if( this.props.showProductDetails )
        {
            toReturn.push( this.generateTab( 1, "Product Details" )  );
        }

        if( this.props.showCustomizations )
        {
            toReturn.push( this.generateTab( 2, "Customizations" )  );

            let i = 0;
            for(; this.props.product && i < this.props.product.details.lengths.length; i++ )
            {
                toReturn.push( this.generateTab( 3 + i, this.props.product.details.lengths[i] ) );
            }
            toReturn.push( this.generateTab( 3 + i, "Render Test" )  );
            
        }
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
        if( this.props.showProductDetails )
        {
            toReturn.push( this.generateSingleTabContent( 1, <ProductDetails /> ) );
        }

        if( this.props.showCustomizations )
        {
            toReturn.push( this.generateSingleTabContent( 2, <CustomizationList updateCustomizations={this.updateCustomizationList} customizationList={this.state.customizationList} />) );

            let i = 0;
            for( ; this.props.product && i < this.props.product.details.lengths.length; i++ )
            {
                toReturn.push( this.generateSingleTabContent( 3 + i, <CombinationGrid customizationList={this.state.customizationList} forLength={this.props.product.details.lengths[i]}/> ) );
            }

            toReturn.push( this.generateSingleTabContent( 3 + i, <RenderLayers/> ) );
            
        }
        
        return toReturn;
    }
    
    render() {
        return (
            <div>
              <div id="exTab2" className="container">	
                <ul className="nav nav-tabs">
                  {this.generateTabs()}
		</ul>

		<div className="tab-content ">
                  {this.generateAllTabContent()}
		</div>
              </div>
              
            </div>
        );
    }
}

function stateToProps(state)
{

    return { 
        showProductDetails: state.product && state.product.version != null,
        showCustomizations: state.product && state.product.version != null && state.product.version > 0,
        product: state.product
    };
}

function dispatchToProps(dispatch)
{
    return {
    };
}

export default connect(stateToProps, dispatchToProps)(Home);
