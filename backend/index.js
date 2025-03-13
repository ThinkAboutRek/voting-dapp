const express = require('express')
const kycRoute = require("./routes/kycRoute")
const cors = require('cors');

const app = express()
const port = 5001;


app.use(cors())


app.use(express.json());

app.get('/', (req, res) => {
  res.json({message:'Shapater'})
})

app.use('/api/', kycRoute)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})