const fs = require('fs');


async function drawTree(height, filename) {
    
    //проверка, что height число
    if (typeof height !== 'number') {
        throw new Error('Параметр height должен быть числом');
    } 
    //проверка, что height больше 1 и целое
    if (!Number.isInteger(height) || height <= 1 || /[#$%!@^&*()]/.test(height) ) {
        throw new Error('Параметр height должен быть положительным целым числом');
    }     

         
    const writeStream = fs.createWriteStream(filename);
    //отлавливание ошибки при создании потока
    writeStream.on('error', (err) => {
        console.error(`Произошла ошибка при создании потока записи в файл`);
    });

    let tree = '';
    //корона
    tree = (' '.repeat((height)*2 ) + 'W' + '\n')
    //первый этаж
    tree += (' '.repeat((height)*2 ) + '*' + '\n')         
    writeStream.write(tree, 'utf8');   
    for (let i = 1; i < height; i++) {
        if (i%2 == 0){
            let spaces = ' '.repeat((height-i)*2) ;
            let stars = '*'.repeat(i*4 + 1)+ '@';
            tree = (spaces + stars + '\n');
        }
        else {
            let spaces = ' '.repeat((height-i)*2 - 1) + '@';
            let stars = '*'.repeat(i*4 + 1);
            tree = (spaces + stars + '\n' );
        }   
        writeStream.write(tree, 'utf8');
    }
    //ствол дерева
    tree = (' '.repeat((height)*2 -2 ) + 'T'.repeat(5) + '\n');
    tree += (' '.repeat((height)*2 -2 ) + 'T'.repeat(5));
    writeStream.write(tree);  
    writeStream.end();
}

//drawTree(2454,'1346.txt');


module.exports = drawTree;
