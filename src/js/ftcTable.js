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

    this.thsOfHeader.forEach((th, columnIndex) => {
      if (th.hasAttribute('data-ftc-table--disablesort')) {
        return false;
      }

      th.addEventListener('click', this.sortByColumn.bind(this,columnIndex));//TODO:优化为事件委托
    })
    // Write code here

    this.tableEl.removeAttribute('data-ftc-table--no-js');
		this.tableEl.setAttribute('data-ftc-table--js', '');
  }

  sortByColumn(columnIndex, e) {
    const currentSort = e.currentTarget.getAttribute('aria-sort');
    this.thsOfHeader.forEach((th) => {
      th.setAttribute('aria-sort','none');//既然要根据某一列重新排序，那么所有th自然都要重置aria-sort为none，因为按照某一列排序，那么其他列自然就是乱序的。
    });

    let tableOrder;
    let ariaSort;
    if (!this.tableEl.getAttribute('data-ftc-table--order') || currentSort === 'none' || currentSort === 'descending') { //如果当前table的属性data-ftc-table--order无值，且当前列的aria-sort为none或descending,那么就变为升序排列
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
    console.log(rows);
    console.log(isNumeric);
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
      console.log(`a<b:${a<b}`);
      console.log(`isNaN(a):${isNaN(a)}`);
      console.log(`${a}<${b}`);
      return -1;
    } else if ((a > b) || b !== b) {
      console.log(`a>b:${a>b}`);
      console.log(`isNaN(b):${isNaN(b)}`);
      console.log(`${a}>${b}`);
      return 1;
    } else {
      console.log(`${a}=${b}`);
      return 0;
    }
  }
  
  descendingSort(a,b) {
    return 0 - this.ascendingSort(a,b)
  }

  /* o-table写法：
  function descendingSort(...args) { //新用法待研究理解
    return 0 - ascendingSort.apply(this, args);
  }
  */

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