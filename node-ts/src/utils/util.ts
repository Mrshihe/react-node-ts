interface Result {
  sucesss: boolean;
  errMsg?: string;
  data: any;
}

// 统一定义返回的格式
export const getResponseData = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      sucesss: false,
      errMsg,
      data
    };
  }
  return {
    sucesss: true,
    data
  };
};
