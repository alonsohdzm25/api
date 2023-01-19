const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv').config();

require('./database')

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'))
app.listen(process.env.PORT);

console.log("Server on Port ", 3000);