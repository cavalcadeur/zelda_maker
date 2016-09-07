var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = [{"x":8,"y":13,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0},{"x":9,"y":13,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0}];
var seaLimit = [1200,900];
var seaScroll = [0,0];
var ennemis = [];
var boomerang = [];
var editPlate = 0;
var pressurePlate = [];
var pots = [];
var out = 1;
var colorSet = [["rgb(97,97,97)","rgb(65,65,65)",[140,140,140,-30,-30,-30],"rgb(0,0,0)"],["rgb(107,93,66)","rgb(90,70,50)",[20,80,10,10,40,5],"rgb(72,98,178)"],["rgb(137,97,97)","rgb(115,65,65)",[200,140,140,-20,-30,-30],"rgb(209,82,28)"],["rgb(80,80,130)","rgb(40,40,85)",[140,140,200,-30,-30,-20],"rgb(0,0,50)"]];
// Il faut bien noter que les altitudes négatives sont interdites au dela de -1 pour cause de bugs graphiques
var niveau = [];
var quests = {"chef":0,"jehan":0,"garcon":0,"boussole":0,"boussoleF":0};
var alerting = 0;
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var imgDebris = {};
var imgElement = {};
var imgMenu = {};
var imgArme = {};
var imgMonstre = {};
var imgPersoN = {};
var particles = [];
var imgBoat = new Image();
imgBoat.src = "images/heros/boat.png";
var figer = 0;
var edition = 0;
var scrollX = 0;
var scrollY = 0;
var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
var imgArbre = ["arbre0","arbre1","bush0","herbe0","herbe1","fleur2","coffre0","coffre1","coffre2","coffre3","porte0","cle0","cle1","bleu0","bleu1","rouge0","rouge1","switch0","switch1","house0","house1","house2","house3","house4","lambda0","table0","table1","etagere","tabouret","planche0","planche1","armure","tableau","autel","torche","torche1","lit0","lit1","majora","plate","plate1","stele","houseHelp","templeFeu0","templeFeu1","templeFeu2","palmier","gear","loot","return","outDoor","inDoor","monsters","fireTemple","bougie"];
var imgEnnemi = ["dark","bokoblin","link","feu","chuchu","bossFeu","bossFeuDead"];
var mouse = [0,0];
var editObject = [["rien","loot","gear","outDoor","inDoor","monsters","lambda0"],["rien","loot","gear","outDoor","inDoor","monsters","lambda0"],["rien","loot","gear","outDoor","inDoor","fireTemple","monsters","lambda0"],["rien","loot","gear","outDoor","inDoor","fireTemple","monsters","lambda0"]];
var editHand = [];
var editnumber = 1;
var editArray = {"gear":["bleu0","rouge0","switch0","stele","plate","porte0","cle0","cle1","coffre2","return"],"loot":["rubisVert","rubisBleu","rubisRouge","coeur","coffre0","coffre1","return"],"outDoor":["arbre0","arbre1","palmier","bush0","herbe0","herbe1","house0","house1","house3","return"],"inDoor":["pot","fleur2","etagere","armure","tableau","tabouret","table0","planche0","lit0","return"],"monsters":["bokoblin","chuchu","feu","return"],"fireTemple":["torche","torche1","autel","bougie","return"]};
var onSea = 0;
var waves = [];
var goto = "";
var boatPosition = [220,220];
var casePencil = [0,0];
var editM = 0;
var objetMort = 0;

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
    var coeur = ["coeurVide","coeur1","coeur05"];
    var debris = ["pot0","pot1","pot2","pot3","pot4","herbe0","herbe1","herbe2","herbe3","herbe4","fumeeM","fumeeF","feu0","feu1","feu2","feu3","flamme0","flamme1"];
    var imgInterface = ["blank","mastersword","boomerang","pencil","boat","pot","lettre","GPS","aiguille"];
    var imgRubis = ["rubisVert","rubisBleu","rubisRouge","rubisBlanc","fragment","coeur"];
    var imgPNJ = ["lambda0","jehan","chef","fleurFan","lambda1","forgeron","pretresse","sage","aide","garcon","nadel","pancarte"];
    var armes = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","boat0","boat1","boat2","boat3","pot0","pot1","pot2","pot3","lettre0","lettre1","lettre2","lettre3"];
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + imgInterface.length + debris.length + coeur.length + (imgEnnemi.length*4) + imgPNJ.length;
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
    coeur.forEach(
        function(e,i){
            imgMenu[e] = new Image();
            imgMenu[e].src = "images/interface/" + e + ".png";
            imgMenu[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        });
    debris.forEach(
        function(e,i){
            imgDebris[e] = new Image();
            imgDebris[e].src = "images/elements/debris/" + e + ".png";
            imgDebris[e].onload = function(){
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
    imgEnnemi.forEach(
        function(e,i){
            for (var j = 0;j < 4;j ++){
                var name = e+j;
                imgMonstre[name] = new Image();
                imgMonstre[name].src = "images/ennemis/"+name+".png";
                imgMonstre[name].onload = function(){
                    chargement -= 1;
                    if (chargement == 0) animation();
                };
            }
        }
    );
    imgPNJ.forEach(
        function(e,i){
            imgPersoN[e] = new Image();
            imgPersoN[e].src = "images/PNJ/"+e+".png";
            imgPersoN[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    var bje = [38,39,40,37,101,99,98,97];
    bje.forEach(
        function(e){
            keys[e] = 0;
        }
    );
}


function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    niveau = iles["depart"].alti;
    objNiveau = iles["depart"].obj;
    Painter.niveau( niveau );
    resize();
    Crossed.init(W,H);
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
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX;
            var y = event.clientY;
            if (edition == 0) {
                if (heros[1].invent[heros[1].objet] == "GPS") GPS(x,y);
                return;
            }
            if (editHand[editnumber] == "rien"){
                if (event.button == 0) pencil(x,y,1);
                else pencil(x,y,-1);
            }
            else{
                if (event.button == 0) pencil(x,y,editHand[editnumber]);
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
            if (evt.deltaY > 0 && editnumber > 0) editnumber = (editnumber - 1) % editHand.length;
            else if (evt.deltaY > 0 && editnumber == 0) editnumber = editHand.length - 1;
            else editnumber = (editnumber + 1) % editHand.length;
        });
    document.addEventListener(
        "mousemove",
        function (event){
            mouse[1] = event.clientX;
            mouse[0] = event.clientY;
            if (edition == 1) casePencil = Painter.case(niveau,mouse[1],mouse[0]);
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
            Crossed.keysPress(event.keyCode);
            if (event.keyCode == 16) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0);}}
            else if (event.keyCode == 13) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(1);}}
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
    for(var i = 0;i < 17;i ++){
        waves.push([rnd(W),rnd(H),-rnd(200) + 100]);
    }
    charge();
}

function animation(){
    alert("Utilisez les flèches pour vous déplacer et maj pour interagir avec la case en face de vous. Le portail aide à gauche vous en dira plus long sur le jeu si vous le désirez. Placez vous une case plus bas et dirigez vous vers lui avec la flèche du haut. Petit rappel des autres touches : j1 : flèches maj et ctrl ; j2 : pavé numérique entrée du pavé et 0 ; Crossed : c");
    var f = function(t) {
        if (Crossed.testCrossed() == 1){
            if (onSea == 0) draw(t);
            else drawSea(t);
            Crossed.drawMenu(ctx,W,H);
        }
        else{
            if (onSea == 0) action(t);
            else seaAction(t);
            window.requestAnimationFrame(f);
        }
    };
    window.requestAnimationFrame(f);
}

function action(t){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
            if (h.vx == 0 && h.vy == 0 && figer == 0){
                var supress = 1;
                if (objNiveau[h.y][h.x][0] != "" && isSolid(h.x,h.y) == false){
                    var truc = objNiveau[h.y][h.x];
                    if (truc[0] == "rubisVert"){
                        h.rubis += 1;
                        supress = 0;
                    }
                    else if (truc[0] == "rubisBleu"){
                        h.rubis += 5;
                        supress = 0;
                    }
                    else if (truc[0] == "rubisRouge"){
                        h.rubis += 20;
                        supress = 0;
                    }
                    else if (truc[0] == "plate"){
                        if (truc[3] == "") objNiveau[truc[2]][truc[1]] = [""];
                        else {
                            for (var i = truc.length-1;i>2;i--){
                                objNiveau[truc[2]][truc[1]].splice(0,0,truc[i]);
                            }
                        }
                        truc[0] = "plate1";
                    }
                    else if (truc[0] == "coeur"){
                        if (h.vie + 1 <= h.vieTotale){
                            h.vie += 1;
                        }
                        else if (h.vie + 0.5 <= h.vieTotale) h.vie += 0.5;
                        supress = 0;
                    }
                    else if (truc[0] == "cle0"){
                        h.cles += 1;
                        supress = 0;
                    }
                    else if (truc[0] == "teleport"){
                        goto = truc[2];
                        heros[0].x = truc[3];
                        heros[0].y = truc[4];
                        heros[1].x = truc[5];
                        heros[1].y = truc[6];
                        out = truc[1];
                        if (truc[1] == 1){
                            niveau = iles[goto].alti;
                            ennemis = iles[goto].ennemis;
                            objNiveau = iles[goto].obj;
                        }
                        else{
                            if (interieurs[goto].particles == undefined){
                                particles = [];
                            }
                            else {
                                particles = interieurs[goto].particles;
                            }
                            niveau = interieurs[goto].alti;
                            ennemis = interieurs[goto].ennemis;
                            objNiveau = interieurs[goto].obj;
                        }
                        onSea = 0;
                        heros[0].z = niveau[heros[0].y][heros[0].x];
                        heros[1].z = niveau[heros[1].y][heros[1].x];
                        Painter.niveau(niveau);
                    }
                    else if (truc[0] == "boomerang" || truc[0] == "mastersword" || truc[0] == "pencil"){
                        h.invent.push(truc[0]);
                        h.objet = h.invent.length - 1;
                        supress = 0;
                    }
                    if (supress == 0){
                        if (truc.length > 1) objNiveau[h.y][h.x].splice(0,1);
                        else objNiveau[h.y][h.x][0] = "";
                    }

                }
                if (1 == keys[controlKeys[n][1]]) move(1,n);
                else if (1 == keys[controlKeys[n][3]]) move(3,n);
                else if (1 == keys[controlKeys[n][0]]) move(0,n);
                else if (1 == keys[controlKeys[n][2]]) move(2,n);
            }
            ennemis.forEach(
                function(e){
                    if (e.pv == 0) return;
                    if (h.x + Math.round(h.vx/50) == Math.round(e.x) && h.y + Math.round(h.vy/50) == Math.round(e.y)){
                        if (h.vx > 0) var Sens = 1;
                        else if (h.vx < 0) var Sens = 3;
                        else if (h.vy < 0) var Sens = 0;
                        else if (h.vy < 0) var Sens = 2;
                        else var Sens = e.sens;
                        hitHeros(n,e.att,Sens);
                    }
                }
            );
            if ((h.vx != 0 && h.vy != 0) || (h.z > niveau[h.y][h.x] && h.g < 5)) h.g += 0.05;
            else {h.g = 0; h.z = niveau[h.y][h.x];}
            h.z -= h.g;
            if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
            else if (h.vx > 0) {h.vx -= 5; if(h.x*50 + scrollX < 0) scrollX += 5;}
            else if (h.vy > 0) {h.vy -= 5; if(h.y*50 + scrollX < 0) scrollY += 5;}
            else if (h.vx < 0) {h.vx += 5; if(h.x*50 + scrollX + 50 > W) scrollX -= 5;}
            else if (h.vy < 0) {h.vy += 5; if(h.y*50 + scrollY + 50 > H) scrollY -= 5;}
        });
    if (heros[0].vx != 0 || heros[0].vy != 0 || heros[0].g != 0 || edition == 1)Painter.scrolling();
    draw();
}

