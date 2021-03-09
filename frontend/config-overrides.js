const { override, fixBabelImports, addLessLoader } = require ('customize-cra');


module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   addLessLoader({
   javascriptEnabled: true,
   modifyVars: { 
     'primary-color': '#2b2111',
     'background-color': '#faedb5',
     /*'@menu-dark-color': 'black',
     '@menu-item-color': 'black',
     '@menu-bg': 'transparent',
     //'@menu-dark-selected-item-icon-color': '#04e804',
     '@menu-dark-selected-item-text-color': 'orange',
     '@menu-dark-highlight-color': 'pink',
     '@menu-dark-item-active-bg': 'transparent',
     '@label-color': 'orange',*/
     }
 })
 );