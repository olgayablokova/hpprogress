const ws = require('ws')

const messages = [
    {
        id: '1',
        creationTime: '2022-01-01 12:01:01.321531',
        changeTime: '2022-01-01 12:01:01.321531',
        status: 'Active',
        side: 'Buy',
        prise: '8.559',
        amount: '500000.00',
        instrument: 'CNH/RUB',
    },
    {
        id: '2',
        creationTime: '2022-01-01 12:01:01.000156',
        changeTime: '2022-01-01 12:01:01.000156',
        status: 'Filled',
        side: 'Sell',
        prise: '8.570',
        amount: '10000.00',
        instrument: 'CNH/RUB',
    },
    {
        id: '3',
        creationTime: '2022-01-01 13:30:01.943532',
        changeTime: '2022-01-01 13:30:01.943532',
        status: 'Active',
        side: 'Buy',
        prise: '64.015',
        amount: '350000.00',
        instrument: 'EUR/RUB',
    },{
        id: '4',
        creationTime: '2022-01-01 14:10:31.321221',
        changeTime: '2022-01-01 14:10:31.321221',
        status: 'Active',
        side: 'Buy',
        prise: '1.04459',
        amount: '50000.00',
        instrument: 'EUR/USD',
    },{
        id: '5',
        creationTime: '2022-01-01 14:55:20.122500',
        changeTime: '2022-01-01 14:55:20.122500',
        status: 'Rejected',
        side: 'Sell',
        prise: '61.72',
        amount: '60000.00',
        instrument: 'USD/RUB',
    },{
        id: '6',
        creationTime: '2022-01-01 15:47:51.742312',
        changeTime: '2022-01-01 15:47:51.742312',
        status: 'Cancelled',
        side: 'Sell',
        prise: '3.2777',
        amount: '200000.00',
        instrument: 'TRY/RUB',
    },{
        id: '7',
        creationTime: '2022-01-01 12:01:01.321531',
        changeTime: '2022-01-01 12:01:01.321531',
        status: 'Cancelled',
        side: 'Sell',
        prise: '3.2778',
        amount: '300000.00',
        instrument: 'TRY/RUB',
    },{
        id: '8',
        creationTime: '2022-01-01 17:59:35.152421',
        changeTime: '2022-01-01 17:59:35.152421',
        status: 'Filled',
        side: 'Buy',
        prise: '25.1763',
        amount: '700000.00',
        instrument: 'BYN/RUB',
    },{
        id: '9',
        creationTime: '2022-01-01 18:46:25.5351255',
        changeTime: '2022-01-01 18:46:25.5351255',
        status: 'Filled',
        side: 'Buy',
        prise: '8.559',
        amount: '500000.00',
        instrument: 'BYN/RUB',
    },
];

const wss = new ws.Server({
    port: 5001
}, () => console.log('server start'))

wss.on('connection', (socket) => {
    messages.forEach((message) => {
        socket.send(JSON.stringify(message));
    });
    socket.on('message', (message) => {
        wss.clients.forEach(client => {
            client.send(message)
        })
    });
});