/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import LayerCad from './LayerCad';
import * as AppActions from './actions/AppActions';
import DraggableList from 'react-draggable-list';
import CanvasImage from './CanvasImage';


class RenderLayerItem extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      item: null
    };        
  }
  
  updateWithLatestState( props )
  {
    this.setState( {
      item: props.item
    } );
  }
  
  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }
  
  uploadImage(e)
  {

    let context = this;
    const file = e.target.files[0];
    const element = e.target.id;
    getBase64(file).then(base64 => {
      console.log( element );
      let item = context.state.item;
      item[element] = base64;
      context.setState(
        {
          item: item
        }
      );
    });
  }
  
  renderImage( name )
  {
    if( this.state.item && this.state.item[name] )
    {
      return( <CanvasImage imageData={this.state.item[name]} width={250} height={250}/> );
    } else
    {
      return( <input type="file" id={name} name='prodRefImageUpload' onChange={this.uploadImage} /> );
    }
  }

  
  render()
  {
    return (
      <div>
        <div className="row">
          <div className="col-md-1">{this.props.dragHandle(<div className="dragHandle" />)}</div>
        <div className="col-md-5"><b>{this.props.item.name} ({this.props.item.code})</b></div>
        </div>
        <div className="row">
           <div className="col-md-3">Top Left</div>
           <div className="col-md-3">Top Right</div>
        </div>
        <div className="row">
           <div className="col-md-3 render-box">{this.renderImage('top_front_image')}</div>
           <div className="col-md-3 render-box">{this.renderImage('top_back_image')}</div>
        </div>
        
        <div className="row">
           <div className="col-md-3">Bottom Left</div>
           <div className="col-md-3">Bottom Right</div>
        </div>
        <div className="row">
           <div className="col-md-3 render-box bottom">{this.renderImage('bottom_front_image')}</div>
           <div className="col-md-3 render-box bottom">{this.renderImage('bottom_back_image')}</div>
        </div>
        
        </div>        
    );
  }
}

class RenderLayers extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      product: { customizations: [] }
    };        
  }
  
  uploadFrontFile(e)
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let layers = context.state.frontValues;
      layers.push( {cad: base64 } );
      context.setState( {
        frontValues: layers
      } );
    });
  }

  uploadBackFile(e)
  {
    let context = this;
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      let layers = context.state.backValues;
      layers.push( {cad: base64 } );
      context.setState( {
        backValues: layers
      } );
    });
  }


  updateWithLatestState( props )
  {
    this.setState( {
      product: props.product
    } );
  }
  
  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }

  dragFinished( updatedList )
  {
    updatedList.forEach( (item, index) => item.order = index  );

    this.state.product.customizations = updatedList;
    this.setState(
      {
        product: this.state.product
      } );
  }
  
  renderCustomizationItem( customization )
  {
    return (<li key={customization.id}>{customization.name}</li> );
  }
  
  render()
  {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <DraggableList itemKey="id"
                           template={RenderLayerItem}
                           list={this.state.product.customizations.sort( (a,b) => a.order - b.order )}
              onMoveEnd ={ newList => this.dragFinished( newList ) }/>
          </div>
          <div className="col-md-6">
            Image
          </div>
        </div>          
        <div className="row top-margin">
          <div className="col-md-4">
            <button onClick={()=>this.props.save( this.state.product)}>Save</button>
          </div>
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

function stateToProps(state)
{
  let product = state.product;
  if( product.customizations == null )
  {
    product.customizations = [];
  }
  return { product: product };
}

function dispatchToProps(dispatch)
{
  return {
    save: ( value ) =>
      {
        console.log( value );
        dispatch(AppActions.updateProductDetails( value ));
      }
  };
}


export default connect(stateToProps, dispatchToProps)(RenderLayers);
