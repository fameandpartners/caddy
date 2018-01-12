export default class RenderSet
{
  constructor( renders, customizationCodes )
  {
    this.combinedRenderSet = this.combineRenderSets( renders, customizationCodes );
  }

  clone( object )
  {
    console.log( object );
    return JSON.parse( JSON.stringify( object ) );
  }
  
  combineRenders( baseSet, newSet )
  {
    let toReturn = baseSet;
    if( newSet != null )
    {
      if( baseSet == null )
      {
        toReturn = newSet;
      }
      toReturn['bottom'] = newSet['bottom' ] || toReturn['bottom'];
      toReturn['belt'] = newSet['belt' ] || toReturn['belt'];
      toReturn['behind' ] = (newSet['behind'] || []).concat( toReturn['behind'] || []);
      toReturn['behindbelt' ] = (newSet['behindbelt'] || []).concat( toReturn['behindbelt'] || []);      
      toReturn['neckline'] = newSet['neckline' ] || toReturn['neckline'];
      toReturn['infront' ] = (newSet['infront'] || []).concat( toReturn['infront'] || [] );
    }
    
    return toReturn;
  }
  
  combineRenderSets( renders, itemCodesToAdd )
  {
    console.log( renders );
    let toReturn = this.clone( renders['default'] );

    for( let i = 0; i < itemCodesToAdd.length; i++ )
    {
      let itemCode = itemCodesToAdd[i].toLowerCase();
      if( renders[itemCode] )
      {
        let itemRenders = this.findItemToRender( renders[itemCode], itemCodesToAdd );
        toReturn['front'] = this.combineRenders( toReturn['front'], itemRenders['front'] );
        toReturn['back'] = this.combineRenders( toReturn['back'], itemRenders['back'] );
        
      }
    }

    console.log( toReturn );
    return toReturn;
  }

  findItemToRender( renders, combinationCodes )
  {
    let toReturn = renders['default'];

    for( let i = 0; combinationCodes && i < combinationCodes.length; i++ )
    {
      let code = combinationCodes[i].toLowerCase();
      if( renders[code] )
      {
        toReturn = this.findItemToRender( renders[code], combinationCodes );
      }
    }

    return toReturn;
  }
  
  
}
