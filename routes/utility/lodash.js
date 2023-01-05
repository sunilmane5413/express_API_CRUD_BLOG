const express = require('express')
const router = express.Router()
const lodash = require('lodash')
 const { details, groupusers}  = require('../../controller/externalis')
//  const groupusers = require('../../controller/externalis')
//  const details = require('../../controller/externalis')


// use of lodash
router.get('/lodash',(req,res,next)=>{
    const f2 = groupusers('name')
    res.send(f2)
   })

   //

   router.get('/lodash/de',(req,res,next)=>{
      res.send(details)
   })
   
   
   
    // by giving propertyName
    router.get('/lodash/grouped/:propertyName',(req,res,next)=>{
     const f1 = lodash.groupBy(details, req.params.propertyName)
     
     res.send(f1)
    })

  module.exports = router;