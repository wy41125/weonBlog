<template>
    <div class="demo-info">
        <a-upload
            v-model:file-list="fileList"
            name="file"
            :beforeUpload="beforeUpload"
        >
            <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
            </a-button>
        </a-upload>
    </div>
</template>

<script setup>
import JSZip from 'jszip'
import untar from "js-untar"
import pako from 'pako'
import { ref } from 'vue'

let fileList = ref([])
// 文档上传之前的钩子事件
const beforeUpload = async (file) => {
    // 判断上传文件大小
    const isLt30M = file.size / 1024 / 1024 < 30;
    const isZIP = (file.name).indexOf('.zip') >= 0
    const isTARGZ = (file.name).indexOf('.tar.gz') >= 0
    if(!isLt30M){
        // 文件不允许超过30M
        return false
    }else if(!isZIP && !isTARGZ){
        // 没有上传指定的文件
        return false
    }
    //判断压缩包是否有引擎需要的文件
    if(isTARGZ && !(await forEachTARGZ(file))){
        // 当前附件中缺少必备的文件，需要重新上传
        return false
    }else if(isZIP && !(await forEachZIP(file))){
        // 当前附件中缺少必备的文件，需要重新上传
        return false
    }
}
// 判断zip包有没有start.sh
const forEachZIP = async (file) => {
    let new_zip = new JSZip(), qualified = false
    await new_zip.loadAsync(file).then( async res => {
        const { files } = res
        for(let key in files){
            if((key).indexOf('start.sh') >= 0) {
                qualified = true
            }
        }
    })
    return qualified
}
// 判断tar.gz包有没有start.sh
const forEachTARGZ = async (file) => {
    let qualified = false
    await file.arrayBuffer().then( async res => {
        let arr = null
        let agent = navigator.userAgent.toLowerCase();
        // windows系统
        if(agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0 || agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0){
            arr = untar(res)
        }else{ //iOS linux
            let b = pako.inflate(res)
            arr = untar(b.buffer)
        }
        await arr.progress(function (extractedFile) {
            console.log(extractedFile)
        }).then( async files => {
            await files.forEach(item => {
                if((item.name).indexOf('start.sh') >= 0) {
                    qualified = true
                }
            })
        })
    })
    return qualified
}
</script>

<style lang="less" scoped>
.project-info{
    width: 100%;
    margin-top: 24px;
    height: calc(100% - 120px - 24px);
    overflow: hidden;
    padding-bottom: 80px;
    position: relative;
    .center-box{
        height: 100%;
        width: 100%;
        overflow: auto;
       
        .form-item{
            display: inherit;
        }
        .formBox{
            height: 100%;
            width: 100%;
            padding: 24px;
            background: var(--global-cardBackground-color);
        }
    }
    .footer-box{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        padding: 12px 24px;
        background-color: var(--global-cardBackground-color);
        text-align: center;
        .btn{
            width: 88px;
            height: 32px;
            margin-left: 24px;
        }
    }
}
</style>