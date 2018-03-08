const expect = require('expect.js');
const Table = require('../src/js/ftcTable.js');
console.log('execute');
describe('Table API', () => {
  it('is defined', () => {
    expect(Table).to.be.a('function');
  });
});