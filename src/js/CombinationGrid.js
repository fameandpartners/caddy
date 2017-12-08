/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import CombinationGridBox from './CombinationGridBox';
import * as AppActions from './actions/AppActions';
import {sortCustomizations} from './Utils';

class CombinationGrid extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {};
  }
  
  isValidCombination( first, second )
  {
    let combinations = [first.toString(),second.toString()].sort();
    let ic = this.state.product.validCombinations[this.props.forLength] || {};

    if( first === second )
    {
      return false;
    }
    
    if( !ic[combinations[0]] )
    {
      return true;
    }

    if( ic[combinations[0]][combinations[1]] == null )
    {
      return true;
    }
    return ic[combinations[0]][combinations[1]];
    
  }
  
  updateValidCombination( first, second, valid )
  {
    let combinations = [first.toString(),second.toString()].sort();

    let product = this.state.product;
    let validSet = product.validCombinations[this.props.forLength];
    
    if( validSet == null )
    {
      validSet = {};
    }
    if( validSet[combinations[0]] == null)
    {
      validSet[combinations[0]] = {};
    }

    validSet[combinations[0]][combinations[1]] = valid;
    product.validCombinations[this.props.forLength] = validSet;

    console.log( product );
    this.setState(
      {
        product: product
      }
    );

  }
  
  generateTableHead()
  {
    let toReturn = [];
    let customizations = this.props.product.customizations.sort( sortCustomizations );
    
    toReturn.push( <th key='-1'></th> );
    toReturn.push( <th key='-2'></th> );
    
    for( let i = 0; i < customizations.length; i++ )
    {
      toReturn.push( <th key={i}>{customizations[i].name} ({customizations[i].code})</th> );
    }

    return toReturn;
  }

  generateTableRows()
  {
    let toReturn = [];
    for( let i = 0; i < this.props.product.customizations.length; i++ )
    {
      toReturn.push( <tr className="stickyTableRow" key={"row-" + i}>{this.generateTableRow( i )}</tr> );
    }

    return toReturn;
  }

  markInvalid( customization, isInvalid )
  {
    let product = this.state.product;
    let invalidCombinations = product.invalidCombinations[this.props.forLength];
    if( invalidCombinations == null )
    {
      invalidCombinations = {};
    }
    
    invalidCombinations[customization.id] = isInvalid;
    this.state.product.invalidCombinations[this.props.forLength] = invalidCombinations;
    this.setState(
      {
        product: this.state.product
      }
    );
  }

  isInvalid( customization )
  {
    return this.state.product.invalidCombinations[this.props.forLength] && this.state.product.invalidCombinations[this.props.forLength][customization.id];
  }
  
  generateTableRow( number )
  {
    let toReturn = [];

    if( this.state.product != null )
    {
      let customizations = this.state.product.customizations.sort( sortCustomizations );      
      toReturn.push( <td key={number + "--1" }>{customizations[number].name}  ({customizations[number].code})</td> );
      if( this.isInvalid( customizations[number] ) )
      {
        toReturn.push( <td key={number + "--2" }><button onClick={() => this.markInvalid( customizations[number], false ) }>Valid</button></td> );
        
      } else
      {
        toReturn.push( <td key={number + "--2" }><button onClick={() => this.markInvalid( customizations[number],true ) }>Invalid</button></td> );
      }
      
      
      for( let i = 0; i < customizations.length; i++ )
      {
        toReturn.push( <CombinationGridBox
                       key={this.props.forLength + "-" + number + "-" + i}
                       rowInvaild={this.isInvalid( customizations[number] )}
                       first={customizations[number]}
                       second={customizations[i]}
                       updateValidCombination={this.updateValidCombination}
                       isValidCombination={this.isValidCombination}>
                       </CombinationGridBox> );
      }

    }
    return toReturn;
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
  
  componentWillReceiveProps(nextProps)
  {
    //        this.generateCombinations( nextProps.customizationList );
    this.updateWithLatestState( nextProps );
    
  }
   
  copy()
  {
    let product = this.state.product;
    let copyFrom = {};
     
    if( product.validCombinations )
    {
      // Be sure to do a deep copy so pointers aren't still pointing at the same objects
      copyFrom = JSON.parse( JSON.stringify( product.validCombinations[ this.lengthCopy.value] ) );
    } else
    {
      product.validCombinations = {};
    }
    
    if( copyFrom == null )
    {
      copyFrom = {};
    }

    product.validCombinations[this.props.forLength] = copyFrom;
    console.log( product );
    this.setState(
      {
        product: product
      }
    );
  }

  export()
  {
    let csvString = "Combination 1, Combination 2, Line Sheet Codes, Can Be Combined?\n";
    let validCombinations = this.state.product.validCombinations[this.props.forLength];
    let context = this;
    this.state.product.customizations.forEach( ( firstCustomization ) =>
                                               this.state.product.customizations.forEach( function (secondCustomization)
                                                                                          {
                                                                                            if( firstCustomization.id != secondCustomization.id )
                                                                                            {
                                                                                              csvString += `${firstCustomization.name},${secondCustomization.name},${firstCustomization.code}-${secondCustomization.code},${context.isValidCombination( firstCustomization.id, secondCustomization.id)}\n`;
                                                                                            }
                                                                                            return false;
                                                                                          }
                                                                                        ) );
    
    var blobdata = new Blob([csvString],{type : 'text/csv'});
    let link = document.createElement("a");
    link.setAttribute("href",  window.URL.createObjectURL(blobdata));
    link.setAttribute("download", `combinationGrid${this.props.forLength}.csv`);
    link.click();
    
  }
  
  render()
  {
    return(
      <div>
        <div className="container">
          <div className="row">
            <table className="combination-grid">
              <tr className="stickyTableHead">
                {this.generateTableHead()}
              </tr>
              {this.generateTableRows()}
            </table>
          </div>
          <div className="row top-margin">
            <div className="col-md-4">
              Copy From
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <select ref={ (ref) => this.lengthCopy = ref} id="length-set">{this.props.product.details.lengths.map( (length) => ( <option key={length} value={length}>{length}</option>) )}</select>
        </div>
        <div className="col-md-2">
        <button onClick={this.copy}>Copy</button>                
        </div>
        <div className="col-md-2">
        <button onClick={this.export}>Export</button>                
        </div>
        </div>
        
        <div className="row top-margin">
        <div className="col-md-4">
        <button onClick={()=>this.props.save( this.state.product)}>Save</button>
        </div>
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

  if( product.validCombinations == null )
  {
    product.validCombinations = {};
  }
  if( product.invalidCombinations == null )
  {
    product.invalidCombinations = {};
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


export default connect(stateToProps, dispatchToProps)(CombinationGrid);
