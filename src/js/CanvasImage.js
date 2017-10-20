/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';


export default class CanvasImage extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
    }

    componentWillReceiveProps(nextProps)
    {

        console.log( nextProps );
        if( nextProps.imageData )
        { 
            const ctx = this.refs.canvas.getContext('2d');
            let image = new Image();
            image.src = nextProps.imageData;
            image.onload = () => ctx.drawImage(image,0,0, this.props.width, (image.height * this.props.width) / image.width ) ;
        } else if( nextProps.defaultImageData )
        {
            const ctx = this.refs.canvas.getContext('2d');
            let image = new Image();
            image.src = nextProps.defaultImageData;
            image.onload = () => ctx.drawImage(image,0,0, this.props.width, (image.height * this.props.width) / image.width ) ;
            
        }
            
    }
    
    render()
    {
        return( <canvas className={ this.props.imageData || this.props.defaultData ? "" : 'hidden'} width={this.props.width} height={this.props.height} ref="canvas" /> );
    }
}

