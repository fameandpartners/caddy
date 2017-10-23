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

    drawBase( ctx, values )
    {
        let drewBase = false ;
        for( let i = values.length - 1; !drewBase && i >= 0; i-- )
        {
            if( values[i].specificBase != null )
            {
                this.addImage( ctx, values[i].specificBase );
                drewBase = true;
            }
        }

        if( !drewBase )
        {
            this.addImage( ctx, values[0].defaultBase );
        }
    }
    
    componentDidMount()
    {
        const ctx = this.refs.canvas.getContext('2d');
        this.drawBase( ctx, this.props.values );
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
