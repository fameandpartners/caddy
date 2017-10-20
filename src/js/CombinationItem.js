/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';


export default class CombinationItem extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind(this);
    }

    renderedValue()
    {
        let toReturn = "";
        for( let i = 0; i < this.props.values.length; i++ )
        {
            toReturn += this.props.values[i].value + ",";
        }

        return toReturn;
    }
    render()
    {
        return ( <div>{this.renderedValue()}</div> );
    }
}
