const request = require('superagent');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let env = require( '../config/env.js' )();

let firebaseURL = env['raw']['FIREBASE_URL'];


function updateVersion( versionNumber, allVersions )
{
  let product = allVersions['versions'][versionNumber ];

  if( product['details'] && product['details']['lengths'] )
  {
    let newLengths = [];
    
    product['details']['lengths'].forEach( function( length )
                                          {
                                            newLengths.push( { name: length } );
                                          } );

    product['details']['lengths'] = newLengths;
    product.version += 1;
    let url = firebaseURL + '/product/' + product.details.id + "/versions/" + product.version + ".json";


    request.put( url )
      .type( 'application/json' )
      .send( product )
      .end((error, response) =>
           {
             let productListURL = firebaseURL + '/products/' + product.details.id + ".json";
             
             request.put( productListURL )
               .type( 'application/json' )
               .send( {version: product.version, name: product.details.name} )
               .end( (error, response) =>
                     {
                       console.log( response.text ) ;                       
                     } );
           } );

    
  }
}
function fetchAllData( firebaseURL )
{
  request.get( firebaseURL + "/.json" ).end((error, response) => {
    let parsedResult = JSON.parse( response.text );
    Object.keys(parsedResult['product']).forEach( function( key )
                                       {
                                         let latestVersion = Object.keys( parsedResult['product'][key]['versions'] ).slice( -1 )[0];
                                         updateVersion( latestVersion, parsedResult['product'][key] );
                                       } );
  } );
  
}


fetchAllData( firebaseURL );
