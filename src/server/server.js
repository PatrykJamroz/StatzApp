const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.json({ data: true });
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const listener = app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
