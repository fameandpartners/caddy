import request from 'superagent';

export function updateProductDetails( product )
{
    return function( dispatch )
    {
        product.version += 1;
        let url = 'https://product-management-dev.firebaseio.com/product/' + product.details.id + "/versions/" + product.version + ".json";

        request.put( url )
            .type( 'application/json' )
            .send( product )
            .end((error, response) =>
                 {
                     let productListURL = 'https://product-management-dev.firebaseio.com/products/' + product.details.id + ".json";
                     
                     request.put( productListURL )
                         .type( 'application/json' )
                         .send( {version: product.version} )
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
        let url = 'https://product-management-dev.firebaseio.com/product/' + styleNumber + "/versions/" + versionNumber + ".json";
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

