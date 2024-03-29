var http = require('http'); //require - встроеная функция для включения внешних модулей в отдельных файлах

http.createServer((request, response) => { //createServer -  превращает компьютер в http сервер
  response.writeHead(200, {'Content-type': 'text/plain'}); //writeHead - встроеное свойство http которое отправляет заголовок ответа на запрос, добавляет в ответ статусный код и набор заголовков
  response.end('Hello World\n'); //end - сигнализирует серверу, что заголовки и тело ответа установлены, в итоге ответ отсылается клиента. Данный метод должен вызываться в каждом запросе.
}).listen(8080); //listen() чтобы сервер мог прослушивать и обрабатывать входящие подключения

console.log('Server running at port 8080');

//write: пишет в поток ответа некоторое содержимое
//setHeader(name, value): добавляет в ответ один заголовок
//statusMessage: устанавливает сообщение, отправляемое вместе со статусным кодом
//statusCode: устанавливает статусный код ответа
//метод listen()  чтобы сервер мог прослушивать и обрабатывать входящие подключения, в который в качестве параметра передается номер порта, по которому запускается сервер.
