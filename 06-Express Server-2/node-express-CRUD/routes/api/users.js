const express = require( 'express' );
const uuid = require('uuid');
const users = require('UsersData.js')
const router=express.Router();

router.get('/', (request, response)=>{
  response.end(users)
});