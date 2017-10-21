/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';

import CustomizationItem from './CustomizationItem';
import CanvasImage from './CanvasImage';

export default class CustomizationList extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {
            baseImage: null
        };        
        this.addDefaultItem( true );
    }

    addCustomization()
    {
        this.setState( 
            {
                customizationList: this.state.customizationList.concat(
                    [
                            <CustomizationItem
                        key={parseInt(this.state.customizationList[this.state.customizationList.length - 1].key ) + 1}
                        customizationKey={parseInt(this.state.customizationList[this.state.customizationList.length - 1].key ) + 1}
                        defaultBase={this.state.baseImage}
                        deleteCustomization={this.deleteCustomization}
                        update={this.updateCustomizationValue}/>
                    ]
                )
            }
        );
    }

    updateCustomizationValue( key, value )
    {
        let updated = false;
        for( let i = 0; i < this.state.customizationValues.length && !updated; i++ )
        {
            if( this.state.customizationValues[i].key == key )
            {
                updated = true;
                this.state.customizationValues[i].value = value;
            }
        }

        if( !updated )
        {
            this.state.customizationValues = this.state.customizationValues.concat( [ {key: key, value: value} ] );
        }

        this.setState( {
            customizationValues: this.state.customizationValues
        } );
    }
    
    addDefaultItem( initializing )
    {

        if( initializing )
        {
            this.state =
                {
                    customizationList: [<CustomizationItem key="0" customizationKey="0" deleteCustomization={this.deleteCustomization} update={this.updateCustomizationValue} defaultBase={this.state.baseImage}/>],
                    customizationValues: []
                    
                };
            
        } else
        {
            this.setState(
                {
                    customizationList: [<CustomizationItem key="0" customizationKey="0" deleteCustomization={this.deleteCustomization} update={this.updateCustomizationValue} defaultBase={this.state.baseImage}/>]
                }
            );
        }
    }
    
    update()
    {
        this.props.updateCustomizations( this.state.customizationValues );
    }
    
    deleteCustomization( id )
    {
        for( let i = 0; i < this.state.customizationList.length; i++ )
        {
            if( this.state.customizationList[ i ].props.customizationKey === id )
            {
                this.removeFromCustomizationList( i );
            };
        }

        for( let j = 0; j < this.state.customizationValues.length; j++ )
        {
            if( this.state.customizationValues[ j ].key === parseInt( id ) )
            {
                this.removeFromCustomizationValues( j );
            }
            
        }
    }

    removeFromCustomizationValues ( index )
    {
        this.state.customizationValues.splice( index, 1 );
        this.setState(
            {
                customizationValues: this.state.customizationValues
            }
        );
    }
    removeFromCustomizationList( index )
    {
        this.state.customizationList.splice( index, 1 );

        this.setState(
            {
                customizationList: this.state.customizationList
            }
        );

        if( this.state.customizationList.length == 0 )
        {
            this.addDefaultItem();
        }
        
    }

    imageUploadDefaultBase(e)
    {
        let context = this;
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            context.setState( {
                baseImage: base64
            } );
        });
    };
    
    render()
    {
        return(
            <div className="container customization-item">
              <div className="row">
                <ol>
                  {this.state.customizationList}
                </ol>
              </div>
              <div className="row">
                <button onClick={this.addCustomization}>Add Customization</button>
                <button onClick={this.update}>Save</button>
                
              </div>
              <div className="row">
                <b>Upload Default Base Image:</b> <input type="file" id="baseLayerUpload" name='baseLayerUpload' onChange={this.imageUploadDefaultBase} />                    
              </div>
              <div className="row">
                <CanvasImage imageData={this.state.baseImage} width={236} height={200}/>
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
