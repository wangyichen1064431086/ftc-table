function cleanNumArr(sourceArr) {
  return sourceArr.filter(num => {
    return (typeof num === 'number' || (typeof num === 'string' && num !== ''));//返回的只能是number或不为空的字符串
  }).map(num => {
    if (typeof num === 'number') {
      return num;//这里也有可能是NaN
    } else {
      return Number(num);//这里也有可能是NaN,如Number('abc')
    }
  }).filter(num =>{
    return num === num;//过滤掉NaN
  });
}

/**
 * 计算一系列数之和
 * @param {Array:[Number,Number..]} numArray 
 */
function sumOfAll(numArray) {
  const cleanedNumArr = cleanNumArr(numArray);
  let sum = 0;
  for(const item of cleanedNumArr) {
      sum += item;
  }
  return sum;
}

/**
 * 计算一系列数的平均数（保留两位小数）
 * @param {Array:[Number,Number..]} numArray 
 */
function meanOfAll(numArray) {
  const cleanedNumArr = cleanNumArr(numArray);
  const len = cleanedNumArr.length;
  if (len === 0) {
    return NaN;
  }
  let sum = 0;
  for(const item of cleanedNumArr) {
    sum += item;
  }

  return Math.round(sum/len * 100)/ 100;
 
}

/**
 * 计算一系列数的中位数
 * @param {Array:[Number,Number..]} numArray 
 */
function medianOfAll(numArray) {
  const cleanedNumArr = cleanNumArr(numArray);
  cleanedNumArr.sort((a,b) => {//从小到大就地排序
    return a-b;
  });
  const len = cleanedNumArr.length;
  if (len%2 === 0) {//如果为偶数个
    return Math.round((cleanedNumArr[len/2] + cleanedNumArr[len/2-1])/2*100)/100;
  } else {//如果为奇数个
    return Math.round(cleanedNumArr[(len-1)/2]*100)/100;
  }
}

export  {
  sumOfAll,
  meanOfAll,
  medianOfAll
}