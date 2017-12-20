export default class CustomizationCombinationList
{
  constructor( list )
  {
    this.list = list;
  }

  combine( ccList )
  {
    let self = this;
    let toReturn = this.list.reduce( function( set, value )
                                     {
                                       set[self._makeKey( value.customization_ids )] = value;
                                       return set;
                                     }, {} );
    
    for( let i = 0; i < ccList.list.length; i++ )
    {
      let currentCC = ccList.list[i];
      let key = this._makeKey( currentCC.customization_ids );
      if( toReturn[ key ] )
      {
        toReturn[key].lengths.push(currentCC.lengths[0]); 
      } else
      {
        toReturn[key] = currentCC;
      }
    }

    return new CustomizationCombinationList( Object.keys(toReturn).map(function(v) { return toReturn[v]; }) );
    
  }
  _makeKey( customizationIds )
  {
    return customizationIds.sort().join( "-" );
  }
  toArray()
  {
    return this.list;
  }
}
