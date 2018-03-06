function getViewportWidth() {
  /**
   * @dest 获得浏览器当前视口的高度
   */
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getOffsetTop(el) { 
  /**
   * @dest 获得el元素距页面顶部的距离。对应NEXT中main.js的findTop函数.
   * @param el: TYPE HTMLElement, 目标元素
   * @return:TYPE Number,得到的距离值，单位px
   */
  let curTop = el.offsetTop;
  while (el && el.offsetParent) { 
    //NOTE:HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。对于fixed元素来说，其offsetParent是null而非fixed定位的那个视口,所以offsetTop要先执行一次
    el = el.offsetParent;
    curTop += el.offsetTop;//NOTE:HTMLElement.offsetTop 为只读属性，它
  }
  return curTop;
}