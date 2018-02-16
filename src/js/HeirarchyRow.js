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
      selectedCustomizations: [],
      data: {}
    };
  }

  addCustomizationToCustomizationSet( customizationId, json )
  {
    let data = this.state.data;
    if( customizationId == null )
    {
      customizationId = uuidv4();
    }
    data.customizations[customizationId] = json;
    this.setState( {
      customizations: data.customizations
    } );
                   
    this.props.update( this.props.name, data );
    
  }

  toggleSelectedCustomization( uuid )
  {
    let data  = this.state.data;
    if( data.selectedCustomizations.indexOf( uuid ) == -1 )
    {
      data.selectedCustomizations.push( uuid );
    } else
    {
      data.selectedCustomizations.splice( data.selectedCustomizations.indexOf( uuid ), 1 );
    }

    this.setState( {
      selectedCustomizations: data.selectedCustomizations
    } );
    this.props.update( this.props.name, data );
  }

    
  componentWillReceiveProps(nextProps)
  {
    let data = nextProps.data[nextProps.name];
    
    if( data == null )
    {
      this.setState(
        {
          data: { name: nextProps.name, customizations: {}, selectedCustomizations: [] }
        } );
    } else
    {
      let selectedCustomizations = data.selectedCustomizations || [];
      let customizations = data.customizations || {};
      this.setState( {
        selectedCustomizations: selectedCustomizations,
        customizations: customizations,
        data: data
      } );
    }

  }

    componentDidMount()
    {
        this.componentWillReceiveProps( this.props );
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

  renderDisabled()
  {
    console.log( "disabled - " + this.props.disabled );
    if( this.props.disabled )
    {
      return <span>Disabled</span>;
    } else
    {
      return "";
    }
  }
  render()
  {
    return (
      <div className="row top-margin heirarchy-row">
        {this.renderDisabled()}
          <div className="col-md-2 heirarchy-button" onClick={ () => this.setState( { showAddModal: true } ) }>
            <div className="heirarchy-button-text">
              <div>
                <center>Add</center>
              </div>
            </div>
          </div>
          {this.renderCustomizationSet()}
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
