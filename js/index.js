// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {

    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    elem = document.createElement('li');

    switch (fruits[i].color) {
      case 'фиолетовый': elem.className = 'fruit__item fruit_violet'; break;
      case 'розово-красный': elem.className = 'fruit__item fruit_carmazin'; break;
      case 'желтый': elem.className = 'fruit__item fruit_yellow'; break;
      case 'светло-коричневый': elem.className = 'fruit__item fruit_lightbrown'; break;
      default: elem.className = 'fruit__item fruit_green'; break; //зеленый по умолчанию
    }

    elem.innerHTML = `
    <div class="fruit__info">
      <div>index: `+i+`</div>
      <div>kind: `+fruits[i].kind+`</div>
      <div>color: `+fruits[i].color+`</div>
      <div>weight (кг): `+fruits[i].weight+`</div>
    </div>`;

    fruitsList.appendChild(elem);

  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [],
      tmp = [...fruits];

  while (fruits.length > 0) {
    
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    result.push(fruits.splice(getRandomInt(0,fruits.length-1),1)[0]);

  }

  //Сравнение изначального массива с результатом
  if (JSON.stringify(result)==JSON.stringify(tmp)) alert('Алерт с предупреждением, что порядок не изменился');

  fruits = result;

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = fruits.filter((item) => document.querySelector('.minweight__input').value <= item.weight && item.weight <= document.querySelector('.maxweight__input').value);
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['фиолетовый', 'зеленый', 'розово-красный', 'желтый', 'светло-коричневый'];
  return priority.indexOf(a.color) > priority.indexOf(b.color);
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparation(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    }
  },

  quickSort(arr, comparation) {

    

  },

  

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    return `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind=='bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.innerHTML = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortTimeLabel.innerHTML = sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput

  if (kindInput.value=='' || colorInput.value=='' || weightInput.value=='') {
    alert('Одно из полей не заполнено');
    return false;
  }

  let newFruit = {
    'kind': kindInput.value,
    'color': colorInput.value,
    'weight': weightInput.value,
  };

  fruits.push(newFruit);

  display();
});
