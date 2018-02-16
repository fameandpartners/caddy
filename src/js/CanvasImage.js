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
    
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    let image = new Image();
    image.src = nextProps.defaultImageData;
    
    if( nextProps.imageData != null )
    {

      image = new Image();
      image.src = nextProps.imageData;
    }

    if( image.height > image.width )
    {
      image.onload = () => ctx.drawImage(image,0,0, this.props.width, (image.height * this.props.width) / image.width ) ;
    } else
    {
      image.onload = () => ctx.drawImage(image,0,0, (image.width * this.props.height) / image.height, this.props.height ) ;
    }
    
  }

  componentDidMount()
  {
    this.componentWillReceiveProps( this.props );
  }
  
  render()
  {
      return( <canvas className={ this.props.imageData || this.props.defaultImageData ? "" : 'hidden'} width={this.props.width} height={this.props.height} ref="canvas" /> );
  }
}

