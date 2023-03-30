# 针对两种情形的流内容处理记录

## 场景一
    场景描述：在我们的项目中，登录的时候有一个图形验证码功能，这个图形实际为一张后台返回的图片，通过get请求接口获取图片流。
    处理方案：
        1.将接口返回的数据设置成返回blob类型：responseType:'blob'

        ```javascript
        axios({
            method:'get',
            url: url[urlStr],
            responseType:'blob'
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
        ```

        2. 将获取到的blob对象，生成base64

        ```javascript
        let a = new FileReader();
        a.onload = function (e) {
            //e.target.result 就是图片的base64码
            // e.target.result
        }
        a.readAsDataURL(res);
        ```

## 场景二
    场景描述：前端通过接口请求，后台返回excel文档流，并下载到本地。
    处理方案：
        1. 接口请求应答设置： responseType: 'arraybuffer'
   
        ```javascript
        axios.post(url[urlStr], formData, { responseType: 'arraybuffer' })
        .then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
        ```

        2. 将获取到的文档流创建成blob对象，对象类型为'application/vnd.ms-excel', 并通过a标签实现下载功能

        ```javascript
        axiosUpload(parmas, ajaxUrl).then((res) => {
            //res 为文档流
            if (res) {
                let url = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' })) //处理文档流
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.download = fileName
                document.body.appendChild(link)
                link.click()
            } else {
                message.error('暂无数据，无法导出！')
            }
        })
        ```