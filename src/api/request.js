import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 5000,
});

service.interceptors.request.use(
  config => {
    /*config.headers = {};
    config.headers['token']= '123456789';*/
    return config
  }
);

service.interceptors.response.use(
  response => {
    if (response.status === 403) {
      return Promise.reject('认证失败')
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
);
const request = {
  /**
   * POST, GET 请求
   * @param url 接口路径
   * @param data  接口参数
   * @param callback  成功回调
   * @param catchFun  失败回调
   */
  post: (url, data, callback, catchFun) => {
    service.post(url, data).then(response => {
      callback && callback(response)
    }).catch((error) => {
      catchFun && catchFun(error)
    })
  },
  get: (url, data = {}, callback, catchFun) => {
    service.get(url, {params: data}).then(response => {
      callback && callback(response)
    }).catch((error) => {
      catchFun && catchFun(error)
    })
  },
  loadingTemp: null,
  startLoading: (text) => {
    /*request.loadingTemp = Loading.service({
      lock: true,
      text: text ? text : '加载中....',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.7)'
    })*/
    request.loadingTemp = {};
  },
  closeLoading: () => {
    request.loadingTemp.close();
    request.loadingTemp = null;
  }
};

export default request;





