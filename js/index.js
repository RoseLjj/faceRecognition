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

var imgurl = './img/man';
var imgurl2 = './img/woman';
var manImgArr = [
    {
        classname:'word-width-18',
        url: imgurl+'1.png',
    },
    {
        classname:'word-width-18',
        url: imgurl+'2.png',
    },
    {
        classname:'word-width-15',
        url: imgurl+'3.png',
    },
    {
        classname:'word-width-15',
        url: imgurl+'4.png',
    },
    {
        classname:'word-width-21',
        url: imgurl+'5.png',
    },
    {
        classname:'word-width-21',
        url: imgurl+'6.png',
    },
    {
        classname:'word-width-21',
        url: imgurl+'7.png',
    },
    {
        classname:'word-width-15',
        url: imgurl+'8.png',
    },
    {
        classname:'word-width-21',
        url: imgurl+'9.png',
    },
    {
        classname:'word-width-14',
        url: imgurl+'10.png',
    },
    {
        classname:'word-width-18',
        url: imgurl+'11.png',
    },
    {
        classname:'word-width-16',
        url: imgurl+'12.png',
    },
]

var womanImgArr = [
    {
        classname:'word-width-12',
        url: imgurl2+'1.png',
    },
    {
        classname:'word-width-21',
        url: imgurl2+'2.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'3.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'4.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'5.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'6.png',
    },
    {
        classname:'word-width-21',
        url: imgurl2+'7.png',
    },
    {
        classname:'word-width-18',
        url: imgurl2+'8.png',
    },
    {
        classname:'word-width-21',
        url: imgurl2+'9.png',
    },
    {
        classname:'word-width-18',
        url: imgurl2+'10.png',
    },
    {
        classname:'word-width-18',
        url: imgurl2+'11.png',
    },
    {
        classname:'word-width-18',
        url: imgurl2+'12.png',
    },
]

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