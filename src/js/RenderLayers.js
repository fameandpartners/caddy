/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import LayerCad from './LayerCad';


export default class RenderLayers extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {
            currentBase: null,
            frontValues: [],
            backValues: []
        };        
    }
    
    uploadFrontFile(e)
    {
        let context = this;
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            let layers = context.state.frontValues;
            layers.push( {cad: base64 } );
            context.setState( {
                frontValues: layers
            } );
        });
    }

    uploadBackFile(e)
    {
        let context = this;
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            let layers = context.state.backValues;
            layers.push( {cad: base64 } );
            context.setState( {
                backValues: layers
            } );
        });
    }
    
    render()
    {
        return (
            <div className="container">
              <div className="row">
                Front: <input type="file" id="more-files" name="more-files" onChange={this.uploadFrontFile} />
                Back: <input type="file" id="more-files" name="more-files" onChange={this.uploadBackFile} />
                
              </div>
              <div className="row">
                <div className="col-md-4">
                  <LayerCad width={512} height={512} base={this.state.currentBase} values={this.state.frontValues}/>
                </div>
                <div className="col-md-4">
                  <LayerCad width={512} height={512} base={this.state.currentBase} values={this.state.backValues}/>
                </div>
              </div>
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
