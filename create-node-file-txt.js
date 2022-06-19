"use strict";

let util = require('util');
let eventEmitter = require('events').EventEmitter;
let fs = require('fs');

function inputChecker (name, file) {
  this.name = name;
  this.writeStream = fs.createWriteStream('./' + file + '.txt',
  {'flags' : 'a',
    'encoding' : 'utf8',
    'mode' : 0o666
  });
} 

util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = function check (input) {
  //Удаление лиших пропусков
  let command = input.trim().substr(0,3);
  //Обработка команды
  //Команда wr: входные данные записываются в файл
  if (command == 'wr:') {
    this.emit('write', input.substr(3, input.length));
  } else if (command == 'en:') {
    this.emit('end');
  } else {
    this.emit('echo', input);
  }
};

//Тестирование нового объекта и обрабтоки событий
let ic = new inputChecker('Shelley', 'newFileTxt');

ic.on('write', function(data) {
  this.writeStream.write(data, 'utf8');
});

ic.on('echo', function(data) {
  process.stdout.write(ic.name + ' wrote' + data);
});

ic.on('end', function () {
  process.exit();
})

//Получение ввода после назначения кодировки
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
  let input = process.stdin.read();
  if (input !== null) {
    ic.check(input);
  }
})




