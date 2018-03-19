/* eslint-disable */
import React from 'react';
import ExpandableList from './ExpandableList';

export default class PricingExpandableList extends ExpandableList
{
  constructor( props )
  {
    super( props );
    this.audPriceBoxes = {};
    this.usdPriceBoxes = {};

  }

  updateItem(number)
  {
    let contents = this.state.contents;
    if( contents[number] == null )
    {
      contents[number] = {};
    }

    contents[number].name = this.textBoxes[number].value;
    contents[number].priceAUD = this.audPriceBoxes[number].value;
    contents[number].priceUSD = this.usdPriceBoxes[number].value;

    this.setState(
      {
        contents: contents
      }
    );
    this.props.contentUpdate( contents );
  }

  renderItem( item, number )
  {
    if( item == null )
    {
      item = {};
    }

    return (
      <li key={this.props.addType + "-item-" + number}>
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              Name
            </div>
            <div className="col-md-2">
              <input type="text"
                     autoFocus
                     defaultValue={item.name}
                     onKeyUp={(e) => this.handleItemUpdate( number, e) }
                ref={(input) => { this.textBoxes[number] = input; }} />
            </div>

            <div className="col-md-1">
              AUD Price
            </div>
            <div className="col-md-2">
              <input type="text"
                     defaultValue={item.priceAUD}
                     onKeyUp={(e) => this.handleItemUpdate( number, e) }
                ref={(input) => { this.audPriceBoxes[number] = input; }} />
            </div>
            <div className="col-md-1">
              USD Price
            </div>
            <div className="col-md-2">
              <input type="text"
                     defaultValue={item.priceUSD}
                     onKeyUp={(e) => this.handleItemUpdate( number, e) }
                ref={(input) => { this.usdPriceBoxes[number] = input; }} />
            </div>

          </div>
        </div>
      </li>
    );

  }

}
