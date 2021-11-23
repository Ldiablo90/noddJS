var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var _queryData = url.parse(_url, true).query;
    var _title = _queryData.id;
    if (_url == '/') {
        _title = 'hello word';
    }
    if (_url == '/favicon.ico') {
        return response.writeHead(404);
    }
    response.writeHead(200);
    
    console.log('description');
    fs.readFile(`./data/${_queryData.id}`, 'utf8', (err, description) => {
        
        var _template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <ul>
            <li ><a href="/?id=html">html</a></li>
            <li ><a href="/?id=css">css</a></li>
            <li ><a href="/?id=javascript">javascript</a></li>
            </ul>
            <div>
            <h2><a href="/">${_title}</a></h2>
    
            ${description}
            </div>
        </body>
        </html>
        `;
        response.end(_template);
    })

});
app.listen(3000);