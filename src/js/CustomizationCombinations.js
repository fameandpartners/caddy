import CustomizationCombinationList from './CustomizationCombinationList';

export default class CustomizationCombinations
{
  constructor( lengthName,
               listOfCombinations,
               listOfInvalidCombinationsForLength,
               listOfInvalidCombinationToCombination )
  {
    this.lengthName = lengthName;
    this.listOfCombinations = listOfCombinations;
    this.listOfInvalidCombinationToCombination = listOfInvalidCombinationToCombination;
    this.listOfInvalidCombinationsForLength = listOfInvalidCombinationsForLength;
    this.resultsList = null;
  }

  list()
  {
    if( this.resultsList == null )
    {
      this.resultsList = this._generateCombinations();
    }

    return this.resultsList;
  }

  _generateCombinations()
  {
    let i, j;
    let result = [];
    let arrLen = this.listOfCombinations.length;
    let power = Math.pow;
    let combinations = power(2, arrLen);
    for (i = 0; i < combinations;  i++)
    {
      let temp = [];
      let tempIds = [];
      let tempCodes = [];
      let tempNeckline = '';
      let tempSilhouette = '';
      for (j = 0; j < arrLen; j++)
      {
        if ((i & power(2, j)))
        {
          temp = temp.concat( [this.listOfCombinations[j].name] );
          tempIds = tempIds.concat( [this.listOfCombinations[j].id] );
          tempCodes = tempCodes.concat( [this.listOfCombinations[j].code] );
          
          if (this.listOfCombinations[j].new_silhouette_name) {
              
              tempSilhouette = this.listOfCombinations[j].new_silhouette_name
          }

          if (this.listOfCombinations[j].new_neckline_name) {
              tempNeckline = this.listOfCombinations[j].new_neckline_name
          }
        }
      }
      
      if( temp.length > 0 )
      {
        if( !this._containsInvalidCombinations( tempIds ) )
        {
          let incompatibilySet = new Set();

          for( let i = 0; i < tempIds.length; i++ )
          {
            if( this.listOfInvalidCombinationToCombination && this.listOfInvalidCombinationToCombination[ tempIds[i] ] )
            {
              incompatibilySet =  new Set([...incompatibilySet, ...this.listOfInvalidCombinationToCombination[ tempIds[i] ] ]);
            }
            if( this.listOfInvalidCombinationsForLength )
            {

              let self = this;
              incompatibilySet = new Set([...incompatibilySet, ...Object.keys( this.listOfInvalidCombinationsForLength ).filter( function( key ) { return self.listOfInvalidCombinationsForLength[ key]; }  ) ]);
            }
          }
          result.push( {
            customization_ids: tempIds,
            neckline: tempNeckline,
            silhouette: tempSilhouette,
            lengths: [ { name: this.lengthName, incompatability_list: Array.from( incompatibilySet ) }]
          });
        }
      }
    }

    return new CustomizationCombinationList( result );
    
  }

  _isInvalidRow( customization )
  {
    return this.listOfInvalidCombinationsForLength && this.listOfInvalidCombinationsForLength[customization];
  }
  
  
  _containsInvalidCombinations( toCheck )
  {
    if( this._isInvalidRow( toCheck[0] ) )
    {
      return true;
    }
        
    for( let i = 0; i < toCheck.length; i++ )
    {
      for( let j = i + 1; j < toCheck.length; j++ )
      {
        if( !this._isValidCombination( toCheck[i], toCheck[j] ) || this._isInvalidRow( toCheck[i] ) || this._isInvalidRow(toCheck[j] ) )
        {
          return true;
        }
      }
    }

    return false;
  }
  
  _isValidCombination( first, second )
  {
    let combinations = [first.toString(),second.toString()].sort();
    let ic = this.listOfInvalidCombinationToCombination || {};

    if( first === second )
    {
      return false;
    }
    
    if( !ic[combinations[0]] )
    {
      return true;
    }

    if( ic[combinations[0]][combinations[1]] == null )
    {
      return true;
    }
    return ic[combinations[0]][combinations[1]];
    
  }
  
  
}
