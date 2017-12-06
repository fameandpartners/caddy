/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import LayerCad from './LayerCad';
import * as AppActions from './actions/AppActions';
import DraggableList from 'react-draggable-list';


class RenderLayerItem extends React.Component
{

  uploadImage(e)
  {
    console.log( e );
  }
  
  renderTopLeft()
  {
    return( <input type="file" id="top-left-render" name='prodRefImageUpload' onChange={this.uploadImage} /> );
  }

  renderTopRight()
  {
    return( <input type="file" id="top-right-render" name='prodRefImageUpload' onChange={this.uploadImage} /> );    
  }

  renderBottomLeft()
  {
    return( <input type="file" id="bottom-left-render" name='prodRefImageUpload' onChange={this.uploadImage} /> );
  }

  renderBottomRight()
  {
    return( <input type="file" id="bottom-right-render" name='prodRefImageUpload' onChange={this.uploadImage} /> );
  }
  
  render()
  {
    return (
      <div>
        <div className="row">
          <div className="col-md-1">{this.props.dragHandle(<div className="dragHandle" />)}</div>
          <div className="col-md-5"><b>{this.props.item.name}</b></div>
        </div>
        <div className="row">
           <div className="col-md-3">Top Left</div>
           <div className="col-md-3">Top Right</div>
        </div>
        <div className="row">
           <div className="col-md-3 render-box">{this.renderTopLeft()}</div>
           <div className="col-md-3 render-box">{this.renderTopRight()}</div>
        </div>
        
        <div className="row">
           <div className="col-md-3">Bottom Left</div>
           <div className="col-md-3">Bottom Right</div>
        </div>
        <div className="row">
           <div className="col-md-3 render-box bottom">{this.renderBottomLeft()}</div>
           <div className="col-md-3 render-box bottom">{this.renderBottomRight()}</div>
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
        <DraggableList itemKey="id"
                       template={RenderLayerItem}
                       list={this.state.product.customizations.sort( (a,b) => a.order - b.order )}
          onMoveEnd ={ newList => this.dragFinished( newList ) }/>
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
        dispatch(AppActions.updateProductDetails( value ));
      }
  };
}


export default connect(stateToProps, dispatchToProps)(RenderLayers);
