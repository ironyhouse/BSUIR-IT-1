function Vigenere() {
    this.encode = function (inputText, inputKey) {
        // Алфавит взят без буквы Ё
        let arrAlphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];
        let key = [];
        let outText = [];

        // Преобразование текста
        inputText = inputText.toUpperCase().replace (/[^А-Я]+/g, '').split('');
        inputKey = inputKey.toUpperCase().split('');

        let gist1 = {};//построение гистограмм
        let gist2 = {};
        for (let i = 0; i < arrAlphabet.length; i++) {
            gist1[arrAlphabet[i]] = 0;
            gist2[arrAlphabet[i]] = 0;
        }

        // Шифрование
        // Составляем ключ на основе полученных данных
        if ( inputKey.length < inputText.length) {
            key = inputKey.concat(inputText);
            key.splice( -inputKey.length , inputKey.length);
        } else {
            let lnng =  inputKey.length - inputText.length;
            inputKey.splice( -lnng , lnng);
            key = inputKey;
        }
        // Алгоритм
        for (let i = 0; i < inputText.length; i++) {
            gist1[inputText[i]]++;
            let shiftNumb = arrAlphabet.indexOf(inputText[i]);
            let keyNumb = arrAlphabet.indexOf(key[i]);
            let searchKey = arrAlphabet[(shiftNumb + keyNumb) % 32];
            gist2[arrAlphabet[(shiftNumb + keyNumb) % 32]]++;
            outText.push(searchKey);
        }

        let divs = document.querySelectorAll('#g1 div');
        let val = Object.values(gist1);

        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
        }
        let maxValue = getMaxOfArray(val);


        

        let divs2 = document.querySelectorAll('#g2 div')
        let val2 = Object.values(gist2);

        for (let i = 0; i < divs.length; i++) {//вывод гистограмм 
            divs[i].firstChild.innerText = val[i] + ' ' + arrAlphabet[i];
            divs[i].style.height = val[i] * 300 / maxValue + 'px';

            divs2[i].firstChild.innerText = val2[i] + ' ' + arrAlphabet[i];
            divs2[i].style.height = val2[i] * 300 / maxValue + 'px';
        }
        // Запись в файл
        outText = outText.join('');


        const saveTextFile = function (content) {
            const a = document.createElement('a'); // создаём элемент для инициации скачивания файла далее
            const blob = new Blob([content], {type: 'text/plain'}); // создаём бинарный объект
          
            a.style = 'display: none'; // делаем элемент-ссылку невидимой
            const url = window.URL.createObjectURL(blob); // создаём ссылку на бинарный объект
            a.href = url; // устанавливаем элементу-ссылке ссылку на файл
            a.download = 'result.txt'; // включаем загрузку файла по клику и задаём имя скачиваемого файла
            document.body.appendChild(a); // добавляем ссылку на файл в DOM-дерево документа
            a.click(); // эмулируем клик по ссылку
            document.body.removeChild(a); // ссылка более не нужна, удаляем её из DOM-дерева документа
            window.URL.revokeObjectURL(url); // очищаем ссылку на бинарный файл
          };
          saveTextFile(outText)

        return outText;  
    };
    this.decode = function (inputText, inputKey) {
        let arrAlphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];
        let key = [];
        let outText = [];
        
        // Преобразование текста
        inputText = inputText.toUpperCase().replace (/[^А-Я]+/g, '').split('');
        inputKey = inputKey.toUpperCase().split('');

        
        // деШифрование
        // Составляем ключ на основе полученных данных
        if ( inputKey.length < inputText.length) {
            key = inputKey;
        } else {
            let lnng =  inputKey.length - inputText.length;
            inputKey.splice( -lnng , lnng);
            key = inputKey;
        }

        // Алгоритм
        key = inputKey;
        for (let i = 0; i < key.length; i++) {
            let shiftNumb = arrAlphabet.indexOf(inputText[i]);
            let keyNumb =  arrAlphabet.indexOf(key[i]);
            let searchKey = arrAlphabet[(32 - keyNumb + shiftNumb) % 32];
            outText.push(searchKey);
        }
        let j = 0;
        for (let i = key.length; i < inputText.length; i++) {
            let shiftNumb = arrAlphabet.indexOf(inputText[i]);
            let keyNumb =  arrAlphabet.indexOf(outText[j]);
            let searchKey = arrAlphabet[(32 - keyNumb + shiftNumb) % 32];
            j++;
            outText.push(searchKey);
        }
        // Запись в файл
        outText = outText.join('');


        const saveTextFile = function (content) {
            const a = document.createElement('a'); // создаём элемент для инициации скачивания файла далее
            const blob = new Blob([content], {type: 'text/plain'}); // создаём бинарный объект
            
            a.style = 'display: none'; // делаем элемент-ссылку невидимой
            const url = window.URL.createObjectURL(blob); // создаём ссылку на бинарный объект
            a.href = url; // устанавливаем элементу-ссылке ссылку на файл
            a.download = 'result.txt'; // включаем загрузку файла по клику и задаём имя скачиваемого файла
            document.body.appendChild(a); // добавляем ссылку на файл в DOM-дерево документа
            a.click(); // эмулируем клик по ссылку
            document.body.removeChild(a); // ссылка более не нужна, удаляем её из DOM-дерева документа
            window.URL.revokeObjectURL(url); // очищаем ссылку на бинарный файл
        };
        saveTextFile(outText)

        return outText;
    } 
}


