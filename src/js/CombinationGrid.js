/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';

import CombinationGridBox from './CombinationGridBox';

export default class CombinationGrid extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = { combinations: [],
                       invalidCombinations: {}
                     };
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
                    console.log( temp.join( "," ) );
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
        let ic = this.state.invalidCombinations;

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
        
        let ic = this.state.invalidCombinations;
        if( !ic[combinations[0]] )
        {
            ic[combinations[0]] = {};
        }

        ic[combinations[0]][combinations[1]] = valid;
        this.setState(
            {
                invalidCombinations: ic 
            }
        );

        this.generateCombinations(this.props.customizationList);
    }
    
    generateTableHead()
    {
        let toReturn = [];

        toReturn.push( <th key='-1'></th> );
        for( let i = 0; i < this.props.customizationList.length; i++ )
        {
            toReturn.push( <th key={i}>{this.props.customizationList[i].value}</th> );
        }

        return toReturn;
    }

    generateTableRows()
    {
        let toReturn = [];
        for( let i = 0; i < this.props.customizationList.length; i++ )
        {
            toReturn.push( <tr key={"row-" + i}>{this.generateTableRow( i )}</tr> );
        }

        return toReturn;
    }

    generateTableRow( number )
    {
        let toReturn = [];

        toReturn.push( <td key={number + "--1" }>{this.props.customizationList[number].value}</td> );
        for( let i = 0; i < this.props.customizationList.length; i++ )
        {
            toReturn.push( <CombinationGridBox
                           key={number + "-" + i}
                           first={this.props.customizationList[number]}
                           second={this.props.customizationList[i]}
                           updateValidCombination={this.updateValidCombination}
                           isValidCombination={this.isValidCombination}
                           invalidCombinations={this.state.invalidCombinations}>
                           </CombinationGridBox> );        }
        
        return toReturn;
    }

    
    componentWillReceiveProps(nextProps)
    {
        this.generateCombinations( nextProps.customizationList );
    }
    
    render()
    {
        return(
            <table className="combination-grid">
              <tr>
                {this.generateTableHead()}
              </tr>
              {this.generateTableRows()}
            </table>
        );
    }
}
    
