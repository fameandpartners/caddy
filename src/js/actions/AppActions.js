import request from 'superagent';

export function updateProductDetails( details )
{
  return {
    type: 'UPDATE_PRODUCT_DETAILS',
    details
  };
}


export function loadProduct( styleNumber, versionNumber )
{
  return function( dispatch )
  {
    let url = 'https://product-management-dev.firebaseio.com/product/' + styleNumber + "/versions/" + versionNumber + ".json";
      request.get( url ).end((error, response) => {
          let productJson = JSON.parse( response.text );
          dispatch(
              {
                  type: 'LOAD_PRODUCT',
                  details: productJson.details,
                  version: versionNumber
              } );
      } );
  };
}

