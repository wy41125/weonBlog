<template>
    <div id="chart-page"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import FuncNode from './funcNode.vue'
let graph = null

register({
    shape: "custom-vue-node",
    width: 180,
    height: 38,
    component: FuncNode,
});
// const TeleportContainer = getTeleport();

// 创建画布
const creatGraph = () => {
    graph = new Graph({
        container: document.getElementById('chart-page'),
        grid: true,
        background:{
            color: '#22273b'
        },
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        mousewheel: {
            enabled: true,
            modifiers: 'ctrl',
            factor: 1.1,
            maxScale: 5,
            minScale: 0.5,
        },
    });
    console.log(graph)
}

onMounted(()=>{
    creatGraph()
    //将画布内容中心与视口中心对齐。如果不能通过滚动来对齐，则自动为 Scroller 的容器增加一定的 padding 边距来强制对齐。
    graph.centerContent()

    graph.addNode({
        x: 400,
        y: 150,
        shape: "custom-vue-node",
        data: {
            func_name: 'funcname_ahsdkjhsafasdf'
        }
    });

})



</script>
<style lang="less" scoped>
#chart-page {
    width: 100%;
    height: 100%;
}
.node-box {
	display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #c2c8d5;
    border-left: 4px solid #5F95FF;
    border-radius: 4px;
    img{
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        margin-left: 8px;
    }
    .label{
        display: inline-block;
        flex-shrink: 0;
        width: 104px;
        margin-left: 8px;
        color: #666;
        font-size: 12px;
    }
}
</style>
