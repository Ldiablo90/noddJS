var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function makeHTML(title, body, list, controll='') {
    var resualt =
        `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1><a href="/">Page Title</a></h1>
                <ol>${list}</ol>
                <a href="/create">create</a>${controll}
                <div>
                    <h2>${title}</h2>
                    ${body}
                </div>
            </body>
        </html>
        `
    return resualt
}

var app =  http.createServer((request, response) =>{
    var _url = request.url;
    var _queryData = url.parse(_url, true).query;
    var _pathname = url.parse(_url, true).pathname;
    var _template, _title, _description, _filePath, _liList = '', _controll;
    
    
    _filePath = fs.readdirSync('data/', 'utf8', (err, file) => { })
    _filePath.forEach((file) => {
        _liList += `<li><a href="/?id=${file}">${file}</a></li>`;
    })
    
    if (_pathname === '/') {
        _title = 'Welcome';
        _description = 'Hello Node.js';
        if (_queryData.id !== undefined) {
            _title = _queryData.id;
            _description = fs.readFileSync(`data/${_title}`, 'utf8')
            _controll = `
            <a href="/update?id=${_title}">update</a>
            <form action="/delet_process" method="POST"><input type="hidden" name="id" value="${_title}"><input type="submit" value="delete"></form>`;
        }
        _template = makeHTML(_title, _description, _liList, _controll);
        response.writeHead(200);
        response.end(_template);
    }else if(_pathname === '/create'){
        _title = 'Create';
        _description = `
            <form action="/create_process" method="POST">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit"></p>
            </form>
            `;
        _template = makeHTML(_title, _description, _liList);
        response.writeHead(200);
        response.end(_template);
    }else if(_pathname === '/create_process'){
        var body = '';
        request.on('data',(data)=>{
            body += data;
        })
        request.on('end',()=>{
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`,description,'utf8',()=>{
                response.writeHead(302,{location: `/?id=${title}`});
                response.end();
            })
        })
        
    }else if(_pathname === '/update'){
        _title = 'Update';
        var subtitel = '',subdescription='';
        if (_queryData.id !== undefined){
            subtitel = _queryData.id
            subdescription = fs.readFileSync(`data/${subtitel}`, 'utf8', (err, description) => { })
        }
        _description = 
        `
        <form action="/update_process" method="POST">
        <p><input type="hidden" name="id" value="${subtitel}"></p>
        <p><input type="text" name="title" placeholder="title" value="${subtitel}"></p>
        <p><textarea name="description" placeholder="description">${subdescription}</textarea></p>
        <p><input type="submit"></p>
        </form>
        `;
        _template = makeHTML(_title, _description, _liList);
        response.writeHead(200);
        response.end(_template);
    }else if(_pathname === '/update_process'){
        var body = '';
        request.on('data',(data)=>{
            body += data;
        })
        request.on('end',()=>{
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`,`data/${title}`, ()=>{
                fs.writeFile(`data/${title}`,description,'utf8',()=>{
                    response.writeHead(302,{location: `/?id=${title}`});
                    response.end();
                })
            })
        })
        
    }else if(_pathname === '/delet_process'){
        var body = '';
        request.on('data',(data)=>{
            body += data;
        })
        request.on('end',()=>{
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`,()=>{

                response.writeHead(302,{location: `/`});
                response.end();
            })
        })
        
    }else{
        response.writeHead(404);
        response.end('Not found');
    }
    
});
app.listen(3000);