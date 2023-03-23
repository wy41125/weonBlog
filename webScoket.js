//引入ws模块
var WebSocket = require('ws');
//创建websocket
var wss = new WebSocket.Server({
    port: 12345
})
//声明客户端客户ID默认为0
var UserID = 0;
//服务端连接
wss.on('connection', (ws)=> {
    //每连接一个用户，客户端ID+1
    UserID++;
    //为客户端添加自定义属性：客户ID
    ws.UserID = UserID;
    //收到了数据
    ws.on('message', function(message) {
        let getMsg = ArrayBufferUTF8ToStr(message);
        console.log('接收到客户的消息', getMsg)
    });
 
    //每隔固定的时间 服务器给全部客户端发送ping消息
    let TimePing = setInterval(() => {
        wss.clients.forEach(item => {
            console.log('当前客户信息======', item)
            item.ping("ping",false,()=>{
                console.log("已发送ping")
            })
        });
    }, 10000);
 
    ws.on('close', ()=> {
        clearInterval(TimePing);//取消当前客户的定时ping
    });
 
});
 
//编码转换
const ArrayBufferUTF8ToStr = (array)=> {
    var out,i,len,c;
    var char2,char3;
    if (array instanceof ArrayBuffer) {
        array = new Uint8Array(array);
    }
    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}