const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Página Inicial!'));

app.get('/produtos', (req, res) => {
    const produtos = [
        {
            id: 1,
            nome: 'martelo',
        },
        {
            id: 2,
            nome: 'chave de fenda',
        },
        {
            id: 3,
            nome: 'alicate de corte',
        },
    ];

    res.json(produtos);
});

app.listen(port, () => console.log(`App rodando na porta ${port}!`));