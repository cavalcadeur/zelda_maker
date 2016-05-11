var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = [{"x":0,"y":4,"vx":0,"vy":0,"sens":0,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1},{"x":1,"y":4,"vx":0,"vy":0,"sens":0,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1}];
var boomerang = [];
// Il faut bien noter que les altitudes négatives sont interdites au dela de -1 pour cause de bugs graphiques
var niveau = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,0,-1],[1,0,0,0,0,0,0,0,-1,0,-1,-1,-1,0,0],[1,0,0,0,0,0,0,0,-1,0,-1,1,-1,1,1],[1,0,2,2,2,0,0,0,-1,0,-1,0,-1,-1,-1],[1,0,2,0,2,0,0,0,-1,0,-1,0,0,-1,-1],[1,0,2,0,2,0,0,0,-1,0,-1,0,0,0,0],[1,0,2,0,3,3,3,0,0,0,0,0,0,0,0],[1,0,2,0,0,0,2,0,0,0,1,0,0,0,1],[1,0,2,2,2,0,2,0,0,0,1,0,0,0,1],[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0],[1,0,1,1,-1,-1,-1,-1,-1,1,1,0,0,0,1],[1,0,2,0,0,0,0,0,-1,3,1,0,0,0,1],[1,0,0,0,-1,-1,-1,0,-1,2,1,0,1,0,1],[1,0,0,0,-1,0,-1,0,-1,2,1,0,0,0,1],[1,0,0,0,-1,0,-1,0,-1,2,1,0,0,0,1],[1,0,0,0,-1,0,0,0,-1,2,1,1,1,1,1]];
Painter.niveau( niveau );
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[["herbe0","rubisVert"],["herbe0","rubisBleu"],["herbe0","rubisBleu"],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],["coffre0","rubisRouge"],[""]],[["coffre0","pencil"],[""],[""],[""],[""],[""],[""],[""],[""],["coffre0","cle1"],[""],[""],[""],[""],[""]],[[""],["arbre0","rubisRouge"],[""],[""],[""],[""],[""],[""],[""],["herbe0","rubisBleu"],[""],[""],[""],[""],["arbre0"]],[[""],[""],[""],["herbe1"],["herbe0","rubisRouge"],["herbe0"],["herbe0"],[""],[""],["cle0"],[""],[""],[""],[""],[""]],[["herbe0"],["herbe0"],["herbe0"],["coffre0","arbre0"],["herbe0"],["herbe0","coffre0","rubisVert"],[""],[""],[""],[""],[""],["herbe0"],["herbe0"],[""],[""]],[["rubisVert","rubisBleu"],["rubisBleu"],[""],["porte0"],[""],["herbe0"],["herbe0"],["herbe0"],[""],["porte0"],[""],["herbe0"],["herbe0"],[""],[""]],[[""],[""],[""],[""],["herbe0"],["herbe0"],["arbre0"],[""],[""],[""],["rubisRouge","herbe0","rubisVert","herbe1"],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],["coffre0","mastersword"],[""],[""],[""],[""],[""],[""],[""],["arbre0"]],[[""],[""],["herbe0","rubisBleu"],["herbe0"],[""],["porte0"],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],["coffre0","boomerang"],["herbe0"],["herbe0"],[""],["herbe0"]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],["herbe0"],["herbe0"],[""],[""]],[[""],["boomerang"],["herbe0"],["porte0"],[""],[""],["bleu0"],[""],[""],["herbe1"],[""],[""],[""],[""],[""]],[[""],[""],["herbe0"],[""],[""],[""],[""],[""],[""],["herbe0"],[""],[""],["arbre0"],[""],["coffre0","herbe0"]],[[""],["herbe0"],["herbe0"],[""],[""],["switch0"],[""],[""],[""],["herbe0"],[""],[""],[""],[""],[""]],[[""],["herbe0"],["herbe0"],["herbe0"],[""],["coffre0","coffre0"],[""],[""],[""],["arbre0"],[""],[""],[""],[""],["herbe0"]],[[""],["herbe0"],["herbe1"],["herbe0"],[""],[""],["rouge0"],[""],[""],["herbe0"],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var imgElement = {};
var imgMenu = {};
var imgArme = {};
var figer = 0;
var edition = 0;
var scrollX = 0;
var scrollY = 0;
var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
var imgArbre = ["arbre0","herbe0","herbe1","coffre0","coffre1","porte0","cle0","cle1","bleu0","bleu1","rouge0","rouge1","switch0","switch1"];
var mouse = [0,0];
var editObject = ["rien","rubisVert","rubisBleu","rubisRouge","arbre0","herbe0","herbe1","coffre0","coffre1","porte0","cle0","cle1","bleu0","rouge0","switch0","mastersword","boomerang"];
var editnumber = 1;

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
    var imgInterface = ["blank","mastersword","boomerang","pencil"];
    var imgRubis = ["rubisVert","rubisBleu","rubisRouge"];
    var armes = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3"];
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + imgInterface.length;
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
    imgInterface.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/armes/" + e + ".png";
            imgElement[e].onload = function(){
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
        "mouseup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            if (edition == 0) return;
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX;
            var y = event.clientY;
            if (editnumber == 0){
                if (event.button == 0) pencil(x,y,1);
                else pencil(x,y,-1);
            }
            else{ 
                if (event.button == 0) pencil(x,y,editObject[editnumber]);
                else pencil(x,y,"delete");
            }
        }
    );
    document.addEventListener(
        "wheel",
        function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (edition == 0) return;
            if (evt.deltaY > 0 && editnumber > 0) editnumber = (editnumber - 1) % editObject.length;
            else if (evt.deltaY > 0 && editnumber == 0) editnumber = editObject.length - 1;
            else editnumber = (editnumber + 1) % editObject.length;
        });
    document.addEventListener(
        "mousemove",
        function (event){
            mouse[1] = event.clientX;
            mouse[0] = event.clientY;
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
            console.log(event.keyCode);
            if (event.keyCode == 16) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = ""; heros[2].aura = "";} else{attack(0);}}
            else if (event.keyCode == 13) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = ""; heros[2].aura = "";} else{attack(1);}}
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
            if (event.keyCode == 17) changeArme(0);
            else if (event.keyCode == 96) changeArme(1);
        }
    );
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
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
        if (h.vx == 0 && h.vy == 0 && figer == 0){
            if (objNiveau[h.y][h.x][0] != "" && objNiveau[h.y][h.x][0] != "herbe0" && objNiveau[h.y][h.x][0] != "herbe1" && objNiveau[h.y][h.x][0] != "bleu1" && objNiveau[h.y][h.x][0] != "rouge0" && objNiveau[h.y][h.x][0] != "bleu0" && objNiveau[h.y][h.x][0] != "rouge1"){
                if (objNiveau[h.y][h.x][0] == "rubisVert"){
                    h.rubis += 1;
                }
                else if (objNiveau[h.y][h.x][0] == "rubisBleu"){
                    h.rubis += 5;
                }
                else if (objNiveau[h.y][h.x][0] == "rubisRouge"){
                    h.rubis += 20;
                }
                else if (objNiveau[h.y][h.x][0] == "cle0"){
                    h.cles += 1;
                }
                else if (objNiveau[h.y][h.x][0] == "boomerang" || objNiveau[h.y][h.x][0] == "mastersword" || objNiveau[h.y][h.x][0] == "pencil"){
                    h.invent.push(objNiveau[h.y][h.x][0]);
                    h.objet = h.invent.length - 1;
                }
                if (objNiveau[h.y][h.x].length > 1) objNiveau[h.y][h.x].splice(0,1);
                else objNiveau[h.y][h.x][0] = "";
                
            }
            if (1 == keys[controlKeys[n][1]]) move(1,n);
            else if (1 == keys[controlKeys[n][3]]) move(3,n);
            else if (1 == keys[controlKeys[n][0]]) move(0,n);
            else if (1 == keys[controlKeys[n][2]]) move(2,n);
        }
        if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
        else if (h.vx > 0) {h.vx -= 5; if(h.x*50 + scrollX < 0) scrollX += 5;}
        else if (h.vy > 0) {h.vy -= 5; if(h.y*50 + scrollX < 0) scrollY += 5;}
        else if (h.vx < 0) {h.vx += 5; if(h.x*50 + scrollX + 50 > W) scrollX -= 5;}
        else if (h.vy < 0) {h.vy += 5; if(h.y*50 + scrollY + 50 > H) scrollY -= 5;}
    });
    draw();
}

