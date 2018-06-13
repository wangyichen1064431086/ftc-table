import { sumOfAll, meanOfAll, medianOfAll} from './statisticFunc.js';

class Table {
  constructor(tableEl) {
    if (!tableEl) {
      tableEl = document.querySelector('[data-ftc-component="ftc-table"]');
    } else if (typeof tableEl === 'string') {
      tableEl = document.querySelector(tableEl);
    }

    if (tableEl.hasAttribute('data-ftc-table--js')) {
      return;
    }

    this.tableEl = tableEl;

    this.thsOfHeader = Array.from(this.tableEl.querySelectorAll('thead th'));

    this.sortByColumn = this.sortByColumn.bind(this);
    this.sortRowsByColumn = this.sortRowsByColumn.bind(this);
    this.ascendingSort = this.ascendingSort.bind(this);
    this.descendingSort = this.descendingSort.bind(this);

    this.duplicateHeader = this.duplicateHeader.bind(this);
    
    this.wrap = this.wrap.bind(this);

    this.addStatistic = this.addStatistic.bind(this);
    /*
    document.body.addEventListener('keydown',(e) => {
      alert('keydown');
    });
    */
    //this.keydownSortByColumn = this.keydownSortByColumn.bind(this);

    //功能1：为thead的th绑定排序事件
    this.thsOfHeader.forEach((th, columnIndex) => {
      if (th.hasAttribute('data-ftc-table--disablesort')) {
        return false;
      }
      th.setAttribute('tabindex', "0");
      th.addEventListener('click', this.sortByColumn.bind(this,columnIndex));//TODO:优化为事件委托
    
      th.addEventListener('keydown',(e) => {//按下空格或回车键也能实现排序变换. NOTE:必须设置了tabindex值为0，否则tabindex默认值为-1,即元素不能通过键盘导航来访问。
        //console.log('keydown');
        if ('key' in e) {
          //console.log('yes');
          /** NOTE:
           * KeyboardEvent.key: 返回用户按下的键盘物理按键的按键名。如按下Enter返回'Enter'
           * KeyboardEvent.keyCode:返回用户按下的键盘物理按键的按键值。如按下Enter返回13。已废弃，用'key'取代。
           * KeyboardEvent.which:和keyCode一样。
           * 关于keyboardEvent的几个属性待整理
          */
          if (e.key === 'Enter' || e.key === ' ') {
            this.sortByColumn(columnIndex, e);
          }

        }
      });
    });
    // Write code here

    //功能2：
    //只有thsOfHeader存在的时候，才能应用ftc-table--responsive-flat的样式
    if (this.tableEl.getAttribute('data-ftc-table--responsive') === 'flat' && this.thsOfHeader.length > 0) {
      this.duplicateHeader(this.thsOfHeader);
    } else {
      this.tableEl.classList.remove('ftc-table--responsive-flat')
    }


    //功能3：添加被嵌入的外框，进而添加诸如固定表头之类的功能
    if (this.tableEl.hasAttribute('data-ftc-table--wrapped')) {
      this.wrap();
    }
    
    //功能4：添加统计信息作为tfoot
    if (this.tableEl.hasAttribute('data-ftc-table--statistic')) {
      this.addStatistic();
    }
    

    this.tableEl.removeAttribute('data-ftc-table--no-js');
		this.tableEl.setAttribute('data-ftc-table--js', '');
  }

  //按某一列升降序排列：
  sortByColumn(columnIndex, e) {
    const currentSort = e.currentTarget.getAttribute('aria-sort');
    this.thsOfHeader.forEach((th) => {
      th.setAttribute('aria-sort','none');//既然要根据某一列重新排序，那么所有th自然都要重置aria-sort为none，因为按照某一列排序，那么其他列自然就是乱序的。
    });

    let tableOrder;
    let ariaSort;
    if (!this.tableEl.getAttribute('data-ftc-table--order') || currentSort === 'none' || currentSort === 'descending' || !currentSort) { //如果当前table的属性data-ftc-table--order无值，且当前列的aria-sort为none或descending或无值,那么就变为升序排列
      tableOrder = 'ASC';
      ariaSort = 'ascending';
    } else {
      tableOrder = 'DSC';
      ariaSort = 'descending';
    }
    this.tableEl.setAttribute('data-ftc-table--order', tableOrder);
    const currentType = e.currentTarget.getAttribute('data-ftc-table--datatype') || 'text';
    e.currentTarget.setAttribute('aria-sort',ariaSort);

    this.sortRowsByColumn(columnIndex, tableOrder === 'ASC', currentType === 'numeric');
  }


