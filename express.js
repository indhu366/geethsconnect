const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')());

app.post('/detect-spam', (req, res) => {
    let userData = req.body.data;

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], 
        args: [JSON.stringify(userData)]
    };

    PythonShell.run('spam_detector.py', options, function (err, results) {
        if (err) throw err;
        res.send({ result: results[0] });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});