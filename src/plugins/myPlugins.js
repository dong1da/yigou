// Vue插件一定是暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue, options) {
  //任何组件都可以使用的全局指令
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase()
    console.log(params);
  })
}

export default myPlugins