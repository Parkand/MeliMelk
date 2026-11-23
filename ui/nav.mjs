import {catalog} from '../core/model.mjs';
export const sections={workflow:'مسیرهای پیگیری',home:'امروزِ دفتر',...Object.fromEntries(Object.values(catalog).map(c=>[c.key,c.label])),reports:'گزارش دفتر',team:'اعضای تیم',audit:'دفتر رویدادها'};
export const permitted=(k,role)=>Object.hasOwn(sections,k)&&(k!=='workflow'||['office_manager','admin'].includes(role))&&(role==='admin'||!['contracts','payments','reports','audit','team'].includes(k));