function move(d,n){
    if (heros[n].sens != d){
        heros[n].sens = d;
        heros[n].delay = 2;
        return;
    }
    if (heros[n].delay != 0){
        heros[n].delay -= 1;
        return;
    }
    if (heros[n].x + vecteurs[d][1] == niveau[heros[n].y].length | heros[n].x + vecteurs[d][1] == -1 | heros[n].y + vecteurs[d][0] == niveau.length | heros[n].y + vecteurs[d][0] == -1) return;
    if (niveau[heros[n].y][heros[n].x] + 1 < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) return;
    var truc = objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0];
    if (niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]] == -1 | truc == "arbre0" | truc == "coffre0" | truc == "coffre1" | truc == "porte0" | truc == "bleu0" | truc == "rouge1" | truc == "switch0" | truc == "switch1") return;
    if (niveau[heros[n].y][heros[n].x] > niveau[heros[n].y][heros[n].x+vecteurs[d][1]]) heros[n].vy = -20*(niveau[heros[n].y][heros[n].x] - niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]);
    heros[n].x +=  vecteurs[d][1];
    heros[n].y +=  vecteurs[d][0];
    heros[n].vx += -50 * vecteurs[d][1];
    heros[n].vy += -50 * vecteurs[d][0];
    if (d == 0) heros[n].vy += -20*(niveau[heros[n].y+1][heros[n].x] - niveau[heros[n].y][heros[n].x]);
}

