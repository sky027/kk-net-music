
/**
 * 对象深拷贝
 * @param data {Object}  拷贝对象
 * @return {any[] | {}}   返回拷贝对象
 */
export function deepClone(data) {
  const objClone = Array.isArray(data) ? [] : {}
  if (data && typeof data === 'object') {
    for (const key in data) {
      // 判断ojb属性元素是否为对象，如果是，递归复制
      if (data[key] && typeof data[key] === 'object') {
        objClone[key] = deepClone(data[key])
      } else {
        // 如果不是，简单复制
        objClone[key] = data[key]
      }
    }
  }
  return objClone
}

/**
 * 生成 32位 UUID
 * @returns {string}
 */
export function getUUID() {
  const ID = [];
  const hexDigits = "0123456789ABCDEF";
  for (let i = 0; i < 36; i++) {
    ID[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  ID[14] = "4";
  ID[19] = hexDigits.substr((ID[19] & 0x3) | 0x8, 1);
  ID[8] = ID[13] = ID[18] = ID[23];

  return ID.join("");
}

/**
 * 生成短链随机字符串ID
 * @param len {Number}
 * @return {string}
 */
export function createSortID(len = 8) {
  const keys = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const arr = keys.split('')
  let res = '';
  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * arr.length);
    res += arr[index];
  }
  return res;
}

/**
 * 服务层级对应颜色值
 * type 服务类型
 * color 颜色
 * size 大小
 * key 备用字段
 *  Controller, Service, JDBC, Dao, ES, GRPC, GRPCServer, Redis, Kafka, KafkaListener, RabbitMQ, HZ, Http, Job, Class
 */
export const ColorConfig = [
  { color: '#f3469c', size: 0, key: '', type: "Controller" },
  { color: '#b10ae3', size: 0, key: '', type: "Service" },
  { color: '#426bfc', size: 0, key: '', type: "GRPC" },
  { color: '#25e22d', size: 0, key: '', type: "Dao" },
  { color: '#b46fec', size: 0, key: '', type: "HZ" },
  { color: '#740a54', size: 0, key: '', type: "NKAPI" },
  { color: '#edcc44', size: 0, key: '', type: "Redis" },
  { color: '#ab344f', size: 0, key: '', type: "Kafka" },
  { color: '#7595e3', size: 0, key: '', type: "RabbitMQ" },
  { color: '#0a669c', size: 0, key: '', type: "Http" },
  { color: '#f5652c', size: 0, key: '', type: "Job" },
  { color: '#ba7309', size: 0, key: '', type: "GRPCServer" },
  { color: '#06adb0', size: 0, key: '', type: "KafkaListener" },
  { color: '#f31c1c', size: 0, key: '', type: "RabbitListener" },
  { color: '#66d3d3', size: 0, key: '', type: "ES" },
  { color: '#07a158', size: 0, key: '', type: "JDBC" }
]
