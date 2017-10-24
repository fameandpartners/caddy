/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import LayerCad from './LayerCad';
import CanvasImage from './CanvasImage';


export default class CombinationItem extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind(this);
        this.state = {
            invalid: false,
            values: this.props.values,
            updatingLayers: false
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

    updateLayers()
    {
        this.setState(
            {
                updatingLayers: true
            }
        );
    }

    renderCurrentBase()
    {
        let base = null;
        
        for( let i = this.state.values.length - 1; base == null && i >= 0; i-- )
        {
            if( this.state.values[i].specificBase != null )
            {
                base = this.state.values[i].specificBase;
            }
        }

        if( base == null )
        {
            base = this.state.values[0].defaultBase;
        }
        
        return(
            <div key={"edit-base-" + this.props.itemKey} className="col-md-2">
              <CanvasImage  imageData={base} width={236} height={200}/>
            </div>
        );
        
    }
    
    renderLayer(value)
    {
        let propName = "edit-layer-image-" + this.props.itemKey + "-" + value.key;
        return (
            <div key={propName} className="col-md-2">
              <CanvasImage  imageData={value.cad} width={236} height={200}/>
            </div>
        );
    }

    renderLayerNames( number )
    {
        let propName = "edit-layer-name-" + this.props.itemKey + "-" + number;
        return ( <div className="col-md-2 text-center" key={propName}>Layer {number}</div> );
    }
    render()
    {
        return (
            <div className="container">
              <div className="row">
                <div className={ this.state.invalid ? "invalid col-md-2" : "col-md-2" }>{this.renderedValue()}</div>
                <div className={this.state.invalid ? "hidden col-md-2" : "col-md-2"}>
                  <button onClick={this.markInvalid}>Mark Invalid</button>
                </div>
                <div className={this.state.innvalid ? "hidden col-md-2" : "col-md-2"}>
                  <button onClick={this.updateLayers}>Update Layers</button>
                </div>
              </div>

              <div className={this.state.updatingLayers ? "row" : "row hidden"}>
                <div className="col-md-2 text-center">Base</div>
                {Array( this.state.values.length).fill().map((e,i)=>i+1).map( this.renderLayerNames )}
              </div>

              <div className={this.state.updatingLayers ? "row" : "row hidden"}>
                {this.renderCurrentBase()}
                {this.state.values.map( this.renderLayer )}
              </div>
              <div className={this.state.invalid ? "hidden" : "" }><LayerCad width={236} height={200} values={this.state.values}/></div>
            </div>
               );
    }
}