//Вызов функции
let machine = new Vigenere();
let buttonEncode = document.querySelector('#encodeButton');
let buttonDecode = document.querySelector('#decodeButton');
buttonEncode.addEventListener('click', () => {
    let inputKey = eKey.value;
    let inputText = eText.value;
    eTextOut.value = machine.encode(inputText, inputKey);
});

buttonDecode.addEventListener('click', () => {
    let inputKey = dKey.value;
    let inputText = dText.value;
    dTextOut.value = machine.decode(inputText, inputKey);
});



//Чтение из файла
function readFileEncode(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        eText.value = reader.result;
    };

    reader.onerror = function () {
        eText.value = reader.error;
    };
}
function readFileDecode(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        dText.value = reader.result;
    };

    reader.onerror = function () {
        dText.value = reader.error;
    };
}


































// form.addEventListener('submit', function (ev) { // навешиваем свой обработчик на отправку формы
//     ev.preventDefault() // отключаем стандартное поведение отправки формы
//     processForm(
//       ev.target.querySelectorAll('input')[0], // получаем ссылку на файл
//       ev.target.querySelectorAll('input')[1] // получаем ссылку на кодовое слово
//     ) // инициируем обработку файла
//   });


// const readFileContent = function(file) {
//     const reader = new FileReader()
//     return new Promise((resolve, reject) => {
//       reader.onload = event => resolve(event.target.result)
//       reader.onerror = error => reject(error)
//       reader.readAsText(file)
//     });
//   }

//   const saveTextFile = function (content) {
//     const a = document.createElement('a'); // создаём элемент для инициации скачивания файла далее
//     const blob = new Blob([content], {type: 'text/plain'}); // создаём бинарный объект
  
//     a.style = 'display: none'; // делаем элемент-ссылку невидимой
//     const url = window.URL.createObjectURL(blob); // создаём ссылку на бинарный объект
//     a.href = url; // устанавливаем элементу-ссылке ссылку на файл
//     a.download = 'result.txt'; // включаем загрузку файла по клику и задаём имя скачиваемого файла
//     document.body.appendChild(a); // добавляем ссылку на файл в DOM-дерево документа
//     a.click(); // эмулируем клик по ссылку
//     document.body.removeChild(a); // ссылка более не нужна, удаляем её из DOM-дерева документа
//     window.URL.revokeObjectURL(url); // очищаем ссылку на бинарный файл
//   };


//   const processForm = function(fileInput, keywordInput) {
//     // валидируем файл
//     // if (!('files' in fileInput && fileInput.files.length > 0)) {
//     //   alert('Не выбран файл для шифрования')
//     //   return
//     // }
  
//     // удаляем все невалидные символы (не из целевого алфавита)
//     // const keyword = keywordInput.value.replace(new RegExp("\\W", 'g'), '');
//     // if (!(typeof keyword === 'string' && keyword.length > 0)) {
//     //   alert('Не заполнено ключевое слово')
//     //   return
//     // }
//     // keywordInput.value = keyword; // заполняем поле нормализованным значением ключевого слова
  
//     // отправляем файл на обработку, если всё в порядке
//     readFileContent(fileInput.files[0]).then(content => {
//       const result = encryptPorto(content, keyword)
//       saveTextFile(result)
//     }).catch(error => console.log(error))
//   }