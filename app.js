const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/index.html'));
});
app.get('/static/main.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/main.js'));
});

app.listen(8080, () => console.log('Express app listening on port 8080'));