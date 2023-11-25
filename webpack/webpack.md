webpack 自己的内容

- 一种模块打包器

  - 开发时随便 import export
  - 生产时最好打包集中到一个几个文件

- 一种模块加载器

  - 对有转换问题的代码
  - 进行编译转换

- 代码拆分 code splitting

  - 按需打包，避免同样无用的超大单一文件

- 需要用 npx webpack 执行
- webpack 需要模块才能分析打包，必须要 export 加 import 才有的做
- 打包之后的 dist 文件引入 html 时就不需要设置为 type=module 了，因为 webpack 处理了所有的 import 和 export
- 过程

  - 代码中所有存在引入导出的地方，比如 import src 这些，都会被 webpack 识别并使用相应的 loader
  - 先在 src 下找到 index.js
  - 顺着 import 找其他模块，顺丰摸瓜，整理为依赖树，递归找出资源位置，并用 loader 处理
  - 把所有实际用到的文件汇总打包成为 dist 的 main.js
  - 例子中的 jquery 会被整个打包,当然，实际还是要看你具体用没用
  - 用也会看怎么用的，log 变量或者 return 值的会直接返回执行完的值，不会连变量和函数一起返回
  - 回调函数会被一起绑定
    - 这里 tree shaking 必须要明确指定 export 的变量和函数
    - 函数调用也算是默认模块被使用，函数也会被打包
    - 也就是说，jquery 中有全局执行的函数，所以被 webpack 默认全部引入
  - 一般来讲每次改完代码也要重新打包

- 打包机制
- 每个模块都会被包裹为一个立即执行函数

- webpack 配置

  - webpack.config.js
  - 目前还是要写 module.export = {xxx}的格式
  - 根据 node 规范，给 node 读

  - mode 设置生产或开发的打包模式

    - 可以在命令行参数中指定，也可在 config 文件中指定
    - none 原始模式，更多用于学习和调试
    - production
    - development，如果想在浏览器内打断点调试，就用这个，不然生成的代码都是编译过的

  - entry 用于指定打包时的入口文件

    - 默认 ./src/index.js
    - 数组式指定多个入口 [/src/a.js, ./src/b.js]
    - 对象式指定多个入口 {a:'./src/a.js', b:'./src/b.js'}
    - 似乎指定几个入口就有几个出口文件

  - output 出口设置,需要指定一个对象，配置项作为对象 key 来配
    - path：绝对路径指定的打包目录
    - filename 具体设置出口文件名
      - 有很多鬼畜的格式
      - 比如说[name]自动便利 entry 中的入口文件，[id][hash]各自给出每个出口文件的一些信息，可以按模板字符串风格拼起来
    - publicPath 默认是网站根目录，也就是那个 index.html 的目录， 有时候需要
    - 将各种资源的路径和打包文件的目录统一起来，不然容易读不到图片这些
    - clean:自动清理打包目录

  ```javascript
  const path = require("path");
  module.exports = {
    mode:'none' || ''
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
      path: path.join(__dirname, "output"),
      publicPath: "dist/",
    },
  };
  ```

