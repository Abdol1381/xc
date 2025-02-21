const WebSocket = require('ws');
// const { address1 } = require('./useWebSockets'); // (آدرس خود را از useWebSockets.js دریافت کنید)
const { address1 } = require('../../../customHooks/useWebSockets')

const port = 3000; // پورت سرور

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('A user connected');

    ws.on('message', (data) => {
        console.log('Received message:', data);
        // (پیام دریافتی را مدیریت کنید)
        ws.send('Message received from client!'); // (پیامی به کلاینت ارسال کنید)
    });

    ws.on('close', () => {
        console.log('A user disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log(`WebSocket server listening on port ${port}`);
