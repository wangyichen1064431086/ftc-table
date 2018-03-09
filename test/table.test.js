const expect = require('expect.js');
import Table from '../src/js/ftcTable.js';

console.log('execute');
describe('Table API', () => {
  it('is defined', () => {
    expect(Table).to.be.a('function');
  });
});

describe('Instance for Table', () => {
  let tableEl;
  let containerEl;

  beforeEach(() => {
    containerEl = document.createElement('div');
    containerEl.innerHTML = '<table class="ftc-table ftc-table--vertical-lines" data-ftc-component="ftc-table" data-ftc-table--no-js></table>';
    document.body.appendChild(containerEl);
    tableEl = containerEl.querySelector('[data-ftc-component="ftc-table"]');
  });

  afterEach(() => {
    tableEl = null;
    containerEl = null;
  });

  it('constructor', () => {
    const table = new Table(tableEl);
    expect(table).to.be.a(Table);
    expect(table.tableEl).to.equal(tableEl);
    expect(tableEl.getAttribute('data-ftc-table--js')).to.not.be(null);
  });
});