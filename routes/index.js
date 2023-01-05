var express = require('express');
var router = express.Router();
var lodash = require('lodash')
var moment = require('moment')
moment().format()

// normal get method
router.get('/get',(req,res,next)=>{
  res.send('HELLO WORLD')
})

// 
router.get('/get/m',(req,res,next)=>{
      const message ={
        Error:false,
        message:"here is details of students",
        data: details
      }
      res.send(message)
    
    })

// with parameter 
router.get('/get/:id',(req,res,next)=>{
  res.send('MY NAME IS -' + req.params.id)
})

// multiple paramters
router.get('/get/:id/:name/:age',(req,res,next)=>{
  res.send( req.params)
})

const details =[
  {id:1,name:'sunil',company:'patheya'},
  {id:2,name:'nil',company:'tcs'},
  {id:3,name:'sunil',company:'patheya'},
  {id:4,name:'tanay',company:'infosys'},
  {id:5,name:'sunil',company:'patheya'},
]

// returning array as response
router.get('/aray',(req,res,next)=>{
  res.send(details)
})

// keys of array
router.get('/aray/keys',(req,res,next)=>{
  res.send(Object.keys(details[0]))
})

// values of aray
router.get('/aray/values',(req,res,next)=>{
  res.send(Object.values(details[0]))
})

// returning aray data by giving specific id
router.get('/aray/values/:id',(req,res,next)=>{
 const f2 = details.find(c => c.id === parseInt(req.params.id))
 if(!f2) res.status(404).send('ENTER THE VALID ID ')
 res.send(f2)
})

// use of lodash
router.get('/lodash',(req,res,next)=>{
 const f1 = lodash.groupBy(details,'name')
 res.send(f1)
})

// grouped by compnay
router.get('/lodash/company',(req,res,next)=>{
  const f1 = lodash.groupBy(details,'company')
  res.send(f1)
 })

 // by giving propertyName
 router.get('/lodash/grouped/:propertyName',(req,res,next)=>{
  const f1 = lodash.groupBy(details, req.params.propertyName)
  
  res.send(f1)
 })

 // moment
 router.get('/moment',(req,res,next)=>{
  const f2 = moment().dayOfYear(12)
  res.send(f2)
  
})

// post method
router.post('/postMethod',(req,res,next)=>{
  const inputData = req.body
  res.json(inputData)
}

)

// post method, clone new object in post method by using spread operator
router.post('/post',(req,res,next)=>{
  const inputPay = req.body
  console.log('input passed as -' ,inputPay)
 
  let cloneOfInput = {...inputPay}
  cloneOfInput.createdAt = new Date()   // we can use moment here also

  res.json(cloneOfInput)
})

// post method for adding data into  array details 
router.post('/addData',(req,res,next)=>{
  const add = {
    id:details.length + 1,
    name:req.body.name,
    company:req.body.company
  }
  details.push(add)
  res.send(details)
})

// post method with some conidtions
router.post('/addData/condition',(req,res,next)=>{
if(!req.body.name || req.body.name.length < 3){
  res.status(500).send('name is required and characters should be more than 3')
}

  const add = {
    id:details.length + 1,
    name:req.body.name,
    company:req.body.company
  }
  details.push(add)
  res.send(details)
})


// delet method - to delet the data form array by giving ID
router.delete('/delet/:id',(req,res,next)=>{
  const f1 = details.find(c =>c.id === parseInt(req.params.id))  // we can delete it by giving name and other info
  if(!f1) res.status(404).send('enter the valiD ID')

  const index = details.indexOf(f1)
  details.splice(index,1)
  res.send(details)
})

// put method for updating the data
router.put('/put/:id',(req,res,next)=>{
  let id = parseInt(req.params.id)
  let name = req.body.name

  let index = details.findIndex(c => c.id == id)
  details[index]={
    ...details[index],
    name:name

  }
  console.log('aray is updated succefulyy!')
  res.send(details)
})



 

module.exports = router;
