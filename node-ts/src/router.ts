import { Router, Request, Response, NextFunction } from 'express';
import { getResponseData } from './utils/util';
import Crowller from './crowller';

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

const router = Router();

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};


router.get('/', (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>登陆</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.get('/logout', (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true));
});

router.post('/login', (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(false, '已经登陆过'));
  } else {
    if (password === '1q2w' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登陆失败'));
    }
  }
});

router.post('/getData', checkLogin, (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  if(password === '1q2w'){
    res.send('get is success')
  }else{
    res.send(`${req.myself}password Error!`)
  }
  // const url = 'https://bj.zu.anjuke.com'
  // const crowller = new Crowller(url)
  // console.log( crowller.getRawHtml() )
  // res.send('get')
})

export default router;