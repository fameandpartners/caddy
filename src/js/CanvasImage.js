/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';


export default class CanvasImage extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        console.log( "constructor" );
        console.log( props );
    }

    componentWillReceiveProps(nextProps)
    {
        console.log( "Canvas Image" );
        console.log( nextProps );
        if( nextProps.imageData != null )
        {
            console.log( "Image Data" );
            const ctx = this.refs.canvas.getContext('2d');
            let image = new Image();
            image.src = nextProps.imageData;
            image.onload = () => ctx.drawImage(image,0,0, this.props.width, (image.height * this.props.width) / image.width ) ;
        }

        if( nextProps.defaultImageData != null)
        {
            console.log( "Default image data" );
            const ctx = this.refs.canvas.getContext('2d');
            let image = new Image();
            image.src = nextProps.defaultImageData;
            image.onload = () => ctx.drawImage(image,0,0, this.props.width, (image.height * this.props.width) / image.width ) ;
            
        }
            
    }

    componentDidMount()
    {
        console.log( "ComponentDidMount" );
        this.componentWillReceiveProps( this.props );
    }
    
    render()
    {
        return( <canvas className={ this.props.imageData || this.props.defaultImageData ? "" : 'hidden'} width={this.props.width} height={this.props.height} ref="canvas" /> );
    }
}

