import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../css/components/HeirarchyAddModal.scss';
import HeirarchyAddModal from './HeirarchyAddModal';
import {createArrayGroups} from './Utils';
import uuidv4 from 'uuid/v4';
import CanvasImage from './CanvasImage';

class HeirarchyCustomizationSet extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state = {
      showAddModal: false
    };
  }



  addCustomization( customizationId, json )
  {
    this.props.addCustomization( customizationId, json );
    this.setState(
      {
        showAddModal: false
      }
    );
    
  }
  
  renderAddModal()
  {
    if( this.state.showAddModal )
    {
      return <HeirarchyAddModal save={this.addCustomization} closeModal={() => this.setState( { showAddModal:false } )} />;
    } else
    {
      return "";
    }
  }

  generateAddButton()
  {
    return <div key="add-button" className="col-md-2 col-md-offset-1 heirarchy-button" onClick={ () => this.setState( { showAddModal: true } ) }>
            <div className="heirarchy-button-text">
              <div>
                <center>New</center>
              </div>
            </div>
      </div>;

  }

  renderSelectedCheckbox( uuid )
  {
    if( this.props.selectedCustomizations.indexOf( uuid ) == -1 )
    {
      return "";
    } else
    {
      return <img className="selected-check-box" src="/check.png" height="25" width="25" />;
    }
  }
  
  renderCanvas( customizationJSON )
  {
    if( customizationJSON && customizationJSON['image'] )
    {
      return <CanvasImage imageData={customizationJSON['image']} width={150} height={150}/>;
    } else
    {
      return "";
    }
  }
  
  generateCustomizationButton( uuid, customizationJSON )
  {
    return <div key={uuid} className="col-md-2 col-md-offset-1 heirarchy-button heirarchy-button-has-image" onClick={ () => this.props.toggleSelected( uuid ) }>
      { this.renderSelectedCheckbox( uuid ) }
            <div className="heirarchy-button-text">
              <div>
                {this.renderCanvas( customizationJSON )}
                <center>{customizationJSON['name']} {customizationJSON['code'] == '' ? '' :  '/'} <b>{customizationJSON['code']}</b></center>
              </div>
            </div>
      </div>;
    
  }
  
  renderCustomizations()
  {
    let toRender = [];
    let customizationIds = Object.keys( this.props.customizations );
    for( let i = 0; i < customizationIds.length; i++ )
    {
      toRender.push( this.generateCustomizationButton( customizationIds[i], this.props.customizations[customizationIds[i]] ) );
    }
    
    toRender.push( this.generateAddButton() );
    let toReturn = [];
    let withRows = createArrayGroups( toRender, 3 );

    for( let i = 0; i < withRows.length; i++ )
    {
      toReturn.push( <div key={"customization-set-row" + i} className="row">
                     {withRows[i]}
                     </div> );
    }
    return toReturn;
  }
  
  render()
  {
    return (
      <div className="heirarchy-add-modal">
        {this.renderAddModal()};        
        <div className="heirarchy-add-modal-close" onClick={this.props.closeModal}>
          close
        </div>            
        <div className="container">
          <div className="row top-margin">
            <div className="col-md-4 col-md-push-4 text-center">
              <h2>Customization Set</h2>
            </div>
          </div>
          {this.renderCustomizations()}
          <div className="row top-margin">
            <div className="col-md-4 col-md-push-4 text-center">
              <button onClick={this.props.closeModal}>Done</button>
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

export default connect(stateToProps, dispatchToProps)(HeirarchyCustomizationSet);
