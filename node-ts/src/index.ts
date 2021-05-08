import express, { Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser');
import cookieSession from 'cookie-session';
import './controller/logincontroller';
import './controller/crowllercontroller';
import { router } from './controller/decorator'
// import router from './router';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 实现持久化存储
app.use(cookieSession({
  name: 'session',
  keys: ['sessionTest'],
  maxAge: 24 * 60 * 60 * 1000 // 24 * 60 * 60 * 1000
}))

app.use((req: Request, res: Response, next: NextFunction) => {
  req.myself = '来自自定义中间件'
  next()
})

app.use(router)

app.listen(7001, () => {
  console.log('server is running');
})