const express = require('express')
const kycRoute = require("./routes/kycRoute")
const cors = require('cors');

const app = express()
const port = 5001;


app.use(cors({
  origin: [`http://localhost:${port}`, "https://voting-dapp-inner-bgxl.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))


app.use(express.json());

app.get('/', (req, res) => {
  res.json({message:'Shapater'})
})

app.use('/api/', kycRoute)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})