function move(d,n){
    if (heros[n].stun > 0) return;
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
    if (niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]] == -1 || isSolid(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0]) == true) {
        if (heros[n].sens == 0){
            if (objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "house0" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "house1" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "house3" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "houseHelp" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "templeFeu1"){
                goto = objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][1];
                if (interieurs[goto].particles == undefined){
                    particles = [];
                }
                else {
                    particles = interieurs[goto].particles;
                }
                out = interieurs[goto].out;
                niveau = interieurs[goto].alti;
                onSea = 0;
                heros[0].x = interieurs[goto].heros[0][1];
                heros[0].y = interieurs[goto].heros[0][0];
                heros[0].z = niveau[heros[0].y][heros[0].x];
                heros[1].x = interieurs[goto].heros[1][1];
                heros[1].y = interieurs[goto].heros[1][0];
                heros[1].z = niveau[heros[1].y][heros[1].x];
                ennemis = interieurs[goto].ennemis;
                objNiveau = interieurs[goto].obj;
                Painter.niveau(niveau);
                if (goto == "help1") alert("Place toi face à un personnage et appuie sur la touche maj pour lui parler.");
            }
        }
        return;
    }
    if (niveau[heros[n].y][heros[n].x] < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) heros[n].g = -0.2;
    heros[n].x +=  vecteurs[d][1];
    heros[n].y +=  vecteurs[d][0];
    heros[n].vx += -50 * vecteurs[d][1];
    heros[n].vy += -50 * vecteurs[d][0];
}

