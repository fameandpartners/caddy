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

    this.determineIfDisabled( props.commonProps );
  }

  determineIfDisabled( commonProps )
  {
    let validCombinations = commonProps.product.validCombinations[commonProps.length];
    let invalidCombinations = commonProps.product.invalidCombinations[commonProps.length];
    
    let disabled = false;

    if( this.state.item && invalidCombinations && invalidCombinations[ this.state.item.id ] == true )
    {
      disabled = true;
    } else
    {
      for( let i = 0; commonProps.selectedItems && i < commonProps.selectedItems.length; i++ )
      {
        let currentItemId = commonProps.selectedItems[i];
        if( validCombinations[ currentItemId ] && validCombinations[currentItemId][this.state.item.id] == false )
        {
          disabled = true;
        }

        if( validCombinations[ this.state.item.id ] && validCombinations[this.state.item.id][currentItemId] == false )
        {
          disabled = true;
        }
      }
    }

    this.setState(
      {
        disabled: disabled
      }
    );
  }
  componentDidMount()
  {

    this.updateWithLatestState( this.props );
  }
  
  componentWillReceiveProps( nextProps )
  {

    this.updateWithLatestState( nextProps );
  }

  componentD

  setSelected( selected )
  {
    this.setState(
      {
        selected: selected
      }
    );

    this.props.commonProps.setSelectedItem( this.props.item.id, selected );
  }
  renderOnOffButtons()
  {
    if( !this.state.disabled  )
    {
        return <div className="row">
        <div className="col-md-1"><button onClick={() => this.setSelected(true)}>On</button></div>
        <div className="col-md-1"><button onClick={() => this.setSelected(false)}>Off</button></div>
        </div>;
    }
    else
    {
      return <div></div>;
    }
      
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
        {this.renderOnOffButtons()}
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
        this.state.selectedItems.splice( elementIndex,1 );
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
      return <select ref={ (ref) => this.lengthCopy = ref} onChange={this.updateLength} id="length-set"><option key="default" disabled="true" selected="true">select</option>{this.state.product.details.lengths.map( (length) => ( <option key={length.name} value={length.name}>{length.name}</option>) )}</select>;
    } else
    {
      return <div></div>;
    }
      
      
  }

  addRenderImage( array, data, width, offset )
  {
    if( data )
    {
      if( Array.isArray( data ) )
      {
        for( let i = 0; i < data.length; i++ )
        {
          array.push( <img style={{"position":"absolute", width:width, left:offset }} key={data[i]} src={`/renders/fp-dr1005-102/${data[i]}_0000.png`}/> );
        }
      } else
      {
        array.push( <img style={{"position":"absolute", width:width, left:offset}} key={data} src={`/renders/fp-dr1005-102/${data}_0000.png`}/> );
      }
    }
    return array;
  }

  clone( object )
  {
    return JSON.parse( JSON.stringify( object ) );
  }

  combineRenders( baseSet, newSet )
  {
    let toReturn = baseSet;
    if( newSet != null )
    {
      if( baseSet == null )
      {
        toReturn = newSet;
      }
      toReturn['bottom'] = newSet['bottom' ] || toReturn['bottom'];
      toReturn['belt'] = newSet['belt' ] || toReturn['belt'];
      toReturn['back-embellishments' ] = (newSet['back-embellishments'] || []).concat( toReturn['back-embellishments'] || []);
      toReturn['neckline'] = newSet['neckline' ] || toReturn['neckline'];
      toReturn['front-embellishments' ] = (newSet['front-embellishments'] || []).concat( toReturn['front-embellishments'] || [] );
    }
    
    return toReturn;
  }

  findItemToRender( renders, combinationCodes )
  {
    let toReturn = renders['default'];

    for( let i = 0; combinationCodes && i < combinationCodes.length; i++ )
    {
      let code = combinationCodes[i].toLowerCase();
      if( renders[code] )
      {
        toReturn = renders[code];
      }
    }

    return toReturn;
  }
  combineRenderSets( renders, itemCodesToAdd )
  {
    let toReturn = this.clone( renders['default'] );

    for( let i = 0; i < itemCodesToAdd.length; i++ )
    {
      let itemCode = itemCodesToAdd[i].toLowerCase();
      if( renders[itemCode] )
      {
        let itemRenders = this.findItemToRender( renders[itemCode], itemCodesToAdd );
        toReturn['front'] = this.combineRenders( toReturn['front'], itemRenders['front'] );
        toReturn['back'] = this.combineRenders( toReturn['back'], itemRenders['back'] );
        
      }
    }

    console.log( toReturn );
    return toReturn;
  }

  findCustomization( guid )
  {
    return this.state.product.customizations.find( (element) => element.id == guid );
  }

  sortByCustomizationOrder( codeArray )
  {
    let customizations = this.state.product.customizations;
    
    codeArray.sort( function( a, b )
                    {
                      let customizationA = customizations.find( ( element ) => element.code == a );
                      let customizationB = customizations.find( ( element ) => element.code == b );
                      return customizationA.order - customizationB.order;
                    }
                  );

    return codeArray;
  }
  mapGUIDsToCodes( arrayOfGUIDs )
  {
    let toReturn = [];
    for( let i = 0; i < arrayOfGUIDs.length; i++ )
    {
      
      toReturn.push( this.findCustomization( arrayOfGUIDs[i] ).code );
    }

    toReturn = this.sortByCustomizationOrder( toReturn );
    console.log( toReturn );
    return toReturn;
  }
  renderDress()
  {
    let front = [];
    let back = [];
    
    if( this.state.product.renders )
    {
      let renders = this.state.product.renders[this.state.length];
      let defaults = renders['default'];
      let renderSet = this.combineRenderSets( renders, this.mapGUIDsToCodes(this.state.selectedItems ) );

      front = this.addRenderImage( front, renderSet['front']['bottom'], 600, 0 );
      front = this.addRenderImage( front, renderSet['front']['belt'], 600, 0 );      
      front = this.addRenderImage( front, renderSet['front']['back-embellishments'], 600, 0 );      
      front = this.addRenderImage( front, renderSet['front']['neckline'], 600, 0 );
      front = this.addRenderImage( front, renderSet['front']['front-embellishments'], 600, 0 );

      back = this.addRenderImage( back, renderSet['back']['bottom'], 600, 600 );
      back = this.addRenderImage( back, renderSet['back']['belt'], 600, 600 );
      back = this.addRenderImage( back, renderSet['back']['back-embellishments'], 600, 600 );
      back = this.addRenderImage( back, renderSet['back']['neckline'], 600, 600 );
      back = this.addRenderImage( back, renderSet['back']['front-embellishments'], 600, 600 );
      
    }
    return <div style={{"position":"relative"}} ><div style={{"position":"static"}}>{front}</div><div style={{"position":"static"}}>{back}</div></div>;
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
            {this.renderDress()}

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
        dispatch(AppActions.updateProductDetails( value ));
      }
  };
}


export default connect(stateToProps, dispatchToProps)(RenderLayers);
