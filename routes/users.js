const e = require('express');
var express = require('express');
const { result } = require('lodash');
var router = express.Router();
var mysql = require('mysql2')

const connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'Pass@5413',
  database:'mydatabase'
})

connection.connect((error)=>{
  if(error){
    console.error(error)
  }
  else{
    console.log('connected to the database "mydatabse" succesfully')
  }
})

// create table 
//   id INT AUTO_INCREMENT PRIMARY KEY [for auto incrementing the ID]
const sql =`
create table employe(
id int ,   
name varchar(50),
role varchar(50),
salary int
);
`
connection.query(sql,(error,result)=>{
  if(error){
    console.error(error)
  }else{
    console.log(result)
  }
})

// table "employe created in database "
// we will insert some data into our table 
connection.query('insert into mydatabase.employe values(3,"nil","developer",30000),(4,"nay","deve",35000)',(error,result)=>{
  if(error){
    console.error(error)

  }else(
    console.log(result)
  )
})

// to get all the data use select * command
connection.query('select * from mydatabase.employe ',(error,result)=>{
  if(error){
    console.error(error)
  }else{
    console.log(result)
  }
})

// to update the data 
connection.query('update mydatabase.employe set name = "raj" where id = 3 ',(error,result)=>{
  if(error){
    console.error(error)
  }else{
    console.log(result)
  }
})

// delet the data 
connection.query('delete from  mydatabase.employe where id = 2',(error,result)=>{
  if(error){
    console.error(error)
  }
  else{
    console.log(result)
  }
})


//  by using CRUD operations  /// for get method we use [select * from ]
router.get('/get/database',(req,res,next)=>{
 connection.query('select * from mydatabase.employe ',(error,result)=>{
  if(error){
    console.error(error)
  }
  else{
    res.json(result)
  }
 })
}) 

// post method  /// for post method we use [insert into .. values ] 
router.post('/post/database',(req,res,next)=>{
connection.query('insert into mydatabase.employe values(6,"mahi","python",45000)',(error,result)=>{
  if(error){
    console.error(error)
  }
  else{
    res.json(result)
  }
})

})

// put method /// for put method we use [update .. set .. where ]
router.put('/put/database',(req,res,next)=>{
  connection.query('update mydatabase.employe set name = "ganu" where id = 5',(error,result)=>{
    if(error){
      console.error(error)
    }
    else{
      res.json(result)
    }
  })
})

// delet method // for delet method we use [delet from ... where ]
router.delete('/delet/database',(req,res,next)=>{
connection.query('delete from mydatabase.employe where id = 3',(error,result)=>{
  if(error){
    console.error(error)
  }
  else{
    res.json(result)
  }
})

})
 


module.exports = router;