  sortRowsByColumn(columnIndex,isSortAscending,isNumeric) {
    // TODO
    const tbody = this.tableEl.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
  
    rows.sort((a, b) => {
      let aTd = a.children[columnIndex];
      let bTd = b.children[columnIndex];

      aTd = aTd.textContent.replace(/^\s+|\s+$/g,"");
      bTd = bTd.textContent.replace(/^\s+|\s+$/g,"");

      if (isNumeric) {
        aTd = parseFloat(aTd);
        bTd = parseFloat(bTd);
      }

      if (isSortAscending) { //如果为升序
        return this.ascendingSort(aTd,bTd);//升序就是return a-b ,即a>b return 1;降序是return b-a,即 a>b return -1
      } else {
        return this.descendingSort(aTd,bTd);
      }
    });

    rows.forEach((row) => {
      tbody.appendChild(row);//对于Node.appendChild()方法而言，如果被插入的节点已经存在于当前文档的文档树中,则那个节点会首先从原先的位置移除,然后再插入到新的位置.所以此处不必担心，直接appendChild即可
    })
  }

  ascendingSort(a,b) {
    if ((a < b) || a !== a) { //说明a是NaN;  不能用isNaN判断，因为isNaN会尝试先把里面的字符串转换为number，那么isNaN('cheddar')就为true了
    /*
      console.log(`a<b:${a<b}`);
      console.log(`isNaN(a):${isNaN(a)}`);
      console.log(`${a}<${b}`);
    */
      return -1;
    } else if ((a > b) || b !== b) {
      /*
      console.log(`a>b:${a>b}`);
      console.log(`isNaN(b):${isNaN(b)}`);
      console.log(`${a}>${b}`);
      */
      return 1;
    } else {
      //console.log(`${a}=${b}`);
      return 0;
    }
  }
  
  descendingSort(a,b) {
    return 0 - this.ascendingSort(a,b)
  }

  //拷贝表头内容至每一行，是的tbody部分变为<tr><th></th><td></td><td></td>..</tr>,然后css弹性盒控制在页面很窄的情况下这样显示处来
  duplicateHeader() {
    const rowsAll = Array.from(this.tableEl.getElementsByTagName('tr'));
    rowsAll.forEach((row) => {
      const tds = Array.from(row.getElementsByTagName('td'));
      tds.forEach((td, index) => {
        row.insertBefore(this.thsOfHeader[index].cloneNode(true),td);//在每个td前面都插上其上方对应的th
      })
    })
  }
  
