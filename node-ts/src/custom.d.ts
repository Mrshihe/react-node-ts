// 解决req类型定义问题
declare namespace Express {
  interface Request {
    myself: string;
  }
}
