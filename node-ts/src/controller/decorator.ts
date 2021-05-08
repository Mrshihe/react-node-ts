import { RequestHandler, Router } from 'express';

export const router = Router();

enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}

export function controller(root: string) {
  return function(target: new (...args: any[]) => any){
    for (let key in target.prototype) {
      // 根据元数据 动态生成路由
      const path = Reflect.getMetadata('path', target.prototype, key)
      const method:Methods = Reflect.getMetadata('method', target.prototype, key)
      const handler = target.prototype[key]
      const middlewares = Reflect.getMetadata('middlewares', target.prototype, key)
      if(path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        middlewares ? router[method](fullPath, ...middlewares, handler) : router[method](fullPath, handler)
      }
    }
  }
}

// 封装多种请求方式
function getRequestDecorator(type: Methods) {
  return function(path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}
export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
export const put = getRequestDecorator(Methods.put);
export const del = getRequestDecorator(Methods.delete);

// 将中间件注册到元数据里
export function use(middleware: RequestHandler) {
  return function(target: any, key: string) {
    // 处理使用多个中间件的情况
    const middlewaresArr = Reflect.getMetadata('middlewares', target, key) || []
    middlewaresArr.push(middleware)
    Reflect.defineMetadata('middlewares', middlewaresArr, target, key)
  }
}

// export function get(path: string) {
//   // 利用装饰器插入元数据
//   return function(target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//   };
// }
