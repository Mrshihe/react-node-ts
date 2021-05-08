// ts无法直接引用js
// 使用 翻译文件 .d.ts 
// 此处安装 npm install @types/superagent -D
import superagent from 'superagent';
import cheerio from 'cheerio'

import fs from 'fs';
import path from 'path';

interface HouseItem {
  title: string;
  price: number;
  address: string;
  tag: string[];
  img: string | undefined;
}

// 定义一个爬虫类
class Crowller {
  constructor(private url: string){
    this.getRawHtml()
  }

  async getRawHtml(){
    const rawHtml = await superagent.get( this.url )
    const $ = cheerio.load(rawHtml.text);
    const courseItems = $('.zu-itemmod');
    const courseArray: HouseItem[] = []
    courseItems.map((index, element) => {
      const title = $(element).find('.zu-info .strongbox').text();
      const price = Number($(element).find('.zu-side .strongbox').text());
      const address = $(element).find('.zu-info address').text().replace(/[\r\n]/g,"").replace(/^\s*/g,"").replace(/\s*$/g,'').replace(/\s+/g," ");
      let tag: string[] = []
      $(element).find('.details-item.bot-tag span').map((i,ele) => {
        tag.push( $(ele).text() )
      })
      const img = $(element).find('img.thumbnail').attr('lazy_src');
      courseArray.push({
        title,price,address,tag,img
      })
    });
    console.log( courseArray )
  }
}

const crowller = new Crowller('https://bj.zu.anjuke.com')
export default Crowller;
