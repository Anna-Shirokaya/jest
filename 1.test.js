const  drawTree  = require('./function/tree.js')
const fs = require('fs');
//const { error } = require('console');

afterEach(() => {
    fs.access('1.txt', fs.constants.F_OK, (err) => {
        if (!err) {
          // Если файл существует, удаляем его
          fs.unlink('1.txt', (err) => {
            if (err) {
              console.error('Ошибка при удалении файла:', err);
              return;
            }
            console.log('Файл успешно удален');
          });
        }
    });
    
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const height = getRandomInt(1,1000);


//проверка исключение, передавая строку вместо числа
test('a string instead of a number', async () => {
    try {
      await drawTree('not a number', '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть числом');
    }
  });

  //вызываем функцию, передавая пустое значение вместо числа
  test('a empty instead of a number', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree('', '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть числом');
    }
  });

  //вызываем функцию, передавая отрицательное значение вместо числа
  test('a negative value instead of a number', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(height*(-1), '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

  //вызываем функцию, передавая 0 вместо числа
  test('0 instead of a number', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(0, '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

   //вызываем функцию, передавая 1 вместо числа
   test('height = 1', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(1, '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

  //вызываем функцию, передавая 2, файл должен быть создан
  test('height = 2', async () => {
     await drawTree(2, '12.txt');
      // Проверяем наличие файла
    fs.access('12.txt', fs.constants.F_OK, (err) => {
        if (err) {
            // Если файл не найден, тест не пройдет
            throw new Error('Файл не найден');
        } else {
            // Если файл найден, тест пройдет успешно
            expect(true).toBe(true);
        }
    });
     
     
    
  });

  //вызываем функцию, передавая дробное число
  test('a fractional number instead of an integer', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree(2.7, '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть положительным целым числом');
    }
  });

  //вызываем функцию, передавая спецсимволы вместо числа
  test('special characters instead of an integer', async () => {
    // Вызываем функцию с неправильным аргументом
    try {
      await drawTree('*', '1.txt');
      // Если код дошел до этой строки, то тест не пройдет, так как не выброшено исключение
      throw new Error('Function did not throw an error as expected');
    } catch (error) {
      // Проверяем, что полученное исключение является экземпляром Error
      expect(error).toBeInstanceOf(Error);
      // Проверяем, что сообщение об ошибке соответствует ожидаемому
      expect(error.message).toBe('Параметр height должен быть числом');
    }
  });

  //проверка количества строк в созданном файле
  test('Checking the number of rows', async () => { 
    const nameFile = '1.txt';
    await drawTree(height, nameFile);   
    // Создаем поток для чтения файла
    const readStream = fs.createReadStream(nameFile, { encoding: 'utf8' });
    let lineCount = 0;      

    // Обработка события 'data' - данные доступны для чтения
    readStream.on('data', (chunk) => {
        // Подсчитываем количество строк в очередном куске данных
        lineCount += chunk.split('\n').length - 1;   
        //console.log('Количество получилось:', lineCount);        
    });

    readStream.on('end', () => {
        expect(height+2).toBe(lineCount);        
    }); 
    
})

//проверка при недопустимом имени файла
//Попробуйте записать елочку в файл на максимальной доступной длине пути к файлу.
//проверка, что количество строк в записываемом файле верное
