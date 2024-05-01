const  drawTree  = require('./function/tree.js')
const fs = require('fs');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const height = getRandomInt(1,1000);

afterEach(() => {
  const filename = '1.txt'; 
  if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
  }
});



//проверка исключение, передавая строку вместо числа
test('a string instead of a number', async () => {
    try {
      await drawTree('not a number', '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть числом');
    }
  });

  //вызываем функцию, передавая пустое значение вместо числа
  test('a empty instead of a number', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree('', '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть числом');
    }
  });

  //вызываем функцию, передавая отрицательное значение вместо числа
  test('a negative value instead of a number', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(height*(-1), '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

  //вызываем функцию, передавая 0 вместо числа
  test('0 instead of a number', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(0, '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

   //вызываем функцию, количество строк =  1 
   test('height = 1', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(1, '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

  //вызываем функцию, передавая дробное число
  test('a fractional number instead of an integer', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(2.7, '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

  //вызываем функцию, передавая спецсимволы вместо числа
  test('special characters instead of an integer', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree('*', '1.txt');
    } catch (error) {
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть числом');
    }
  });

  //проверка количества строк в созданном файле
  test('Checking the number of rows', async () => { 
    const nameFile = '1.txt';
    await drawTree(height, nameFile);   
    const readStream = fs.createReadStream(nameFile, { encoding: 'utf8' });
    let lineCount = 0;      

    // Обработка события 'data' - данные доступны для чтения
    readStream.on('data', (chunk) => {
        lineCount += chunk.split('\n').length - 1;           
    });

    readStream.on('end', () => {
        expect(height+2).toBe(lineCount);        
    }); 
    
})

//проверка при записи в несуществующее место(несуществующий диск)
 
test('error in the file path', async () => {
   await drawTree(125, 'E:\\1346.txt');
   // Проверяем, что файл не был создан
   expect(fs.existsSync('E:\\1346.txt')).toBe(false);
});

