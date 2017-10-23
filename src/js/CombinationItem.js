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
        this.state = {
            invalid: false
        };
    }

    markInvalid()
    {
        this.setState(
            {
                invalid: true
            }
        );
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
        return (
            <div className="container">
              <div className="row">
                <div className={ this.state.invalid ? "invalid col-md-2" : "col-md-2" }>{this.renderedValue()}</div>
                <span><button onClick={this.markInvalid}>Mark Invalid</button></span>
              </div>
              <div className={this.state.invalid ? "col-md-2 hidden" : "col-md-2" }><LayerCad width={236} height={200} values={this.props.values}/></div>
            </div>
               );
    }
}
