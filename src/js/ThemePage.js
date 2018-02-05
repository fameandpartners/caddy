/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';
import uuidv4 from 'uuid/v4';
import DraggableList from 'react-draggable-list';

const FIREBASE_URL = process.env.FIREBASE_URL;

class CustomizationsSortedItem extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      item: null
    };        
  }
  
  render()
  {
    let customization = this.props.commonProps.customizations.find( (item) => item.code == this.props.item ) || { name: '' };
    return (
      <div key={this.props.item}>
        <div className="row">
          <div className="col-md-12">{this.props.dragHandle(<div className="dragHandle" />)} <b>{this.props.item}</b> - {customization.name}</div>
        </div>
        </div>        
    );
  }
}

class ProductSortedItem extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      item: null
    };        
  }
  
  render()
  {

    if( this.props.commonProps[this.props.item] )
    {
      return (
        <div key={this.props.item}>
          <div className="row">
            <div className="col-md-12">{this.props.dragHandle(<div className="dragHandle" />)} <b>{this.props.item}</b> - {this.props.commonProps[this.props.item].name}</div>
          </div>
          </div>        
      );
    } else
    {
      return null;
    }
  }
}

class ColorSortedItem extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      item: null
    };        
  }

  findColorName( code )
  {
    return this.props.commonProps.find( ( element ) => element[0] == code );
  }
  
  render()
  {
    return (
      <div key={this.props.item}>
        <div className="row">
          <div className="col-md-12">{this.props.dragHandle(<div className="dragHandle" />)} <b>{this.findColorName( this.props.item )[1]} </b></div>
        </div>
      </div>        
    );
  }
}