function changeArme(n){
    heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
}

function draw() {
    ctx.fillStyle = colorSet[out][3];
    ctx.fillRect(0,0,W,H);
    if (out == 1){
        waves.forEach(
            function(e){
                waveNiveau(e);
            }
        );
    }
    else if (out == 2){
        waves.forEach(
            function(e){
                lavaNiveau(e);
            }
        );
        waves.forEach(
            function(e){
                lavaNiveauUp(e);
            }
        );
    }
    else if (out == 3){
        waves.forEach(
            function(e){
                rondNiveau(e);
            }
        );
    }
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    Painter.cell( ctx, x, y, f ,0);
                    if (objNiveau[y][x][0] == "coffre3") objetMort = 1;
                    if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                    else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                    else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                    else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                    //testTerrain(x,y,f);
                    //if (objNiveau[y][x][0] != "") ctx.drawImage(imgElement[objNiveau[y][x][0]],x*50 - (tElement[objNiveau[y][x][0]][0] - 50)/2 + scrollX,y*50 - 20*niveau[y][x] - (tElement[objNiveau[y][x][0]][1]-40) + scrollY);
                    heros.forEach(
                        function(h,n){
                            if (y == h.y && x == e.length - 1) drawHeros(n);
                            if (h.vy > 0 && y == h.y + 1 && x == e.length - 1) drawHeros(n);
                        }
                    );
                    ennemis.forEach(
                        function(a,m){
                            if (y-Math.round(a.y) == 0 && x == e.length - 1) drawEnnemi(m);
                        }
                    );
                    pots.forEach(
                        function(g,i){
                            if (y == Math.round(g.y + g.n*((g.oy - g.y)/32)) && x == e.length - 1) drawPot(g,i);
                        }
                    );
                    particles.forEach(
                        function(kgb,iii){
                            if (y == kgb.y && x == e.length - 1){
                                if (kgb.type == "herbe") drawDebris(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);
                                else if (kgb.type == "fumeeM" || kgb.type == "fumeeF") {drawFumee(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                                else if (kgb.type == "feu") {drawFire(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                                else if (kgb.type == "flamme") drawFlamme(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti,kgb);
                                else if (kgb.type == "quake") Painter.drawQuake(kgb.n);
                                kgb.n += 1;
                                if (kgb.type == "flamme") kgb.alti += kgb.g/150;
                                else kgb.alti += kgb.g/50;
                                kgb.g -= 1;
                                if (kgb.n == kgb.lim) {
                                    if (kgb.type == "feu") objNiveau[kgb.y][kgb.x] = [""];
                                    particles.splice(iii,1);
                                }
                            }
                        }
                    );
                    boomerang.forEach(
                        function(f,i){
                            if ((y == f.y && x == e.length - 1) | (f.vy > 0 && y == f.y + 1 && x == e.length - 1)){
                                Painter.imgBoomerang( ctx, f.x + f.vx/50, f.y + f.vy/50, f.alti, f.r, imgElement["boomerang"] );
                                f.r += 0.5;
                                if (f.vx == 0 && f.vy == 0){
                                    if (f.endu > 5){
                                        ennemis.forEach(
                                            function(e,gg){
                                                if (Math.round(e.x) == f.x && Math.round(e.y) == f.y){
                                                    hitEnnemis(gg,0,f.sens);
                                                    f.endu = 10 - f.endu;
                                                    f.sens = (f.sens+2)%4;
                                                }
                                            }
                                        );
                                    }
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
                                    if ((objNiveau[f.y][f.x][0] == "herbe0" | objNiveau[f.y][f.x][0] == "herbe1" | objNiveau[f.y][f.x][0] == "pot")&&f.alti == niveau[f.y][f.x]) {
                                        if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                        else objNiveau[f.y][f.x].splice(0,1);
                                        particles.push({n:0,type:"herbe",x:f.x,y:f.y,g:5,alti:niveau[f.y][f.x],lim:10});
                                    }
                                    else if ((objNiveau[f.y][f.x][0] == "rubisVert" | objNiveau[f.y][f.x][0] == "rubisBleu" | objNiveau[f.y][f.x][0] == "rubisRouge" | objNiveau[f.y][f.x][0] == "cle0" | objNiveau[f.y][f.x][0] == "coeur")&&f.alti == niveau[f.y][f.x]) {
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
    if (edition == 1 && casePencil[1] != "ah") {
        ctx.globalAlpha = 0.2;
        Painter.cell( ctx, casePencil[1], casePencil[0], niveau[casePencil[0]][casePencil[1]] ,1);
        ctx.globalAlpha = 1;
    }
    drawInterface();
}

function drawHeros(n){
    if (edition == 1) return;
    if (heros[n].stun > 0) heros[n].stun -= 1;
    if (heros[n].mortal > 0){
        heros[n].mortal -= 1;
        if (heros[n].mortal % 4 < 2)return;
    }
    Painter.img( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, heros[n].z, imgHeros[heros[n].sens + 4*n] );
    if (heros[n].invent[heros[n].objet] != "blank") {
        Painter.img(ctx,heros[n].x + heros[n].vx/50,heros[n].y + heros[n].vy/50,heros[n].z,imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    }
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x + heros[n].vx/50,heros[n].y - 1 + heros[n].vy/50,heros[n].z,heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawEnnemi(n){
    if (ennemis[n].pv == 0) return;
    Painter.img( ctx, ennemis[n].x, ennemis[n].y, ennemis[n].z, imgMonstre[String(ennemis[n].img + ennemis[n].sens)] );
    var altitude = niveau[Math.round(ennemis[n].y)][Math.round(ennemis[n].x)];
    if (ennemis[n].z > altitude) {
        ennemis[n].z -= ennemis[n].g;
        ennemis[n].g += 0.05;
    }
    else if (ennemis[n].z < altitude){
        ennemis[n].g = 0;
        ennemis[n].z = altitude;
    }
    if (edition == 0 && figer == 0){
        if (ennemis[n].n == 1/ennemis[n].v){
            if (ennemis[n].img == "feu"){
                try {
                    if (niveau[Math.round(ennemis[n].y) + vecteurs[ennemis[n].sens][0]][Math.round(ennemis[n].x) + vecteurs[ennemis[n].sens][1]] == altitude){
                        var truc = objNiveau[Math.round(ennemis[n].y) + vecteurs[ennemis[n].sens][0]][Math.round(ennemis[n].x) + vecteurs[ennemis[n].sens][1]][0];
                        if (truc == "arbre0" || truc == "arbre1"){
                            particles.push({n:0,type:"feu",x:Math.round(ennemis[n].x) + vecteurs[ennemis[n].sens][1],y:Math.round(ennemis[n].y) + vecteurs[ennemis[n].sens][0],g:0,alti:altitude,lim:25});
                        }
                    }
                }
                catch (e){

                }
            }
            if (ennemis[n].stun > 0) ennemis[n].stun -= 1;
            ennemis[n].sens = choseDirection(n);
            ennemis[n].n = 0;
            if (ennemis[n].sens == 4){
                ennemis[n].sens = 2;
                ennemis[n].stun = 1;
            }
        }
        if (ennemis[n].stop == 0){
            ennemis[n].n += 1;
            if (ennemis[n].stun == 0){
                ennemis[n].x += vecteurs[ennemis[n].sens][1] * ennemis[n].v;
                ennemis[n].y += vecteurs[ennemis[n].sens][0] * ennemis[n].v;
            }
        }
    }
}

function drawInterface(){
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],W-50,0);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-50,55);
    if (edition == 1 && editHand[editnumber] != "rien"){
        if (editM == 0 || editHand[editnumber] == "return") ctx.drawImage(imgElement[editHand[editnumber]],mouse[1],mouse[0]- imgElement[editHand[editnumber]].height / 2);
        else ctx.drawImage(imgMonstre[editHand[editnumber]+2],mouse[1],mouse[0]- imgMonstre[editHand[editnumber]+2].height / 2);
    }
    if (editPlate == 1){
        ctx.beginPath();
        ctx.arc(mouse[1],mouse[0],15,-Math.PI,Math.PI);
        ctx.stroke();
    }
    heros.forEach(
        function(h,index){
            for (var i = 0;i < h.vieTotale;i++){
                if (i < 10) ctx.drawImage(imgMenu.coeurVide,5 + i*15,5 + index*35);
                else ctx.drawImage(imgMenu.coeurVide,5 + (i-14)*15,15 + index*35);
                if (h.vie > i){
                    if (h.vie - 0.5 > i){
                        if (i < 10) ctx.drawImage(imgMenu.coeur1,5 + i*15,5 + index*35);
                        else ctx.drawImage(imgMenu.coeur1,5 + (i-14)*15,15 + index*35);
                    }
                    else {
                        if (i < 10) ctx.drawImage(imgMenu.coeur05,5 + i*15,5 + index*35);
                        else ctx.drawImage(imgMenu.coeur05,5 + (i-14)*15,15 + index*35);
                    }
                }
            }
        }
    );
}

function attack(n){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
    if ((truc == "coffre0" || truc == "porte0" || truc == "pot" || truc == "PNJ") && niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] == niveau[heros[n].y][heros[n].x]){
        if (truc == "coffre0"){
            Crossed.improve();
            objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "coffre1";
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1)donnerHeros(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][1],n);
            else donnerHeros("",n);
        }
        else if (truc == "porte0"){
            if (heros[n].cles > 0) {objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = ""; heros[n].cles -= 1;}
            else alert("Cette porte est verouillée.");
        }
        else if (truc == "PNJ"){
            questPNJ(heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0]);
            if (alerting == 0) say(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][2]);
            else unsay();
        }
        else if (truc == "pot"){
            heros[n].invent.push("pot");
            heros[n].objet = heros[n].invent.length - 1;
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1) objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            else objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "";
        }
    }
    else if (heros[n].invent[heros[n].objet] == "mastersword"){
        var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
        if (niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] != niveau[heros[n].y][heros[n].x]) return;
        if (truc == "herbe0" | truc == "herbe1" | truc == "pot"){
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1){
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            }
            else {
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = grassContent[rnd(grassContent.length - 1)];
            }
            if (truc == "herbe0" | truc == "herbe1") particles.push({n:0,type:"herbe",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:5,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:10});
        }
        else if (truc == "switch0" || truc == "switch1") changeColor();
        ennemis.forEach(
            function(e,gg){
                if (Math.round(e.x) == heros[n].x + vecteurs[heros[n].sens][1] && Math.round(e.y) == heros[n].y + vecteurs[heros[n].sens][0]){
                    hitEnnemis(gg,1,heros[n].sens);
                }
            }
        );
    }
    else if (heros[n].invent[heros[n].objet] == "boomerang"){
        boomerang.push({"x":heros[n].x,"y":heros[n].y,"vx":0,"vy":0,"sx":heros[n].x,"sy":heros[n].y,"r":0,"alti":niveau[heros[n].y][heros[n].x],"sens":heros[n].sens,"endu":10,"content":[]});
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
    }
    else if (heros[n].invent[heros[n].objet] == "pencil"){
        editHand = editObject[out];
        editnumber = 1;
        editM = 0;
        if (edition == 0)edition = 1;
        else if (editPlate == 0){
            edition = 0;
            console.log(JSON.stringify(niveau));
            console.log(JSON.stringify(objNiveau));
        }
    }
    else if (heros[n].invent[heros[n].objet] == "boat"){
        if (out != 1) return;
        heros[0].x = boatPosition[1];
        heros[0].y = boatPosition[0];
        goto = "";
        onSea = 1;
    }
    else if (heros[n].invent[heros[n].objet] == "pot"){
        pots.push({"alti":niveau[heros[n].y][heros[n].x] + 0.9,"g":15,"x":heros[n].x + heros[n].vx / 50,"y":heros[n].y + heros[n].vy / 50,"ox":heros[n].x + vecteurs[heros[n].sens][1] * 3,"oy":heros[n].y + vecteurs[heros[n].sens][0] * 3,"n":0});
        var nPot = pots.length - 1;

        while (pots[nPot].oy >= niveau.length){pots[nPot].oy -= 1;}
        while (pots[nPot].oy < 0){pots[nPot].oy += 1;}
        while (pots[nPot].ox >= niveau[0].length){pots[nPot].ox -= 1;}
        while (pots[nPot].ox < 0){pots[nPot].ox += 1;}
        while (niveau[pots[nPot].oy][pots[nPot].ox] > pots[nPot].alti) {pots[nPot].ox -= vecteurs[heros[n].sens][1];pots[nPot].oy -= vecteurs[heros[n].sens][0];}
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
    }
    else if (heros[n].invent[heros[n].objet] == "lettre"){
        var to = "martin@memora.tolokoban.org";
        var subject = "Niveau Maker's Pencil";
        var body = JSON.stringify(niveau) + JSON.stringify(objNiveau) + JSON.stringify(ennemis);

        var link = document.createElement('a');
        link.setAttribute(
            'href',
            'mailto:' + to
                + "?subject=" + encodeURI(subject)
                + "&body=" + encodeURI(body)
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function donnerHeros(obj,n){
    heros[n].sens = 2;
    heros[n].aura = obj;
    var description = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl et attaquez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl puis appuyez sur maj pour déchainer votre créativité.","boat":"Vous trouvez un bateau. Utilisez le pour naviquer vers de nouvelles aventures.","pot":"C'est un pot de fleur !!! Attention c'est fragile.","fragment":"Un receptacle de coeur ! Vous gagnez un coeur supplémentaire et tous vos coeurs sont regénérés.","coeur":"C'est un coeur ! Cela devrait vous permettre de vous soigner. Ne me demandez pas comment.","lettre":"C'est une lettre metaphysique !! Elle vous permet de briser le 4eme mur en envoyant l'île dans laquelle vous vous trouvez au créateur du jeu. Si elle est jugée interessante, elle sera intégrée dans le jeu. A vos pinceaux, créateurs de tous poils !!!","tabouret":"Un vieux tabouret moche. En plus il ne ressemble pas à un tabouret mais plutôt à une table basse.","fleur2":"Un vase rempli de fleur !!! Voilà qui ferait plaisir à votre amant.","table0":"Une moitié de table ... Surtout ne croquez pas dedans !","table1":"C'est une demi-table. C'est aussi inutile que déplaisant à voir.","etagere":"Une etagere. Mais qu'est ce qu'il y a dedans ?","coffre1":"Vous obtenez un coffre déjà ouvert. Gné ????????","house0":"Woaw ! Mais c'est une maison ! Posez la avant d'avoir une crampe aux bras.","house1":"Une moitié de maison. Il est difficile d'avoir un meilleur rapport inutilité/encombrement.","house2":"Vous obtenez une moitié de maison. Vous restez sans voix.","house3":"Mais qu'est ce que c'est que cette horreur ???","house4":"Vous obtenez une moitié de maison. Le doute s'insinue en vous : et si tout était lié ?","armure":"Un bouclier et des épées !!! Pas de bol, c'est en plastique...","torche":"Pourquoi avoir mis une torche dans un coffre ? Pourquoi ?","rubisBlanc":"C'est le légendaire rubis blanc. Il vaut 10 000 fucking rubis verts !!! Votre fortune est faite.","stele":"Ils arrivent ...","aiguille":"Vous avez découvert une aiguille magnetisée. C'est un des trois élements de la boussole.","palmier":"Vous obtenez un palmier. Tout est dit."};
    alert(description[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "mastersword") {heros[n].invent.push("mastersword");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "boomerang") {heros[n].invent.push("boomerang");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "pencil") {heros[n].invent.push("pencil");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "lettre") {heros[n].invent.push("lettre");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "boat") {heros[n].invent.push("boat");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "pot") {heros[n].invent.push("pot");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "cle0") {heros[n].cles += 1;}
    else if (obj == "cle1") {heros[n].cles += 5;}
    else if (obj == "fragment") {if (heros[n].vieTotale<20){heros[n].vieTotale += 1;}heros[n].vie = heros[n].vieTotale;}
    else if (obj == "rubisRouge") heros[n].rubis += 10000;
    else if (obj == "aiguille") quests.boussole += 2;
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

function GPS(x,y){
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    alert(coor[1] + " ; " + coor[0]);
}

function pencil(x,y,action){
    if (action == "gear" || action == "loot" || action == "outDoor" || action == "inDoor" || action == "monsters" || action == "fireTemple"){
        editHand = editArray[action];
        editnumber = 0;
        if (action == "monsters") editM = 1;
        return;
    }
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    //    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    if (editPlate == 1){
        editPlate = 0;
        if (action == 1 || action == -1){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,"");
        }
        else if (action == "delete"){
            objNiveau[pressurePlate[0]][pressurePlate[1]] = [""];
        }
        else{
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,action);
            if (action == "plate"){
                editPlate = 1;
                pressurePlate[2] += 3;
            }
        }
    }
    else {
        if (action == 1 || action == -1){
            if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] += action;
            Painter.niveau(niveau);
        }
        else if (action == "delete"){
            if (objNiveau[coor[0]][coor[1]].length > 1) objNiveau[coor[0]][coor[1]].splice(0,1);
            else objNiveau[coor[0]][coor[1]][0] = "";

        }
        else if (action == "return"){
            editHand = editObject[out];
            editnumber = 1;
            editM = 0;
        }
        else if (editM == 1){
            ennemis.push(monstreType(action,coor[1],coor[0]));
        }
        else{
            if (objNiveau[coor[0]][coor[1]][0] != "") objNiveau[coor[0]][coor[1]].splice(0,0,action);
            else objNiveau[coor[0]][coor[1]][0] = action;
            if (action == "house3" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house4");
                else objNiveau[coor[0]][coor[1]+1][0] = "house4";
            }
            if (action == "planche0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"planche1");
                else objNiveau[coor[0]][coor[1]+1][0] = "planche1";
            }
            if (action == "lit0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"lit1");
                else objNiveau[coor[0]][coor[1]+1][0] = "lit1";
            }
            if (action == "table0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"table1");
                else objNiveau[coor[0]][coor[1]+1][0] = "table1";
            }
            if (action == "house1" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house2");
                else objNiveau[coor[0]][coor[1]+1][0] = "house2";
            }
            if (action == "lambda0"){
                objNiveau[coor[0]][coor[1]] = ["PNJ","lambda0","blablabla"];
            }
            else if (action == "coffre2"){
                objNiveau[coor[0]][coor[1]][0] = "coffre3";
            }
            if (action == "plate"){
                editPlate = 1;
                pressurePlate = [coor[0],coor[1],0];
            }
        }
    }
}

function hitEnnemis(n,degat,sens){
    if (ennemis[n].pv == 0) return;
    if (ennemis[n].img == "feu") return;
    if (ennemis[n].img == "bossFeu"){
        if (degat == 0) {
            ennemis[n].img = "bossFeuDead";
            ennemis[n].v = 0;
        }
        else {
            return;
        }
    }
    else if (ennemis[n].img == "bossFeuDead"){
        if (degat > 0) {
            ennemis[n].img = "bossFeu";
            ennemis[n].v = 0.05;
            ennemis[n].n = 0;
            ennemis.push({x:ennemis[n].x,y:ennemis[n].y,pv:2,img:"feu",sens:sens,z:1,g:0,v:0.05,n:0,ia:"mur",stop:0,stun:0,att:1});
            particles.push({n:0,type:"quake",x:0,y:0,g:0,alti:0,lim:50});
            particles.push({n:0,type:"fumeeF",x:5,y:2,g:0,alti:0,lim:40});
            particles.push({n:-14,type:"fumeeF",x:9,y:5,g:0,alti:0,lim:40});
            particles.push({n:-21,type:"fumeeF",x:7,y:8,g:0,alti:0,lim:40});
            particles.push({n:-24,type:"fumeeF",x:9,y:10,g:0,alti:0,lim:40});
            particles.push({n:-33,type:"fumeeF",x:2,y:9,g:0,alti:0,lim:40});
            if (ennemis[n].pv == 3){
                niveau = [[-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1],[-1,2,2,2,2,2,2,2,2,2,2],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,-1,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0]];
            }
            else {
                niveau = [[-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1],[-1,2,2,2,2,2,2,2,2,2,2],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0]];
                particles.splice(0,1);
            }
            Painter.niveau(niveau);
        }
        else {
            return;
        }
    }
    ennemis[n].pv -= degat;
    ennemis[n].sens = (sens + 2)%4;
    ennemis[n].stun = 1;
    if (degat == 0) ennemis[n].stun = 2;
    ennemis[n].x = Math.round(ennemis[n].x);
    ennemis[n].y = Math.round(ennemis[n].y);
    if (Math.round(ennemis[n].y) + vecteurs[sens][0] < niveau.length){
        if (Math.round(ennemis[n].x) + vecteurs[sens][1] < niveau[Math.round(ennemis[n].y) + vecteurs[sens][0]].length){
            if (niveau[Math.round(ennemis[n].y)][Math.round(ennemis[n].x)] == niveau[Math.round(vecteurs[sens][0] + ennemis[n].y)][Math.round(vecteurs[sens][1] + ennemis[n].x)]){
                ennemis[n].x = Math.round(vecteurs[sens][1] + ennemis[n].x);
                ennemis[n].y = Math.round(vecteurs[sens][0] + ennemis[n].y);
            }
        }
    }
    if (ennemis[n].pv <= 0) {
        particles.push({n:0,type:"fumeeM",x:ennemis[n].x,y:ennemis[n].y,g:0,alti:ennemis[n].z,lim:40});
        console.log(objetMort);
        if (objetMort > 0){
            var xxx = 0;
            ennemis.forEach(
                function (e,i){
                    if (e.pv > 0){
                        xxx = 1;
                    }
                }
            );
            if (xxx == 0){
                for (var i = 0;i < objetMort;i++){
                    var exit = 0;
                    objNiveau.forEach(
                        function(e,i){
                            e.forEach(
                                function(f,j){
                                    if (f[0] == "coffre3"){
                                        if (f.length > 1) f.splice(0,1);
                                        else f[0] = "";
                                    }
                                }
                            );
                        }
                    );
                }
            }
        }
        if (ennemis[n].img == "bossFeu") {
            particles.push({n:0,type:"quake",x:0,y:0,g:0,alti:0,lim:50});
            particles.push({n:-34,type:"fumeeF",x:10,y:6,g:0,alti:0,lim:40});
            particles.push({n:-40,type:"fumeeF",x:4,y:7,g:0,alti:0,lim:40});
            niveau  = [[-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1],[-1,2,2,2,2,2,2,2,0,2,2],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0]];
            Painter.niveau(niveau);
        }
    }
}

