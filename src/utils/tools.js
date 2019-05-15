/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * @description 检测是不是空对象
 */
export const isEmptyObject = obj => obj && Object.keys(obj).length === 0;

/**
 * @description 对象 深合并
 */
export const deepMerge = (obj1, obj2) => {
  var key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
  }
  return obj1;
};

/**
 * @description url 上获取参数
 */
export const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  var q = window.location.pathname.substr(1).match(reg_rewrite);
  if (r != null) {
    return unescape(r[2]);
  } else if (q != null) {
    return unescape(q[2]);
  } else {
    return null;
  }
};


/**
 * @description 下载文件 张杰
 */
export const downloadfile = (name, res) => {
  var blob = new Blob([res], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name + '.xls'; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

/**
 * @description 下载文件 张晋佩
 */
export const  DownLoadFile = options => {
  let config = { method: 'post' };

  let tempIframe = document.createElement('iframe');
  tempIframe.id = 'down-file-iframe';

  let tempForm = document.createElement('form');
  tempForm.method = config.method;
  tempForm.action = options.url;
  for (let key in options.data) {
    let tempInput = document.createElement('input');
    tempInput.name = key;
    tempInput.value = options.data[key];
    tempInput.type = 'hidden';
    tempForm.appendChild(tempInput);
  }
  tempIframe.appendChild(tempForm);
  document.body.appendChild(tempIframe);
  tempForm.submit();
}

/**
 * @description 常规正则校验表达式
 */
export const validatorsExp = {
  number: /^[0-9]*$/,
  nameLength: (n, m) => new RegExp(`^[\\u4E00-\\u9FA5]{${n},${m}}$`),
  idCard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  backCard: /^([1-9]{1})(\d{15}|\d{18})$/,
  phone: /^1[23456789]\d{9}$/,
};

/**
 * @description 常规正则校验方法
 */
export const validatorsFun = {
  number: val => validatorsExp.number.test(val),
  idCard: val => validatorsExp.idCard.test(val),
  backCard: val => validatorsExp.backCard.test(val),
};





