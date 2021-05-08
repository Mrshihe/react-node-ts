import fs from 'fs';
import cheerio from 'cheerio';
import { Analyzer } from './crowller';

interface HouseItem {
  title: string;
  price: number;
  address: string;
  tag: string[];
  img: string | undefined;
}

interface CourseResult {
  time: number;
  data: HouseItem[];
}

interface Content {
  [propName: number]: HouseItem[];
}

export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;

  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
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
    return {
      time: new Date().getTime(),
      data: courseArray
    };
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
