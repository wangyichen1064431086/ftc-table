# ftc-table
The table component used by FTC.

## Install 
### If your project is built with 
Install the package for getting js API and sass API：
```
cd yourProject
npm install "@ftchinese/ftc-table" --save;//For getting js API
bower install ftc-table --save;//For getting sass API
```

## API

### API for JS

If the html for ftc-table is ready, you can use JS API this way:

```
import Table from '@ftchinese/ftc-table/main.js';

//Construct all the table elements with property data-ftc-component="ftc-table" in your document：
Table.init();

//Or if you want to construct one specified table:
new Table(document.getElementById(yourTableId));

```

It will add some features to your table,  depending on what properties your table have. The more details will be explained below.

### API for SASS
You can choose to use the **silent mode** or not.

If you choose the **silent mode**, you should set the **$ftc-table-is-silent** to false and import the ftc-table module. Then your table could get all the styles defined by ftc-table.
```
$ftc-table-is-silent:false;

@import "ftc-table/main";
```

If you do not choose the silent mode, you should first set the **$ftc-table-is-silent** to true and import the ftc-table module, and what's more, you should manually **@include** the style **mixin** defined by ftc-table:

```
$ftc-table-is-silent:true;

@import "ftc-table/main";

// You can get all the default CSS classes.
@include ftcTableAll; Get the CSS classes starting with ".ftc-table"

// Or, you can define the CSS class prefix by your self
@include ftcTableAll(my-table);//Get the css classes starting with ".my-table"
```

Adding different CSS classes to your table will bring different style.The more details will be explained below.

## Prepare your html
Before using our APIs, you may first prepare the html code.

### The root element
It should be a <code>table</code> with the basic attribute <code> data-ftc-component="ftc-table" </code> and the base classname <code> "ftc-table"</code>(or your own class prefix like <code>"my-table"</code>):


```html
<table class="ftc-table" data-ftc-component="ftc-table" data-ftc-table--no-js>
</table>
```

As you see, it should with the other attribute <code>data-ftc-table--no-js</code> if you want to use JS API.

### The children elements:
The root <code>table</code> can have all the table elements such as <code>thead</code>、<code>tbody</code>、<code>tfoot</code>、<code>captain</code>...Here is a simple example:

```html
<table class="ftc-table ftc-table--vertical-lines" data-ftc-component="ftc-table" data-ftc-table--no-js>
  <thead>
    <tr>
       <th aria-sort=none data-ftc-table--datatype=>
          Cheese
          <span class="ftc-table__cell--content-secondary">
            Type of cheese
          </span>
        </th>
       <th aria-sort=none data-ftc-table--datatype=>
          Bread
          <span class="ftc-table__cell--content-secondary">
            Type of bread
          </span>
        </th>
       <th aria-sort=none data-ftc-table--datatype=numeric>
          Cost
          <span class="ftc-table__cell--content-secondary">
            (GBP)
          </span>
        </th>
       <th aria-sort=none data-ftc-table--datatype=numeric>
          Cost
          <span class="ftc-table__cell--content-secondary">
            (EUR)
          </span>
        </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >
        cheddar
      </td>
      <td >
        rye
      </td>
      <td class=ftc-table__cell--numeric>
        1
      </td>
      <td class=ftc-table__cell--numeric>
        1.56
      </td>
    </tr>
    <tr>
      <td>
        stilton
      </td>
      <td>
        wholemeal
      </td>
      <td class=ftc-table__cell--numeric>
        2
      </td>
      <td class=ftc-table__cell--numeric>
        1.85
      </td>
    </tr>
    <tr>
      <td>
        red leicester
      </td>
      <td class>
        white
      </td>
      <td class=ftc-table__cell--numeric>
        3
      </td>
      <td class=ftc-table__cell--numeric>
      </td>
    </tr>
  </tbody>
</table>
```
### HTML Demos
You can go to [here](https://github.com/wangyichen1064431086/ftc-table/tree/master/demos/htmlresults) to get more html demos. And if you like to get html by data and templates, you can go to [here](https://github.com/wangyichen1064431086/ftc-table/tree/master/demos/html) to see Nunjucks templates and [here](https://github.com/wangyichen1064431086/ftc-table/tree/master/demos/data) to see the json data for Nunjucks templates.

We provide all kinds of tables at these demos: captionsTable, responsiveFlatTable, responsiveScrollTable, statisticTable ...

### The Attributes
You can add different attributes to  <code>table</code> to get table with different features:

#### Sort related:
- <code>data-ftc-table--datatype</code>:

- <code>aria-sort</code>:

- <code>data-ftc-table--disablesort</code>: for <code>th</code> in <code>thead</code>, no value. As every column of our table are default to be sortable, if you add this attribute to one column 's <code>th</code>, this column cannot be sorted.


#### Responsive related:
- <code>data-ftc-table--responsive</code>:for <code>table</code>, value should be **flat**. To make the table flat responsive.

#### Wrapped related
- <code>data-ftc-table--wrapped</code>:for <code>table</table>,no value. To make the table wrapped by another container, and to fix the table head when scrolling the table. In this case, you can also add attributes <code>data-ftc-table--wrapper-width</code> and <code>data-ftc-table--wrapper-height</code> to specify the size of the container, whose value can be **100%**/**200px** ...

#### Statistic related:
- <code>data-ftc-table--statistic</code>:for <code>table</table>,no value. To add statistic info rows to the table, such as **sum**,**mean**,**median**. 

### The Classes


## Build
Write gulp task for transforming and bundling es6:
```
const gulp = require('gulp');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
//Certainly, you shoud npm install these pacakges first

  gulp.task('scripts', async () => {
    const bundle = await rollup({
      input:`demos/src/index.js,
      plugins:[
        babel({
          exclude:'node_modules/**'
        }),
        nodeResolve({
          jsnext:true,
        })
      ]
    });

    await bundle.write({
        file: `.tmp/scripts/index.js`,
        format: 'iife',
        sourcemap: true
    });
  }
});
```
