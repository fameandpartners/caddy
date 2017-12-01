import React from 'react';
import autoBind from 'react-autobind';

export default class ExpandableList extends React.Component
{
  constructor( props )
  {
    super( props );
    autoBind( this );
    this.state = {
      contents: []
    };

    this.textBoxes = {};
  }

  updateItem(number)
  {
    let contents = this.state.contents;
    contents[number] = this.textBoxes[number].value;
    this.setState(
      {
        contents: contents
      }
    );
    this.props.contentUpdate( contents );
  }

  handleItemUpdate( number, e )
  {
    if (e.key === "Enter")
    {
      this.add();
    } else
    {
      this.updateItem( number );
    }
    
  }
  renderItem( item, number )
  {
    return (
      <li key={this.props.addType + "-item-" + number}>
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              {this.props.addType}
            </div>
            <div className="col-md-2">
              <input type="text"
                     autoFocus
                     defaultValue={item}
                     onKeyUp={(e) => this.handleItemUpdate( number, e) }
                ref={(input) => { this.textBoxes[number] = input; }} />
            </div>
          </div>
        </div>
      </li>      
    );
    
  }
  componentDidMount()
  {
    this.updateWithLatestState( this.props );
  }
  
  updateWithLatestState(props)
  {

    if( props.startingValue )
    {
      this.setState(
        {
          contents: props.startingValue
        }
      );
    } else
    {
      this.setState(
        {
          contents: []
        }
      );
    };
  }
  
  componentWillReceiveProps( nextProps )
  {
    this.updateWithLatestState( nextProps );
  }

  add()
  {
    let contents = this.state.contents;
    contents = contents.concat( [null] );
    this.setState(
      {
        contents: contents
      }
    );
  }
  
  render()
  {
    return (
      <div className="row">
        <div className="col-md-12">
          <ol>
            {this.state.contents.map( this.renderItem ) }
          </ol>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button onClick={this.add}>Add {this.props.addType}</button>
          </div>
        </div>
      </div>
    );
    
  }
  
}
