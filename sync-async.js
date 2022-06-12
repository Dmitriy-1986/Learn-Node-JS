const http = require('http');
const fs = require('fs');//модуль файловой системы fs - file system 

http.createServer((req, res) => {
  let name = require('url').parse(req.url, true).query.name;
  //свойства экпортируемых модулей могут объединяться в цепочки, 
  //что позволяет использовать его функции в одной строке, что часто происходит в модуле url
  //url - единственная цель предоставить инструменты для работы с url адресами
  if (name === undefined) name = 'world!';

  if (name == 'burningbird') {
    let file = 'phoenix5a.webp';
    fs.stat(file, (err, stat) => {
      //fs.stat - метод который проверяет что файл существует, но также возвращает объект с информацией о файле, включающей его размер
      //значение используется для создания заголовка контента
      if (err) {
        console.error(err);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Sorry, Burningbird isn*t around right now \n');
      } else {
        let img = fs.readFileSync(file);//использование синхронной функции readFileSync() вместо асинхронной readFile()
        res.contentType = 'image/webp';
        res.contentLength = stat.size;
        res.end(img, 'binary');
        /* Асинхронная версия кода */
        /* fs.readFile(file, (err, data) {
          res.contentType = 'image/webp';
          res.contentLength = stat.size;
        res.end(img, 'binary');
        }); */
      }
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello ' + name + '\n');
  }
}).listen(8124);

console.log('Server running at port 8124/');
//http://127.0.0.1:8124/?name=burningbird
