# 变量加工平台

## 项目规范

### 命名

- 文件夹命名：小写 中划线 eg: theme-iview
- 文件命名(pages目录下，除 index.js )：大驼峰
- 文件命名(pages目录外)：小写 中划线
- 方法命名：事件以 handle 开头
- 变量命名：Boolean is开头，全局变量 _开头
- css命名：小写 中划线

### 页面结构

按照菜单结构新建文件夹，css js vue 分离，统一通过 index.js 导出

## 问题

### html引入第三方静态文件报错

必须 放在 public 文件夹下以绝对路径引入
