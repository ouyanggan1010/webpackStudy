/* 
   启动服务器指令
        1.npm i nodemon -g
          nodemon server.js
        2.node server.js
    访问：
        http://localhost:3000
*/
const express = require('express');
const app = express();
app.use(express.static('build', { maxAge: 1000 * 3600 }));
app.listen(3000)