class ThemePage extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      colors:  [],
      products: {},
      selectedProducts: [],
      length: null,
      loadedProducts: {},
      productCustomizations: {},
      id: uuidv4(),
      pageName: null,
      pageUrl: null
    };
    this.colorCheckBoxes = {};
    this.customizationCheckBoxes = {};
  }

  updateSelectedCustomizations( event )
  {
    const styleAndCode  = event.target.name.split( '/' );
    let styleNumber = styleAndCode[0];
    let customizationCode  = styleAndCode[1];
    let productCustomizations = this.state.productCustomizations;
    let styleCustomizations = productCustomizations[styleNumber] || ['default'];
    if( styleCustomizations.indexOf( customizationCode ) == -1 )
    {
      styleCustomizations.push( customizationCode );
    } else
    {
      styleCustomizations.splice( styleCustomizations.indexOf( customizationCode ), 1 );
    }
    
    productCustomizations[styleNumber] = styleCustomizations;

    this.setState( {
      productCustomizations: productCustomizations
    } );
  }
  
  updateCheckState( event )
  {
    const colorCode = event.target.name;
    let colors = this.state.colors;
    
    if( colors.indexOf( colorCode ) == -1 )
    {
      colors.push( colorCode );
    } else
    {
      colors.splice( colors.indexOf( colorCode ), 1 );
    }
    this.setState(
      {
        colors: colors
      }
    );
  }
  
  updateLength()
  {
    this.setState(
      {
        length: this.lengthCopy.value
      }
    );
  }

  clean( value )
  {
    if( value )
    {
      return value;
    }
    else
    {
      return '';
    }
    
  }
  
  updateWithLatestState( props )
  {
    if( props.pageJSON )
    {
      let json = props.pageJSON;
      this.setState( {
        colors:  json.colors,
        selectedProducts: json.selectedProducts,
        length: json.length,
        productCustomizations: json.productCustomizations,
        id: json.id,
        pageName: json.pageName,
        pageUrl: json.pageUrl
      } );

      this.pageUrl.value = this.clean( json.pageUrl );
      this.pageName.value = this.clean( json.pageName );
      for( let i = 0 ; i < json.colors.length; i++ )
      {
        this.colorCheckBoxes[json.colors[i]].checked = true;
      }

      
      if( json.length )
      {
        this.lengthCopy.value = json.length;
      }

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
  
  componentWillMount()
  {
    let url = FIREBASE_URL + '/products.json';
    request.get( url ).end((error, response) => {
      this.setState(
        {
          products:  JSON.parse( response.text )
        }
      );
    } );
  }
  
  renderColor( colorCode, colorName )
  {
    return <span key={colorCode}><input type="checkbox" ref={(input) => { this.colorCheckBoxes[colorCode] = input ; }} name={colorCode} onChange={this.updateCheckState}/>{colorName}</span>;
  }
  
  renderColors()
  {
    let colors = [["0000", "Bright Turquoise"],  ["0001","Pale Blue"], ["0002","Blush"], ["0003", "Guava/Bright Blush"], ["0004","Burgundy"], ["0005","Champagne"],
                  ["0006", "Ivory"], ["0007","Lilac"], ["0008", "Mint"], ["0009", "Pale Grey"], ["0010", "Pale Pink"], ["0011", "Peach"],  ["0012", "Red"],
                  ["0013", "Royal Blue"], ["0014", "Black"], ["0015", "Sage Green"], ["0016", "Berry"], ["0017", "Navy"] ];

    let toReturn = [];
    for( let i = 0; i < 18; i+= 3 )
    {
      toReturn.push(
        <div className="row" key={"colors-" + i}>
          <div className="col-md-2">
            {this.renderColor( colors[i][0], colors[i][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 1][0], colors[i + 1][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 2][0], colors[i + 2][1] ) }
          </div>
        </div>        
      );
    };
    let context = this;
    if( this.state.colors.length > 0 )
    {
      toReturn.push( <h3 key="sort-colors-key">Sort Colors</h3> );
      toReturn.push(
        <div className="row" key="color-sort">
          <div className="col-md-6">
            <DraggableList itemKey={(code) => code}
              template={ColorSortedItem}
              list={this.state.colors}
              commonProps={colors}
              onMoveEnd ={ newList => context.setState( { colors: newList}) }                  
              />
          </div>          
        </div>
      );
    }


    return toReturn;
  }

  loadProduct( styleNumber )
  {
    if( this.state.products[styleNumber] && this.state.loadedProducts[styleNumber] == null )
    {
      let versionNumber = this.state.products[styleNumber].version;
      let url = FIREBASE_URL + '/product/' + styleNumber + "/versions/" + versionNumber + ".json";
      request.get( url ).end((error, response) => {
        let productJson = JSON.parse( response.text );
        productJson.customizations.sort().reverse();
        let loadedProducts = this.state.loadedProducts;
        loadedProducts[styleNumber] = productJson;
        this.setState( {
          loadedProducts: loadedProducts
        });
      } );
    }
  }
  
  addProduct( styleNumber, version )
  {
    let selectedProducts = this.state.selectedProducts;
    selectedProducts.push( styleNumber );
    this.loadProduct( styleNumber);
    this.setState( {
      selectedProducts: selectedProducts
    } );
  }

  removeProduct( styleNumber )
  {
    let selectedProducts = this.state.selectedProducts;
    selectedProducts.splice( selectedProducts.indexOf( styleNumber ), 1 );
    this.setState( {
      selectedProducts: selectedProducts
    } );
                   
  }
  
  renderProductButton( styleNumber )
  {
    let context = this;
    if( this.state.selectedProducts.indexOf( styleNumber ) == -1 )
    {
      return( 
          <span>
          <button onClick={() => context.addProduct( styleNumber )}>Add Product</button>
          </span>
      );
    } else
    {
      return( 
          <span>
          <button onClick={() => context.removeProduct( styleNumber )}>Remove Product</button>
          </span>
      );
    }
  }
  
  renderProducts()
  {
    let productsJSON = this.state.products;
    
    let toReturn = [];
    let context = this;
    if( productsJSON )
    {
      Object.keys(productsJSON).map(function(styleNumber, keyIndex) {
        toReturn.push(
          <li key={styleNumber}>
            <div className="container product-list-entry">
              <div className="row">
                <div className="col-md-2">
                  <span>{styleNumber}</span>
                </div>
                <div className="col-md-2">
                  <span>{productsJSON[styleNumber].name}</span>
                </div>
                <div className="col-md-2">
                  {context.renderProductButton( styleNumber)}
                </div>
              </div>

            </div>
          </li> );
      });

      if( this.state.colors.length > 0 )
      {
        toReturn.push( <h3 key="sort-products-title">Sort Products</h3> );
        toReturn.push(
          <div className="row" key="color-sort">
            <div className="col-md-6">
              <DraggableList itemKey={(code) => code}
                template={ProductSortedItem}
                list={this.state.selectedProducts}
                commonProps={productsJSON}
                onMoveEnd ={ newList => context.setState( { selectedProducts: newList}) }
                />
            </div>          
          </div>
        );
    }
      
      return toReturn;
    } else
    {
      return "";
    }
  }
  
  renderLengths()
  {
    return <select ref={ (ref) => this.lengthCopy = ref} onChange={this.updateLength} id="length-set">
      <option key="default" disabled="true" selected="true">select</option>
      <option key="micro_mini" value="micro_mini">Micro Mini</option>
      <option key="mini" value="mini">Mini</option>
      <option key="knee" value="knee">Knee</option>
      <option key="midi" value="midi">Midi</option>      
      <option key="ankle" value="ankle">Ankle</option>
      <option key="maxi" value="maxi">Maxi</option>
      </select>;
  }

  shouldCheck( styleNumber, customizationCode )
  {
    return this.state.productCustomizations[ styleNumber ] && this.state.productCustomizations[ styleNumber ].indexOf( customizationCode ) != -1;
  }
  
  renderCustomizationCheckbox( product, customizations, customizationIndex )
  {
    if( customizationIndex < customizations.length )
    {
      let item = customizations[ customizationIndex ];
      return <div key={product.details.id + "-" + item.code}><input ref={ (ref) => this.customizationCheckBoxes[product.details.id + "/" + item.code] = ref }  type="checkbox" name={product.details.id + "/" + item.code} onChange={this.updateSelectedCustomizations} checked={this.shouldCheck( product.details.id, item.code )}/> {item.code} - {item.name} </div>;
      
    } else
    {
      return <div></div>;
    }
  }

  generateCustomizationRows( product )
  {
    let toReturn =[];
    let customizations = product.customizations;
    for( let j = 0; j < customizations.length; j+= 3 )
        {
          toReturn.push( <tr key={"customization-row-" + product.id + "-" + j}>
                         <td style={{'border': '1px solid black'}}>{this.renderCustomizationCheckbox( product, customizations, j)}</td>
                         <td style={{'border': '1px solid black'}}>{this.renderCustomizationCheckbox( product, customizations, j+1)}</td>
                         <td style={{'border': '1px solid black'}}>{this.renderCustomizationCheckbox( product, customizations, j+2)}</td>
                         </tr> );
        }
   
    return toReturn;
  }
  checkAllCustomizationCheckBoxes( styleNumber )
  {
    let selectedCustomizations = this.state.productCustomizations[styleNumber] || ['default'];
    let product = this.state.loadedProducts[ styleNumber];
    for( let i = 0; i < product.customizations.length; i++ )
    {
      if( selectedCustomizations.indexOf( product.customizations[i].code ) == -1 )
      {
        selectedCustomizations.push( product.customizations[i].code );
      }
    }
    
    this.state.productCustomizations[styleNumber] = selectedCustomizations;
    this.setState(
      {
        productCustomizations: this.state.productCustomizations
      } );
  }
  
  renderProductCustomizations()
  {
    let toReturn = [];
    
    for( let i = 0; i < this.state.selectedProducts.length; i++ )
    {
      let product = this.state.loadedProducts[ this.state.selectedProducts[i] ];

      if( !product && this.state.products )
      {
        this.loadProduct( this.state.selectedProducts[i] );
      }
      if( product )
      {
        toReturn.push( <div key={"customizations-" + product.details.id}>
                       <h4><u>{product.details.id} - {product.details.name}</u> <span style={{'font-size': 'normal'}}><button onClick={ () => this.checkAllCustomizationCheckBoxes( product.details.id )}>select all</button></span></h4>
                       <table>{this.generateCustomizationRows(product)}</table>
                       </div> );

        let customizations = this.state.productCustomizations[ product.details.id ];
        if( customizations  && customizations.length  > 0 )
        {
          let context = this;
          toReturn.push( <h3 key={"sort-customizations-title-for" + product.details.id}>Sort Customizations</h3> );
          toReturn.push(
            <div className="row" key={"customizations-sort-" + product.details.id}>
              <div className="col-md-6">
                <DraggableList itemKey={(code) => code}
                  template={CustomizationsSortedItem}
                  list={this.state.productCustomizations[product.details.id]}
                  commonProps={product}
                  onMoveEnd ={ function( newList) { context.state.productCustomizations[product.details.id] = newList ; context.setState( { productCustomizations: context.state.productCustomizations }); } }/>
               </div>          
            </div>
          );
        }
        
      }
      
    }
    return toReturn;
  }

  buildDressImageUrls( length, color, styleNumber, customizationList )
  {
    let toReturn = [];

    for( let i = 0; customizationList && i < customizationList.length; i++ )
    {
      let customizationCode = customizationList[i];
      toReturn.push( `http://marketing.fameandpartners.com/renders/composites/${styleNumber}/800x800/${customizationCode}-${length}-front-${color}.png`.toLowerCase() );
      
    }
    
    return toReturn;
  }

  translateJumpsuitLength( length )
  {
    return { micro_mini: 'cheeky', mini: 'short', midi: 'midi', ankle: 'ankle', maxi: 'full' }[length.toLowerCase()];
  }
  
  buildJumpsuitImageUrls( length, color, styleNumber, customizationList )
  {
    let toReturn = [];

    for( let i = 0; customizationList && i < customizationList.length; i++ )
    {
      let customizationCode = customizationList[i];
      if( customizationCode.toLowerCase().charAt( 0 ) == 't' )
      {
        toReturn.push( `http://marketing.fameandpartners.com/renders/composites/${styleNumber}/800x800/b6-${customizationCode}-${this.translateJumpsuitLength(length)}-front-${color}.png`.toLowerCase() );
        toReturn.push( `http://marketing.fameandpartners.com/renders/composites/${styleNumber}/800x800/b7-${customizationCode}-${this.translateJumpsuitLength(length)}-front-${color}.png`.toLowerCase() );
      } else
      {
        toReturn.push( `http://marketing.fameandpartners.com/renders/composites/${styleNumber}/800x800/${customizationCode}-${this.translateJumpsuitLength(length)}-front-${color}.png`.toLowerCase() );
      }
      
    }
    
    return toReturn;
  }
  
  isJumpSuit( styleNumber )
  {
    return styleNumber.toLowerCase().indexOf( "-js" ) != -1;
  }
  
  buildSetOfImagesToRender()
  {
    let toReturn = [];
    for( let i = 0; i < this.state.selectedProducts.length; i++ )
    {
      let styleNumber = this.state.selectedProducts[i];
      let customizations = this.state.productCustomizations[ styleNumber ];
      for( let j = 0; j < this.state.colors.length; j++ )
      {
        let colorCode = this.state.colors[j];
        if( this.isJumpSuit( styleNumber ) )
        {
          toReturn = toReturn.concat( this.buildJumpsuitImageUrls( this.state.length, colorCode, styleNumber, customizations ) );
          
        } else
        {
          toReturn = toReturn.concat( this.buildDressImageUrls( this.state.length, colorCode, styleNumber, customizations ) );
        }
      }
    }
    return toReturn;
  }

  renderImage( images, position )
  {
    if( position < images.length )
    {
      return <img key={position} src={images[position]} width="200" height="200" />;
    } else
    {
      return "";
    }
  }
  renderImageRow( images, startingPosition )
  {
    return ( <div key={"row-" + startingPosition} className="row">
             <div className="col-md-2">{this.renderImage( images, startingPosition )}</div>
             <div className="col-md-2">{this.renderImage( images, startingPosition + 1 )}</div>
             <div className="col-md-2">{this.renderImage( images, startingPosition + 2 )}</div>
             <div className="col-md-2">{this.renderImage( images, startingPosition + 3)}</div>
             </div> );
  }
  
  renderSamplePage()
  {

    if( this.state.colors.length > 0 && this.state.selectedProducts.length > 0 && this.state.length != null && Object.keys( this.state.productCustomizations ).length > 0 )
    {
      let toReturn = [];
      let imagesToRender = this.buildSetOfImagesToRender();
      for( let i = 0; i < imagesToRender.length + 3; i += 4 )
      {
        toReturn.push( this.renderImageRow( imagesToRender, i ) );
      }
      return toReturn;
    } else
    {
      return <div></div>;
    }
  }

  save()
  {
    let url = FIREBASE_URL + '/themePages/' + this.state.id + ".json";
    let themePage = {
      colors:  this.state.colors,
      selectedProducts: this.state.selectedProducts,
      length: this.state.length,
      productCustomizations: this.state.productCustomizations,
      id: this.state.id,
      pageName: this.state.pageName,
      pageUrl: this.state.pageUrl
      
    };
    
    request.put( url )
      .type( 'application/json' )
      .send( themePage )
      .end((error, response) =>
           {
             console.log( response );
           } );
    
  }

  updatePageName()
  {
    this.setState( {
      pageName: this.pageName.value
    });
      
  }

  updatePageUrl()
  {
    this.setState( {
      pageUrl: this.pageUrl.value
    });
    
  }
  downcaseCustomizationCodes( customizations )
  {
    return customizations.map( (code) => code.toLowerCase() );
  }

  addJumpsuitCustomizations( customizations )
  {
    let toReturn = [];
    for( let i = 0; i < customizations.length; i++ )
    {
      let customization = customizations[i].toLowerCase();

      if( customization.charAt( 0 ) == 't' )
      {
        toReturn.push( 'b6-' + customization );
        toReturn.push( 'b7-' + customization );
      } else
      {
        toReturn.push( customization );
      }
    }

    return toReturn;
  }
  buildProductsJson( customizations )
  {
    let styleNumbers = Object.keys( customizations );
    let toReturn = [];

    for( let i = 0; i < styleNumbers.length; i++ )
    {
      if( this.isJumpSuit( styleNumbers[i] ) )
      {
        toReturn.push( { style_number: styleNumbers[i].toLowerCase(), customization_ids: this.downcaseCustomizationCodes( this.addJumpsuitCustomizations( customizations[styleNumbers[i]]))}  );
        
      } else
      {
        toReturn.push( { style_number: styleNumbers[i].toLowerCase(), customization_ids: this.downcaseCustomizationCodes( customizations[styleNumbers[i]])} );
      }
    }
    return toReturn;
  }
  
  exportJson()
  {
    let exportJson = {
      title: this.state.pageName,
      url: this.state.pageUrl,
      colors: this.state.colors,
      length: this.state.length,
      products: this.buildProductsJson( this.state.productCustomizations )
    };

    let filename= 'theme.json';
    if( this.state.pageName )
    {
      filename = this.state.pageName.toLowerCase().replace(/[^a-z]/g, ' ') .split(/\s+/).join('-') + ".json";

    }
    var blobdata = new Blob([JSON.stringify(exportJson)],{type : 'application/json'});
    let link = document.createElement("a");
    link.setAttribute("href",  window.URL.createObjectURL(blobdata));
    link.setAttribute("download", filename);
    link.click();
    
  }
  
  renderConfiguration()
  {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-1">
            <span>
              <button onClick={() => this.props.changeCurrentPage( 'list' )}>Back</button>
            </span>
          </div>
          <div className="col-md-1">
            <span>
              <button onClick={() => this.save()}>Save</button>
            </span>
          </div>
          <div className="col-md-1">
            <span>
              <button onClick={() => this.exportJson()}>JSON</button>
            </span>
          </div>

        </div>        
        <div className="row">
          <div className="col-md-2">
            Page Name:
          </div>
          <div className="col-md-2">
            <input type="text" ref={(input) => { this.pageName = input;  }} onChange={this.updatePageName}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            Page Url:
          </div>
          <div className="col-md-2">
            <input type="text" ref={(input) => { this.pageUrl = input;  }} onChange={this.updatePageUrl} />
          </div>
        </div>
        <h2>Select Colors</h2>
        {this.renderColors()}
        <div className="row">
          <div className="col-md-12">
            <h2>Select Length</h2>
          </div>          
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderLengths()}
          </div>          
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Select Products</h2>
          </div>          
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderProducts()}
          </div>          
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Select Customizations</h2>
          </div>          
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.renderProductCustomizations()}
          </div>          
        </div>
        
    </div>        
    );
  }
  
  render()  
  {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {this.renderConfiguration()}
          </div>
          <div className="col-md-6">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>{this.state.pageName}</h2>
                </div>          
              </div>
              <div className="row">
                <div className="col-md-12">
                  {this.renderSamplePage()}
                </div>          
              </div>
            </div>            
          </div>
        </div>
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

export default connect(stateToProps, dispatchToProps)(ThemePage);
