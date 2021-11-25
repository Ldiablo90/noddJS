var testfolder = './data';
var fs = require('fs');

fs.readdir(testfolder,(err,files)=>{
console.log(files)
})

