/**
 * Created by Rose on 2017/6/29.
 */
//关闭提示框
function alert(message) {
    $.DialogByZ.Alert({
        Title: "提示",
        Content: message,
        BtnL:"确定",
        FunL:close
    })
}
function autoFade(message) {
    $.DialogByZ.Autofade({Content: message})
}
function close(){
    $.DialogByZ.Close();
}

function confirm(message,callback) {
    $.DialogByZ.Confirm({
        Title: "",
        Content: message,
        FunL:function () {
            close();
            callback()
        },
        FunR:close
    })
}

/*function confirmL(callback){
    close;
}*/

