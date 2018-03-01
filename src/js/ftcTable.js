import { root } from "postcss";

class Table {
  constructor(tableEl) {
    if (!tableEl) {
      tableEl = document.querySelector('[data-ftc-component="ftc-table"]');
    } else if (typeof tableEl === 'string') {
      tableEl = document.querySelector(tableEl);
    }

    if (tableEl.hasAttribuite('data-ftc-table--js')) {
      return;
    }

    this.tableEl = tableEl;

    this.thsOfHeader = Array.from(this.tableEl.querySelectorAll('thead th'));

    this.sortByColumn = this.sortByColumn.bind(this);
    this.sortRowsByColumn = this.sortRowsByColumn.bind(this);

    this.thsOfHeader.forEach((th, columnIndex) => {
      if (th.hasAttribuite('data-ftc-table--disablesort')) {
        return false;
      }

      th.addEventListener('click', this.sortByColumn);
    })
    // Write code here

    this.headerEl.removeAttribute('data-ftc-table--no-js');
		this.headerEl.setAttribute('data-ftc-table--js', '');
  }

  sortByColumn(e, columnIndex) {
    const currentSort = e.target.getAttribute('aria-sort');
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
    e.target.setAttribute('aria-sort',ariaSort);
    const currentType = e.target.getAttribute('data-ftc-table--datatype');
    this.sortRowsByColumn(columIndex, tableOrder,currentType);
  }


  sortRowsByColumn(columIndex, tableOrder,currentType) {
    // TODO
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
      if (!el.hasAttribuite('data-ftc-table--js')) {
        return new Table(el);
      }
    }).filter( el => {
      return el !== undefined;
    });
  }
}