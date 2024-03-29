/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CustomizationItem from './CustomizationItem';
import CanvasImage from './CanvasImage';
import * as AppActions from './actions/AppActions';
import {sortCustomizations} from './Utils';
import uuidv4 from 'uuid/v4';

class CustomizationList extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      product: {
        customizations: []
      }
    };

    this.customizationTextBoxes = {};
    this.priceAUDTextBoxes = {};
    this.priceUSDTextBoxes = {};
    this.codeTextBoxes = {};
    this.groupNameTextBoxes = {};
    this.silhouetteTextBoxes = {};
    this.necklineTextBoxes = {};
  }

  addCustomization()
  {
    let product = this.state.product;
    product.customizations = product.customizations.concat([ {
      id: uuidv4(),
      name: null,
      priceAUD: null,
      priceUSD: null,
      frontTopRenderImage: null,
      frontBottomRenderImage: null,
      backTopRenderImage: null,
      backBottomRenderImage: null
    } ] );
    this.setState( 
      {
        product: product
      }
    );
  }


  delete( index )
  {
    
    this.state.product.customizations.splice( index, 1 );
    this.setState(
      {
        product: this.state.product
      }
    );
  }

  updateWithLatestState( props )
  {
    this.setState( {
      product: props.product
    } );
  }
  
  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }

  updateCustomizatioName( number, e )
  {
    let product = this.state.product;

    this.state.product.customizations[number].name = this.customizationTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );

   if (e.key === "Enter") {
     this.addCustomization();
    }    
  }
  
  updateAUDPrice( number )
  {
    let product = this.state.product;

    this.state.product.customizations[number].priceAUD = this.priceAUDTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );
  }

  updateUSDPrice( number )
  {
    let product = this.state.product;

    this.state.product.customizations[number].priceUSD = this.priceUSDTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );
  }

  updateCode( number )
  {
    let product = this.state.product;

    this.state.product.customizations[number].code = this.codeTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );
    
  }

  updateGroupName( number )
  {
    let product = this.state.product;

    this.state.product.customizations[number].group_name = this.groupNameTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );
    
  }

  updateNewSilhouetteName( number )
  {
    let product = this.state.product;

    this.state.product.customizations[number].new_silhouette_name = this.silhouetteTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );
    
  }

  updateNecklineName( number )
  {
    let product = this.state.product;

    this.state.product.customizations[number].new_neckline_name = this.necklineTextBoxes[number].value;
    this.setState(
      {
        product: product
      }
    );
    
  }

  exportCSV()
  {
    let csvString = "";
    for( let i = 0; i < this.state.product.customizations.length; i++ )
    {
      let element =  this.state.product.customizations[i];
      csvString  += element.code + ",\"" + element.name +  "\"\n";
    }
    var blobdata = new Blob([csvString],{type : 'text/csv'});
    let link = document.createElement("a");
    link.setAttribute("href",  window.URL.createObjectURL(blobdata));
    link.setAttribute("download", this.state.product.details.id.toLowerCase() + "-customizations.csv");
    link.click();

  }
  
  renderCustomizationItem( customization, number )
  {
    return (
      <li key={customization.code || "customization-" + customization.id }>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              Customization Name:
            </div>
            <div className="col-md-2">
              <input type="text"
                     defaultValue={customization.name}
                     onKeyUp={(key) => this.updateCustomizatioName( number, key ) }
                ref={(input) => { this.customizationTextBoxes[number] = input; }} />
            </div>
            <div className="col-md-2 text-right">
              Line Sheet Code:
            </div>
            <div className="col-md-1">
              <input type="text"
                     defaultValue={customization.code}
                     onBlur={() => this.updateCode( number ) }                           
                ref={(input) => { this.codeTextBoxes[number] =  input; }} />

            </div>
            <div className="col-md-1 text-right">
              $AUD
            </div>
            <div className="col-md-1">
              <input type="text"
                     defaultValue={customization.priceAUD}
                     onKeyUp={() => this.updateAUDPrice( number ) }                           
                ref={(input) => { this.priceAUDTextBoxes[number] =  input; }} />

            </div>
            <div className="col-md-1 text-right">
              $USD
            </div>
            <div className="col-md-1">
              <input type="text"
                     defaultValue={customization.priceUSD}
                     onKeyUp={() => this.updateUSDPrice( number ) }                                                      
                ref={(input) => { this.priceUSDTextBoxes[number] = input; }} />
                
            </div>
            <div className="col-md-1">
              <button onClick={() =>this.delete( number ) }>Delete</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              Group Name:
            </div>
            <div className="col-md-2">
              <input type="text"
                     defaultValue={customization.group_name}
                     onKeyUp={(key) => this.updateGroupName( number, key ) }
                ref={(input) => { this.groupNameTextBoxes[number] = input; }} />
            </div>
            <div className="col-md-2 text-right">
              New Silhouette Name:
            </div>
            <div className="col-md-2">
              <input type="text"
                     defaultValue={customization.new_silhouette_name}
                     onBlur={() => this.updateNewSilhouetteName( number ) }                           
                ref={(input) => { this.silhouetteTextBoxes[number] =  input; }} />

            </div>
            <div className="col-md-2 text-right">
              New Neckline Name:
            </div>
            <div className="col-md-2">
              <input type="text"
                     defaultValue={customization.new_neckline_name}
                     onBlur={() => this.updateNecklineName( number ) }                           
                ref={(input) => { this.necklineTextBoxes[number] =  input; }} />

            </div>
          </div>
          
        </div>
      </li>
    );
  }

  
  render()
  {
    return(
      <div className="container customization-item">
        <div className="row">
          <ol>
            {this.state.product.customizations.map( this.renderCustomizationItem ).sort( sortCustomizations ) }
          </ol>
        </div>
        <div className="row">
          <div className="col-md-2">
            <button onClick={this.addCustomization}>Add Customization</button>
          </div>
          <div className="col-md-2">
            <button onClick={() => this.props.save(this.state.product) }>Save</button>
          </div>
          <div className="col-md-2">
            <button onClick={this.exportCSV}>Export CSV</button>
          </div>
        </div>
      </div>
    );
  }
}

function stateToProps(state)
{
  let product = state.product;
  if( product.customizations == null )
  {
    product.customizations = [];
  }
  return { product: product };
}

function dispatchToProps(dispatch)
{
  return {
    save: ( value ) =>
      {
        dispatch(AppActions.updateProductDetails( value ));
      }
  };
}


export default connect(stateToProps, dispatchToProps)(CustomizationList);
