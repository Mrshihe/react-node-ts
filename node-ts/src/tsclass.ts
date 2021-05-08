// 类的装饰器
// 装饰器本身是一个函数, 接收的参数是构造函数
// 装饰器通过 @ 来使用
// 在类创建的时候执行装饰器


// 写法一，方便理解但是非正规
// function testDecorator(flag: Boolean){
//   // 将装饰器作为返回，可以根据情况来判断返回的装饰器
//   if(flag){
//     return function (constructor: any) {
//       constructor.prototype.getName = () => {
//         console.log('zhua')
//       }
//     }
//   }else{
//     return function (constructor: any) {}
//   }
// }

// @testDecorator(true)
// class Test {}

// const test = new Test();
// // getName 不会自动提示
// (test as any).getName()


// function testDecorator(){
//   return function<T extends new (...args: any[]) => any>(constructor: T){
//     return class extends constructor {
//       name = 'Decorator change name'
//       getName(){
//         return this.name
//       }
//     }
//   }
// }

// const Test = testDecorator()(class {
//   name: string;
//   constructor(name: string){
//     this.name = name
//   }
// })

// const test = new Test('study')
// test.getName()


// 类方法的装饰器
// 类创建的时候执行方法装饰器
// 普通方法 target 对应的是 类的prototype  key 对应的是 装饰对应的方法名
// 静态方法 target 对应的是 类的构造函数
// descriptors 定义或修改的属性描述符 同 Object.defineProperty()的第三个参数
// function getNameDecorator( target: any, key: string, descriptors: PropertyDescriptor) {
//   // 设置方法不可以改写
//   // descriptors.writable = false
//   descriptors.value = function () {
//     // 重写了getName方法
//     return 'descriptors change'
//   }
// }
// class Test {
//   name: string;
//   constructor(name: string) {
//     this.name = name
//   }
//   @getNameDecorator
//   getName(){
//     return this.name
//   }
// }

// const test = new Test('testname')
// console.log( test.getName() )


// 类的访问器的装饰器
// 类创建的时候执行，参数同类方法装饰器一样
// get / set 不能使用同一装饰器
// function visitDecorator(target: any, key: string, descriptors: PropertyDescriptor){
//   // 不能通过set name()重写
//   // descriptors.writable = false 
// }
// class Test {
//   private _name: string;
//   constructor(name: string) {
//     this._name = name
//   }
//   get name(){
//     return this._name
//   }
//   @visitDecorator
//   set name(name: string){
//     this._name = name
//   }
// }
// const test = new Test('a')
// console.log( test.name )


// 类属性装饰器
// target 类的prototype key 属性名
// function nameDecorator(target: any, key: string): any{
//   // target[key] 修改的是原型上的name 不影响实例上的name
//   // target[key] = 'new name'
//   const descriptors: PropertyDescriptor = {
//     writable: false
//   }
//   return descriptors;
// }
// class Test {
//   @nameDecorator
//   // 此时name放在实例上
//   name = 'test name'
// }
// const test = new Test()
// console.log( test.name )


// 参数装饰器
// target 类的原型  key 方法名 paramIndex 参数位置
function paramsDecorator(target: any, method: string, paramIndex: number){

}
class Test {
  getInfo(@paramsDecorator name: string, age: number){
    console.log( name, age )
  }
}
const test = new Test();
test.getInfo('name', 23);