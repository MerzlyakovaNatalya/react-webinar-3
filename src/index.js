import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';
import { generator } from './utils.js';

const store = new Store({
  list: [
    {code: generator(), title: 'Название элемента'},
    {code: generator(), title: 'Некий объект'},
    {code: generator(), title: 'Заголовок'},
    {code: generator(), title: 'Очень длинное название элемента из семи слов'},
    {code: generator(), title: 'Запись'},
    {code: generator(), title: 'Шестая запись'},
    {code: generator(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
