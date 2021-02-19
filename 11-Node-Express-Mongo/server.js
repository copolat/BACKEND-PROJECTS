/*** Required External Modules */
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.json())

/*** App Variables and configuration*/
app.use(bodyParser.urlencoded({ extended: true }))

/** Database Connection with request handlers*/
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://copolat:JDvPpkl8jTuXlrh0@cluster0.nxv3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('info')
  const quotesCollection = db.collection('info')
  //app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
  //app.post('/name', (req, res) => console.log('HELLO from POST'))
  //app.post('/name', (req, res) => console.log(req.body))

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.get('/', (req, res) => {
    console.log('get method works!!')
    quotesCollection.find().toArray()
    .then(result => {
      console.log(result)
      res.render('index.pug',{ quotes: result })
    })
    .catch(error => console.error(error))
    // ...
  })

  app.put('/quotes', (req, res) => {
    console.log(req.body)
    quotesCollection.findOneAndUpdate(
      { name: 'Coskun' },		// write it manually from your quotes
      {
        $set: {
          name: req.body.name,
          lastname: req.body.lastname,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
    .then(result => {
      res.json('Success')
     })
      .catch(error => console.error(error))
  })
  app.delete('/quotes', (req, res) => {
    console.log(req.body)
    quotesCollection.deleteOne(
      { name: req.body.name }
    )
    .then(result => {
      res.json('Success')
     })
      .catch(error => console.error(error))
  })
  
  
  
  
  

  app.listen(port, () => console.log(`Example app listening on port port!`))
})
.catch(error => console.error(error))









