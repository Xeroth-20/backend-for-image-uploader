const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

/* port */
const port = process.env.PORT || 3000;

/* filePath */
const filePath = `http://localhost:${port}/upload/image`;

/* multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload/image');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString(16)}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

/* public */
app.use(express.static('public'));

/* cors */
app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

/* routes */
app.post('/upload/image', upload.single('file'), async (req, res) => {
    const fileProperties = {
        ...req.file
    }
    fileProperties.path = `${filePath}/${fileProperties.filename}`;
    console.log(fileProperties.path);
    res.json(fileProperties);
});

/* port and listen*/
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
