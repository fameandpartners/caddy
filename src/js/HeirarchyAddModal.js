import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../css/components/HeirarchyAddModal.scss';

class HeirarchyAddModal extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
  }

  render()
  {
    return (
        <div>
          Modal
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

export default connect(stateToProps, dispatchToProps)(HeirarchyAddModal);
