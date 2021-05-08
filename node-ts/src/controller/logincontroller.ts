// ES7的一个提案，它主要用来在声明的时候添加和读取元数据
import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from './decorator';
import { getResponseData } from '../utils/util';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/api')
class LoginController {
  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response){
    const isLogin = !!(req.session ? req.session.login : false);
    res.json(getResponseData(isLogin))
  }
  @post('/login')
  login(req:BodyRequest, res: Response){
    const { password } = req.body;
    console.log( req.body )
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
      res.json(getResponseData(false, '已经登陆过'));
    } else {
      console.log(password)
      if (password == '1q2w' && req.session) {
        req.session.login = true;
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, '登陆失败'));
      }
    }
  }
  @get('/logout' )
  logout(req: BodyRequest, res: Response) {
    if(req.session){
      req.session.login = undefined
    }
    res.json(getResponseData(true));
  }

  // @get('/')
  // home(req: BodyRequest, res: Response){
  //   const isLogin = !!(req.session ? req.session.login : false);
  //   if (isLogin) {
  //     res.send(`
  //     <html>
  //       <body>
  //         <a href='/getData'>爬取内容</a>
  //         <a href='/showData'>展示内容</a>
  //         <a href='/logout'>退出</a>
  //       </body>
  //     </html>
  //   `);
  //   } else {
  //     res.send(`
  //     <html>
  //       <body>
  //         <form method="post" action="/login">
  //           <input type="password" name="password" />
  //           <button>登陆</button>
  //         </form>
  //       </body>
  //     </html>
  //   `);
  //   }
  // }
}