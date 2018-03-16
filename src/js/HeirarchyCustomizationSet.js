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
      showAddModal: false,
      modalJson: {}

    };
  }



  addCustomization( customizationId, json )
  {
    this.props.addCustomization( customizationId, json );
    this.setState(
      {
        showAddModal: false,
        modalJson: {}
      }
    );

  }

  renderAddModal()
  {
    if( this.state.showAddModal )
    {
      return <HeirarchyAddModal save={this.addCustomization} data={this.state.modalJson} closeModal={() => this.setState( { showAddModal:false, modalJson: {} })} />;
    } else
    {
      return "";
    }
  }

  generateAddButton()
  {
    return <div key="add-button" className="col-md-2 col-md-offset-1 heirarchy-button" onClick={ () => this.setState( { showAddModal: true, modalJson: {} } ) }>
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

  edit( uuid, customizationJSON )
  {
    customizationJSON['id'] = uuid;
    this.setState( { showAddModal: true, modalJson: customizationJSON  } );
    return false;
  }
  generateCustomizationButton( uuid, customizationJSON )
  {
    return <div key={uuid} className="col-md-2 col-md-offset-1 heirarchy-button heirarchy-button-has-image" >
      { this.renderSelectedCheckbox( uuid ) }
      <div className="text-left"><center><a onClick={() => this.edit( uuid, customizationJSON ) }>Edit</a></center></div>
            <div className="heirarchy-button-text" onClick={ () => this.props.toggleSelected( uuid ) }>
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
      <div
        id="hierarch-add-modal-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          zIndex: 100,
          overflow: "auto"
        }}
      >
        <div className="heirarchy-add-modal" style={{ position: 'absolute' }}>
          {this.renderAddModal()}
          <div className="heirarchy-add-modal-close" onClick={this.props.closeModal}>
            close
          </div>
          <div className="container" style={{ width: '100%' }}>
            <div className="row top-margin">
              <div className="col-md-4 col-md-push-4">
                <h2>Customization Set</h2>
              </div>
            </div>
            {this.renderCustomizations()}
            <div className="row top-margin bottom-margin">
              <div className="col-md-4 col-md-push-4">
                <button onClick={this.props.closeModal}>Done</button>
              </div>
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
