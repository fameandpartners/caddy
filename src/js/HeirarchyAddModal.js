/* eslint-disable */
import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../css/components/HeirarchyAddModal.scss';
import {getBase64} from './Utils';
import CanvasImage from './CanvasImage';

class HeirarchyAddModal extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state = {
      image: null,
      customizationId: null
    };
  }


  uploadImage(e)
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let image = context.state.image;
      image = base64;
      context.setState( {
        image: image
      } );
    });

  }

  renderItemImage()
  {
    if( this.state.image )
    {
      return( <CanvasImage imageData={this.state.image} width={200} height={200}/> );

    } else
    {
      return( <span>Upload Image: <input className="inline-upload" type="file" id="itemImage" name='itemImage' onChange={this.uploadImage} /></span> );
    }

  }

  save()
  {
    this.props.save( this.state.customizationId, {
      image: this.state.image,
      name: this.name.value,
      code: this.code.value,
      usdPrice: this.usdPrice.value,
      audPrice: this.audPrice.value
    } );
  }

  updateWithLatestState( props )
  {
    if( props.data )
    {
      this.setState( {
        customizationId: props.data.id,
        image: props.data.image
      } );

      this.name.value = props.data.name || "";
      this.code.value = props.data.code || "";
      this.usdPrice.value = props.data.usdPrice || "";
      this.audPrice.value = props.data.audPrice || "";



    }
  }

  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }

  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }

  render()
  {
    return (
      <div className="heirarchy-add-modal">
        <div className="heirarchy-add-modal-close" onClick={this.props.closeModal}>
          close
        </div>
        <div className="container">
          <div className="row top-margin">
            <div className="col-md-4 col-md-push-4 text-center">
              {this.renderItemImage()}
            </div>
          </div>
          <div className="row top-margin">
            <div className="col-md-1 text-right">
              Name:
            </div>
            <div className="col-md-3">
              <input type="text" ref={(input) => { this.name = input;  }}/>
            </div>
            <div className="col-md-1 col-md-push-3 text-right">
              Code:
            </div>
            <div className="col-md-2 col-md-push-3">
              <input type="text" ref={(input) => { this.code = input;  }}/>
            </div>
          </div>
          <div className="row top-margin">
            <div className="col-md-1 text-right">
              US Price:
            </div>
            <div className="col-md-1">
              <input type="text" ref={(input) => { this.usdPrice = input;  }}/>
            </div>
            <div className="col-md-1 col-md-push-5 text-right">
              AU Price:
            </div>
            <div className="col-md-1 col-md-push-5">
              <input type="text" ref={(input) => { this.audPrice = input;  }}/>
            </div>
          </div>
          <div className="row top-margin bottom-margin">
            <div className="col-md-4 col-md-push-4 text-center">
              <button onClick={this.save}>Save</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function stateToProps(state)
{

  if( state.product.details )
  {
    if( state.product.details.lengths == null )
    {
      state.product.details.lengths = [];
    }
  }
  return {
    showProductDetails: state.product && state.product.version != null,
    showCustomizations: state.product && state.product.version != null && state.product.version > 0,
    product: state.product
  };
}

function dispatchToProps(dispatch)
{
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(HeirarchyAddModal);
