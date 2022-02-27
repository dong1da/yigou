import { v4 as uuidv4 } from "uuid";
// 生成易购随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid（本地存储中是否有）
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  // 如果没有生产
  if(!uuid_token) {
    // 生产游客零时身份
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token);
  } 
  // 必须要有返回值，没有返回值就是undefined
  return uuid_token;
}