function hitHeros(n,degat,sens){
    if (heros[n].mortal > 0) return;
    heros[n].vx = 0;
    heros[n].vy = 0;
    if ((heros[n].y + vecteurs[sens][0]) < niveau.length){
        if (niveau[heros[n].y + vecteurs[sens][0]][heros[n].x + vecteurs[sens][1]] != -1) {
            if (niveau[heros[n].y][heros[n].x] >= niveau[heros[n].y + vecteurs[sens][0]][heros[n].x + vecteurs[sens][1]] && (heros[n].x + vecteurs[sens][1]) < niveau[heros[n].y + vecteurs[sens][0]].length){
                if (isSolid(heros[n].x + vecteurs[sens][1],heros[n].y + vecteurs[sens][0]) == false){
                    heros[n].x += vecteurs[sens][1];
                    heros[n].y += vecteurs[sens][0];
                }
            }
        }
    }
    heros[n].vie -= degat;
    heros[n].stun = 20;
    heros[n].mortal = 60;
}

function isSolid(x,y){
    var truc = objNiveau[y][x][0];
    if (truc == "arbre0" || truc == "coffre0" || truc == "coffre1" || truc == "porte0" || truc == "bleu0" || truc == "rouge1" || truc == "switch0" || truc == "switch1" || truc == "house0" || truc == "house1" || truc == "house2" || truc == "house3" || truc == "house4" || truc == "pot" || truc == "PNJ" || truc == "fleur2" || truc == "table0" || truc == "table1" || truc == "etagere" || truc == "armure" || truc == "tabouret" || truc == "autel" || truc == "torche" || truc == "torche1" || truc == "lit0" || truc == "lit1" || truc == "stele" || truc == "houseHelp" || truc == "templeFeu0" || truc == "templeFeu1"|| truc == "templeFeu2" || truc == "palmier" || truc == "arbre1" || truc == "bougie") return true;
    else return false;
}

