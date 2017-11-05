/* eslint-disable */

import React from 'react';
import autoBind from 'react-autobind';


export default class ProductsList extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
  }

  render()
  {
    return (<div>Products</div>);
  }

  
}
