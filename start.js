var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = {"x":2,"y":1,"tx":50,"ty":70,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank","mastersword","boomerang"]};
// Il faut bien noter que les altitudes négatives sont interdites au dela de -1 pour cause de bugs graphiques
var niveau = [[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,-1,-1,0,1],[1,0,0,0,0,0,0,0,-1,0,1],[1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,2,0,0,0,1],[1,0,0,0,0,1,2,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1]];
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[["herbe0","rubisVert"],["herbe0","rubisBleu"],["herbe0","rubisBleu"],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],["coffre0"],[""],[""],[""],[""]],[[""],["arbre0","rubisRouge"],[""],[""],[""],[""],[""],[""],[""],["herbe0","rubisBleu"],["herbe0","rubisBleu"]],[[""],[""],[""],["herbe1"],["herbe0","rubisRouge"],["herbe0"],["herbe0"],[""],[""],[""],[""]],[["herbe0"],["herbe0"],["herbe0"],["herbe0"],["herbe0"],["herbe0"],[""],[""],[""],[""],[""]],[["rubisVert","rubisBleu"],["rubisBleu"],[""],[""],[""],["herbe0"],["herbe0"],["herbe0"],["herbe0"],[""],[""]],[[""],[""],[""],[""],[""],[""],["arbre0"],[""],[""],[""],["rubisRouge","herbe0","rubisVert","herbe1"]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image()];
var imgElement = {};
var imgMenu = {};
var imgArme = {};
var tElement = {"rubisBleu":[50,70],"rubisVert":[50,70],"rubisRouge":[50,70],"arbre0":[50,95],"herbe0":[50,50],"herbe1":[50,50],"coffre0":[50,50],"coffre1":[50,50]};

// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function charge(){
    var imgArbre = ["arbre0","herbe0","herbe1","coffre0","coffre1"];
    var imgInterface = ["blank","mastersword","boomerang"];
    var imgRubis = ["rubisVert","rubisBleu","rubisRouge"];
    var armes = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang","boomerang0","boomerang1","boomerang2","boomerang3"];
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length;
    imgRubis.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/rubis/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgArbre.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgInterface.forEach(
        function(e,i){
            imgMenu[e] = new Image();
            imgMenu[e].src = "images/interface/" + e + ".png";
            imgMenu[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    armes.forEach(
        function(e,i){
            imgArme[e] = new Image();
            imgArme[e].src = "images/heros/" + e + ".png";
            imgArme[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgHeros.forEach(
        function(e,i){
            e.src = "images/heros/heros"+i+".png";
            e.onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
}


function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    resize();
    //    canvas.addEventListener("click",function(evt) {
    //                           evt.stopPropagation();
    //                        evt.preventDefault();
    //                          //evt = evt.changedTouches[0];
    //                        var rect = canvas.getBoundingClientRect();
    //                       var x = evt.pageX - rect.left;
    //                       var y = evt.pageY - rect.top;
    //                       click(x, y);
    //                  });
    document.addEventListener(
        "keydown",
        function (event){
            console.log(event.keyCode);
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
            if (event.keyCode == 16) attack();
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
            if (event.keyCode == 17) changeArme();
            if (event.keyCode == 16) disalert();
        }
    );
//    alert("Salut les amis c'est moi Mikey !");
    charge();
}

function animation(){
    var f = function(t) {
        action(t);
        window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function action(t){
    if (heros.vx == 0 && heros.vy == 0){
        if (objNiveau[heros.y][heros.x][0] != "" && objNiveau[heros.y][heros.x][0] != "herbe0"){
            if (objNiveau[heros.y][heros.x][0] == "rubisVert"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.rubis += 1;
            }
            if (objNiveau[heros.y][heros.x][0] == "rubisBleu"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.rubis += 5;
            }
            if (objNiveau[heros.y][heros.x][0] == "rubisRouge"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.rubis += 20;
            }
            if (objNiveau[heros.y][heros.x].length > 1) objNiveau[heros.y][heros.x].splice(0,1);

        }
        if (1 == keys[39]) moveRight();
        else if (1 == keys[37]) moveLeft();
        else if (1 == keys[38]) moveUp();
        else if (1 == keys[40]) moveDown();
    }
    else if (heros.vx > 0) heros.vx -= 5;
    else if (heros.vy > 0) heros.vy -= 5;
    else if (heros.vx < 0) heros.vx += 5;
    else if (heros.vy < 0) heros.vy += 5;
    draw();
}

function moveRight(){
    if (heros.sens != 1){
        heros.sens = 1;
        heros.delay = 2;
        return;
    }
    if (heros.delay != 0){
        heros.delay -= 1;
        return;
    }
    if (heros.x == niveau[heros.y].length - 1) return;
    if (niveau[heros.y][heros.x] + 1 < niveau[heros.y][heros.x+1]) return;
    if (objNiveau[heros.y][heros.x+1][0] == "arbre0" | objNiveau[heros.y][heros.x+1][0] == "coffre0" | objNiveau[heros.y][heros.x+1][0] == "coffre1") return;
    if (niveau[heros.y][heros.x] > niveau[heros.y][heros.x+1]) heros.vy = -20*(niveau[heros.y][heros.x] - niveau[heros.y][heros.x+1]);
    heros.x += 1;
    heros.vx = -50;
}
function moveLeft(){
    if (heros.sens != 3){
        heros.sens = 3;
        heros.delay = 2;
        return;
    }
    if (heros.delay != 0){
        heros.delay -= 1;
        return;
    }
    if (heros.x == 0) return;
    if (niveau[heros.y][heros.x] + 1 < niveau[heros.y][heros.x-1]) return;
    if (objNiveau[heros.y][heros.x-1][0] == "arbre0" | objNiveau[heros.y][heros.x-1][0] == "coffre0" | objNiveau[heros.y][heros.x-1][0] == "coffre1") return;
    if (niveau[heros.y][heros.x] > niveau[heros.y][heros.x-1]) heros.vy = -20*(niveau[heros.y][heros.x] - niveau[heros.y][heros.x-1]);
    heros.x -= 1;
    heros.vx = 50;
}
function moveUp(){
    if (heros.sens != 0){
        heros.sens = 0;
        heros.delay = 2;
        return;
    }
    if (heros.delay != 0){
        heros.delay -= 1;
        return;
    }
    if (heros.y == 0) return;
    if (niveau[heros.y][heros.x] + 1 < niveau[heros.y-1][heros.x]) return;
    if (objNiveau[heros.y-1][heros.x][0] == "arbre0" | objNiveau[heros.y-1][heros.x][0] == "coffre0"  | objNiveau[heros.y-1][heros.x][0] == "coffre1") return;
    heros.y -= 1;
    heros.vy = 50 - 20*(niveau[heros.y+1][heros.x] - niveau[heros.y][heros.x]);
}
function moveDown(){
    if (heros.sens != 2){
        heros.sens = 2;
        heros.delay = 2;
        return;
    }
    if (heros.delay != 0){
        heros.delay -= 1;
        return;
    }
    if (heros.y == niveau.length - 1) return;
    if (objNiveau[heros.y+1][heros.x][0] == "arbre0" | objNiveau[heros.y+1][heros.x][0] == "coffre0" | objNiveau[heros.y+1][heros.x][0] == "coffre1") return;
    if (niveau[heros.y][heros.x] + 1 < niveau[heros.y+1][heros.x]) return;
    heros.y += 1;
    heros.vy = -50;
}

function changeArme(){
    heros.objet = (heros.objet+1)%heros.invent.length;
}

function draw() {
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    ctx.fillStyle = "rgb(120,154,61)";
                    ctx.fillRect(x*50,y*50-f*20,50,50);
                    ctx.fillStyle = "rgb(107,93,66)";
                    ctx.fillRect(x*50,y*50-f*20+50,50,20+20*f);
                    ctx.fillStyle = "rgb(0,0,0)";
                    testTerrain(x,y,f);
                    if (objNiveau[y][x][0] != "") ctx.drawImage(imgElement[objNiveau[y][x][0]],x*50 - (tElement[objNiveau[y][x][0]][0] - 50)/2,y*50 - 20*niveau[y][x] - (tElement[objNiveau[y][x][0]][1]-40));
                    if (y == heros.y && x == e.length - 1) drawHeros();
                    if (heros.vy > 0 && y == heros.y + 1 && x == e.length - 1) drawHeros();
                }
            );
        }
    );
    drawInterface();
}

function drawHeros(){
    ctx.drawImage(imgHeros[heros.sens],heros.x * 50 - (heros.tx - 50)/2 + heros.vx,heros.y * 50 - (heros.ty - 40) - 20*niveau[heros.y][heros.x] + heros.vy);
    if (heros.invent[heros.objet] != "blank") {
        ctx.drawImage(imgArme[heros.invent[heros.objet] + heros.sens],heros.x * 50 - (heros.tx - 50)/2 + heros.vx,heros.y * 50 - (heros.ty - 40) - 20*niveau[heros.y][heros.x] + heros.vy);
    }
}

function testTerrain(x,y,f){
    if (x == niveau[y].length - 1) ctx.fillRect(x*50 + 48,y*50-f*20,2,70 + niveau[y][x]*20);
    else if (niveau[y][x+1] < f) ctx.fillRect(x*50 + 48,y*50-f*20,2,50 + 20*(f-niveau[y][x+1]));
    if (x == 0) ctx.fillRect(x*50,y*50-f*20,2,70  + niveau[y][x]*20);
    else if (niveau[y][x-1] < f) ctx.fillRect(x*50,y*50-f*20,2,50 + 20*(f-niveau[y][x-1]));
    if (y == niveau.length - 1) ctx.fillRect(x*50,y*50-f*20+48,50,2);
    else if (niveau[y+1][x] < f) ctx.fillRect(x*50,y*50-f*20+48,50,2);
    if (y == 0) ctx.fillRect(x*50,y*50-f*20,50,2);
    else if (niveau[y-1][x] < f) ctx.fillRect(x*50,y*50-f*20,50,2);
}

function drawInterface(){
    ctx.drawImage(imgMenu[heros.invent[heros.objet]],W-50,0);
}

function attack(){
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
    if (heros.invent[heros.objet] == "mastersword"){
        if (niveau[heros.y + vecteurs[heros.sens][0]][heros.x + vecteurs[heros.sens][1]] != niveau[heros.y][heros.x]) return;
        if (objNiveau[heros.y + vecteurs[heros.sens][0]][heros.x + vecteurs[heros.sens][1]][0] == "herbe0" | objNiveau[heros.y + vecteurs[heros.sens][0]][heros.x + vecteurs[heros.sens][1]][0] == "herbe1"){
            if (objNiveau[heros.y + vecteurs[heros.sens][0]][heros.x + vecteurs[heros.sens][1]].length > 1){
                objNiveau[heros.y + vecteurs[heros.sens][0]][heros.x + vecteurs[heros.sens][1]].splice(0,1);
            }
            else {
                objNiveau[heros.y + vecteurs[heros.sens][0]][heros.x + vecteurs[heros.sens][1]][0] = grassContent[rnd(grassContent.length - 1)];
            }

        }

    }
    if (heros.sens == 0 && objNiveau[heros.y - 1][heros.x][0] == "coffre0"){
        objNiveau[heros.y - 1][heros.x][0] = "coffre1";


    }


}
