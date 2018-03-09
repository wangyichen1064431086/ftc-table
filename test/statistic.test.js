const expect = require('expect.js');
import {cleanNumArr,sumOfAll,meanOfAll,medianOfAll} from 'js/statisticFunc.js';

describe('statistic APIs', () => {
  it('is defined', () => {
    expect(sumOfAll).to.be.a('function');
  });
  it('is defined', () => {
    expect(meanOfAll).to.be.a('function');
  });
  it('is defined', () => {
    expect(medianOfAll).to.be.a('function');
  })
});

describe('cleanNumArr', () => {
  it ('is cleaned' ,() => {
    expect(cleanNumArr([1,2,'3',NaN,undefined])).to.have.length(3);
    expect(cleanNumArr([1,2,'3',NaN,undefined])[2]).to.equal(3);
    expect(cleanNumArr([1,2,' '])).to.have.length(2);
    expect(cleanNumArr([1,2,' '])[1]).to.be(2);
  })
})

describe('statistic Results', () => {
  it('is computed by sumOfAll', () => {
    expect(sumOfAll([1,2,3])).to.equal(6);
  });
  it('is computed by meanOfAll 1', () => {
    expect(meanOfAll([1,2,3])).to.equal(2);
  });
  it('is computed by medianOfAll', () => {
    expect(medianOfAll([1,2,3])).to.equal(2);
  });
  it('is computed by meanOfAll 2', () => {
    expect(meanOfAll([1,2,'3'])).to.equal(2);
  });
  it('is computed by meanOfAll 3', () => {
    expect(meanOfAll([1,2,' '])).to.be(1.5);
  });
  it('is computed by meanOfAll 4', () => {
    expect(meanOfAll([1,2,NaN])).to.equal(1.5);
  });
});
