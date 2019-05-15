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

// 多渠道的翻译
export const translateAppId = (appId, appIds) => {
  if (appId) {
    for (let i = 0; i < appIds.length; i++) {
      appId = appId.replace(appIds[i].appId, appIds[i].name || appIds[i].appName)
    }
  }
  return appId
}
// export const  money = (number) => {
//   number = number || 0
//   let negative = number < 0 ? '-' : '',
//     i = parseInt((number = Math.abs(+number || 0).toFixed(2)), 10) + '',
//     j = (j = i.length) > 3 ? j % 3 : 0
//   return (
//     negative +
//     (j ? i.substr(0, j) + ',' : '') +
//     i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') +
//     (Math.abs(number - i) > 0
//       ? '.' +
//       Math.abs(number - i)
//         .toFixed(2)
//         .slice(2)
//       : '')
//   )
// }
