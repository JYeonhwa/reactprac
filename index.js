const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User } = require("./models/User")

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err))





app.get('/', (req, res) => res.send('Hello World!! 안녕하세요'))

app.post('/register', (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그것을 DB에 넣어준다.
  const user = new User(req.body)
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  }) //save는 mongoDB의 메소드
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))