- loader

  - 一般来说要要往复杂了配就要 use 设置一个配置对象，里面塞 loader， options 再塞一个配置对象
  - webpack 一般只能处理 js，处理其他类型文件就需要引入 loader,基本上所有类型的文件都有起码 1 个 loader
  - 不信你随便指定一个入口为 css 的打包试试，直接报错 module parse failed
  - 需要注意，webpack 只管引入和打包，生效与否看你自己
  - css 就要引入 css-loader，需要 npm css-loader
  - 通过 module 引入

    - rules 部分为一个对象数组，指定两个内容
    - test 为一个检测文件类型/后缀的正则,use 则是指定的 webpack loader，也可以传数组参数，比如对一类文件做多个 loader 处理
    - 把 css 作为样式使用还需要 style-loader
    - 看代码也是直接把 css 转为 js 代码，然后引用
    - 这里 use 的处理顺序是从后往前，所以 css-loader 要放在后面先处理 css 才能挂到页面上

    ```javascript
      module: {
      rules: [
        {
          test: /.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
      }
    ```

  - 图片好像专门是一种内置的 loader

    - html 的 src,a 的 href css 的 url 和 import 都可能触发资源模块，有个记性就好

    - test 之后跟 type：'asset/resource'
    - 也可以 file-loader
    - 多种图片可以用|或连接，官网有一键复制的配置

    - 还有专门资源转代码的 base64 这一类的 url loader
    - 一般是小文件，小图片转 url
    - 大文件单独放一个文件
    - webpack 通过细化图片的 use 选项来完成这个任务
    - limit 指定文件大小，就是常听说的 20kb 以下转 base64 那个

    ```javascript
        {
          test: /.jpg$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 12 * 1024,
            },
          },
        },
    ```

    - 当其他文件触发资源模块时，比如 html

    ```javascript
    {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "a:href"],
          },
        },
      },
    ```

  - babel - 也算一种代码质量检查的 loader

    - js 的新特性在浏览器的兼容性问题始终存在
    - babel 提供了转换新特性为旧代码的方法来实现这一目的
    - 比如把箭头函数配成普通函数
    - 也是一个 loader 使用需要 npm i babel-loader @babel/core @babel/preset-env -D
    - 配置大同小异

    - test 指定 js 或者 mjs 结尾的文件
    - exclude 排除不需处理的文件 比如 node-modules
    - use 中指定相应的 loader 和使用 loader 的方式
      - loader：'babel-loader', options:{presets:['@babel/preset-env']}分别指定 loader 和按照默认方式指定 loader
    - 你反正记住光用 babel-loader 不行，要自己再具体配才行

    ```javascript
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ```

    - loader 可以按管道处理，但是最后结果需要是 js 代码

- plugin 为 webpack 提供扩展功能，其他自动化工作

  - 大致的原理是生命周期钩子中挂载函数实现扩展
  - 基本上都在 plugins 配置项里通过在数组里塞实例解决

  - 常用插件介绍
  - 自动清理输出目录的插件 clean-webpack-plugin

  ```javascript
  const { CleanWebpackPlugin } = require("clean-webpack-plugin");
  plugins: [new CleanWebpackPlugin()],
  ```

  - 自动生成使用打包结果的 html，html-webpack-plugin
  - 要不然就得自己硬编码配 html，还要防止它在打包前后路径乱了

  ```javascript
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  plugins: [new HtmlPlugin()],

  ```

  - 将静态资源一并复制到输出目录 copy-webpack-plugin

  ```javascript
  const CopyWebpackPlugin = require("copy-webpack-plugin");
  new CopyWebpackPlugin({ patterns: [{ from: "public", to: "public" }] }),
  ```

- plugin 和 loader 的区别主要在于是否会对代码进行转换/编译

