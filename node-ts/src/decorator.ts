const userInfo: any = undefined;

function catchError(msg: string) {
  return function(target: any, key: string, descriptor:PropertyDescriptor){
    const fn = descriptor.value
    descriptor.value = function () {
      try {
        fn()
      } catch (error) {
        console.log(`userInfo.${msg} 不存在`)
      }
    }
  }
}

class User {
  @catchError('name')
  getName(){
    return userInfo.name;  
  }
  @catchError('age')
  getAge(){
    return userInfo.age;
  }
  // 没用方法装饰器 比较繁琐
  // getAge () {
  //   try {
  //     return userInfo.age;
  //   } catch (error) {
  //     console.log('userInfo.age 不存在')
  //   } 
  // }
}

const user = new User()
user.getName()
user.getAge()