import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../css/components/HeirarchyRow.scss';
import HeirarchyCustomizationSet from './HeirarchyCustomizationSet';
import uuidv4 from 'uuid/v4';

class HeirarchyRow extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state = {
      showAddModal: false,
      customizations: {},
      selectedCustomizations: []
    };
  }

  addCustomizationToCustomizationSet( customizationId, json )
  {
    let customizations = this.state.customizations;
    if( customizationId == null )
    {
      customizationId = uuidv4();
    }
    customizations[customizationId] = json;

    this.setState(
      {
        customizations: customizations
      }
    );
    
  }

  toggleSelectedCustomization( uuid )
  {
    let selectedCustomizations = this.state.selectedCustomizations;
    if( selectedCustomizations.indexOf( uuid ) == -1 )
    {
      selectedCustomizations.push( uuid );
    } else
    {
      selectedCustomizations.splice( selectedCustomizations.indexOf( uuid ), 1 );
    }

    this.setState( {
      selectedCustomizations: selectedCustomizations
    } );
    
  }
  
  renderCustomizationSet()
  {
    if( this.state.showAddModal )
    {
      return <HeirarchyCustomizationSet customizations={this.state.customizations} selectedCustomizations={this.state.selectedCustomizations} addCustomization={this.addCustomizationToCustomizationSet} toggleSelected={this.toggleSelectedCustomization} closeModal={() => this.setState( { showAddModal:false } )} />;
    } else
    {
      return "";
    }
  }
  
  render()
  {
    return (
        <div className="row top-margin heirarchy-row">
          <div className="col-md-2 heirarchy-button" onClick={ () => this.setState( { showAddModal: true } ) }>
            <div className="heirarchy-button-text">
              <div>
                <center>Add</center>
              </div>
            </div>
          </div>
          {this.renderCustomizationSet()};
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

export default connect(stateToProps, dispatchToProps)(HeirarchyRow);
