// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const dayjs = require('dayjs');
// const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
// const timezone = require('dayjs/plugin/timezone');
// dayjs.extend(utc);
// dayjs.extend(timezone);

// let date = dayjs(new Date()).tz("America/New_York").format();


// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/operationData', (req, res) => {
//     fs.readFile(path.resolve(__dirname, './src/db/data/hours.json'), 'utf-8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(JSON.parse(data));
//         }
//     });
// });

// app.put('/operationData', (req, res) => {
//     const newData = req.body;

//     fs.writeFile(path.resolve(__dirname, './src/db/data/hours.json'), JSON.stringify(newData, null, 2), 'utf-8', err => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(newData);
//         }
//     });
// });

// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// });
