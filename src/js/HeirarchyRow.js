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
      customizations: {}
    };
  }

  renderCustomizationSet()
  {
    if( this.state.showAddModal )
    {
      return <HeirarchyCustomizationSet closeModal={() => this.setState( { showAddModal:false } )} />;
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
