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

var imgurl = './img/man/';
var imgurl2 = './img/woman/';
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

var load = 0;
var clearTime1;
var clearTime2;
var clearTime3;

$(function () {
    loading(); //加载
    pressFinger(); //长按指纹
    toggleSex();//切换性别
})

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
                $('.load-page').hide();
                $('.content>div').hide();
                $('.content>div.valentine').show();
                $('.content').show();
            }
        }, 200)
    }, 2100)
}

/**
 * 按指纹
 */
function pressFinger(){
    $(".fingerpint").on({
        touchstart: function(e){
            timeOutEvent = setTimeout(function(){
                //此处为长按事件-----在此显示遮罩层及删除按钮
                $('.content>div').fadeOut(500);
                $('.content>div.sex-selection').fadeIn(1000);
            },500);
        },
        touchmove: function(){
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            e.preventDefault();
        },
        touchend: function(e){
            clearTimeout(timeOutEvent);
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
    $('.sex-boy').on('click',function () {
        $('.sex-boy').removeClass('sex-selected');
        $(this).addClass('sex-selected');
    })
}

/**
 * 性别-->拍照
 */
function goCampture(){
    $('.up-pic').attr('src','');
    $('.content>div.upload-img .upload-button1').show();
    $('.content>div.upload-img .upload-button2').hide();
    $('.content>div').fadeOut(500);
    $('.content>div.upload-img').fadeIn(1000);
}


/**
 * 上传图片
 * @param that
 */
function uploadImg(that) {
    var file = that.files[0];
    var r = new FileReader();
    r.readAsDataURL(file);
    $(r).load(function () {
        $('.up-pic').attr('src', this.result).show();
    })
}


function tryIt() {
    var img = $('.up-pic').attr('src');
    if(isNullOrEmpty(img)){
        alert("请上传照片");
        return;
    }
    var flag = 0;
    $('.pic-line').css('display','inline-block');
    clearTime3 = setInterval(function () {
        if(flag == 1){
            alert('没有检测到图片中的人像');
            scanOver(2);
        }
        if(flag == 2){
            scanOver(1);
        }
    },2000)
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
 * 扫描完成
 * @param type 1:有人物,2,无人或错误
 */
function scanOver(type){
    if(type ==1){//有人
        $('.pic-line').hide();
        $('.upload-button1').hide();
        $('.upload-button2').show();
    }else{
        $('.pic-line').hide();
    }
    clearInterval(clearTime3);
}

/**
 * 去占卜
 */
function goDivination(){
    if($('.sex-selected').attr('type') == 1 ){//男
        var random = Math.ceil(Math.random() * manImgArr.length);
        $('.my-word-info img').attr('src', manImgArr[random - 1].url).removeClass().addClass(manImgArr[random - 1].classname);
    }else{
        var random = Math.ceil(Math.random() * womanImgArr.length);
        $('.my-word-info img').attr('src', womanImgArr[random - 1].url).removeClass().addClass(manImgArr[random - 1].classname);
    }

    $('.content>div').fadeOut(500);
    $('.content>div.last-content').fadeIn(1000);

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

