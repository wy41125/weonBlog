<template>
    <div id="chart-page"></div>

    <a-drawer
        v-model:visible="visible"
        class="custom-class"
        title="节点信息"
        placement="right"
        :mask="false"
        :maskStyle="{
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
        }"
        @close="closureNode"
    >
        <div class="box-info">
            <p class="title">{{ nodeData.desc }}</p>
            <p class="data-line"> <span>代码位置：</span> {{ nodeData.position }}</p>
        </div>
    </a-drawer>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import FuncNode from './funcNode.vue'
import Worker from 'worker-loader!./worker'
import { graphData } from './graphData'
const worker = ref()

let graph = null,
    nodesList = [],
    linkList = [],
    visible = ref(false),
    nodeData = ref({}),
    nodeArr = [], // 选中节点关联的节点
    connectEdges = [], // 选中节点关联的边
    activeNode = null // 当前选中的节点

// 创建通用节点
register({
    shape: 'custom-vue-node',
    width: 180,
    height: 38,
    component: FuncNode,
})
// const TeleportContainer = getTeleport();

// 创建画布
const creatGraph = () => {
    graph = new Graph({
        container: document.getElementById('chart-page'),
        async: true,
        grid: true,
        background: {
            color: '#22273b',
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
            minScale: 0.1,
        },
    })
    return graph
}
// 创建节点和边
const openWorker = (graph) => {
    worker.value = new Worker()
    worker.value.postMessage({
        type: 'init',
        data: graphData,
    })
    worker.value.onmessage = (e) => {
        nodesList = e.data.nodesList
        linkList = e.data.linkList
        worker.value.terminate()
        // 创建方法节点
        let nodes = nodesList.map((item) => {
            return {
                id: item.id,
                x: item.x,
                y: item.y,
                shape: 'custom-vue-node',
                data: {...item, isCheck: false},
                zIndex: 10,
                
            }
        })
        // 获知连接线
        let links = linkList.map((item) => {
            return {
                id: item.id,
                source: item.source,
                target: item.target,
                zIndex: 1,
                connector: { name: 'smooth' },
                attrs: {
                    line: {
                        stroke: '#788096',
                    },
                },
            }
        })
        graph.addEdges(links)
        graph.addNodes(nodes)
    }
}
// 设置节点高亮方法
const selectNode = (newGraph, node) => {
    // 已有选中的节点， 判断当前选中节点与已选中节点是否是同一个
    if(activeNode && node.id == activeNode.id){
        return
    }else if(activeNode && node.id != activeNode.id){
        closureNode()
        activeNode = node
    }else {
        activeNode = node
    }
    // 通过当前选中节点，找到当前节点的前置节点，并组成节点组
    nodeArr = newGraph.getPredecessors(node).concat(node)
    if(nodeArr && nodeArr.length > 0){
        nodeArr.forEach( item => {
            // 找到所有的以当前节点为终点的线
            let edges = newGraph.getIncomingEdges(item)
            connectEdges = connectEdges.concat(edges)
            // 将所有的节点设置成选中状态
            const { isCheck } = item.getData()
            item.setData({
                isCheck: !isCheck
            })
        })
    }
    if(connectEdges && connectEdges.length > 0){
        connectEdges.forEach( item => {
            if(item && item.id){
                item.setAttrs({
                    line: {
                        stroke: 'rgba(41, 140, 255, 1)',
                        strokeDasharray: 5,
                        targetMarker: 'classic',
                        style: {
                            animation: 'ant-line 30s infinite linear',
                        },
                    },
                })
            }
        })
    }
}
// 关闭高亮节点、边
const closureNode = () => {
    if(nodeArr && nodeArr.length > 0){
        nodeArr.forEach( item => {
            // 将所有的节点设置成选中状态
            const { isCheck } = item.getData()
            item.setData({
                isCheck: !isCheck
            })
        })
    }
    if(connectEdges && connectEdges.length > 0){
        connectEdges.forEach( item => {
            if(item && item.id){
                item.setAttrs({
                    line: {
                        stroke: '#788096',
                        strokeDasharray: 0,
                        style: {
                            animation: 'node',
                        },
                    },
                })
            }
        })
    }
    activeNode = null
    nodeArr = []
    connectEdges = []
}
// 初始化画布，且节点绑定点击事件
onMounted(() => {
    let newGraph = creatGraph()
    //将画布内容中心与视口中心对齐。如果不能通过滚动来对齐，则自动为 Scroller 的容器增加一定的 padding 边距来强制对齐。
    // newGraph.centerContent()
    // 根据数据渲染节点和边
    openWorker(newGraph)
    // 给画布上的节点绑定点击事件
    newGraph.on('node:click', ({ node }) => {
        // 当前选中的节点，且抽屉产开
        nodeData.value = node.data
        visible.value = true

        selectNode(newGraph, node)
    })
})

</script>
<style lang="less">
#chart-page {
    width: 100%;
    height: 100%;
}
.box-info{
    .title{
        color: #fff;
        font-size: 14px;
    }
    .data-line{
        font-size: 12px;
        line-height: 24px;
        span{
            color: #B6BCCD;
        }
    }
    .button{
        text-align: right;
        cursor: pointer;
        color: #5F95FF;
    }
}
// .keyframes(@keyframesName){
//     @keyframes @keyframesName {
//       to {
//         stroke-dashoffset: -1000;
//     }
//     }
// };

// /* 调用定义的动画（传入实参name）*/
// .keyframes(ant-line); // 名称
</style>
<style>
@keyframes ant-line {
    to {
        stroke-dashoffset: -1000;
    }
}</style>
