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

    // Write code here

    this.headerEl.removeAttribute('data-ftc-table--no-js');
		this.headerEl.setAttribute('data-ftc-table--js', '');
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