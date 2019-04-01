import { Temperatures } from '../imports/api/temperatures.js';
import { Meteor } from 'meteor/meteor';
const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

app.post('/', Meteor.bindEnvironment(function(req, res){
  Temperatures.insert({'temp': req.body.temp, 'created_at': new Date(req.body.created_at)})
  res.send(req.body)
}))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
