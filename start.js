var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = {"x":0,"y":4,"tx":50,"ty":70,"vx":0,"vy":0,"sens":0,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0};
var boomerang = [];
// Il faut bien noter que les altitudes négatives sont interdites au dela de -1 pour cause de bugs graphiques
var niveau = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
              [1,1,1,1,1,1,1,1,-1,-1,-1],
              [1,0,0,0,0,0,0,0,-1,0,-1],
              [1,0,0,0,0,0,0,0,-1,0,-1],
              [1,0,2,2,2,0,0,0,-1,0,-1],
              [1,0,2,0,2,0,0,0,-1,0,-1],
              [1,0,2,0,2,0,0,0,-1,0,-1],
              [1,0,2,0,3,3,3,0,0,0,0],
              [1,0,2,0,0,0,2,0,0,0,1],
              [1,0,2,2,2,0,2,0,0,0,1],
              [1,0,0,0,0,0,1,0,0,0,1],
              [1,1,1,1,1,1,1,1,1,1,1]];
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],
                 [["herbe0","rubisVert"],["herbe0","rubisBleu"],["herbe0","rubisBleu"],[""],[""],[""],[""],[""],[""],[""],[""]],
                 [["coffre0","pencil"],[""],[""],[""],[""],[""],[""],[""],[""],["coffre0","cle1"],[""]],
                 [[""],["arbre0","rubisRouge"],[""],[""],[""],[""],[""],[""],[""],["herbe0","rubisBleu"],[""]],
                 [[""],[""],[""],["herbe1"],["herbe0","rubisRouge"],["herbe0"],["herbe0"],[""],[""],["cle0"],[""]],
                 [["herbe0"],["herbe0"],["herbe0"],["coffre0","arbre0"],["herbe0"],["herbe0","coffre0","rubisVert"],[""],[""],[""],[""],[""]],
                 [["rubisVert","rubisBleu"],["rubisBleu"],[""],["porte0"],[""],["herbe0"],["herbe0"],["herbe0"],[""],["porte0"],[""]],
                 [[""],[""],[""],[""],[""],[""],["arbre0"],[""],[""],[""],["rubisRouge","herbe0","rubisVert","herbe1"]],
                 [[""],[""],[""],[""],[""],[""],["coffre0","mastersword"],[""],[""],[""],[""]],
                 [[""],[""],["herbe0","rubisBleu"],["herbe0"],[""],["porte0"],[""],[""],[""],[""],[""]],
                 [[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],["coffre0","boomerang"]],
                 [[""],[""],["boomerang"],[""],[""],[""],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image()];
var imgElement = {};
var imgMenu = {};
var imgArme = {};
var tElement = {"rubisBleu":[50,70],"rubisVert":[50,70],"rubisRouge":[50,70],"arbre0":[50,95],"herbe0":[50,50],"herbe1":[50,50],"coffre0":[50,50],"coffre1":[50,50],"boomerang":[25,26],"mastersword":[50,70],"pencil":[50,67],"blank":[50,50],"porte0":[50,50],"cle0":[23,23],"cle1":[51,46]};
var figer = 0;
var edition = 0;
var scrollX = 0;
var scrollY = 0;
var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
var imgArbre = ["arbre0","herbe0","herbe1","coffre0","coffre1","porte0","cle0","cle1"];

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
            if (event.button == 0) pencil(x,y,1);
            else pencil(x,y,-1);
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
            if (event.keyCode == 16) {disalert(); if (figer == 1){figer = 0; heros.aura = "";} else{attack();}}
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
            if (event.keyCode == 17) changeArme();
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
    if (heros.vx == 0 && heros.vy == 0 && figer == 0){
        if (objNiveau[heros.y][heros.x][0] != "" && objNiveau[heros.y][heros.x][0] != "herbe0"){
            if (objNiveau[heros.y][heros.x][0] == "rubisVert"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.rubis += 1;
            }
            else if (objNiveau[heros.y][heros.x][0] == "rubisBleu"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.rubis += 5;
            }
            else if (objNiveau[heros.y][heros.x][0] == "rubisRouge"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.rubis += 20;
            }
            else if (objNiveau[heros.y][heros.x][0] == "cle0"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.cles += 1;
            }
            else if (objNiveau[heros.y][heros.x][0] == "boomerang"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.invent.push("boomerang");
                heros.objet = heros.invent.length - 1;
            }
            else if (objNiveau[heros.y][heros.x][0] == "mastersword"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.invent.push("mastersword");
                heros.objet = heros.invent.length - 1;
            }
            else if (objNiveau[heros.y][heros.x][0] == "pencil"){
                objNiveau[heros.y][heros.x][0] = "";
                heros.invent.push("pencil");
                heros.objet = heros.invent.length - 1;
            }
            if (objNiveau[heros.y][heros.x].length > 1) objNiveau[heros.y][heros.x].splice(0,1);

        }
        if (1 == keys[39]) move(1);
        else if (1 == keys[37]) move(3);
        else if (1 == keys[38]) move(0);
        else if (1 == keys[40]) move(2);
    }
    if (figer == 1) {heros.tAura += heros.vAura; if (heros.tAura == 40 | heros.tAura == -40) heros.vAura = heros.vAura * -1;}
    else if (heros.vx > 0) {heros.vx -= 5; if(heros.x*50 + scrollX < 0) scrollX += 5;}
    else if (heros.vy > 0) {heros.vy -= 5; if(heros.y*50 + scrollX < 0) scrollY += 5;}
    else if (heros.vx < 0) {heros.vx += 5; if(heros.x*50 + scrollX + 50 > W) scrollX -= 5;}
    else if (heros.vy < 0) {heros.vy += 5; if(heros.y*50 + scrollY + 50 > H) scrollY -= 5;}
    draw();
}

