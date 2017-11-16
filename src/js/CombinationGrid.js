/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import CombinationGridBox from './CombinationGridBox';
import * as AppActions from './actions/AppActions';

class CombinationGrid extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
    }

    generateCombinations( list )
    {
        let i, j, temp;
        let result = [];
        let arrLen = list.length;
        let power = Math.pow;
        let combinations = power(2, arrLen);
        
        for (i = 0; i < combinations;  i++)
        {
            temp = [];
            
            for (j = 0; j < arrLen; j++)
            {
                if ((i & power(2, j)))
                {
                    temp = temp.concat( [list[j].value] );
                }
            }
            
            if( temp.length > 0 )
            {
                if( !this.containsInvalidCombinations( temp ) )
                {
                    result.push( <li key={temp.join("-")}>{temp.join( "," )}</li> );
                }
            }
        }
        
        this.setState( {
            combinations: result
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
        let ic = this.state.product.validCombinations;

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

        if( !product.validCombinations[combinations[0]] )
        {
            product.validCombinations[combinations[0]] = {};
        }

        product.validCombinations[combinations[0]][combinations[1]] = valid;

        this.setState(
            {
                product: product
            }
        );

    }
    
    generateTableHead()
    {
        let toReturn = [];

        toReturn.push( <th key='-1'></th> );
        for( let i = 0; i < this.props.product.customizations.length; i++ )
        {
            toReturn.push( <th key={i}>{this.props.product.customizations[i].name}</th> );
        }

        return toReturn;
    }

    generateTableRows()
    {
        let toReturn = [];
        for( let i = 0; i < this.props.product.customizations.length; i++ )
        {
            toReturn.push( <tr key={"row-" + i}>{this.generateTableRow( i )}</tr> );
        }

        return toReturn;
    }

    generateTableRow( number )
    {
        let toReturn = [];

        toReturn.push( <td key={number + "--1" }>{this.props.product.customizations[number].name}</td> );
        for( let i = 0; i < this.props.product.customizations.length; i++ )
        {
            toReturn.push( <CombinationGridBox
                           key={number + "-" + i}
                           first={this.props.product.customizations[number]}
                           second={this.props.product.customizations[i]}
                           updateValidCombination={this.updateValidCombination}
                           isValidCombination={this.isValidCombination}>
                           </CombinationGridBox> );
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
    
    render()
    {
        return(
            <div>
              <table className="combination-grid">
                <tr>
                  {this.generateTableHead()}
                </tr>
                {this.generateTableRows()}
              </table>
              <button onClick={()=>this.props.save( this.state.product)}>Save</button>
            </div>            
        );
    }
}

function stateToProps(state)
{
    console.log( 'updating combination grid' );
    console.log( state.product );
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


export default connect(stateToProps, dispatchToProps)(CombinationGrid);
