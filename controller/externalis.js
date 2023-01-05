var lodash = require('lodash')

const details =[
    {id:1,name:'sunil',company:'patheya'},
    {id:2,name:'nil',company:'tcs'},
    {id:3,name:'sunil',company:'patheya'},
    {id:4,name:'tanay',company:'infosys'},
    {id:5,name:'sunil',company:'patheya'},
  ]

  const groupusers = (property)=>{
    const f1 = lodash.groupBy(details,property)
    return f1;
  }

  // first method to export the module
//  module.exports = details;
//  module.exports = groupusers;

// second method to export the module
 module.exports = {details,groupusers}
