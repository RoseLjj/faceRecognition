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

var imgurl = 'http://h5.flyfinger.com/2018/O/os/face/img/boy/';
var imgurl2 = 'http://h5.flyfinger.com/2018/O/os/face/img/girl/';
var womanLength = 16; //男文案数量
var manLength = 15; //女文案数量
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
    {
        classname:'word-width-14',
        url: imgurl+'13.png',
    },
    {
        classname:'word-width-14',
        url: imgurl+'14.png',
    },
    {
        classname:'word-width-16',
        url: imgurl+'15.png',
    },
    {
        classname:'word-width-16',
        url: imgurl+'16.png',
    },
    {
        classname:'word-width-14',
        url: imgurl+'17.png',
    },
    {
        classname:'word-width-14',
        url: imgurl+'18.png',
    },
]

var womanImgArr = [
    {
        classname:'word-width-14',
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
    {
        classname:'word-width-15-2',
        url: imgurl2+'13.png',
    },
    {
        classname:'word-width-16-4',
        url: imgurl2+'14.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'15.png',
    },
    {
        classname:'word-width-16-4',
        url: imgurl2+'16.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'17.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'18.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'19.png',
    },
    {
        classname:'word-width-14',
        url: imgurl2+'20.png',
    },
]

var load = 0;
var clearTime1;
var clearTime2;
var clearTime3;
var flag_mus = 0; //音频

$(function () {
    var OpenId = getUrlParam('OpenId');
    var NickName = getUrlParam('NickName');
    var HeadImgURL = getUrlParam('HeadImgURL');
    if(!isNullOrEmpty(HeadImgURL)){
        getbase64(HeadImgURL);
    }

    if(is_weixn()) {
        //微信授权
        //OpenId

        if(isNullOrEmpty(OpenId) && isNullOrEmpty(NickName) && isNullOrEmpty(HeadImgURL)){//没有授权
            window.location.href = 'http://h5.flyfinger.com/360loophole/index';
        }else{
            NickName = decodeURI(NickName);
            getbase64(HeadImgURL);
            // $('.user-header-img').attr('src',HeadImgURL);
            // $('.user-header-img').attr('crossOrigin','Anonymous');
            $('.user-name-info>span').text(NickName);
            $('.user-header-img').show();
            $('.user-name-info').show();
        }
        share();//微信分享
        //音频播放
        var audio = document.querySelector("#musicfx");
        document.addEventListener("WeixinJSBridgeReady", function () {
            if(flag_mus == 0) {
                audio.play();
                flag_mus = 1;
            }
        }, false);
    }else{
        $('.user-header-img').hide();
        // $('.user-name-info').hide();

        /* $('body').one('touchstart', function () {
             if(flag_mus == 0) {
                 document.getElementById('musicfx').play();
                 flag_mus = 1;
             }
         })*/

        setInterval(function () {
            document.getElementById('musicfx').play();

        },10)
    }

    loading(); //加载
    pressFinger(); //长按指纹
    toggleSex();//切换性别
    $('.btn-start').on('touchstart',function () {
        bLine()
    })



})

function getbase64(url) {
    var can = document.createElement('canvas');
    var ctx = can.getContext("2d");
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = url;
    image.onload = function () {
        can.width = this.width;
        can.height = this.height;
        ctx.drawImage(this,0,0);
        var base64 = can.toDataURL();
        $('.user-header-img').attr('src',base64);
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //console.log(unescape(r[2]));
    if (r != null) return (r[2]);
    return null; //返回参数值
}

function share() {
    //先定义分享参数对象,全参数为（可按需配置 ）：
    var options = {
        'id':"七夕爱情运势", //项目名
        'title':'你的好友被测出是百年一见的独孤星人，你也试试？',
        'desc':'看颜值测运势，是好是坏就靠脸啦!',
        'link':"http://h5.flyfinger.com/2018/O/os/face/index.html",
        'imgUrl':"http://h5.flyfinger.com/2018/O/os/face/img/share.jpg",
        //        'type':'分享类型,music、video或link，不填默认为link',
        //        'dataUrl':' 如果type是music或video，则要提供数据链接，默认为空',
        //        'success':function(){
        //            alert('分享成功加调');
        //        },
        //        'cancel':function(){
        //            alert('分享取消回调');
        //        },
        //        'trigger':function(){
        //            alert('调起微信菜单');
        //        },
        //        'fail':function(){
        //            alert('调用失败回调');
        //        }
    };
    //后定义实例(注：实例名不能为关键字和'wx')：
    var _wx_share = new WxShare(options);
    //如要在中途重置分享信息，调用setOptions方法：
    //    _wx_share.setOptions({
    //        'title':'修改后的分享标题'
    //    });
    //如要在中途重置分享给朋友，调用setAppMessageOptions方法：
    //    _wx_share.setAppMessageOptions({
    //        'title':'修改后分享给朋友的分享标题'
    //    });
    //如要在中途重置分享到朋友圈，调用setTimeLineOptions方法：
    _wx_share.setTimeLineOptions({
        'title':"你的好友被测出是百年一见的独孤星人，你也试试？"
    });
}

/***
 * 判断是否是微信浏览器
 * @returns {boolean}
 */
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    return isWeixin;
}

/**
 * 加载
 */
function loading() {
    clearTime1 = setInterval(function () {
        load += 5;
        $('.load-page .load-num').text(load);
        if (load >= 81) {
            clearInterval(clearTime1)
        }
    }, 100)

    setTimeout(function () {
        clearTime2 = setInterval(function () {
            load += 3;
            $('.load-page .load-num').text(load);
            if (load >= 100) {
                clearInterval(clearTime2)
                $('.content>div').hide();
                $('.load-page').slideUp();
                $('.finger-line').removeClass('finger-line2')
                $('.finger-img').attr('src','http://h5.flyfinger.com/2018/O/os/face/img/finger_01.png')

                $('.content>div.valentine').show();
                $('.content').slideDown();
            }
        }, 200)
    }, 2100)
}



/**
 * 按指纹
 */
function pressFinger(){
    var timeOutEvent;
    $(".fingerpint").on({
        touchstart: function(e){
            $('.finger-line').addClass('finger-line2')
            $('.finger-img').attr('src','http://h5.flyfinger.com/2018/O/os/face/img/finger_02.png')
            timeOutEvent = setTimeout(function(){
                //此处为长按事件-----在此显示遮罩层及删除按钮
                $('.content>div').slideUp();
                $('.content>div.sex-selection').slideDown();
            },500);
        },
        touchmove: function(){
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            e.preventDefault();
        },
        touchend: function(e){
            clearTimeout(timeOutEvent);
            $('.finger-line').removeClass('finger-line2')
            $('.finger-img').attr('src','http://h5.flyfinger.com/2018/O/os/face/img/finger_01.png')
            if(timeOutEvent!=0){//点击
                console.log('点击');

                //此处为点击事件----在此处添加跳转详情页
            }
            return false;
        }
    });
}

/**
 * 切换性别
 */
function toggleSex(){
    $('.sex-boy button').on('touchstart',function () {
        $('.sex-boy').removeClass('sex-selected');
        $(this).parent().addClass('sex-selected');
        goCampture();
    })
}

/**
 * 性别-->拍照
 */
function goCampture(){

    $('.up-pic').attr('src','');
    $('.content>div.upload-img .upload-button1').show();
    $('.content>div.upload-img .upload-button2').hide();

    $('.up-pic').attr('status',0);
    $('.content>div').slideUp();
    $('.content>div.upload-img').slideDown();
}


/**
 * 上传图片
 * @param that
 */
var files = '';
function uploadImg(that) {
    var status = 0;

    var file = that.files[0];
    files = file;
    var r = new FileReader();
    r.readAsDataURL(file);
    setTimeout(function () {
        if(status != 1){//图片已加载完
            $('.upload-words').hide();
            $('.upload-words1').show();
        }
    },1000)
    $(r).load(function () {
        $('.up-pic').attr({
            'src': this.result,
            'status':1,
        }).show();
        status = 1;
        $('.upload-words').hide();
    })
}

function tryIt2() {
    $('#uploadImg').attr('onchange','');
    var status = $('.up-pic').attr('status');
    if(status == 0){
        alert("请上传照片");
        return;
    }
    // bLine()

    $('.last-content').removeClass('last-content1');
    $('.last-word ').hide();
    $('.last-word1 ').show();
    getOneRandomPic()
    $('.last-content').show();

    setTimeout(function () {
        // zhongPic()
    },1000)


    var flag = 0;
    clearTime3 = setInterval(function () {
        if(flag == 1){
            alert('没有检测到图片中的人像');
            scanOver(2);
        }
        if(flag == 2){
            scanOver(1);
        }
    },1500)
    $('.up-pic').faceDetection({
        complete: function (faces) {
            console.log(faces);
            if(faces[0] == '' || faces[0] == null){
                flag = 1;
                console.log('无');
            }else{
                flag = 2;
                console.log('有');
            }
            for (var i = 0; i < faces.length; i++) {
                $('<div>', {
                    'class':'face',
                    'css': {
                        'position': 'absolute',
                        'left':     faces[i].x * faces[i].scaleX + 'px',
                        'top':      faces[i].y * faces[i].scaleY + 'px',
                        'width':    faces[i].width  * faces[i].scaleX + 'px',
                        'height':   faces[i].height * faces[i].scaleY + 'px'
                    }
                })
                    .insertAfter(this);
            }
        },
        error:function (code, message) {
            alert('Error: ' + message);
            flag = 3;
            scanOver(2);
        }
    });
}

/**
 * 随机文案
 */
function getOneRandomPic(){
    if($('.sex-selected').attr('type') == 1 ){//男
        var random = Math.ceil(Math.random() * manLength );
        var url = imgurl + random + '.png';
        // $('.my-word-info img').attr('src', manImgArr[random - 1].url).removeClass().addClass(manImgArr[random - 1].classname);
        $('.my-word img').attr('src',url);
    }else{
        var random = Math.ceil(Math.random() * womanLength );
        var url = imgurl2 + random + '.png';
        // $('.my-word-info img').attr('src', womanImgArr[random - 1].url).removeClass().addClass(womanImgArr[random - 1].classname);
        $('.my-word img').attr('src',url);
    }
}

function tryIt() {
    $('#uploadImg').attr('onchange','');
    var status = $('.up-pic').attr('status');
    if(status == 0){
        alert("请上传照片");
        return;
    }
    $('.btn-start').attr('onclick','');
    // bLine()

    $('.last-content').removeClass('last-content1');
    $('.last-word ').hide();
    $('.last-word1 ').show();
    getOneRandomPic()
    $('.last-content').show();

    setTimeout(function () {
        // zhongPic()
    },1000)


    var flag = 0;
    clearTime3 = setInterval(function () {
        if(flag == 1){
            alert('没有检测到图片中的人像');
            scanOver(2);
        }
        if(flag == 2){
            scanOver(1);
        }
    },1500)


    var data = new FormData();
    data.append('image', files);
    $.ajax({
        type: "POST",
        url: "https://ai.r.addops.soft.360.cn/rest/1.0/image/face-detection/detect",
        data: data,
        cache: false,
        dataType: 'json',
        contentType: false,
        withCredentials: false,
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l");
        },
        success: function (data) {
            if(!isNullOrEmpty(data.box) && data.box.length>0 ){//有人头
                flag = 2;
            }else{
                flag = 1;
            }
        },
        error:function (data) {
            alert(data);
            flag = 3;
            scanOver(2);
        },
        complete: function (XMLHttpRequest,status) {
            if(status == 'timeout') {
                xhr.abort();    // 超时后中断请求
                clearInterval(clearTime3);
                $('.btn-start').attr('onclick','tryIt()');
                alert("网络超时，请重新测试");
            }
        }
    });
}

