import fs from 'fs';
import path from 'path';
// ES7的一个提案，它主要用来在声明的时候添加和读取元数据
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, use, get, post } from './decorator';
import { getResponseData } from '../utils/util';

import Crowller from '../utils/crowller';
import Analyzer from '../utils/analyzer';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: Request, res: Response, next: NextFunction):void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

@controller('/api')
class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void{
    const url = 'https://bj.zu.anjuke.com';
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer)
    res.json(getResponseData(true))
  }
  @get('/showData')
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void{
    try{
      const positon = path.resolve(__dirname, '../../data/data.json');
      const result = fs.readFileSync(positon, 'utf-8');
      res.json(getResponseData(JSON.parse(result)))
    }catch(e){  
      res.json(getResponseData(false,'数据不存在'))
    }
  }
}