/**
 * Created by Administrator on 2016/7/11.
 */
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
canvas.style.position = "absolute";
canvas.style.left = "400px";
canvas.style.top = "50px";
document.body.appendChild(canvas);
document.getElementsByClassName('left')[0].style.display='none';


var audio = document.getElementById('bgm');
var originMap = {//1
    map:[
        0,0,1,1,1,0,0,0,
        0,0,1,3,1,0,0,0,
        0,0,1,2,1,1,1,1,
        1,1,1,2,2,2,3,1,
        1,3,2,2,2,1,1,1,
        1,1,1,1,2,1,0,0,
        0,0,0,1,3,1,0,0,
        0,0,0,1,1,1,0,0
    ],
    boxPos:[
        {x:3,y:3},
        {x:3,y:4},
        {x:5,y:3},
        {x:4,y:5}
    ],
    personPos:{x:4,y:4}
};
var img = [
    'images/tree.png','images/wall.jpg','images/allow_bg.jpg','images/target.jpg','images/door.jpg',
    'images/door1.jpg','images/door1.jpg','','','','images/splitwall.png','images/wall.jpg','images/allow_bg.jpg'
];
addEventListener("keyup", function (e) {
    var keyID = e.keyCode ? e.keyCode : e.which;
    if (keyID == 66) {
        if(!audio.paused)
        {
            audio.pause();
        }
        else {
            audio.play();
        }
    }
}, false);

