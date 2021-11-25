module.exports = {
  HTML: function (title, body, list, controll = '') {
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
                ${list}
                <a href="/create">create</a>${controll}
                <div>
                    <h2>${title}</h2>
                    ${body}
                </div>
            </body>
        </html>
        `;
    return resualt;
  },
  list: function (filelist) {
    var list = '<ol>';
    filelist.array.forEach(file => {
      list += `<li><a href="/?id=${file}">${file}</a></li>`;
    });
    list = list + '</ol>';
    return list;
  }
}
