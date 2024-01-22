var CompressImage = /** @class */ (function () {
    function CompressImage(options) {
        this.fileReader = new FileReader();
        this.options = options;
        this.createBase64();
    }
    CompressImage.prototype.createBase64 = function () {
        var _this = this;
        this.fileReader.onload = function (e) {
            var _a;
            // console.log(e.target?.result);
            _this.compress((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
        };
        this.fileReader.readAsDataURL(this.options.file);
    };
    CompressImage.prototype.compress = function (url) {
        var _this = this;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = url;
        img.onload = function () {
            var _a, _b;
            // console.log(img.width, img.height);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, img.width, img.height);
            // canvas.toDataURL("image/jpeg", this.options.quality);
            var base64 = canvas.toDataURL(_this.options.file.type, _this.options.quality);
            (_b = (_a = _this.options).success) === null || _b === void 0 ? void 0 : _b.call(_a, base64);
        };
    };
    return CompressImage;
}());
var file = document.querySelector("#file");
file.addEventListener("change", function (e) {
    var _a;
    var target = e.target;
    var fileObj = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (fileObj) {
        new CompressImage({
            file: fileObj,
            quality: 0.1,
            success: function (base64) {
                console.log(base64);
                document.body.innerHTML = "<img src=\"".concat(base64, "\">");
            },
        });
    }
});