document.getElementById('bgm').play();
audio.pause();
BoxYouXi = {
    direction:1,
    person:{},
    history:[],
    target:{},
    boxs:[],
    step:0,
    gk:[
        {//1
            map:[
                0,0,1,1,1,0,0,0,
                0,0,1,3,1,0,0,0,
                0,0,1,2,1,1,1,1,
                1,1,1,2,2,2,3,1,
                1,3,2,2,2,1,1,1,
                1,1,1,1,2,1,0,0,
                0,0,0,1,3,1,0,0,
                0,0,0,1,1,1,0,0
            ],
            boxPos:[
                {x:3,y:3},
                {x:3,y:4},
                {x:5,y:3},
                {x:4,y:5}
            ],
            personPos:{x:4,y:4}
        },
        {//2
            map:[
                0,0,1,1,1,0,0,0,
                0,1,3,3,1,1,1,1,
                0,1,2,2,2,2,2,1,
                1,2,2,2,1,2,2,1,
                1,2,2,1,2,3,2,1,
                1,2,2,2,2,2,2,1,
                1,3,2,2,2,2,1,0,
                0,1,1,1,1,1,1,0
            ],
            boxPos:[
                {x:5,y:3},
                {x:3,y:5},
                {x:2,y:4},
                {x:4,y:5}
            ],
            personPos:{x:4,y:6}
        },
        {//3
            map:[
                0,0,0,0,0,0,0,0,0,
                1,1,1,1,1,1,1,0,0,
                1,2,2,2,2,2,1,0,0,
                1,2,2,2,2,1,1,0,0,
                1,2,2,1,3,3,1,1,1,
                1,1,2,2,3,3,2,2,1,
                0,1,2,2,2,2,2,2,1,
                0,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0
            ],
            boxPos:[
                {x:2,y:3},
                {x:3,y:3},
                {x:4,y:3},
                {x:6,y:5}
            ],
            personPos:{x:3,y:6}
        },
        {//4
            map:[
                0,0,0,0,0,0,0,0,0,0,
                0,0,0,1,1,1,1,1,1,1,
                0,0,1,1,2,2,1,2,2,1,
                0,0,1,2,2,2,1,2,2,1,
                0,0,1,2,2,2,2,2,2,1,
                0,0,1,2,2,1,1,2,2,1,
                1,1,1,2,2,2,1,2,1,1,
                1,3,3,3,3,3,2,2,1,0,
                1,1,1,1,1,1,1,1,1,0,
                0,0,1,1,1,1,1,0,0,0,
            ],
            doorPos:[
                {x:4,y:4},
                {x:3,y:3}
            ],
            boxPos:[
                {x:7,y:3},
                {x:6,y:4},
                {x:3,y:4},
                {x:4,y:6},
                {x:4,y:5}
            ],
            personPos:{x:8,y:2}
        },
        {//5
            map:[
                1,1,1,1,1,0,0,0,
                1,2,2,2,1,1,1,1,
                1,2,2,2,1,2,2,1,
                1,2,2,4,1,2,2,1,
                1,2,2,1,2,2,2,1,
                1,2,5,1,2,2,3,1,
                1,2,2,1,2,2,1,1,
                1,1,1,1,1,1,1,0
            ],
            doorPos:[
                {x:5,y:4},
            ],
            pDoorPos:[
                {x:6,y:2},
            ],
            boxPos:[
                {x:2,y:3},
            ],
            personPos:{x:1,y:6}
        },
        {//6
            map:[
                0,1,1,1,1,1,1,1,1,1,0,0,
                0,1,1,1,3,2,1,2,3,1,0,0,
                0,1,2,2,2,2,1,2,2,1,1,0,
                0,1,2,2,2,1,2,2,2,2,1,0,
                0,1,2,2,5,1,1,2,2,2,1,1,
                1,1,2,2,2,2,1,2,2,2,6,1,
                1,2,2,2,2,4,1,2,2,2,2,1,
                1,2,2,2,2,1,2,2,2,2,2,1,
                1,2,2,2,2,1,2,2,2,2,2,1,
                1,3,2,2,1,2,2,2,2,3,1,1,
                1,1,2,2,1,3,2,2,1,1,1,0,
                0,1,1,1,1,1,1,1,0,0,0,0
            ],
            doorPos:[
                {x:8,y:4}
            ],
            pDoorPos:[
                {x:8,y:3},
                {x:5,y:5},
            ],
            boxPos:[
                {x:7,y:3},
                {x:8,y:4},
                {x:3,y:4},
                {x:4,y:6},
                {x:4,y:5}
            ],
            personPos:{x:8,y:2}
        },
        {//7
            map:[
                0,0,0,0,0,0,0,0,0,
                0,1,1,1,1,1,1,1,0,
                0,1,2,2,3,3,3,1,0,
                0,1,2,2,2,1,1,1,1,
                1,1,1,2,2,2,2,2,1,
                1,2,2,2,1,2,1,2,1,
                1,2,2,2,1,2,11,2,1,
                1,2,2,2,1,1,1,1,1,
                1,1,1,1,1,0,0,0,0
            ],
            boxPos:[
                {x:3,y:4},
                {x:2,y:6},
                {x:5,y:5}
            ],
            personPos:{x:7,y:4}
        },
        {//8
            map:[
                0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,1,1,1,1,1,1,1,1,1,
                0,0,0,1,2,2,2,2,2,2,2,1,
                0,0,1,1,2,2,2,2,1,3,1,1,
                0,0,1,2,3,1,2,2,2,2,1,1,
                0,0,1,2,1,2,2,2,2,2,1,1,
                0,0,1,2,1,2,2,2,2,1,3,1,
                1,1,1,2,1,11,1,2,2,11,2,1,
                1,2,2,2,2,2,3,1,1,1,2,1,
                1,2,2,2,1,1,2,2,2,2,2,1,
                1,1,1,1,1,1,1,1,1,1,1,1,
                0,0,0,0,0,0,0,0,0,0,0,0
            ],
            boxPos:[
                {x:6,y:4},
                {x:8,y:4},
                {x:6,y:6},
                {x:8,y:6}
            ],
            personPos:{x:3,y:9}
        },
        {//9
            map:[
                0,1,0,0,0,1,0,0,0,
                0,1,2,2,2,1,1,1,0,
                0,1,2,2,3,3,3,1,0,
                0,1,2,2,2,1,1,1,1,
                1,1,1,2,2,2,2,2,1,
                1,2,2,2,1,2,2,2,1,
                1,2,2,2,1,2,2,2,1,
                1,2,2,2,1,1,1,1,1,
                1,1,1,1,1,0,0,0,0
            ],
            boxPos:[
                {x:3,y:4},
                {x:6,y:5},
                {x:4,y:1}
            ],
            personPos:{x:3,y:5}
        },
        {//10
            map:[
                1,1,1,1,1,1,1,1,1,1,1,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,2,2,2,2,2,2,2,3,3,3,1,
                1,1,1,1,1,1,1,1,1,1,1,1
            ],
            boxPos:[
                {x:3,y:1},
                {x:5,y:1},
                {x:7,y:1},
                {x:2,y:2},
                {x:4,y:2},
                {x:6,y:2},
                {x:3,y:3},
                {x:5,y:3},
                {x:7,y:3},
                {x:2,y:4},
                {x:4,y:4},
                {x:6,y:4},
                {x:3,y:5},
                {x:5,y:5},
                {x:7,y:5},
                {x:2,y:6},
                {x:4,y:6},
                {x:6,y:6},
                {x:3,y:7},
                {x:5,y:7},
                {x:7,y:7},
                {x:2,y:8},
                {x:4,y:8},
                {x:6,y:8},
                {x:3,y:9},
                {x:5,y:9},
                {x:7,y:9},
                {x:2,y:10},
                {x:4,y:10},
                {x:6,y:10}
            ],
            personPos:{x:1,y:1}
        }
    ],
    paintCanvas:function(gk){
        this.colsNum = Math.sqrt(gk.map.length);
        for(var i=0;i<gk.map.length;i++){
            var x = Math.floor(i / this.colsNum);
            var y = i % this.colsNum;
            var image=new Image();
            image.src=img[gk.map[i]];
            ctx.drawImage(image,y*50,x*50,50,50);
        }
        var image=new Image();
        image.src = 'images/cat.png';
        ctx.drawImage(image,50*this.direction,0,50,50,this.person.x*50,this.person.y*50,50,50);
        for(var i=0;i<gk.boxPos.length;i++){
            var image=new Image();
            image.src = 'images/box.jpg';
            ctx.drawImage(image,this.boxs[i].x*50,this.boxs[i].y*50,50,50);
        }
    },
    createMap:function(gk){
        document.title = '当前第'+(this.num+1)+'关';
        document.getElementsByTagName('h1')[0].innerHTML = '第'+(this.num+1)+'关';
        this.direction = 0;
        this.colsNum = Math.sqrt(gk.map.length);
        for(var i=0;i<gk.map.length;i++){
            var x = Math.floor(i / this.colsNum);
            var y = i % this.colsNum;
            var image=new Image();
            image.src=img[gk.map[i]];
            ctx.drawImage(image,y*50,x*50,50,50);
        }
        this.createMan(gk);
    },
    createMan:function(gk){
        this.person.x = gk.personPos.x;
        this.person.y = gk.personPos.y;
        var image=new Image();
        image.src = 'images/cat.png';
        ctx.drawImage(image,0,0,50,50,gk.personPos.x*50,gk.personPos.y*50,50,50);
        this.createBox(gk);
    },
    createBox:function(gk){
        for(var i=0;i<gk.boxPos.length;i++){
            var image=new Image();
            image.src = 'images/box.jpg';
            ctx.drawImage(image,gk.boxPos[i].x*50,gk.boxPos[i].y*50,50,50);
            this.boxs.push({x:gk.boxPos[i].x,y:gk.boxPos[i].y});
        }
    },
    personRun:function(iJons){
        var gk = this.gk[this.num];
        var map = gk.map;
        var x = this.person.x+iJons.x;
        var y = this.person.y+iJons.y;
        var bx = x+iJons.x;
        var by = y+iJons.y;
        if(map[this.colsNum*y+x]==1){ //遇上墙壁
            return;
        }
        if (map[this.colsNum*y+x]==11){ //可破坏墙壁
            map[this.colsNum*y+x]=10;
            return;
        }
        if (map[this.colsNum*y+x]==10){ //破坏墙壁
            map[this.colsNum*y+x]=2;
            return;
        }
        this.person.x = x;
        this.person.y = y;
        if (map[x+y*this.colsNum] == 5 || map[x+y*this.colsNum] == 6) { //传送点
            var tmp = map[x+y*this.colsNum] - 5;
            this.person.x = gk.pDoorPos[tmp].x;
            this.person.y = gk.pDoorPos[tmp].y;
            this.step++;
            return;
        }
        for(var i=0;i<this.boxs.length;i++){
            if(this.impactCheck(this.person,this.boxs[i])){
                if(map[this.colsNum*by+bx] == 1){ //撞墙
                    this.person.x = x-iJons.x;
                    this.person.y = y-iJons.y;
                    return;
                }
                if (map[bx+by*this.colsNum] ==  4) { //箱子传送点
                    this.boxs[i].x = gk.doorPos[0].x;
                    this.boxs[i].y = gk.doorPos[0].y;
                }
                else {
                    this.boxs[i].x = bx;
                    this.boxs[i].y = by;
                }
                for(var n=0;n<this.boxs.length;n++){
                    if(this.boxs[i]!=this.boxs[n] && this.impactCheck(this.boxs[i],this.boxs[n])){
                        this.person.x = x-iJons.x;
                        this.person.y = y-iJons.y;
                        this.boxs[i].x = (bx-iJons.x);
                        this.boxs[i].y = (by-iJons.y);
                        return;
                    }
                }
                if(map[this.boxs[i].x+this.boxs[i].y*this.colsNum] == 3){
                    this.boxs[i].ok = true;
                    var sucLen = 0;
                    for(var n=0;n<this.boxs.length;n++){
                        if(this.boxs[n].ok){
                            sucLen++;
                        }
                    }
                    if(sucLen==this.boxs.length)
                    {
                        this.nextLevel();
                        return;
                    }
                }
                else{
                    this.boxs[i].ok = false;
                }
                break;
            }
        }
        if(this.preTmp)this.history.push(this.preTmp);
        this.preTmp = {
            boxPos:[]
        };
        this.preTmp.personPos = {
            x:this.person.x,
            y:this.person.y
        }
        for(var i=0;i<this.boxs.length;i++){
            this.preTmp.boxPos[i] = {
                x:this.boxs[i].x,
                y:this.boxs[i].y
            }
        }
        if(this.history.length>20){
            this.history.splice(0,1);
        }
        this.step++;
    },
    setTips:function(num){
    },
    nextLevel:function(){
        this.person = {};
        this.history = [];
        this.target = [];
        this.boxs = [];
        this.oParent.innerHTML = '';
        this.num++;
        this.setTips(this.num);
        this.step = 0;
        if(this.num >= 10){
            //alert('恭喜你已经通过了所有关卡，可以下山了');

            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Courier New";
            ctx.fillStyle = "red";
            ctx.fillText("恭喜你完成了所有关卡，真棒！", 300, 200);
            ctx.fillStyle = "white";
            ctx.fillText("按空格键以重新开始游戏", 320, 400);
            return false;
        }
        this.createMap(this.gk[this.num]);
        originMap = this.gk[this.num];
    },
    reStart: function () {
        if (this.num >= 10){
            this.person = {};
            this.history = [];
            this.target = [];
            this.boxs = [];
            this.oParent.innerHTML = '';
            this.num = 0;
            this.step = 0;
            this.createMap(this.gk[this.num]);
            originMap = this.gk[this.num];
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    impactCheck:function(obj1,obj2){//碰撞检测
        if (obj1.x == obj2.x && obj1.y == obj2.y) return true;
        return false;
    },
    backPrevStep:function(){
        var prevIndex = this.history.length-1;
        this.step = 0;
        if(!this.history[prevIndex])return;
        var perPos = this.history[prevIndex].personPos;
        var boxPos = this.history[prevIndex].boxPos;
        this.history.splice(prevIndex,1);
        this.person.x = perPos.x;
        this.person.y = perPos.y;
        for(var i=0;i<boxPos.length;i++){
            this.boxs[i].x = boxPos[i].x;
            this.boxs[i].y = boxPos[i].y;
        }
    },
    ResetMap:function(){
        this.history = [];
        this.target = [];
        this.boxs = [];
        this.oParent.innerHTML = '';
        this.step = 0;
        this.createMap(originMap);
    },
    init:function(oParent,num){
        this.num = num;
        this.oParent = oParent;
        var gk = this.gk[num];
        this.createMap(gk);
        var self = this;
        onkeyup = function(ev){
            var oEvent = ev || event;
            if (self.num >= 10) return;
            switch(oEvent.keyCode){
                case 37://left
                    self.direction = 1;
                    self.personRun({x:-1,y:0});
                    break;
                case 65://left
                    self.direction = 1;
                    self.personRun({x:-1,y:0});
                    break;
                case 38://up
                    self.direction = 0;
                    self.personRun({x:0,y:-1});
                    break;
                case 87://up
                    self.direction = 0;
                    self.personRun({x:0,y:-1});
                    break;
                case 39://right
                    self.direction = 3;
                    self.personRun({x:1,y:0});
                    break;
                case 68://right
                    self.direction = 3;
                    self.personRun({x:1,y:0});
                    break;
                case 40://down
                    self.direction = 2;
                    self.personRun({x:0,y:1});
                    break;
                case 83://down
                    self.direction = 2;
                    self.personRun({x:0,y:1});
                    break;
                case 81://上一步
                    self.backPrevStep();
                    break;
                case 82://上一步
                    self.ResetMap();
                    break;
                case 119:
                    self.nextLevel();
                    //console.log('ok');
                    break;
                case 32:
                    //self.reStart();
                    //console.log('ok');
                    break;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            self.paintCanvas(self.gk[self.num]);
            document.getElementsByTagName('h1')[1].innerHTML = '当前<p>'+self.step+'</p>步';
        }
    }
}

initCanvas = function(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, 600, 500);
    ctx.font = "30px Courier New";
    ctx.fillStyle = "red";
    ctx.fillText("上下左右移动人物！", 180, 150);
    ctx.fillText("R键重玩本关！", 220, 200);
    ctx.fillText("Q键撤销上一步（至多20步）！", 120, 250);
    ctx.fillStyle = "white";
    ctx.fillText("按回车键以开始游戏", 180, 350);
}

initCanvas();

onkeyup = function(ev) {
    var oEvent = ev || event;

    if (oEvent.keyCode == 13) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementsByClassName('left')[0].style.display='block';
        BoxYouXi.init(document.getElementById('yxbox'), 0);

    }
}