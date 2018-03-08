const path = require('path');

module.exports = {
  entry:"./test/table.test.js",
  
 
  output: {
    path: path.resolve(__dirname,'test'),
    filename:'test.js'
  },
  
  module:{
    rules:[
      {
        test:/\.js$/,
        include:[
          path.resolve(__dirname,'src/js'),
          path.resolve(__dirname,'node_modules')
        ],
        loader:'babel-loader',
        options:{
          "presets": [
            [
              "env",
              {
                "modules": false
              }
            ]
          ]
        }
      }
    ]
  },
  resolve: {
    modules: [
      __dirname+'/bower_components',
      __dirname+'/node_modules',
      __dirname,
    ]
  },

}