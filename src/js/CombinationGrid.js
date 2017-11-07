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
        this.state = { combinations: [] };
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
                    temp = temp.concat( [list[j]] );
                }
            }
            if( temp.length > 0 )
            {
            }
        }

        this.setState( {
            combinations: result
        } );

    }        

    updateValidCombination( first, second, valid )
    {
        console.log( first + "/" + second + "=" + valid );
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
            toReturn.push( <CombinationGridBox key={number + "-" + i} first={this.props.customizationList[number]} second={this.props.customizationList[i]} updateValidCombination={this.updateValidCombination}>{this.props.customizationList[i].value} </CombinationGridBox> );        }
        
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
    
