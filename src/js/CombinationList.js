/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';

import CombinationItem from './CombinationItem';

export default class CombinationList extends React.Component
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
            result.push(<CombinationItem key={i} values={temp}/>);
        }

        this.setState( {
            combinations: result
        } );

    }        

    componentWillReceiveProps(nextProps)
    {
        this.generateCombinations( nextProps.customizationList );
    }
    render()
    {
        return(
            <div>{ this.state.combinations }</div>
        );
    }
}
    
