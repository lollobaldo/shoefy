var QRCode = require('qrcode');
QRCode.toString('I am a pony',{type: 'svg'},function(e,u){ console.log(u); });
