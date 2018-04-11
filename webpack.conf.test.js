const path = require('path');

module.exports = {
  /*
  entry:"./test/table.test.js",
  
 
  output: {
    path: path.resolve(__dirname,'test'),
    filename:'test.js'
  },
  */ //1.此配置参数中没有entry、output两个节点的配置，打包的输入和输出karma会指定

  mode :'development',
  module:{
    rules:[
      {
        test:/\.js$/,
        /*
        include:[
          path.resolve(__dirname,'src/js'),
          path.resolve(__dirname,'node_modules')
        ],
        */
        loader:'babel-loader',
        //此处要注意移除.babelrc里的:
          /*
            "plugins": [
              "external-helpers"
            ] 
          */
         //否则npm test会报错：Uncaught ReferecnceError:babelHelpers is not defined
        exclude:/node_modules/,
        options:{
          presets:['es2015']
        }
       
        
      }
    ]
  },
  resolve: {
    modules:[
      'node_modules',
      path.resolve(__dirname,'src')//配置了test/test.js中import的文件路径
    ]
  }

}