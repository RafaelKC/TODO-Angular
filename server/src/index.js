const express = require('express');
//const cors = require('cors');
const bodyParse = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

/* const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
 */
const multipartMiddleware = multipart({ uploadDir: './uploads' })
app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ massage : files })
});

app.get('/downloadExcel', (req, res) => {
    res.download('./upload/report.xlsx');
});

app.get('/downloadPdf', (req, res) => {
    res.download('./upload/report.docx')
});

app.use((err, req, res, next) => {
    res.json({ error: err.massage})
});

app.listen(8000, () => {
    console.log("Iniciado: porta 8000")
});
