/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import { connect } from 'react-redux';
import * as AppActions from './actions/AppActions';

class ThemePage extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      colors:  []
    };
  }

  updateCheckState( event )
  {
    const colorCode = event.target.name;
    let colors = this.state.colors;
    
    if( colors.indexOf( colorCode ) == -1 )
    {
      colors.push( colorCode );
    } else
    {
      colors.splice( colors.indexOf( colorCode ), 1 );
    }
    this.setState(
      {
        colors: colors
      }
    );
  }
  
  renderColor( colorCode, colorName )
  {
    return <span key={colorCode}><input type="checkbox" name={colorCode} onChange={this.updateCheckState}/>{colorName}</span>;
  }
  renderColors()
  {
    let colors = [["0000", "Bright Turquoise"],  ["0001","Pale Blue"], ["0002","Blush"], ["0003", "Guava/Bright Blush"], ["0004","Burgundy"], ["0005","Champagne"],
                  ["0006", "Ivory"], ["0007","Lilac"], ["0008", "Mint"], ["0009", "Pale Grey"], ["0010", "Pale Pink"], ["0011", "Peach"],  ["0012", "Red"],
                  ["0013", "Royal Blue"], ["0014", "Black"], ["0015", "Sage Green"], ["0016", "Berry"], ["0017", "Navy"] ];

    let toReturn = [];
    for( let i = 0; i < 18; i+= 6 )
    {
      toReturn.push(
        <span key={"colors-" + i}>
          <div className="col-md-2">
            {this.renderColor( colors[i][0], colors[i][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 1][0], colors[i + 1][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 2][0], colors[i + 2][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 3][0], colors[i + 3][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 4][0], colors[i + 4][1] ) }
          </div>
          <div className="col-md-2">
            {this.renderColor( colors[i + 5 ][0], colors[i + 5][1] ) }
          </div>
        </span>        
      );
    };
    return toReturn;
  }
  
  render()
  {
    return (
      <div className="container">
        <h2>Select Colors</h2>
        {this.renderColors()}        
        <div className="row">
          <div className="copl-md-2">
            <span>
              <button onClick={() => this.props.changeCurrentPage( 'list' )}>Back</button>
            </span>
          </div>
        </div>        
      </div>
    );
  }
}



function stateToProps(state)
{
  return { };
}

function dispatchToProps(dispatch)
{
  return {
    load: ( styleNumber, versionNumber ) =>
      {
        dispatch( AppActions.loadProduct( styleNumber, versionNumber ) );
      },
    newProduct: () =>
      {
        dispatch(AppActions.newProduct());
      }
  };
}

export default connect(stateToProps, dispatchToProps)(ThemePage);
