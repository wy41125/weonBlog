## 针对资源使用compression-webpack-plugin插件进行gz压缩，并配置nginx

```
    //引入gzip压缩插件
    const CompressionPlugin = require('compression-webpack-plugin');
    // 配置vue.config.js, 配置plugins
    plugins：[
        new CompressionPlugin({
          //匹配规格
          test: /\.js$|\.html$|\.css$/,
          //文件超过多大进行压缩
          threshold: 10240,
          //是否删除源文件（建议不删除）
          deleteOriginalAssets: false
        })
    ]
```
```
    # Gzip Settings
    gzip on;
    gzip_static on; #当存在.gzip格式的js文件时，优先使用静态文件
    gzip_min_length 10k;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
    gzip_vary on;
    gzip_proxied expired no-cache no-store private auth;
    gzip_disable   "MSIE [1-6]\.";
```