function move(d){
    if (heros.sens != d){
        heros.sens = d;
        heros.delay = 2;
        return;
    }
    if (heros.delay != 0){
        heros.delay -= 1;
        return;
    }
    if (heros.x + vecteurs[d][1] == niveau[heros.y].length | heros.x + vecteurs[d][1] == -1 | heros.y + vecteurs[d][0] == niveau.length | heros.y + vecteurs[d][0] == -1) return;
    if (niveau[heros.y][heros.x] + 1 < niveau[heros.y+vecteurs[d][0]][heros.x+vecteurs[d][1]]) return;
    var truc = objNiveau[heros.y+vecteurs[d][0]][heros.x+vecteurs[d][1]][0];
    if (niveau[heros.y+vecteurs[d][0]][heros.x+vecteurs[d][1]] == -1 | truc == "arbre0" | truc == "coffre0" | truc == "coffre1" | truc == "porte0") return;
    if (niveau[heros.y][heros.x] > niveau[heros.y][heros.x+vecteurs[d][1]]) heros.vy = -20*(niveau[heros.y][heros.x] - niveau[heros.y+vecteurs[d][0]][heros.x+vecteurs[d][1]]);
    heros.x +=  vecteurs[d][1];
    heros.y +=  vecteurs[d][0];
    heros.vx += -50 * vecteurs[d][1];
    heros.vy += -50 * vecteurs[d][0];
    if (d == 0) heros.vy += -20*(niveau[heros.y+1][heros.x] - niveau[heros.y][heros.x]);
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
                    ctx.fillStyle = "rgb("+(105+f*5)+","+(139+f*15)+","+(46+f*3)+")";
                    if (f == -1) ctx.fillStyle = "rgb(72,98,178)";
                    ctx.fillRect(x*50 + scrollX,y*50-f*20 + scrollY,50,50);
                    ctx.fillStyle = "rgb(107,93,66)";
                    ctx.fillRect(x*50 + scrollX,y*50-f*20+50 + scrollY,50,20+20*f);
                    ctx.fillStyle = "rgb(0,0,0)";
                    testTerrain(x,y,f);
                    if (objNiveau[y][x][0] != "") ctx.drawImage(imgElement[objNiveau[y][x][0]],x*50 - (tElement[objNiveau[y][x][0]][0] - 50)/2 + scrollX,y*50 - 20*niveau[y][x] - (tElement[objNiveau[y][x][0]][1]-40) + scrollY);
                    if (y == heros.y && x == e.length - 1) drawHeros();
                    if (heros.vy > 0 && y == heros.y + 1 && x == e.length - 1) drawHeros();
                    boomerang.forEach(
                        function(f,i){
                            if ((y == f.y && x == e.length - 1) | (f.vy > 0 && y == f.y + 1 && x == e.length - 1)){
                                ctx.save();
                                ctx.translate(f.x * 50 + 25 + f.vx + scrollX,f.y * 50 + 25 + f.vy - f.alti*20 + scrollY);
                                ctx.rotate(f.r);
                                ctx.drawImage(imgElement["boomerang"],-13,-13);
                                ctx.restore();
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
                                    else if (niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] > f.alti | ((objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]][0] == "coffre0" | objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]][0] == "coffre1" | objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]][0] == "arbre0" | objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]][0] == "porte0") && niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] == f.alti)){
                                        if (f.endu <= 5) f.endu = 1;
                                        else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                    }
                                    else {
                                        f.y += vecteurs[f.sens][0];
                                        f.x += vecteurs[f.sens][1];
                                        f.vy += vecteurs[f.sens][0] * -50;
                                        f.vx += vecteurs[f.sens][1] * -50;
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

function drawHeros(){
    if (edition == 1) return;
    ctx.drawImage(imgHeros[heros.sens],heros.x * 50 - (heros.tx - 50)/2 + heros.vx + scrollX,heros.y * 50 - (heros.ty - 40) - 20*niveau[heros.y][heros.x] + heros.vy + scrollY);
    if (heros.invent[heros.objet] != "blank") {
        ctx.drawImage(imgArme[heros.invent[heros.objet] + heros.sens],heros.x * 50 - (heros.tx - 50)/2 + heros.vx + scrollX,heros.y * 50 - (heros.ty - 40) - 20*niveau[heros.y][heros.x] + heros.vy  + scrollY);
    }
    if (heros.aura != ""){
        ctx.save();
        ctx.translate(heros.x * 50 - (heros.tx - 50)/2 + heros.vx+25 + scrollX,0);
        ctx.scale(heros.tAura/40,1);
        ctx.drawImage(imgElement[heros.aura],-25,heros.y * 50 - (heros.ty - 40) - 20*niveau[heros.y][heros.x] + heros.vy + 20 - tElement[heros.aura][1] + scrollY);
        ctx.restore();

    }
}

function testTerrain(x,y,f){
    if (x == niveau[y].length - 1){if(niveau[y][x] != -1) ctx.fillRect(x*50 + 48 + scrollX,y*50-f*20 + scrollY,2,70 + niveau[y][x]*20);}
    else if (niveau[y][x+1] < f) ctx.fillRect(x*50 + 48 + scrollX,y*50-f*20 + scrollY,2,50 + 20*(f-niveau[y][x+1]));
    if (x == 0){if(niveau[y][x] != -1) ctx.fillRect(x*50 + scrollX,y*50-f*20 + scrollY,2,70  + niveau[y][x]*20);}
    else if (niveau[y][x-1] < f) ctx.fillRect(x*50 + scrollX,y*50-f*20 + scrollY,2,50 + 20*(f-niveau[y][x-1]));
    if (y == niveau.length - 1) {if(niveau[y][x] != -1)ctx.fillRect(x*50 + scrollX,y*50-f*20+48 + scrollY,50,2);}
    else if (niveau[y+1][x] < f) ctx.fillRect(x*50 + scrollX,y*50-f*20+48 + scrollY,50,2);
    if (y == 0) {if(niveau[y][x] != -1)ctx.fillRect(x*50 + scrollX,y*50-f*20 + scrollY,50,2);}
    else if (niveau[y-1][x] < f) ctx.fillRect(x*50 + scrollX,y*50-f*20 + scrollY,50,2);
}


function drawInterface(){
    ctx.drawImage(imgMenu[heros.invent[heros.objet]],W-50,0);
}

function attack(){
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    if (heros.sens == 0 && (objNiveau[heros.y - 1][heros.x][0] == "coffre0" | objNiveau[heros.y - 1][heros.x][0] == "porte0")){
        if (objNiveau[heros.y - 1][heros.x][0] == "coffre0"){
            objNiveau[heros.y - 1][heros.x][0] = "coffre1";
            if (objNiveau[heros.y - 1][heros.x].length > 1)donnerHeros(objNiveau[heros.y - 1][heros.x][1]);
            else donnerHeros("");
        }
        else if (objNiveau[heros.y - 1][heros.x][0] == "porte0"){
            if (heros.cles > 0) {objNiveau[heros.y - 1][heros.x][0] = ""; heros.cles -= 1;}
            else alert("Cette porte est verouillée.");
        }
    }
    else if (heros.invent[heros.objet] == "mastersword"){
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
    else if (heros.invent[heros.objet] == "boomerang"){
        boomerang.push({"x":heros.x,"y":heros.y,"vx":0,"vy":0,"sx":heros.x,"sy":heros.y,"r":0,"alti":niveau[heros.y][heros.x],"sens":heros.sens,"endu":10,"content":[]});
        heros.invent.splice(heros.objet,1);
        if (heros.objet == heros.invent.length) heros.objet -= 1;
    }
    else if (heros.invent[heros.objet] == "pencil"){
        if (edition == 0)edition = 1;
        else edition = 0;
    }
}

function donnerHeros(obj){
    heros.sens = 2;
    heros.aura = obj;
    var description = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl et utilisez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl puis appuyez sur maj pour déchainer votre créativité."};
    alert(description[obj]);
    figer = 1;
    if (obj == "rubisVert") heros.rubis += 1;
    else if (obj == "rubisBleu") heros.rubis += 5;
    else if (obj == "rubisRouge") heros.rubis += 20;
    else if (obj == "mastersword") {heros.invent.push("mastersword");heros.objet = heros.invent.length - 1;}
    else if (obj == "boomerang") {heros.invent.push("boomerang");heros.objet = heros.invent.length - 1;}
    else if (obj == "pencil") {heros.invent.push("pencil");heros.objet = heros.invent.length - 1;}
    else if (obj == "cle0") {heros.cles += 1;}
    else if (obj == "cle1") {heros.cles += 5;}
}

function pencil(x,y,action){
    var coor = [0,0];
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    while (x % 50 != 0){
        x -= 1;
    }
    x = x/50;
    coor[1] = x;
    niveau.forEach(
        function(e,i){
            if (y > i*50-e[x]*20 && y < (i+1)*50-e[x]*20) coor[0] = i;
        }
    );
    if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] += action;
}