function changeArme(n){
    heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
}

function draw() {
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    Painter.cell( ctx, x, y, f );    
                    if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                    else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                    //testTerrain(x,y,f);
                    //if (objNiveau[y][x][0] != "") ctx.drawImage(imgElement[objNiveau[y][x][0]],x*50 - (tElement[objNiveau[y][x][0]][0] - 50)/2 + scrollX,y*50 - 20*niveau[y][x] - (tElement[objNiveau[y][x][0]][1]-40) + scrollY);
                    heros.forEach(
                        function(h,n){
                            if (y == h.y && x == e.length - 1) drawHeros(n);
                            if (h.vy > 0 && y == h.y + 1 && x == e.length - 1) drawHeros(n);
                        }
                    );
                    boomerang.forEach(
                        function(f,i){
                            if ((y == f.y && x == e.length - 1) | (f.vy > 0 && y == f.y + 1 && x == e.length - 1)){
                                Painter.imgBoomerang( ctx, f.x + f.vx/50, f.y + f.vy/50, f.alti, f.r, imgElement["boomerang"] );
                                f.r += 0.5;
                                if (f.vx == 0 && f.vy == 0){
                                    if (f.endu == 0){
                                        objNiveau[f.y][f.x].splice(0,0,"boomerang");
                                        f.content.forEach(function(g){objNiveau[f.y][f.x].splice(1,0,g);});
                                        boomerang.splice(i,1);return;
                                    }
                                    else if (f.endu == 5) f.sens = (f.sens+2)%4;
                                    if ((f.y + vecteurs[f.sens][0]) <= -1 | (f.x + vecteurs[f.sens][1]) <= -1 | (f.y + vecteurs[f.sens][0]) >= niveau.length | (f.x + vecteurs[f.sens][1]) >= niveau[f.y].length){
                                        if (f.endu <= 5) f.endu = 1;
                                        else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                    }
                                    else {
                                        var truc = objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]][0];
                                        if (niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] > f.alti | ((truc == "coffre0" | truc == "coffre1" | truc == "arbre0" | truc == "porte0" | truc == "bleu0" | truc == "rouge1" | truc == "switch0" | truc == "switch1") && niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] == f.alti)){
                                            if (f.endu <= 5) f.endu = 1;
                                            else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                            if (truc == "switch0" | truc == "switch1") changeColor();
                                        }
                                        else {
                                            f.y += vecteurs[f.sens][0];
                                            f.x += vecteurs[f.sens][1];
                                            f.vy += vecteurs[f.sens][0] * -50;
                                            f.vx += vecteurs[f.sens][1] * -50;
                                        }
                                    }
                                    if ((objNiveau[f.y][f.x][0] == "herbe0" | objNiveau[f.y][f.x][0] == "herbe1")&&f.alti == niveau[f.y][f.x]) {
                                        if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                        else objNiveau[f.y][f.x].splice(0,1);
                                    }
                                    else if ((objNiveau[f.y][f.x][0] == "rubisVert" | objNiveau[f.y][f.x][0] == "rubisBleu" | objNiveau[f.y][f.x][0] == "rubisRouge" | objNiveau[f.y][f.x][0] == "cle0")&&f.alti == niveau[f.y][f.x]) {
                                        f.content.push(objNiveau[f.y][f.x][0]);
                                        if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                        else objNiveau[f.y][f.x].splice(0,1);
                                    }
                                    f.endu -= 1;
                                }
                                else if (f.vy > 0) f.vy -= 5;
                                else if (f.vy < 0) f.vy += 5;
                                else if (f.vx > 0) f.vx -= 5;
                                else if (f.vx < 0) f.vx += 5;
                            }
                        }
                    );
                }
            );
        }
    );
    drawInterface();
}

