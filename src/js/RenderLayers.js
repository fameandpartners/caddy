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

    this.props.commonProps.setSelectedItem( this.props.item.code, selected );
  }

  renderBackgroundColor()
  {
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
      product: { customizations: [], details: {lengths:[]} },
      selectedItems: [],
      setSelectedItem: this.setSelectedItem,
      length: "Micro-Mini"
       
    };        
  }

  setSelectedItem( value, on )
  {
    let elementIndex = this.state.selectedItems.indexOf( value );
    if( on )
    {
      if( elementIndex == -1 )
      {
        this.state.selectedItems.push( value );
      }
    } else
    {
      if( elementIndex != -1 )
      {
        this.state.selectedItems.splice( elementIndex );
      }
    }
    this.setState(
      {
        selectedItems: this.state.selectedItems
      }
    );
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

  updateLength()
  {
    console.log( this.lengthCopy.value );
    this.setState(
      {
        length: this.lengthCopy.value
      }
    );
  }
  
  renderLengthSelect()
  {
    if( this.state.product )
    {
      return <select ref={ (ref) => this.lengthCopy = ref} onChange={this.updateLength} id="length-set">{this.state.product.details.lengths.map( (length) => ( <option key={length.name} value={length.name}>{length.name}</option>) )}</select>;
    } else
    {
      return <div></div>;
    }
      
      
  }
  
  render()
  {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            {this.renderLengthSelect()}
        </div>
        </div>
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