function bLine(){
    var status = $('.up-pic').attr('status');
    if(isNullOrEmpty(status) || status == 0){
        alert("请上传照片");
        return;
    }else {
        $('.upload-words').hide();
        $('.upload-words2').show();
        $('.jiaqiang').show();
    }
}

/**
 * 扫描完成
 * @param type 1:有人物,2,无人或错误
 */
function scanOver(type){
    if(type ==1){//有人
        $('.pic-line').hide();
        goDivination()
        /* $('.upload-button1').hide();
         $('.upload-button2').show();*/
    }else{
        $('.pic-line').hide();
    }
    $('.upload-words').hide();
    $('#uploadImg').attr('onchange','uploadImg(this)');
    $('.btn-start').attr('onclick','tryIt()');
    clearInterval(clearTime3);
}
/*
/!**
 * 去占卜
 *!/
function goDivination2(){
    $('.content>div').hide();
    $('.content>div.last-content').show();
    $('.last-content').addClass('last-content1')
    $('.last-word ').hide();
    $('.last-word2 ').show();

}*/

/**
 * 去占卜
 */
function goDivination(){
    document.getElementById('musicfx').pause();
    document.getElementById('musicfx').play();
    $('.content>div').hide();
    $('.content>div.last-content').show();
    $('.last-content').addClass('last-content1')

    html2canvas(document.querySelector('.last-word1'), {
        useCORS: true,
        backgroundColor: null
    }).then(function (canvas) {
        var dataUrl = canvas.toDataURL('image/png');
        $('.last-word2 img').attr('src',dataUrl);
        $('.last-word2 ').show();
    });
}


/**
 * 判断是否为空
 * @param strVal
 * @returns {boolean}
 */
function isNullOrEmpty(strVal) {
    if (strVal == '' || strVal == null || strVal == undefined) {
        return true;
    } else {
        return false;
    }
}

function zhongPic() {

    var targetDom = $('.last-word1')
    var copyDom = targetDom.clone();
    copyDom.width(targetDom.width() + "px");
    copyDom.height(targetDom.height() + "px");

    $('body').append(copyDom);
    copyDom.css({
        'opacity': '0'
    });

    html2canvas(targetDom, {
        // allowTaint: true,
        // taintTest: false,
        useCORS: true,
        logging: true,
        onrendered: function (canvas) {
            var dataUrl = canvas.toDataURL();

            copyDom.remove();
            if (dataUrl == 'data:,') {
                zhongPic();
            } else {
                $('.last-word2 img').attr('src',dataUrl)
            }
        }
    });

}

