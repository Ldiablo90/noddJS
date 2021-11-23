
var readFile = require('fs');
readFile.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});