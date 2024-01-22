// 接口Options，用于定义文件参数和成功回调函数
interface Options {
  file: File;
  quality?: number;
  success?: (base64: string) => void;
}

// 定义一个类CompressImage，用于压缩图片
class CompressImage {
  // 定义一个options变量，用于存储文件参数
  options: Options;
  // 定义一个fileReader变量，用于读取文件
  fileReader = new FileReader();
  // 构造函数，用于初始化文件参数
  constructor(options: Options) {
    this.options = options;
    this.createBase64();
  }
  createBase64() {
    // 当文件读取完成后，触发onload事件，将文件内容转换为base64
    this.fileReader.onload = (e) => {
      // console.log(e.target?.result);
      this.compress(e.target?.result as string);
    };
    // 读取文件内容，转换为base64
    this.fileReader.readAsDataURL(this.options.file);
  }
  compress(url: string) {
    // 创建一个canvas，用于绘制图片
    const canvas = document.createElement("canvas");
    // 获取canvas的绘图上下文
    const ctx = canvas.getContext("2d");
    // 创建一个图片，用于加载图片
    const img = new Image();
    // 加载图片，并设置图片加载完成后触发onload事件
    img.src = url;
    img.onload = () => {
      // console.log(img.width, img.height);
      // 设置canvas的宽高为图片的宽高
      canvas.width = img.width;
      canvas.height = img.height;
      // 将图片绘制到canvas上
      ctx?.drawImage(img, 0, 0, img.width, img.height);
      // canvas.toDataURL("image/jpeg", this.options.quality);
      // 将canvas转换为base64
      const base64 = canvas.toDataURL(
        this.options.file.type,
        this.options.quality
      );
      // 调用成功回调函数，传入base64
      this.options.success?.(base64);
    };
  }
}

const file = document.querySelector("#file") as HTMLInputElement;

file.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  const fileObj = target.files?.[0];
  if (fileObj) {
    // 创建一个CompressImage实例，用于压缩图片
    new CompressImage({
      file: fileObj,
      quality: 0.1,
      success: (base64) => {
        console.log(base64);
        // 将base64转换为图片，并显示到body中
        document.body.innerHTML = `<img src="${base64}">`;
      },
    });
  }
});
