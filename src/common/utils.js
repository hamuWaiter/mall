// 比较公共的js代码块
//
// 
// 1.防抖函数debounce（用于减少频繁操作）
export function debounce(func, delay) {
    // 防抖函数，可以减少频繁的操作
    let timer = null;
    // this指向为Vue实例
    return function(...args) {
      // this的指向总结就是哪儿调用this就指向哪儿-------------------------------------
      if(timer) clearTimeout(timer)

      timer = setTimeout(() => {
        // 箭头函数this与外层作用于的this一致

        //立即调用传入的重复操作，即this.$refs.scroll.refresh()
        func.apply(this,args)
        // console.log("refresh!");测试用
      }, delay);
    }
  }