function drawHeros(n){
    if (edition == 1) return;
    Painter.img( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, niveau[heros[n].y][heros[n].x], imgHeros[heros[n].sens + 4*n] );
    if (heros[n].invent[heros[n].objet] != "blank") {
        Painter.img(ctx,heros[n].x + heros[n].vx/50,heros[n].y + heros[n].vy/50,niveau[heros[n].y][heros[n].x],imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    }
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x + heros[n].vx/50,heros[n].y - 1 + heros[n].vy/50,niveau[heros[n].y][heros[n].x],heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawInterface(){
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],W-50,0);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-50,55);
    if (edition == 1 && editObject[editnumber] != "rien"){
        ctx.drawImage(imgElement[editObject[editnumber]],mouse[1],mouse[0]- imgElement[editObject[editnumber]].height / 2);
    }
}

function attack(n){
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    if (heros[n].sens == 0 && (objNiveau[heros[n].y - 1][heros[n].x][0] == "coffre0" | objNiveau[heros[n].y - 1][heros[n].x][0] == "porte0")){
        if (objNiveau[heros[n].y - 1][heros[n].x][0] == "coffre0"){
            objNiveau[heros[n].y - 1][heros[n].x][0] = "coffre1";
            if (objNiveau[heros[n].y - 1][heros[n].x].length > 1)donnerHeros(objNiveau[heros[n].y - 1][heros[n].x][1],n);
            else donnerHeros("",n);
        }
        else if (objNiveau[heros[n].y - 1][heros[n].x][0] == "porte0"){
            if (heros[n].cles > 0) {objNiveau[heros[n].y - 1][heros[n].x][0] = ""; heros[n].cles -= 1;}
            else alert("Cette porte est verouillée.");
        }
    }
    else if (heros[n].invent[heros[n].objet] == "mastersword"){
        var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
        if (niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] != niveau[heros[n].y][heros[n].x]) return;
        if (truc == "herbe0" | truc == "herbe1"){
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1){
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            }
            else {
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = grassContent[rnd(grassContent.length - 1)];
            }
        }
        else if (truc == "switch0" || truc == "switch1") changeColor();
    }
    else if (heros[n].invent[heros[n].objet] == "boomerang"){
        boomerang.push({"x":heros[n].x,"y":heros[n].y,"vx":0,"vy":0,"sx":heros[n].x,"sy":heros[n].y,"r":0,"alti":niveau[heros[n].y][heros[n].x],"sens":heros[n].sens,"endu":10,"content":[]});
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
    }
    else if (heros[n].invent[heros[n].objet] == "pencil"){
        if (edition == 0)edition = 1;
        else {
            edition = 0;
            console.log(JSON.stringify(niveau));
            console.log(JSON.stringify(objNiveau));
        }
    }
}

function donnerHeros(obj,n){
    heros[n].sens = 2;
    heros[n].aura = obj;
    var description = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl et attaquez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl puis appuyez sur maj pour déchainer votre créativité."};
    alert(description[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "mastersword") {heros[n].invent.push("mastersword");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "boomerang") {heros[n].invent.push("boomerang");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "pencil") {heros[n].invent.push("pencil");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "cle0") {heros[n].cles += 1;}
    else if (obj == "cle1") {heros[n].cles += 5;}
}

function changeColor(){
    objNiveau.forEach(
        function(e){
            e.forEach(
                function(f){
                    if (f[0] == "switch0") f[0] = "switch1";
                    else if (f[0] == "switch1") f[0] = "switch0";
                    else if (f[0] == "bleu1") f[0] = "bleu0";
                    else if (f[0] == "bleu0") f[0] = "bleu1";
                    else if (f[0] == "rouge1") f[0] = "rouge0";
                    else if (f[0] == "rouge0") f[0] = "rouge1";
                }
            );
        }
    );

}

function pencil(x,y,action){
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
//    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    if (action == 1 || action == -1){
        if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] += action;
        Painter.niveau(niveau);
    }
    else if (action == "delete"){
        if (objNiveau[coor[0]][coor[1]].length > 1) objNiveau[coor[0]][coor[1]].splice(0,1);
        else objNiveau[coor[0]][coor[1]][0] = "";

    }
    else{
        if (objNiveau[coor[0]][coor[1]][0] != "") objNiveau[coor[0]][coor[1]].splice(0,0,action);
        else objNiveau[coor[0]][coor[1]][0] = action;
    }
}
