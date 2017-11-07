import React from 'react';
import autoBind from 'react-autobind';

export default class CombinationGridBox extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      valid: true
    };
  }

  flipValid()
  {
    if( this.props.first.value !== this.props.second.value )
    {
      this.props.updateValidCombination( this.props.first.value, this.props.second.value, !this.state.valid );      
      this.setState(
        {
          valid: !this.state.valid
        }
      );
    }
  }
  componentWillReceiveProps(nextProps)
  {
    this.setState(
      {
        valid: this.props.isValidCombination( this.props.first.value, this.props.second.value )
      }
    );
                   
  }
  
  componentDidMount()
  {
    if( this.props.first.value === this.props.second.value )
    {
      this.setState(
        {
          valid: false
        }
      );
    }
  }

  
  
  render()
  {
    return <td onClick={this.flipValid} style={ {"backgroundColor": this.state.valid ? 'green' : 'red'} }> </td>
  }
}
