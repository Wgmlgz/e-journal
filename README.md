Запуск:
- Установить node.js
- Установить MongoDb (вот гайд: https://zellwk.com/blog/local-mongodb/)
- Создать базу с названием e-test (в гайде называлать game-of-thrones), заполнять пока не надо
- Открыть MongoDB Compass и создать 2 коллекциии lessons и users и импортировать lessons.json и users.json (логины совпадают с паролями) или сделать в ручную, регистрируя пользователей и создавая уроки (но нужно будет в базе сделать какого-то пользователя админом, поставив admin: true)
- Открыть 2 терминала
- 1 терминал
  - `cd client`
  - `npm i`
  - `npm start`
- 2 терминал
  - `cd server`
  - `npm i`
  - `npm start`
- В браузере идем по `http://localhost:3000/`
- Готово 
