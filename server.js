const express = require(express);
const productRoutes = require('./routes');

//Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//APP
const app = express();
app.use(express.json()); //NOTE: bodyParser대신 express 4.16.0 버전 부터는 express에 들어있는 내장 미들웨어 함수로 bodyParser 모듈을 대체해 줄 수 있다.
app.use('/api/products/', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