- webpack 开发环境

  - webpack-dev-server 同时是包名和命令名

    - 不会生成 dist 文件
    - 实时打包到服务器运行
    - contentBase 和 CopywebpackPlugin 功能确实相同
    - 但一个用于开发，一个是生产上线用的

      ```javascript
      devServer: { contentBase: "./public" },
      // new CopyWebpackPlugin({ patterns: [{ from: "public", to: "public" }] }),
      ```

    - 自动刷新会导致页面编辑信息丢失
      - 代码中可以写死
      - localstorage

  - 热更新（不刷新页面也能更新模块）

    - 无法开箱即用，需要手动处理热更新逻辑
    - 样式文件由于已经 loader 处理，自动处理了热更新
    - 用框架处理的 js 也相当于自动处理热更新，且内部脚手架也做了处理

    ```javascript
    devServer: {
      hot: true;
    }
    plugins：[new HotModuleReplacementPlugin()]
    ```

    ```javascript
    module.hot.accept("./editor.js", () => {
      // console.log("editor就得这么手动设置更新");
      const value = lastEditor.innerHTML;
      document.body.removeChild(editor);
      newEditor.innerHTML = value;
      const newEditor = createEditor();
      document.body.appendChild(newEditor);
      lastEditor = newEditor;
    });
    ```

  - 一个模块的具体处理方式
  - 图片的热更新方式,热替换中指明 src 路径即可

    ```javascript
    module.hot.accept("./nat-2.jpg", () => {
      img.src = background;
    });
    ```

  - 虽然默认 hmr 开启，但是还是需要先判断 if(module.hot)比较保险
  - module.hot 这些代码打包过后自动消除

  - proxy 服务器

    ```javascript
    devServer: {
      contentBase: "./public",
      proxy: {
        <!-- 对/api路径的请求全部转到target中的路径后 -->
        <!-- http://localhost:8080/api/users - https://api.github.com/api/users -->
        "/api": { target: "https://api.github.com",
        <!-- 很多时候不需要api字样， http://localhost:8080/api/users - https://api/github.com/users -->
        pathRewrite:{'^/api':''},
        <!-- 很多时候也不能使用本地路径localhost作为请求的主机名 -->
        changeOrigin:true
        },
      },
    },
    ```

  - npx webpack --watch

    - 自动监视文件变化，重新构建

  - source-map （把开发时 webpack 转化的代码再转回来）

    - 实时打包会让源码和运行代码截然不同
    - 调试会发现错误无法定位
    - 这时候 source-map 源代码地图就能帮我们定位运行代码和源代码之间的关系
    - 很多三方库已经有.map 文件

      - source 是源文件名称的数组
      - names 是库中重要的成员名称，开发中这些名称可能都会转化为简短的乱码
      - mappings 就是上述这些名称/字符在转换前后的对应关系

    - 然后在调试时打开 source 面板就能找到未压缩转化的源代码了
    - 可以在 config 中配置顶级的 devtool:source-map

    ```javascipt
    devtool:'source-map',
    ```

  - source-map 支持多种不同模式，在生成速度和代码质量上各有取舍

    - 代码每行不会太长就可以接受定位到行的
    - 用三方框架后 loader 转换的代码会差很多
    - 首次慢一点可能无所谓，但是希望更新快一点
    - cheap-module-eval-source-map 可能比较通用
    - 生产环境中 sourcemap 的存在感应该低一点，none 或者 no-source 比较好
    - 似乎都是在 eval 中配置
    - eval 模式，将所有模块转换的代码都放在 eval 函数下执行，并通过 source-url 参数来说明对应路径，不过只能定位文件级别，也没有 source-map 文件
    - eval-source-map 能够定位到行列信息，有 source-map
    - cheap-eval-source-map 能定位到行信息，显示转换后代码
    - cheap-module--eval-source-map 也是定位到行，但是显示源代码
    - cheap-source-map 没有 eval 处理，也没有 module，是处理后的代码
    - inline-source-map source-map 以 data-url 嵌入到代码 eval 中
    - hidden-source-map 生成 source-map 但是开发调试工具中看不到，多半是三方包
    - nosource-map 还是有，但是看不到

  - devtool 排列组合的风格

    - eval 是否使用 eval 执行模块代码
    - cheap 是否在 source-map 中包含行信息
    - module 是否能够得到 loader 处理之前的源代码
    - inline sourcemap 放哪

  - devtool

    - 其中的 inline-source-map 可以让你打包之后还能看到源码做调试

- mode 和生产/开发环境以及相应配置

  - 配置文件直接根据环境变化导出不同配置
  - 再就是一个环境对应一个配置文件
  - configjs 支持导出函数，其中有 env 和 argv 两组参数，函数内部把配置用 config 变量包起来，然后用 env 做条件判断就行

  ```javascript
  module.exports = (env, argv) => {
  const config = {
    <!-- 一般webpack配置项 -->
  };

  if (env === "production") {
    config.mode = "production";
    config.devtool = false;
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(["public"]),
    ];
  }

  return config;
  };

  ```

  ```shell
  npx webpack --env production
  ```

  - 大型项目直接给配置文件
  - 在不同环境配置文件中提取公共配置时，由于 object.assign 会完全覆盖/重写原属性，对于 plugins 这种我们希望它其实是在尾部增加的属性就不合适，所以用 webpack-merge 包合适

  ```javascript
  module.exports = merge(common, {
    mode: "production",
    plugins: [new CleanWebpackPlugin(), new CopyWebpackPlugin(["public"])],
  });
  ```

  ```shell
  npx webpack --config webpack.prod.js
  ```

  - 最后再写个 npm script 最省事

