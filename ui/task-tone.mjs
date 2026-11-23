import {late,onTime} from './task-metrics.mjs';
export const taskTone=(t,now)=>t.status==='done'?(onTime(t)?'onTime':'done'):t.status==='help'?'help':['open','waiting'].includes(t.status)&&late(t,now)?'late':'other';
