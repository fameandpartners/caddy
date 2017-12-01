import request from 'superagent';
const FIREBASE_URL = process.env.FIREBASE_URL;

const LENGTH_ORDER = ['Cheeky', 'Short', 'Micro-Mini', 'Mini', 'Knee', 'Midi', 'Ankle', 'Maxi', 'Full'];

function ensureLengthsSortedCorrectly( product )
{
  
  if( !product || !product.details || !product.details.lengths )
  {
    return product;
  } else
  {
    let lengths = product.details.lengths;
    lengths = lengths.sort( (a,b) => LENGTH_ORDER.indexOf( a ) - LENGTH_ORDER.indexOf( b ) );
    product.details.lengths = lengths;
    return product;
  }
}
export function updateProductDetails( product )
{
  product = ensureLengthsSortedCorrectly( product );
  
  return function( dispatch )
  {
    product.version += 1;
    let url = FIREBASE_URL + '/product/' + product.details.id + "/versions/" + product.version + ".json";


    request.put( url )
      .type( 'application/json' )
      .send( product )
      .end((error, response) =>
           {
             let productListURL = FIREBASE_URL + '/products/' + product.details.id + ".json";
             
             request.put( productListURL )
               .type( 'application/json' )
               .send( {version: product.version, name: product.details.name} )
               .end( (error, response) =>
                     {
                       dispatch(
                         {
                           type: 'UPDATE_PRODUCT_DETAILS',
                           details: product.details,
                           customizations: product.customizations,
                           validCombinations: product.validCombinations,
                           version: product.version
                         } );
                       
                     } );
           } );
    
  };
}


export function newProduct()
{
  return {
    type: 'NEW_PRODUCT'
  };
}
export function loadProduct( styleNumber, versionNumber )
{
  return function( dispatch )
  {
    let url = FIREBASE_URL + '/product/' + styleNumber + "/versions/" + versionNumber + ".json";
    console.log( "loading url " + url );
    request.get( url ).end((error, response) => {
      let productJson = JSON.parse( response.text );
      dispatch(
        {
          type: 'LOAD_PRODUCT',
          details: productJson.details,
          customizations: productJson.customizations,
          validCombinations: productJson.validCombinations,
          version: versionNumber
        } );
    } );
  };
}