- webpack 常用优化

  - definePlugin，内置模块为代码注入全局成员

    - 注入一个 process.env.NODE_ENV
    - 然后就能在全局读取到这个数据了

    ```javascript
    const webpack = require("webpack");
    plugins: [
      new webpack.DefinePlugin({
        // 要求代码片段，所以还要再包一层字符串,嫌麻烦用json是个常见技巧
        API_BASE_URL: JSON.stringify("https://api.example.com"), //'"https://api.exmaple.com"',
      }),
    ],
    ```

  - tree shaking

    - 前提是使用 esmodule
    - 而 babel-loader 经常会把 esmodule 语法转换成 cjs
      - @babel/preset-env 以前会，新版的好像自动略过 esmodule 转化
      - 其实手动配置比较放心
      ```javascript
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
          },
        },
        exclude: /node_modules/,
      },
      ```
    - 移除未引用/死代码,主要内容就是下面两点
    - usedExports 只导出被外部使用的模块内容，标记死代码
    - minimize 压缩代码，去除死代码

    ```javascript
    optimization: {
    // 只导出被外部使用的成员
    useExports: true,
    minimize: true,
    },
    ```

  - 合并模块

    - 一般打包把每个模块放在单独函数中，多个模块就有多个模块函数
    - concatenateModule 就是把所有模块合并到一个函数中
      - 也叫做 scope hoisting

  - 副作用标记

    - 标记除了导出成员，还有没有别的操作？如果没有就不打包进来
    - 一般只有包才用得到
    - 照样是 optimization 里配 sideEffect：true（开启功能） 和 package.json 里 sideEffect:true（标记对象，只是示例）

  - 按需在不同时间导入不同部分，所以需要代码拆分 code splitting

    - 多入口打包和动态导入
      - 多入口一般用于多页应用
        ```javascript
        module.exports = {
          mode: "none",
          entry: {
            index: "./src/index.js",
            album: "./src/album.js",
          },
          output: {
            //用[name]来动态生成文件名
            filename: "[name].bundle.js",
          },
          module: {
            xxxx,
          },
          plugins: [
            <!-- 显示指定chunks来生成正确的打包页面 -->
            new HtmlWebpackPlugin({
              title: "multi entry",
              template: "./src/index.html",
              filename: "index.html",
              chunks: ["index"],
            }),
            new HtmlWebpackPlugin({
              title: "multi entry",
              template: "./src/album.html",
              filename: "album.html",
              chunks: ["album"],
            }),
          ],
        };
        ```
      - 公共模块非常常见, splitChunks 自动提取所有公共模块
        ```javascript
        optimization: {
        splitChunks: {
          chunks: "all",
        },
        },
        ```
      - 动态导入/按需加载
        - 所有动态导入模块都会被自动打包为不同 bundle
        - 直接将静态导入换为 import()完事
      - 魔法注释
        - 在 import(/_webpackChunkName:'xx'_/)中按特定格式注释

  - css 的按需加载 miniCssExtractPlugin

    - 经验上超过 150kb 才比较管用
    - 把 css 样式保存到单独文件
    - style-loader 是把样式按 style 标签形式注入
    - 因此可以替换 style-loader

    ```javascript
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    plugins: [
    new MiniCssExtractPlugin(),
    ],
    ```

  - 压缩也只有对 js 的，css 压缩也要额外插件

    - optimize-css-assets-webpack-plugin（好像已经被替换了）
    - 需要在 optimization 的 minimizer 里 new
    - 但是因为声明了配置项，所以 webpack 认为你要具体控制优化，所以还要手动加载 js 压缩
    - terser-webpack-plugin

  - 生成模式下让文件名用 hash 值
    - 静态服务器下的资源缓存有权衡问题
    - 新哈希文件名直接跳过缓存
    - 可以直接通过 filename 生成哈希，而且有三种风格的
      ```javascript
      filename: "[name]-[hash].bundle.xxx"; //项目级
      filename: "[name]-[chunkhash].bundle.xxx"; //打包的chunk级别
      filename: "[name]-[contenthash].bundle.xxx"; //文件级别
      ```

```

- 脚手架的好处
- 工程化风格
- 支持 sfc
- 开发服务器和热重载
- 插件
```
