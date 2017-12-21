
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

  _generateColorList()
  {
    return this.colorList.map( function(colorName)
                              { 
                                return { color: colorName, url: 'https://example.com/' + colorName };
                              } );
                               
  }
  
  _renderList()
  {
    this.renderedList = this.list.toArray();
    let coloredRenders = this._generateColorList();
    let self = this;
    for( let i = 0; i < this.renderedList.length; i++ )
    {
      this.renderedList.lengths = this.renderedList[i].lengths.map( function( length )
                                                                 {
                                                                   length.render_urls =  coloredRenders;
                                                                   return length;
                                                                 } );
    }
  }
}
