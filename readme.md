### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

route("/api/user/registration") POST body {"username":"name","email":"test@test.com","password":"1234567"}
route("/api/user/login") POST body {"email":"test@test.com","password":"1234567"}
route("/api/user/logout") POST body {"email":"test@test.com","password":"1234567"}
route("/api/user/login") POST headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"}
route("/api/user/current") GET headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"}

route("/api/movie?page=1&limit=10&ownerId=1318351273641273") GET headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"}
route(/api/movie) POST headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"} body {"title": "name", "director": "director", "dateRelease": "12-10-2022"}
route(/api/movie/:movieId) GET headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"}
route(/api/movie/:movieId) PATCH headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"} body {"title": "name", "director": "director", "dateRelease": "12-10-2022"}
route(/api/movie/:movieId) DELETE headers {"Authorization":"Bearer q34g2rvv124v12rv2v2rv2rv2vwrgwrgwgr34t"}
