/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';


export default class LayerCad extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind(this);
    }

    addImage( ctx, data )
    {
        let image = new Image();
        image.src = data;
        image.onload = () => ctx.drawImage(image,0,0, this.props.width, (image.height * this.props.width) / image.width ) ;
        
    }

    drawBase( ctx, value )
    {
        if( value.specificBase != null )
        {
            this.addImage( ctx, value.specificBase );
        } else
        {
            this.addImage( ctx, value.defaultBase );
        }
    }
    
    componentDidMount()
    {
        const ctx = this.refs.canvas.getContext('2d');
        this.drawBase( ctx, this.props.values[0] );
        for( let i = 0; i < this.props.values.length; i++ )
        {
            if( this.props.values[i].cad != null )
            {
                this.addImage( ctx, this.props.values[i].cad );
            }
        }
    }
    
    render()
    {
        return( <canvas width={this.props.width} height={this.props.height} ref="canvas" /> );

    }
}
