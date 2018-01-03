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
      item: null,
      selected: false,
      disabled: false
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
  

  setSelected( selected )
  {
    this.setState(
      {
        selected: selected
      }
    );

    this.props.commonProps.setSelectedItem( "A1" );
  }

  renderBackgroundColor()
  {
    console.log( this.props.commonProps );
    let color = 'gray';
    if( !this.state.disabled )
    {
      
      if( this.state.selected )
      {
        color = 'green';
      } else
      {
        color = 'red';
      }
    }

    return {'backgroundColor': color};
  }
  render()
  {
    return (
      <div style={this.renderBackgroundColor()}>
        <div className="row">
          <div className="col-md-1">{this.props.dragHandle(<div className="dragHandle" />)}</div>
        <div className="col-md-11"><b>{this.props.item.name} ({this.props.item.code})</b></div>
        </div>
        <div className="row">
        <div className="col-md-1"><button onClick={() => this.setSelected(true)}>On</button></div>
        <div className="col-md-1"><button onClick={() => this.setSelected(false)}>Off</button></div>
        </div>
        <div className="row">
        <div className="col-md-12">{this.props.commonProps.selectedItems}</div>
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
      product: { customizations: [] },
      selectedItems: [],
      setSelectedItem: this.setSelectedItem
    };        
  }

  setSelectedItem( value )
  {
    this.state.selectedItems.push( value );
    this.setState(
      {
        selectedItems: this.state.selectedItems
      }
    );
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
          <div className="col-md-4">
            <DraggableList itemKey="id"
                           template={RenderLayerItem}
                           list={this.state.product.customizations.sort( (a,b) => a.order - b.order )}
              commonProps={this.state}
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
