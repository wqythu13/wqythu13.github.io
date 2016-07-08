/**
 * Created by Administrator on 2016/7/8.
 */
var message = [];
$.ajax({
    url:'https://wall.cgcgbcbc.com/api/messages?num=3',
    type : "GET",
    dataType: "json",
    data : {
        test:true,
        csrfmiddlewaretoken: '{{ csrf_token }}'
    },
    success : function(json) {
        console.log(json);
        message = json;
        setContent(message[0],0);
        setContent(message[1],1);
        setContent(message[2],2);
    },
    error : function(xhr,errmsg,err) {
        alert(xhr.status + ": " + xhr.responseText);
    }
})
var doc = document.getElementsByClassName("content0");
var img = document.getElementsByClassName("hart");
var nickname = document.getElementsByClassName("nickname0");
var box1 = document.getElementsByClassName("messagebox")[0];
var isAdmin = false;
var reAdmin = 0;

function setContent(msg, i) {
    if (isAdmin) {
        box1.setAttribute("class","adminbox");
    }
    else
    {
        box1.setAttribute("class","messagebox");
    }
    if (msg.content.length > 10) {
        doc[i].removeChild(doc[i].childNodes[0]);
        var marquee = document.createElement("marquee");
        marquee.setAttribute("class","content");
        marquee.setAttribute("scrollamount","20");
        marquee.innerHTML = msg.content;
        doc[i].appendChild(marquee);
    }
    else {
        doc[i].removeChild(doc[i].childNodes[0]);
        var h1 = document.createElement("h1");
        h1.setAttribute("class","content");
        h1.innerHTML = msg.content;
        doc[i].appendChild(h1);
    }
    img[i].src = msg.headimgurl;
    nickname[i].removeChild(nickname[i].childNodes[0]);
    var h4 = document.createElement("h4");
    h4.setAttribute("class","nickname");
    h4.innerHTML = msg.nickname;
    nickname[i].appendChild(h4);
}

function rcvMsg(msg) {
    message[2] = message[1];
    message[1] = message[0];
    message[0] = msg;
    if (!isAdmin){
        setContent(message[0],0);
        setContent(message[1],1);
        setContent(message[2],2);
    }
    else {
        setContent(message[0],1);
        setContent(message[1],2);
    }
}

var chat = io.connect('https://wall.cgcgbcbc.com');

chat.on('new message', function (msg) {
    //isAdmin = false;
    rcvMsg(msg);
    console.info('message:'+msg.nickname+' '+msg.content);
});
chat.on('admin', function (msg) {
    isAdmin = true;
    reAdmin++;
    window.setTimeout(function(){
        if (reAdmin == 0) {
            isAdmin = false;
            setContent(message[0], 0);
            setContent(message[1], 1);
            setContent(message[2], 2);
        }
    },10000);
    window.setTimeout(function(){
        reAdmin--;
    },9800);
    setContent({nickname:"管理员",content:msg.content,headimgurl:"image/hart.jpg"},0);
    setContent(message[0],1);
    setContent(message[1],2);
    console.info('admin:'+msg.content);
});