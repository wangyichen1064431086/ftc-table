const fs = require('fs-jetpack');
const path = require('path');
const nunjucks = require('nunjucks');
const del = require('del');
const browserSync = require('browser-sync').create();
const cssnext = require('postcss-cssnext');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');
const minifyEs6 = require('uglify-es').minify;

/**********Nunjucks渲染环境配置：start*********/
var env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(
    [
      path.resolve(process.cwd(), 'demos/html')
    ],
    {
      watch:false,
      noCache: true
    }
  ),
  {autoescape: false}
);

function render(template, context) {
  return new Promise(function(resolve, reject) {
    env.render(template, context, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

gulp.task('html', async () => {
  var embedded = false;
  const destDir = '.tmp';
  const origami = await fs.readAsync('origami.json','json');
  const demos = origami.demos;
  //console.log(demos);
  
  function renderOneView(demo) {
    console.log(demo);
    return new Promise (
      async function (resolve, reject)  {
         const template = demo.template;
         const name = demo.name;
         const dataPath = demo.data;
         const dataForTable = await fs.readAsync(dataPath,'json');
         const context = {
            pageTitle: demo.name,
            description: demo.description,
            js: demo.js,
            css: demo.css,
            table: dataForTable,
            embedded: embedded
         };
         const renderResult = await render(template, context);
         const destFile = path.resolve(destDir, `${name}.html`);
         const result = {
           renderResult,
           destFile
         };
        resolve(result);
  
      }
    ).then(result => {
      fs.writeAsync(result.destFile, result.renderResult);
    }).catch(error => {

    })
  }

  return Promise.all(demos.map((demo) => {
    return renderOneView(demo);
  })).then(() => {
    browserSync.reload('*.html');
    gulp.src('.tmp/*.html')
      .pipe(gulp.dest('demos/htmlresults'));
  }).catch(error => {
    console.log(error);
  })
  
});


gulp.task('styles', function styles() {
  const DEST = '.tmp/styles';

  return gulp.src('demos/src/*.scss')
    .pipe($.changed(DEST))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('scripts', async () => {
  // TODO:关于rollup需要再认真学习一下
  const origami = await fs.readAsync('origami.json','json');
  const demos = origami.demos;
  async function rollupOneJs(demo) {
    const bundle = await rollup({
      input:`demos/src/${demo.js}`,
      plugins:[
        babel({//这里需要配置文件.babelrc
          exclude:'node_modules/**'
        }),
        nodeResolve({
          jsnext:true,
        })
      // rollupUglify({}, minifyEs6)//压缩es6代码
      ]
    });

    await bundle.write({//返回promise，以便下一步then()
        file: `.tmp/scripts/${demo.js}`,
        format: 'iife',
        sourcemap: true
    });
  }
  //console.log(demos);
  await demos.forEach(rollupOneJs);
  browserSync.reload();
});

gulp.task('clean', function() {
  return del(['.tmp/**']);
});

gulp.task('serve', gulp.series('clean','html','styles','scripts',() => {
  browserSync.init({
    server:{
      baseDir: ['.tmp'],
      index:'baseTable.html',
      directory: true
    }
  });
  gulp.watch(['demos/html/*.html','demos/data/*.json'], gulp.parallel('html'));
  gulp.watch(['src/scss/*.scss', 'demos/src/main.scss'], gulp.parallel('styles'));
  gulp.watch(['src/js/*.js','demos/src/main.js'],gulp.parallel('scripts'));
}));