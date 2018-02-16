import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../css/components/HeirarchyAddModal.scss';
import HeirarchyAddModal from './HeirarchyAddModal';
import {createArrayGroups} from './Utils';
import uuidv4 from 'uuid/v4';

class HeirarchyCustomizationSet extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state = {
      showAddModal: false,
      customizations: {}
    };
  }



  addCustomization( customizationId, json )
  {
    let customizations = this.state.customizations;
    if( customizationId == null )
    {
      customizationId = uuidv4();
    }
    customizations[customizationId] = json;

    this.setState(
      {
        customizations: customizations,
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

  generateCustomizationButton( uuid, customizationJSON )
  {
    return <div key={uuid}className="col-md-2 col-md-offset-1 heirarchy-button">
            <div className="heirarchy-button-text">
              <div>
                 <center>{customizationJSON['code']}</center>
              </div>
            </div>
      </div>;
    
  }
  
  renderCustomizations()
  {
    let toRender = [];
    let customizationIds = Object.keys( this.state.customizations );
    for( let i = 0; i < customizationIds.length; i++ )
    {
      toRender.push( this.generateCustomizationButton( customizationIds[i], this.state.customizations[customizationIds[i]] ) );
    }
    
    toRender.push( this.generateAddButton() );
    let toReturn = [];
    let withRows = createArrayGroups( toRender, 4 );

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
              Customization Sets
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
