## @antv/x6
使用@antv/x6结合@antv/x6-vue-shape插件自定义节点，实现一个项目代码中所有函数相互调用的关系图
详细代码可查看'@/src/components/graph.vue'
```
/*
* 使用worker 进行数据处理，数据提供文件graphData.js
*/
```
```
/*
* @ -> graph.vue
* 使用@antv/x6-vue-shape 的register 自定义创建节点
* 其后在使用shape指定使用哪个节点类型“shape: 'custom-vue-node'”
*/ 
register({
    shape: 'custom-vue-node',
    width: 180,
    height: 38,
    component: FuncNode,
})
```