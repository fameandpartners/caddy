/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import LayerCad from './LayerCad';


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
            toReturn += this.props.values[i].value;
            if( i + 1 < this.props.values.length )
            {
                toReturn += ",";
            }
        }

        return toReturn;
    }
    render()
    {
        return ( <div>
                 <div>{this.renderedValue()}</div>
                 <div><LayerCad width={236} height={200} values={this.props.values}/></div>
                 </div>
               );
    }
}
