/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import * as AppActions from './actions/AppActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProductDetails extends React.Component
{
    constructor( props )
    {
        super( props );
        autoBind( this );
        this.state = {
            product: {
                details: {}
            }
        };
    }

    save()
    {
        this.props.save( {
            id: this.productId.value,
            name: this.productName.value
        } );
    }

    clean( value )
    {
        if( value )
        {
            return value;
        }
        else
        {
            return '';
        }
                
    }
    updateWithLatestState( props )
    {
        this.productId.value = this.clean(props.product.details.id);
        this.productName.value = this.clean(props.product.details.name);
    }

    componentDidMount()
    {
        this.updateWithLatestState( this.props );
    }
    
    componentWillReceiveProps( nextProps )
    {
        this.setState( {
            product: nextProps.product
        } );

        this.updateWithLatestState( nextProps );
    }

    render()
    {
        return (
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  Style Number:
                </div>
                <div className="col-md-2">
                  <input type="text" ref={(input) => { this.productId = input;  }}/>
                </div>
              </div>              
              <div className="row">
                <div className="col-md-2">
                  Product Name:
                </div>
                <div className="col-md-2">
                  <input type="text" ref={(input) => { this.productName = input;  }}/>
                </div>
              </div>
              <div>
                <button>Save</button>
              </div>
            </div>
        );
    }
}

function stateToProps(state)
{
    console.log( state );
    return { product: state.product };
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


export default connect(stateToProps, dispatchToProps)(ProductDetails);
