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
    
    componentWillReceiveProps(nextProps)
    {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.addImage( ctx, nextProps.base );
        for( let i = 0; i < nextProps.values.length; i++ )
        {
            if( nextProps.values[i].cad != null )
            {
                this.addImage( ctx, nextProps.values[i].cad );
            }
        }
    }
    
    render()
    {
        return( <canvas width={this.props.width} height={this.props.height} ref="canvas" /> );

    }
}