function say(msg){
    alerting = 1;
    alert(msg);
}

function unsay(){
    alerting = 0;
    disalert();
}

function questPNJ(x,y){
    var perso = objNiveau[y][x][1];
    if (perso == "chef"){
        if (quests[perso] == 1){
            objNiveau[y][x][2] = "Tu veux partir à l'aventure ? Je comprends, c'est la fougue de la jeunesse j'imagine. Tu peux prendre mon bateau si tu veux.";
            iles["depart"].obj[12][15] = [""];
            iles["depart"].obj[11][15] = ["PNJ","jehan","Le chef m'a dit que tu pouvais prendre son bateau. Il est dans ce coffre à droite."];
            quests["jehan"] = 1;
            quests["garcon"] = 2;
        }
    }
    else if (perso == "sage"){
        if (quests.boussole == 2) objNiveau[y][x][2] = "Tu as trouvé l'aiguille magéntisée de la boussole. Félicitations.";
        else if (quests.boussole == 3) objNiveau[y][x][2] = "C'est la vitre de la boussole. Tu me l'as apportée !";
        else if (quests.boussole == 4) objNiveau[y][x][2] = "Je constate que tu as récuperé le corps de la boussole !";
        else if (quests.boussole == 5) objNiveau[y][x][2] = "Je crois savoir que tu portes sur toi l'aiguille et la vitre de la boussole que tu cherche.";
        else if (quests.boussole == 6) objNiveau[y][x][2] = "Je vois que tu es en possession de l'aiguille et du corps de la boussole.";
        else if (quests.boussole == 7) objNiveau[y][x][2] = "Mais c'est la vitre de la boussole ! Et le corps de cette dernière si je ne m'abuse !";
        else if (quests.boussole == 9) objNiveau[y][x][2] = "Tu as trouvé les trois parties de la boussole ! Tu vas pouvoir partir plus loin encore sur les océans.";
        else {
            if (quests.boussoleF == 0) objNiveau[y][x][2] = "Bienvenue Link. Le heros du vent est hors de la portée de ton bateau. Pour naviguer plus loin, il te faut reconstruire la boussole des elements. Malheureuselent, elle a été brisée en 3 morceaux qu'il te faut aller chercher dans les temples du feu, de l'eau et du vent.";
            else if (quests.boussoleF == 2) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple du vent et au temple de l'eau.";
            else if (quests.boussoleF == 3) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple du feu et au temple de l'eau.";
            else if (quests.boussoleF == 4) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple du vent et au temple du feu.";
            else if (quests.boussoleF == 5) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple du vent selon mes souvenirs.";
            else if (quests.boussoleF == 6) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple de l'eau.";
            else if (quests.boussoleF == 7) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple du feu.";
            else if (quests.boussoleF == 9) objNiveau[y][x][2] = "Tu as finalement reconstitué la boussole. Il n'y a plus de temps à perdre si tu veux retrouver le héros du vent.";
        }
        quests.boussoleF += quests.boussole;
        quests.boussole = 0;
    }
    else if (perso == "jehan"){
        if (quests[perso] == 0){ quests["chef"] = 1; quests["garcon"] = 1;}
    }
    else if (perso == "garcon"){
        if (quests[perso] == 1) objNiveau[y][x][2] = "Tu cherches le chef ? C'est mon père et il est très fort ! Il habite dans la maison ronde au nord du village.";
        else if (quests[perso] == 2) objNiveau[y][x][2] = "Tu t'en vas ? C'est dommage ... Un jour, moi aussi je partirai à l'aventure sur mon bateau pour vaincre des monstres et sauver une princesse";
    }

}
