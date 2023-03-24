# Vue 3 + Vite
当前项目是由 Vue 3 + Vite搭建的项目，该项目全为公司项目中遇到的第三方插件试用、预研的demo

## @antv/x6
    使用@antv/x6结合@antv/x6-vue-shape插件自定义节点，实现一个项目代码中所有函数相互调用的关系图

    ```
        /*
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