  wrap() {
    /*
    console.log('wrap');
    console.log(!this.tableEl.hasAttribute('data-ftc-table--wrapped'));
    console.log(!this.tableEl.parentNode.matches('.ftc-table__wrapper'));
    */
    if (!this.tableEl.hasAttribute('data-ftc-table--wrapped') || this.tableEl.parentNode.matches('.ftc-table__wrapper')) {
      //console.log('return wrap');
      //NOTE:
        //Element.matches(selectorString)方法: 如果元素被指定的选择器字符串selectorString选择，返回true; 否则返回false。
      return;
    }

    const wrapperEl = document.createElement('div');
   

    this.tableEl.parentNode.insertBefore(wrapperEl, this.tableEl);
    wrapperEl.appendChild(this.tableEl);//原DOM中的会去掉再添加到这里

    wrapperEl.classList.add('ftc-table__wrapper');

    let wrapperWidth = this.tableEl.getAttribute('data-ftc-table--wrapper-width');
    let wrapperHeight = this.tableEl.getAttribute('data-ftc-table--wrapper-height');
    if (Number(wrapperWidth)) {
      wrapperWidth += 'px';
    } 
    if (Number(wrapperHeight)) {
      wrapperHeight += 'px';
    }
    wrapperEl.style.width = wrapperWidth;
    wrapperEl.style.height = wrapperHeight;

    const tHeadEl = this.tableEl.querySelector('thead');
    tHeadEl.style.zIndex = 100;
    wrapperEl.addEventListener('scroll', () => {
      //console.log(wrapperEl.scrollTop);
      /*
      if(wrapperEl.scrollTop>0) {
        tHeadEl.classList.add('fixedhead');
      } else {
        tHeadEl.classList.remove('fixedhead');
      }
      */
     const scrollTop = wrapperEl.scrollTop;
     tHeadEl.style.transform = 'translateY(' + scrollTop + 'px)';
    })
    
    

  }
  /* o-table写法：
  function descendingSort(...args) { //新用法待研究理解
    return 0 - ascendingSort.apply(this, args);
  }
  */

 addStatistic() {
   const tFoot = document.createElement('tfoot');
   const statisticToolArr = [
      {
        name:'sum',
        func:sumOfAll
      },
      {
        name:'mean',
        func:meanOfAll
      },
      {
        name:'median',
        func:medianOfAll
      }
   ];

   const rows = Array.from(this.tableEl.querySelectorAll('tbody tr'));

   //得到统计信息数据 resultByColumn
   const resultByColumn = [];//每一项为一个Object，形如:
   /**
      {
        columnIndex:1,
        statisticInfo:{}
      }
    */
   this.thsOfHeader.forEach((th, columnIndex) => {//对于每一列，都从rows中找到对应数据
    
     //if (th.getAttribute('data-ftc-table--datatype') !== 'numeric') { //只处理类型为numeric的列
     if (!th.hasAttribute('data-ftc-table--tostatistic') ) { //只处理具有tostatistic属性的列
       return;
     }
     const columnDataArr = []; 
     rows.forEach((tr, index) =>{
       const td = tr.children[columnIndex];
       const tdContent = td.textContent.replace(/^\s+|\s+$/g,"");
       columnDataArr.push(tdContent);
     });
     
     const statisticInfo = {};
     statisticToolArr.forEach((item)=> {
      statisticInfo[item.name] = item.func(columnDataArr);
     });
     resultByColumn.push({
       columnIndex,
       statisticInfo
     });
   });
   //console.log(resultByColumn);

   //添加数据到tfoot
   statisticToolArr.forEach(item => {
     const trOfFoot = document.createElement('tr');
     let tds = '';
     
     for (let i=0,len=this.thsOfHeader.length;i<len;i++) {
      let td;
      if (i == 0) {
        td = `<th>${item.name}</th>` ;
      } else {
        td = '<td class="ftc-table__cell--numeric">--</td>';//默认统计值为这个 
        resultByColumn.forEach(result => {
          if (result.columnIndex == i) {
            //console.log('result:',result);
            td = `<td class="ftc-table__cell--numeric">${result.statisticInfo[item.name]}</td>`;
          }
        });
      }
       tds += td
     }

     trOfFoot.innerHTML = tds;
     tFoot.appendChild(trOfFoot);
   })

   this.tableEl.appendChild(tFoot);
   
 }

  static init (rootEl) {
    if (!rootEl) {
      rootEl = document.body;
    } else if (typeof rootEl === 'string') {
      rootEl = document.querySelector(rootEl);
    }

    if (/\bftc-table\b/.test(rootEl.getAttribute('data-ftc-component'))) {
      return new Table(rootEl);
    }

    return [].map.call(rootEl.querySelectorAll('[data-ftc-component="ftc-table"]'),el => {
      if (!el.hasAttribute('data-ftc-table--js')) {
        return new Table(el);
      }
    }).filter( el => {
      return el !== undefined;
    });
  }
}

export default Table;
