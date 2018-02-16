import request from 'superagent';
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import CustomizationCombinations from './CustomizationCombinations';
import RenderedCustomizationCombinationList from './RenderedCustomizationCombinationList';
import HeirarchyRow from './HeirarchyRow';
import * as AppActions from './actions/AppActions';

class ProductAdventure extends React.Component
{

  constructor( props )
  {
    super( props );
    autoBind(this);
    this.state =
      {
        heirarchy: {},
        selectedPath: []
      };
  }

  updateHeirarchy(  name ,data )
  {
    console.log( 'updating' );
    let heirarchy = this.state.heirarchy;
    
    heirarchy[name] = data;
    this.setState( {
      heirarchy: heirarchy
    } );
    
  }

  save()
  {
    let product = this.state.product;
    product.heirarchy = this.state.heirarchy;
    
    this.setState(
      {
        product
      }
    );
    this.props.save( product );
  }

  updateWithLatestState( props )
  {
    this.setState( {
      product: props.product,
      heirarchy: props.heirarchy
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


  addLevel()
  {
    let levelName = this.levelName.value.trim();
    if( levelName != "" )
    {
      let heirarchy = this.state.heirarchy;
      heirarchy[levelName] = {
        'order': Object.keys( this.state.heirarchy ).length + 1,
        'name' : levelName,
        'customizations': {}
      };

      this.setState( {
        heirarchy: heirarchy
      } );
    }
  }

  renderHeirarchyRow( name )
  {

    return <div key={"heirarchy-row-" + name}>
        <div className="row top-margin">
          <div className="col-md-2">
            {name}
          </div>
        </div>
      <HeirarchyRow name={name} data={this.state.heirarchy} update={this.updateHeirarchy} disabled={this.state.heirarchy[name].order > (this.state.selectedPath.length + 1)}/>
    </div>;    
  }
  render()
  {
    return (
      <div className="container heirarchy">
        <div className="row top-margin">
          <div className="col-md-2">
            <button onClick={this.save}>Save</button>
          </div>
        </div>
        {Object.keys( this.state.heirarchy ).map( this.renderHeirarchyRow ) }
        <div className="row top-margin">
          <div className="col-md-2">
            <input type="text" placeholder="Level Name" ref={(input) => { this.levelName = input;  }}/>
          </div>
          <div className="col-md-2 text-left">
            <button onClick={this.addLevel}>Add Level</button>
          </div>
        </div>
      </div>
    );
  }
}

function stateToProps(state)
{

  let heirarchy = state.product.heirarchy || {};
  return { 
    product: state.product,
    heirarchy: heirarchy
  };
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

export default connect(stateToProps, dispatchToProps)(ProductAdventure);
