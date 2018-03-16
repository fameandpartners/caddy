/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';

import CustomizationList from './CustomizationList';
import CombinationList from './CombinationList';
import ProductsList from './ProductsList';
import ProductDetails from './ProductDetails';
import CombinationGrid from './CombinationGrid';
import RenderLayers from './RenderLayers';
import ProductImages from './ProductImages';
import UploadProduct from './UploadProduct';
import ThemePageList from './ThemePageList';
import ProductAdventure from './ProductAdventure.js';

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
        product: null,
        loadedProductId: null
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
    return( <li key={"tab-" + index} className={this.state.activeTab == index ? 'active' : ''}><Link  to={{pathname: '/product/' + this.state.loadedProductId + "/" + index}}>{text}</Link></li>);
  }
  
  generateTabs()
  {
    let toReturn = [];
    toReturn.push( this.generateTab( 0, "Load Product" )  );
    toReturn.push( this.generateTab( 1, "Theme Pages" ) );
    
    if( this.props.showProductDetails )
    {
      let name = "Product Details";
      if( this.props.product && this.props.product.details && this.props.product.details.name )
      {
        name = this.props.product.details.name;
      }
      toReturn.push( this.generateTab( 2, name )  );
      toReturn.push( this.generateTab( 3, "Product Images" )  );
      
    }

    if( this.props.showCustomizations )
    {
      toReturn.push( this.generateTab( 4, "Heirarchy" ) );
      toReturn.push( this.generateTab( 5, "Old Customizations" ) );
      
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
    toReturn.push( this.generateSingleTabContent( 1, <ThemePageList /> ) );

    if( this.props.showProductDetails )
    {
      toReturn.push( this.generateSingleTabContent( 2, <ProductDetails /> ) );
      toReturn.push( this.generateSingleTabContent( 3, <ProductImages /> ) );
      
    }

    if( this.props.showCustomizations )
    {
      toReturn.push( this.generateSingleTabContent( 4, <ProductAdventure /> ) );
      toReturn.push( this.generateSingleTabContent( 5, <CustomizationList /> ) );
      
      
    }
    
    return toReturn;
  }

  updateWithLatestState( props )
  {
    console.log( props );
    if( ( this.state.loadedProductId != props.productToLoad ) && props.productToLoad != null  )
    {
      this.props.load( props.productToLoad );
      this.setState( {
        loadedProductId: props.productToLoad
      } );
    }

    if( props.currentTab != null )
    {
      this.swapToTab( props.currentTab );
    }
  }

  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
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

  if( state.product.details )
  {
    if( state.product.details.lengths == null )
    {
      state.product.details.lengths = [];
    }
  }
  return { 
    showProductDetails: state.product && state.product.version != null,
    showCustomizations: state.product && state.product.version != null && state.product.version > 0,
    product: state.product
  };
}

function dispatchToProps(dispatch)
{
  return {
    load: ( styleNumber ) =>
      {
        dispatch( AppActions.loadLatestProduct( styleNumber ) );
      }
  };
}

export default connect(stateToProps, dispatchToProps)(Home);
