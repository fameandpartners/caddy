import React from 'react';
import autoBind from 'react-autobind';

import CanvasImage from './CanvasImage';
import {getBase64} from './Utils';

export default class ProductImages extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      primaryImage: null,
      secondaryImages: []
    };
  }

  renderPrimaryImage()
  {
    if( this.state.primaryImage )
    {
      return( <CanvasImage imageData={this.state.primaryImage} width={768} height={653}/> );

    } else
    {
      return( <span><input type="file" id="productImage" name='productImage' onChange={this.uploadProductImage} /></span> );
    }
  }

  renderSecondaryItem( item, number )
  {
    return( <CanvasImage key={"secondary-image" + number} imageData={item} width={768} height={653}/> );
    
  }
  
  uploadSecondaryImage( e )
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let secondaryImages = this.state.secondaryImages;
      secondaryImages = secondaryImages.concat( [base64] );
      context.setState( {
        secondaryImages: secondaryImages
      } );
    });
  }
  
  uploadProductImage( e )
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      context.setState( {
        primaryImage: base64
      } );
    });
  }

  
  render()
  {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            Primary Image
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.renderPrimaryImage()}
          </div>
        </div>

        <div className="row top-margin">
          <div className="col-md-6">
            Secondary Images
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.state.secondaryImages.map( this.renderSecondaryItem ) }
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <span>
              <input type="file" id="productImage" name='productImage' onChange={this.uploadSecondaryImage} />
            </span>
        </div>
      </div>
        
      </div> );
  }
  
  
}
