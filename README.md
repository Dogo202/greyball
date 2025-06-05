# Установите Node.js и npm (если еще не установлено)
sudo apt update
sudo apt install -y nodejs npm

# Установите postgre 
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start

# Клонируйте репозиторий и установите зависимости
git clone https://github.com/Dogo202/greyball.git
cd greyball/mma-platform-backend
npm install

#**Создайте бд**
sudo psql -U postgres

CREATE DATABASE mma_db;
CREATE USER mmadev WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mma_db TO mmadev;

Проверьте права на схему
\c mma_db
GRANT ALL ON SCHEMA public TO mma_admin;

#**проверьте ENV**
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=mmadev
DB_PASSWORD=password
DB_DATABASE=mma_db

#**Запуск проекта**
npm run start:dev

Открой в браузере: http://localhost:3000/graphql
Работает GraphQL Playground.


Мутации 
создание весовых категорий
mutation {
  Lightweight: createWeightClass(input: { name: "Lightweight", min_weight: 65.0, max_weight: 70.0 }) { id name }
  Middleweight: createWeightClass(input: { name: "Middleweight", min_weight: 70.1, max_weight: 80.0 }) { id name }
  Heavyweight: createWeightClass(input: { name: "Heavyweight", min_weight: 80.1, max_weight: 120.0 }) { id name }
}

Обновление
mutation {
  updateWeightClass(input: { id: 1, name: "Lightweight Updated" }) {
    id name
  }
}

удаление
mutation {
  removeWeightClass(id: 1)
}

выбор всех
query {
  weightClasses {
    id name min_weight max_weight
  }
}




Создать бойцов (по 3 на каждую категорию)
mutation {
  f1: createFighter(input: { firstName: "Ivan", lastName: "Ivanov", weight: 68 }) { id }
  f2: createFighter(input: { firstName: "Sergey", lastName: "Petrov", weight: 67 }) { id }
  f3: createFighter(input: { firstName: "John", lastName: "Smith", weight: 69 }) { id }

  f4: createFighter(input: { firstName: "Daniyar", lastName: "Tulegenov", weight: 75 }) { id }
  f5: createFighter(input: { firstName: "Alex", lastName: "Johnson", weight: 78 }) { id }
  f6: createFighter(input: { firstName: "Murad", lastName: "Akhmedov", weight: 72 }) { id }

  f7: createFighter(input: { firstName: "Rustam", lastName: "Ibragimov", weight: 90 }) { id }
  f8: createFighter(input: { firstName: "Dmitry", lastName: "Volkov", weight: 95 }) { id }
  f9: createFighter(input: { firstName: "Erzhan", lastName: "Zhaksylykov", weight: 100 }) { id }
}

обновить бойца
mutation {
  updateFighter(input: { id: 1, nickname: "New Nickname" }) {
    id nickname
  }
}

удалить бойца
mutation {
  removeFighter(id: 1)
}

выбрать всех
query {
  fighters {
    id firstName lastName
  }
}




Создать события (events) на 3 дня

mutation {
  day1: createEvent(input: { name: "Grand Prix Day 1", location: "Almaty Arena", date: "2025-07-10", participantIds: [1, 2, 3] }) { id }
  day2: createEvent(input: { name: "Grand Prix Day 2", location: "Almaty Arena", date: "2025-07-11", participantIds: [4, 5, 6] }) { id }
  day3: createEvent(input: { name: "Grand Prix Day 3", location: "Almaty Arena", date: "2025-07-12", participantIds: [7, 8, 9] }) { id }
}

обновить событие
mutation {
  updateEvent(input: { id: 1, name: "Event Updated" }) {
    id name
  }
}

удалить 
mutation {
  removeEvent(id: 1)
}

выбрать все
query {
  events {
    id name location date
  }
}



Создать бои 
mutation {
  fight1: createFight(input: { eventId: 1, fighterRedId: 1, fighterBlueId: 2, winnerId: 1, method: "KO", round: "1", time: "00:30" }) { id }
  fight2: createFight(input: { eventId: 1, fighterRedId: 2, fighterBlueId: 3, winnerId: 3, method: "Decision", round: "3", time: "05:00" }) { id }
  fight3: createFight(input: { eventId: 2, fighterRedId: 4, fighterBlueId: 5, winnerId: 4, method: "Submission", round: "2", time: "02:20" }) { id }
  fight4: createFight(input: { eventId: 2, fighterRedId: 5, fighterBlueId: 6, winnerId: 5, method: "TKO", round: "1", time: "01:45" }) { id }
  fight5: createFight(input: { eventId: 3, fighterRedId: 7, fighterBlueId: 8, winnerId: 7, method: "Decision", round: "3", time: "05:00" }) { id }
  fight6: createFight(input: { eventId: 3, fighterRedId: 8, fighterBlueId: 9, winnerId: 8, method: "KO", round: "2", time: "01:15" }) { id }
}

обновить бой 
mutation {
  updateFight(input: { id: 1, method: "Decision" }) {
    id method
  }
}

удалить бой
mutation {
  removeFight(id: 1)
}

выбрать все бои
query {
  fights {
    id method round time
  }
}


Ранги
mutation {
  r1: createRanking(input: { fighterId: 1, weightClassId: 1, points: 5, position: 1 }) { id }
  r2: createRanking(input: { fighterId: 2, weightClassId: 1, points: 2, position: 2 }) { id }
  r3: createRanking(input: { fighterId: 3, weightClassId: 1, points: 1, position: 3 }) { id }
}

обновить запись ранга
mutation {
  updateRanking(id: 1, input: { points: 10, position: 2 }) {
    id points position
  }
}

Удалить
mutation {
  removeRanking(id: 1)
}

выбрать все
query {
  rankings {
    id points position
  }
}





