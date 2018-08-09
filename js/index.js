new function() {
    var _self=this;
    _self.width=750;//设置默认最大宽度375
    _self.fontSize=24;//设置字体大小基数
    _self.widthProportion=function() {
        var p=(document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
        return p > 1 ? 1 : p < 0.427 ? 0.427 : p;
    };
    _self.changePage=function() {
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
    }
    _self.changePage();
    window.addEventListener('resize', function() {
        _self.changePage();
    }, false);

};

$(function () {

})


/**
 * 上传图片
 * @param that
 */
function uploadImg(that) {
    var file = that.files[0];
    var r = new FileReader();
    r.readAsDataURL(file);
    $(r).load(function () {
        $('.up-pic').attr('src', this.result);
    })
}