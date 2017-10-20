// template.js
import { template } from 'rapscallion';

export default vo => template`

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Obskyur</title>\
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    <meta name="theme-color" content="#000" />
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-title" content="NKBA"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <link id="favicon" rel="shortcut icon" href="/favicon.ico" sizes="16x16 32x32" type="image/png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <meta name="msapplication-tap-highlight" content="no"/>
    <meta name="msapplication-TileImage" content="/icon/ms-touch-icon-144x144-precomposed.png"/>
    <meta name="msapplication-TileColor" content="#000"/>
    <meta name="theme-color" content="#000"/>
    <link href="https://fonts.googleapis.com/css?family=Chivo:300,400,700|Spectral:300,400,500,700" rel="stylesheet">
    <link rel="stylesheet" href=${() => vo.cssBundle}></style>
  </head>
  <body>
    <div id="root">
      <div>${vo.root}</div>
    </div>
    <script src="${() => vo.jsBundle}" defer></script>
    <script type="text/javascript">
      window.__data = ${() => JSON.stringify(vo.initialState) || {}};
    </script>

  </body>

</html>
`;

// <script type="text/javascript" async>
// !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
// analytics.load("XXXXXXXXXXXXX");
// }}();
// </script>
