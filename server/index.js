const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const akcje = require('./akcje');
const port = process.env.PORT || 3001;
const app = express();

// parsery 
// Content-type: application/json
app.use(bodyParser.json());

// fix cors
app.use(cors());

// routes - obsługa requestów
//***************************************************
app.use('/', router);

router.get('/apiGET', akcje.getData)

router.post('/apiPostInsert', akcje.postInsert)

router.post('/apiPostSelectParams', akcje.postSelectParams)

router.post('/apiPostSelect', akcje.postSelect)

// server
app.listen(port, () => {
  console.log(`serwer słucha... http://localhost: ${port}`);
});
