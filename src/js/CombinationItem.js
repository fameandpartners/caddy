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
            updatingLayers: false,
            currentBase: null
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

    componentDidMount()
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

        this.setState(
            {
                currentBase: base
            }
        );
        
    }
    
    renderCurrentBase( base )
    {
        
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

    updateBase(e)
    {
        let context = this;
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            context.setState( {
                currentBase: base64
            } );
        });
        
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
                <div className="col-md-2">
                  <input type="file" id={"baseLayeUpdate" + this.props.itemKey} name={'baseLayerUpload' + this.props.itemKey} onChange={this.updateBase} />
                </div>
                {Array( this.state.values.length).fill().map((e,i)=>i+1)}
              </div>

              <div className={this.state.updatingLayers ? "row" : "row hidden"}>
                {this.renderCurrentBase( this.state.currentBase )}
                {this.state.values.map( this.renderLayer )}
              </div>
              <div className={this.state.invalid ? "hidden" : "" }><LayerCad width={236} height={200} base={this.state.currentBase} values={this.state.values}/></div>
            </div>
               );
    }
}

const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};
