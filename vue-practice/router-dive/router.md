# router 总是有新东西

## route 模式

- hash 模式 createWebHashHistory
- histroy 模式 createWebHistory
- abstract 模式 createMemoryHistory
  - ssr 服务端渲染时使用

## hash 模式

- 通过浏览器的 location.hash 来保持 URL 和应用状态同步
- 监听 hashchange 事件

## history 模式

- 通过 html 的新 api history 来保持 URL 和应用状态同步
- 监听 popstate 事件

## 编程式导航与实现导航的各种方式

- api 自带的 router-link 在 to 中指定 url
- 将 to 改为:to = {name:'xxx'}即可使用 router 定义中的 name 来跳转
- 直接使用 a 标签导航，这种方式会刷新页面
- 编程式导航
  - 使用 useRouter 来获取 router 实例
  - 由此可以使用 history Api 自己的导航方式
  - 如跳转页面只需 router.push('url')
  - 也可使用 vue-router 的 name 方式来导航

## 操控跳转的历史记录

- 在 router-link 中使用 replace 属性来消除跳转的历史记录
- 以及用 router.go 或者 router.back 这些

## router 中的参数

- query 参数
  - 参数信息贴在路径上以？开头， &分割
  - 在编程式导航中加入 query 项并指定数据
  - 在跳转目的地使用 useRoute（不是 router）来获取路由信息实例
  - 最后通过点语法正常获取 route.query.xxxdata 使用
- params 参数
  - 参数信息应该是在内存里？请求体里
  - 在编程式导航中加入 params 项并指定数据
  - 在跳转目的地使用 useRoute（不是 router）来获取路由信息实例
  - 最后通过点语法正常获取 route.params.xxxdata
  - 由于数据存在内存里，所以一刷新就有数据丢失
- 动态路由参数 -新版本似乎废弃了
  - 直接在路由文件中定义路径为 /xxx/:dynamicProps
  - 在需要跳转处定义 params 中有同名的 dynamicProps 作为 key 传值即可
  - 这样能够避免内存刷新消失的内存
  - 具体的数据可以根据传递的动态参数（多半是 id）直接查找数据库

## 嵌套/子路由

- 很多网页的目录和内容结构都是类似的，只是内部的路由层层嵌套，节省整体的空间
- 就是在 children 数组中正常定义路由
- 但是记得 path 路径就不用加/了，因为父路由提供了

## 命名视图 某种插槽

- 比如多个 tab 页，仅有详情不一样而结构基本一致时
- router-view 有 name 属性，不命名就是 default 路由， 和插槽风格一样

## 重定向

- 就是在路由中加入 redirect 项
  - 可以直接写路由
  - 可以使用 name 方法
  - 也可以用路由专有的 to 写函数 return 到指定路径
    - 该函数中也能带参数
- alias 给路由起任意个别名，跳转任何别名都会回到本路由

## 路由守卫和中间件

- 多半是路由权限
  - 比如登录了才能进入首页
- afterEach 往往能做进度条相关的控制

## 路由 meta 信息

- 可以在导航守卫和路由信息中获取

- 权限校验标识
- 组件的过渡命名
- keepalive 特定组件的配置信息

## 动态路由 权限路由
