import dayjs from 'dayjs';

/* 时间格式化 */
export const dateFormatFilter = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  console.log(date)
  if (!date) {
    return '-';
  } else {
    return dayjs(date).format(fmt);
  }
};

/* 秒格式化 */

export const formatSeconds = seconds => {
  if (isNaN(seconds)) {
    return '-';
  } else {
    return [parseInt(seconds / 60 / 60), parseInt((seconds / 60) % 60), parseInt(seconds % 60)].join(':').replace(/\b(\d)\b/g, '0$1');
  }
};

export const toFixed = (num, length = 2) => {
  if (isNaN(num)) {
    return '-';
  } else {
    return parseFloat(num, 10).toFixed(length);
  }
};

/* 数字 格式化 千位显示 */
export const toThousandFilter = num => {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
};

// 扁平数组转树状
export const formattingJson = list => {
  let temp = {};
  let tree = {};
  for(let i in list){
    temp[list[i].id] = list[i];
  }
  for(let i in temp){
    if(temp[i].parentId) {
      if(!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = new Array();
      }
      temp[temp[i].parentId].children.push(temp[i]);
    } else {
      tree[temp[i].id] =  temp[i];
    }
  }
  return tree;
}