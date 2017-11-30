/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import CombinationItem from './CombinationItem';

class CombinationList extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = { combinations: [], csvCombinations: [] };
  }


  generateCombinations( list )
  {
    let i, j, temp;
    let result = [];
    let arrLen = list.length;
    let power = Math.pow;
    let combinations = power(2, arrLen);
    let csvCombinations = [];
    
    for (i = 0; i < combinations;  i++)
    {
      let temp = [];
      let tempIds = [];
      
      for (j = 0; j < arrLen; j++)
      {
        if ((i & power(2, j)))
        {
          temp = temp.concat( [list[j].name] );
          tempIds = tempIds.concat( [list[j].id] );
        }
      }
      
      if( temp.length > 0 )
      {
        if( !this.containsInvalidCombinations( tempIds ) )
        {
          csvCombinations.push( temp );
          result.push( <li key={temp.join("-")}>{temp.join( "," )}</li> );
        }
      }
    }
    
    this.setState( {
      combinations: result,
      csvCombinations: csvCombinations
    } );

  }        

  containsInvalidCombinations( toCheck )
  {
    for( let i = 0; i < toCheck.length; i++ )
    {
      for( let j = i + 1; j < toCheck.length; j++ )
      {
        if( !this.isValidCombination( toCheck[i], toCheck[j] ) )
        {
          return true;
        }
      }
    }

    return false;
  }
  
  isValidCombination( first, second )
  {
    let combinations = [first.toString(),second.toString()].sort();
    let ic = this.state.product.validCombinations[this.lengthCopy.value] || {};

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
  
  generate()
  {
    this.setState( {
      combinations: []
    } );
    
    this.generateCombinations( this.state.product.customizations );
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
    this.updateWithLatestState( nextProps );
  }

  exportCSV()
  {
    let csvString = this.state.csvCombinations.reduce( ( wholeString , element ) =>  ( wholeString + element.reduce( ( rowString = "", rowElement ) =>  rowString += "\"" + rowElement + "\"," ) + "\n" ) );
    var blobdata = new Blob([csvString],{type : 'text/csv'});
    let link = document.createElement("a");
    link.setAttribute("href",  window.URL.createObjectURL(blobdata));
    link.setAttribute("download", "combinations.csv");
    link.click();

  }
  render()
  {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            Generate a complete set of combinations for a given length
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <select ref={ (ref) => this.lengthCopy = ref} id="length-set">{this.props.product.details.lengths.map( (length) => ( <option key={length} value={length}>{length}</option>) )}</select>
        </div>
        <div className="col-md-2">
        <button onClick={this.generate}>Generate</button>
        </div>
        <div className="col-md-2">
        <button onClick={this.exportCSV}>Export CSV</button>
        </div>
        </div>
        
        <div className="row">
        <div className="col-md-12">
        
        <ol>{ this.state.combinations }</ol>
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


export default connect(stateToProps, dispatchToProps)(CombinationList);

