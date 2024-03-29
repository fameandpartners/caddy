/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import CanvasImage from './CanvasImage';

const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

export default class CustomizationItem extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {};
    }

    updateValue()
    {
        this.props.update( parseInt(this.props.customizationKey), this.textInput.value, this.state.defaultBase, this.state.baseImage, this.state.cadImage );
    }

    imageUploadBase(e)
    {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            this.setState( {
                baseImage: base64
            } );
            this.updateValue();
        });
    };

    imageUploadCad(e)
    {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            this.setState( {
                cadImage: base64
            } );
            this.updateValue();
        });
    };
    
    componentWillReceiveProps(nextProps)
    {
        let needsToUpdate = nextProps.defaultBase != this.state.defaultBase;
        this.setState(
            {
                defaultBase: nextProps.defaultBase
            }
        );

        if( needsToUpdate )
        {
            this.updateValue();
        }


    }

    componentDidMount()
    {
        this.componentWillReceiveProps( this.props );
    }
    
    render()
    {
        return(
            <li>
              <div className="container">
                <div className="row">
                  <div className="col-md-2">
                    Customization Name:
                    <input type="text" onKeyUp={this.updateValue } ref={(input) => { this.textInput = input;  }} />
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => this.props.deleteCustomization( this.props.customizationKey ) }>Remove</button> 
                  </div>
                  <div className="col-md-4">
                    <b>Base Image:</b> <input type="file" id="baseLayerUpload" name='baseLayerUpload' onChange={this.imageUploadBase} />                    
                  </div>
                  <div className="col-md-4">
                    <b>Cad Image:</b> <input type="file" id="cadImageUpload" name='cadImageUpload' onChange={this.imageUploadCad} />                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-md-push-4">
                    <CanvasImage imageData={this.state.baseImage} defaultImageData={this.state.defaultBase} width={236} height={200}/>
                  </div>
                  <div className="col-md-4 col-md-push-4">
                    <CanvasImage imageData={this.state.cadImage} width={236} height={200}/>
                  </div>
                </div>
              </div>                
            </li>
        );
    }
}
