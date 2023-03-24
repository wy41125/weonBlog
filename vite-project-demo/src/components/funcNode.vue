<template>
    <div class="node-box">
        <!-- <svg-icon type="function_icon" size="16" class="node-icon"/> -->
        <span class="label" :style="isCheck ? 'border-color: #298CFF;color: #298CFF；background-color: #132642' : ''">{{ node.data.name }}</span>
    </div>
</template>
<script setup>
import { inject, ref } from 'vue';
// import SvgIcon from '@/components/fuzzing/Icon.vue'
const getNode = inject('getNode')
const node = getNode()

let isCheck = ref(node.data.isCheck)
// 监听数据更新
node.on("change:data", ({ current }) => {
    isCheck.value = current.isCheck
})

</script>
<style lang="less" scoped>
.node-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #22273b;
    position: relative;
    &.isCheck{
        color: red;
    }
    // .node-icon{
    //     color: #515151;
    //     flex-shrink: 0;
    //     margin-left: 8px;
    // }
    .label{
        width: 100%;
        height: 100%;
        line-height: 38px;
        display: inline-block;
        text-align: center;
        flex-shrink: 0;
        border: 1px solid #788096;
        border-radius: 100%;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        // margin-left: 8px;
        color: #788096;
        font-size: 12px;
    }
    &:hover{
        .hover-box{
            display: block;
        }
    }
    .hover-box{
        position: absolute;
        top: 36px;
        padding-top: 14px;
        left: 0;
        z-index: 100000;
        display: none;
        .box-info{
            position: relative;
            background-color: #25253a;
            padding: 8px 14px;
            border-radius: 4px;
            max-width: 400px;
            &::after{
                content: "";
                position: absolute;
                width: 14px;
                height: 14px;
                background-color: #25253a;
                transform: rotate(45deg) translateY(-50%);
                left: 50%;
                top: -2px;
            }
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
    }
}
</style>