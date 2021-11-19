import axios from 'axios'

// 获取用户
export const login = function (user, password) {
  return axios.post('/api/login', {
    user,
    password
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 注册用户
export const register = function (user, password) {
  return axios.post('/api/register', {
    user,
    password
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};

// 获取所有日记
export const get_diary = function (user) {
  return axios.post('/api/diary', {
    user
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 获取订单列表
export const getOrderList = function (channelId) {
  return axios.post('/api/get/order', {
    channelId
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
//获取日记异步另一种写法
//例子POST
export const get_diary_async = (data) => {
  return axios.request({
    url: '/api/diary',
    data: data,
    method: 'POST'
  })
}

// 获取所有留言信息
export const get_message = function () {
  return axios.post('/api/message').then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 获取文章详细信息
export const get_details = function (id) {
  return axios.post('/api/get/details', {
    id
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 获取用户所有上传的文件信息
export const get_photo_list = function (user) {
  return axios.post('/api/get/photo/list', {
    user
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 发送邮件
export const send_email = function (accept) {
  return axios.post('/api/send/email', {
    accept
  }).then(res => {
    return res
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
// 搜索日记
export const diary_search = function (search) {
  return axios.post('/api/diary/search', {
    search
  }).then(res => {
    return res
  }).catch(err => {
    console.log("api登录错误", err)
  })
};





export const shopList = function () {
  return axios.get('/DataApi/index?AppKey=365egvspsx&type=6').then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
export const tkl = function (id) {
  return axios.get(`/DataApi/GetItemTklLink?appkey=365egvspsx&id=${id}`).then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};

//解析淘口令
export const tklParsing = function (content) {
  return axios.get(`tbk/parsing?content=${content}`).then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
//根据渠道id转连接
export const getPrivilegeLink = function (id, channelId) {
  return axios.get(`/tbk/get/privilege/link?id=${id}&channelId=${channelId}`).then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};

//单品详情
export const getGoodsDetails = function (id) {
  return axios.get(`/tbk/get/goods/details?id=${id}`).then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};

//单品详情好单库
export const hdkGetGoodsDetails = function (id) {
  return axios.get(`/item_detail/apikey/255C1A1FAAC5/itemid/${id}`).then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};
//各大榜单
export const getGoodsLists = function (id) {
  return axios.get(`/tbk/get/goods/lists?pageId=${id}`).then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log("api登录错误", err)
  })
};

/**
 * get方法，对应get请求
 */
export const get = function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
      // console.log(res)
    }).catch(err => {
      reject(err.data)
      // console.log(err)
    })
  })
}
/**
 * post方法，对应post请求
 */
export const post = function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}