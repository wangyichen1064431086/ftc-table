import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
//import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/js/ftcTable.js',
  output:[
    {
      name:'FtcTable',
      sourcemap: true,
      file: './build/index.js',
      format: 'umd'
    },
    {
      name:'FtcTable',
      sourcemap: true,
      file: './build/index.es.js',
      format: 'es'
    },
  ],
 /*
  targets: [
    {
      dest: './build/index.js',
      format: 'umd'
    },
    {
      dest: './build/index.es.js',
      format: 'es'
    }
  ],
  */

  plugins: [
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      jsnext: true,
      main:true
    }),
    commonjs({
      namedExports: {
        'node_modules/immutable/dist/immutable.js':['Seq']
      }
    })
  ]
}