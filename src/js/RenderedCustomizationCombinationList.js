
export default class RenderedCustomizationCombinationList
{
  constructor( list, colorList )
  {
    this.list = list;
    this.renderedList = null;
    this.colorList = colorList;
  }

  toArray()
  {
    if( this.renderedList == null )
    {
      this._renderList();
    }

    return this.renderedList;
  }
  
  _renderList()
  {
    this.renderedList = this.list.toArray();
  }
}
