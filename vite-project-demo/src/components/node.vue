<template>
    <div class="node-box">
        <img class="img" :src="icon" alt="" />
        <span class="label">{{ node.data.func_name }}</span>

        <div class="hover-box">
            <div class="box-info">
                <p class="title">{{ node.data.func_name }}</p>
                <p class="data-line"> <span>代码位置：</span> 代码位置123行</p>
                <p class="data-line"> <span>函数复杂度：</span> 123</p>
                <p class="data-line"> <span>缺陷数：</span> 65</p>
                <p class="data-line"> <span>测试次数：</span> 87</p>
                <a-button class="button"> 新建测试</a-button>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue';
const icon = require('@/assets/Function.png')
const getNode = inject('getNode')

const node = getNode()
console.log('++++++++++++++++++', node)
</script>
<style lang="less" scoped>
.node-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #c2c8d5;
    border-left: 4px solid #5F95FF;
    position: relative;
    .img{
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        margin-left: 8px;
    }
    .label{
        display: inline-block;
        flex-shrink: 0;
        width: 128px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        margin-left: 8px;
        color: #666;
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
        display: none;
        .box-info{
            position: relative;
            background-color: #25253a;
            padding: 8px 14px;
            border-radius: 4px;
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