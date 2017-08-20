"use strict";


var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = [{"x":0,"y":8,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"prim":"pencil","imgUp":0,"imgN":0,"plane":0,"timerF":0,"etat":0,"caseSpe":0,"seedCount":10,"touche":[38,39,40,37,16,17,32],"scrollSpeed":1,anim:nonifiant,nAnim:0,datAnim:0,img:0,carry:[0,0]},{"x":0,"y":9,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"imgUp":0,"imgN":0,"plane":0,"timerF":0,"etat":0,"caseSpe":0,"seedCount":0,"touche":[101,99,98,97,13,96],anim:nonifiant,nAnim:0,datAnim:0,img:0,carry:[0,0]}];
var questObj = {"carteMaritime":0,"boussole":0};
var objInvent = [];
var seaLimit = [1200,900];
var ennemis = [];
var boomerang = [];
var editPlate = 0;
var pressurePlate = [];
var useless = ["blank",""];
var pots = [];
var out = 4;
var colorSet;
var niveau = [];
var quests;
var alerting = 0;
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
var textured;
var imgHeros;
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
var teleport = [0,0];
var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
var imgArbre;
var nDalle = 0;
var nSpeImg = 10;
var imgEnnemi = [];
var mouse = [0,0];
var editObject;
var editHand = [];
var editnumber = 1;
var editArray;
var onSea = 0;
var waves = [];
var goto = "";
var boatPosition = [200,100];
var onSeaIsland = [];
var casePencil = [0,0];
var editM = 0;
var hookShots = [];
var objetMort = 0;
var savedMap,savedHouseMap;
var respawnPoint = [0,8];
var markedLevels = [["betaJump",1]];
var islandData = {};
var fondfond = new Image();
var fondInvent = new Image();
fondInvent.src = "images/menu4.png";
var imgCinema = [new Image,new Image];
var cinematicos = 0;
var sideEdit = ["monsters","spe","sky","fireTemple","inDoor","herbe0","outDoor","special","gear","loot"];
var sideSelect = -1;
var workFloor;
var backg;
var backDraw;
var nPas = 0;
var rigolote = [-1,-1];
var gamePads;
var gameKey = [];
var sensDuBateau = 1;
var colors = [];
var touchCount = 0;
var editNs = [0,3,0,0];
var imgPat;
var chargImage = {};
var canvImg = [];

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

function save(){
    figer = 1;
    alert("Sauvegarde en cours, cela peut prendre du temps mais pas toujours. Tout dépends du ressenti que vous en avez et de la réelle longueur du chargement. Parce que mine de rien, il y en a des choses à sauvegarder dans ce jeu. Surtout si vous avez eu l'aimable sauvagerie de couper toutes les herbes ou de défigurer mes jolies petites îles avec le pinceau.");
    var ilesDif = [];
    var i = 0;
    for(var key in iles){

        ilesDif[i] = [key,[],[]];
        savedMap[key].obj.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f.length != iles[key].obj[y][x].length) {ilesDif[i][1].push([y,x,iles[key].obj[y][x]]);}
                        else {
                            for (var j = 0;j<f.length;j++){
                                if (f[j] != iles[key].obj[y][x].length) {ilesDif[i][1].push([y,x,iles[key].obj[y][x]]); j = 6660000;}
                            }
                        }
                    }
                );
            }
        );
        savedMap[key].alti.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != iles[key].alti[y][x]) ilesDif[i][2].push([y,x,iles[key].alti[y][x]]);
                    }
                );
            }
        );
        i ++;
    }
    var ilesDifHouse = [];
    var i = 0;
    for(var key in interieurs){
        ilesDifHouse[i] = [key,[],[]];
        savedHouseMap[key].obj.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != interieurs[key].obj[y][x]) ilesDifHouse[i][1].push([y,x,interieurs[key].obj[y][x]]);
                    }
                );
            }
        );
        savedHouseMap[key].alti.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != interieurs[key].alti[y][x]) ilesDifHouse[i][2].push([y,x,interieurs[key].alti[y][x]]);
                    }
                );
            }
        );
        i ++;
    }
    var whereAmI = [out,goto];
    window.localStorage.setItem("whereAmI",JSON.stringify(whereAmI));
    window.localStorage.setItem("ilesDif",JSON.stringify(ilesDif));
    window.localStorage.setItem("ilesDifHouse",JSON.stringify(ilesDifHouse));
    window.localStorage.setItem("heros",JSON.stringify(heros));
    window.localStorage.setItem("quests",JSON.stringify(quests));
    window.localStorage.setItem("questObj",JSON.stringify(questObj));
    window.localStorage.setItem("objInvent",JSON.stringify(objInvent));
    window.localStorage.setItem("boatPosition",JSON.stringify(boatPosition));
    window.localStorage.setItem("nPas",JSON.stringify(nPas));
    alert("Sauvegarde terminée. J'espère que ce n'était pas trop long.");
    figer = 1;
}

function unSave(){
    window.localStorage.setItem("ilesDif",JSON.stringify(-1));
    window.location.reload();
}

function precharge(){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    fondfond.src = "images/Title.png";
    fondfond.onload = function(){
        ctx.drawImage(fondfond,W/2-187,H/2-131);
        alert("Silence dans la salle ! Le jeu charge.");

        savedMap = JSON.parse(JSON.stringify(iles));
        console.log(savedMap["depart"]);
        savedHouseMap = JSON.parse(JSON.stringify(interieurs));

        cinematicos = 8;
        charge();
    };
}

function charge(){
    var coeur = chargImage.coeur;
    var debris = chargImage.debris;
    var imgInterface = chargImage.interface;
    var imgRubis = chargImage.rubis;
    var imgPNJ = chargImage.PNJ;
    var armes = chargImage.truc;
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + imgInterface.length + debris.length + coeur.length + imgPNJ.length + nDalle + nSpeImg;
    //imgPat = new Image();
    //imgPat.src = "images/pattern/falaise.png";
    //imgPat = ctx.createPattern(imgPat,"repeat");
    
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
    for(var i = 0;i<nDalle;i++){
        imgElement["dalle"+i] = new Image();
        imgElement["dalle"+i].src = "images/elements/dalles/dalle" + i + ".png";
        imgElement["dalle"+i].onload = function(){
            chargement -= 1;
            if (chargement == 0) animation();
        };

    }

    for(var i = 0;i<nSpeImg;i++){
        imgElement["spe"+i] = new Image();
        imgElement["spe"+i].src = "images/elements/spe/1/spe" + i + ".png";
        imgElement["spe"+i].onload = function(){
            chargement -= 1;
            if (chargement == 0) animation();
        };

    }

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
                //ctx.drawImage(imgElement[e],rnd(W),rnd(H));
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
                //ctx.drawImage(imgArme[e],rnd(W),rnd(H));
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
    for (var i = 0;i<70;i++){
        imgMonstre[i] = new Image();
    }
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
    backg = new background(ctx);
    backDraw = backg.fa;
    W = canvas.width;
    H = canvas.height;
    ctx.imageSmoothingEnabled = false;
    goto = "depart";
    out = 1;
    niveau = iles["depart"].alti;
    objNiveau = iles["depart"].obj;
    
    
    init();
    setColors(out,5);
    Painter.niveau( niveau , iles["depart"].textures);
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
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX;
            var y = event.clientY;
            if (onSea == 6){
                clickHelp();
            }
            if (cinematicos == 8){
                cClickTitle();
                return;
            }
            else if (cinematicos == 9){
                cClickMerchant();
                return;
            }
            if (onSea == 4) inventclick(x,y);
            else if (onSea == 5) TPclick(x,y);
            else if (edition == 0) {
                if (heros[0].invent[heros[1].objet] == "mastersword") clicSword(x,y);
                if (heros[1].invent[heros[1].objet] == "GPS") GPS(x,y);
                return;
            }
            if (onSea == 0){
                clickEdit(x,y,event.button);
            }
        }
    );
    document.addEventListener(
        "resize",
        function (event){
            resize();
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
            if (cinematicos == 6) {
                imgCinema[0][imgCinema[5]] = [mouse[1],mouse[0],1];
                imgCinema[5] = (imgCinema[5] + 1)%imgCinema[0].length;
            }
            else if (edition == 1) casePencil = Painter.case(niveau,mouse[1],mouse[0]);
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keyDown(event.keyCode);
            //if (cinematicos != 0) return;

        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keyUp(event.keyCode);
        }
    );
    window.addEventListener("gamepadconnected", function(e) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    e.gamepad.index, e.gamepad.id,
                    e.gamepad.buttons.length, e.gamepad.axes.length);
        gamePadF = usualGamePad;
        gamePads = e.gamepad;
        console.log(gamePads);
        alert("Vous avez connecté une manette de jeu à votre ordinateur. Vous pouvez bien sûr utiliser cette manette pour jouer.");
    });
    window.addEventListener("gamepaddisconnected", function(e) {
        console.log("Gamepad disconnected from index %d: %s",
                    e.gamepad.index, e.gamepad.id);
        gamePadF = videAsFuck;
    });
    backg.wavesPlenish();
    precharge();
}

function gamePadF(){
    //console.log("Hey !");
}

function animation(){
    if (cinematicos == 1) cIntro();
    else if (cinematicos == 2) cReveil();
    else if (cinematicos == 3) cShootOut();
    else if (cinematicos == 4) cMask();
    else if (cinematicos == 5) cEnlevement();
    else if (cinematicos == 6) cPencil();
    else if (cinematicos == 7) cWaterRaise();
    else if (cinematicos == 8) cTitre();
    else if (cinematicos == 9) cMerchant();
    else if (cinematicos == 10) cDeath();
    else {
        fondfond.src = "images/menu5.png";
        fondfond.onload = function(){};
        if (out == 4) alert("Utilisez les flèches pour vous déplacer et la barre espace pour interagir avec la case en face de vous ou faire disparaître ce message. Allez parler au visage du developpeur pour plus d'infos.");
        ctx.globalAlpha = 1;

        //var FPS = {
          //  lastTime: 0,
            //nbFrames: 0,
            //fps: document.getElementById('FPS')
        //};
        
        var f = function(t) {
            // Calcul des FPS.
            /*
            if( FPS.lastTime === 0 ) {
                FPS.lastTime = t;
                FPS.nbFrames = 0;
            } else {
                FPS.nbFrames++;
                if( FPS.nbFrames == 16 ) {
                    FPS.fps.textContent = Math.floor(.5 + 16000 / (t - FPS.lastTime));
                    FPS.lastTime = t;
                    FPS.nbFrames = 0;
                }
            }
             */
            
            try{
                //var loops = 1;
                //while( loops --> 0 ) {
                if (onSea == 0) {action(t); draw();gamePadF();}
                else if (onSea == 1){sail(t);gamePadF();}
                else if (onSea == 2) {drawSea();gamePadF();}
                else if (onSea == 4) {drawInvent();gamePadF();}
                else if (onSea == 5) {TPisland();gamePadF();}
                else if (onSea == 6) {Help();gamePadF();}
                //}
            } catch(e){console.error(e);}
            if (cinematicos == 0) window.requestAnimationFrame(f);
            else {
                animation();
            }
        };
        window.requestAnimationFrame(f);
    }
}

function draw() {
    ctx.fillStyle = colors[0];
    ctx.fillRect(0,0,W,H);
    backDraw();

    if (canvImg[3] != 0){
        Painter.drawVoisinG(canvImg[3][0],1,0,ctx,niveau);
        //ctx.drawImage(canvImg[1][0],0,0);
    }
    
    drawRoom(1,ctx,niveau,objNiveau);
    
    if (edition == 1 && casePencil[1] != "ah") {
        ctx.globalAlpha = 0.2;
        Painter.cell( ctx, casePencil[1], casePencil[0], niveau[casePencil[0]][casePencil[1]] ,1);
        ctx.globalAlpha = 1;
    }
    if (canvImg[1] != 0){
        Painter.drawVoisin(canvImg[1][0],1,0,ctx,niveau);
        //ctx.drawImage(canvImg[1][0],0,0);
    }
    Painter.scrollCenter(heros[0].x,heros[0].y,heros[0].z,W,H);
    drawInterface();
}

function drawHeros(n){
    if (edition == 1) return;
    if (heros[n].stun > 0) {
        heros[n].stun -= 1;
        if (heros[n].stun > 10000){
            return;
        }
        else if (heros[n].stun == 10000){
            heros[n].g = -1;
            heros[n].z += 0.2;
            heros[n].stun = 0;
            if (objNiveau[heros[n].y][heros[n].x] == "avaleur2"){
                objNiveau[heros[n].y][heros[n].x][0] = "avaleur1";
            }
        }
    }
    if (heros[n].mortal > 0){
        heros[n].mortal -= 1;
        if (heros[n].mortal % 4 < 2)return;
    }
    var N = 0;
    if (Math.abs(heros[n].vx + heros[n].vy)%50 >= 25 && heros[n].g == 0) N = 24;
    if (heros[n].plane == 1){
        Painter.img(ctx,heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50,niveau[Math.round(heros[n].y + heros[n].vy/50)][Math.round(heros[n].x + heros[n].vx/50)],imgElement.marque);
    }
    Painter.img( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, heros[n].z, imgHeros[heros[n].img + heros[n].sens] );
    if (heros[n].invent[heros[n].objet] != "blank" && heros[n].imgUp == 0) {
        Painter.img(ctx,heros[n].x + heros[n].vx/50,heros[n].y + heros[n].vy/50,heros[n].z,imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    }
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x + heros[n].vx/50,heros[n].y - 1 + heros[n].vy/50,heros[n].z,heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawEnnemi(n){
    ennemis[n].act();
    if (edition == 0)ennemis[n].doing();
    ennemis[n].display();
}

function drawInterface(){
    drawInterface = AInterface;
}

function attack(n,x){
    if (edition == 1){
        if (editPlate == 0){
            edition = 0;
            drawInterface = AInterface;
            casePencil = ["ah","ah"];
            console.log(JSON.stringify(niveau));
            console.log(JSON.stringify(objNiveau));
            console.log(JSON.stringify(ennemis));
        }
        return;
    }
    if (heros[n].imgUp != 0){
        if (heros[n].plane == 1) {
            heros[n].plane = 0;
            heros[n].imgUp = 0;
            heros[n].imgN = 0;
        }
        return;
    }
    if (heros[n].carry[0] != 0){
        heros[n].carry[0] = 0;
        ennemis[heros[n].carry[1]].throw(heros[n].sens);
        heros[n].img = 0;
        return;
    }
    if (x == 1) {
        var use = heros[0].prim;
    }
    else var use = heros[n].invent[heros[n].objet];
    if (use == "boat"){
        if (heros[n].etat != 0) return;
        if (heros[n].y + vecteurs[heros[n].sens][0] == niveau.length || heros[n].y + vecteurs[heros[n].sens][0] == -1 || heros[n].x + vecteurs[heros[n].sens][1] == niveau[0].length || heros[n].x + vecteurs[heros[n].sens][1] == -1){
            if (out == 1){
                boatPosition[1] = heros[n].x + vecteurs[heros[n].sens][1] + boatPosition[1];
                boatPosition[0] = heros[n].y + vecteurs[heros[n].sens][0] + boatPosition[0];
                goto = "";
                onSea = 1;
                return;
            }
        }
        else if (niveau[heros[n].y+vecteurs[heros[n].sens][0]][heros[n].x+vecteurs[heros[n].sens][1]] == -1){
            if (out == 1){
                boatPosition[1] = heros[n].x + vecteurs[heros[n].sens][1] + boatPosition[1];
                boatPosition[0] = heros[n].y + vecteurs[heros[n].sens][0] + boatPosition[0];
                goto = "";
                onSea = 1;
                return;
            }
        }
    }
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
    ennemis.forEach(
        function (e,ii){
            if (e.isThere(heros[n].x + vecteurs[heros[n].sens][1]*0.5,heros[n].y + vecteurs[heros[n].sens][0]*0.5,heros[n].z) == true){
                heros[n].carry[0] = 1;
                heros[n].carry[1] = ii;
                e.carried(n);
                heros[n].img = 12;
            }
        }
    );
    if (heros[n].carry[0] != 0) return;
    if ((truc == "coffre0" || truc == "porte0" || truc == "pot" || truc == "PNJ" || truc == "checkPoint" || truc == "unCheckPoint") && niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] == niveau[heros[n].y][heros[n].x]){
        if (truc == "coffre0"){
            Crossed.improve();
            objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "coffre1";
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1)donnerHeros(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][1],n);
            else donnerHeros("",n);
        }
        else if (truc == "porte0"){
            if (heros[n].cles > 0) {objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = ""; heros[n].cles -= 1;}
            else{ alert("Cette porte est verouillée."); figer = 1;}
        }
        else if (truc == "PNJ"){
            if (alerting == 0){
                questPNJ(heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],n);
                say(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][2],heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],n);
            }
            else unsay();
        }
        else if (truc == "pot"){
            if (heros[n].etat != 0) return;
            if (x == 1){
                if (heros[0].prim == "blank"){
                    heros[0].prim = "pot";
                }
                else{
                    return;
                }
            }
            else {
                heros[n].invent.push("pot");
                heros[n].objet = heros[n].invent.length - 1;
            }
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1) objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            else objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "";
        }
        else if (truc == "checkPoint"){
            save();
        }
        else if (truc == "unCheckPoint"){
            unSave();
        }
    }
    else if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][1] == "PNJ"){
        var powerRanger = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]];
        powerRanger.splice(0,1);
        addParticles("object",heros[n].x + vecteurs[heros[n].sens][1] + 0.5,heros[n].y + vecteurs[heros[n].sens][0] + 0.5,heros[n].z+0.1,12,0,0,truc,powerRanger,"deliver");
        //particles.push({n:0,lim:-1,type:"object",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:0,alti:heros[n].z,name:truc,vector:[0,0,0.8],carry:powerRanger});
        objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] = [""];
    }
    else if (heros[n].etat == 0){
        if (use == "mastersword"){
            addParticles("sword",heros[n].x + (vecteurs[heros[n].sens][1]/2) + vecteurs[heros[n].sens][0]/5,heros[n].y + vecteurs[heros[n].sens][0]/2,heros[n].z + Math.abs(vecteurs[heros[n].sens][1]/6),0,0,10,0,0,heros[n].sens);
            //particles.push({n:0,type:"sword",x:heros[n].x + (vecteurs[heros[n].sens][1]/2) + vecteurs[heros[n].sens][0]/5,y:heros[n].y + vecteurs[heros[n].sens][0]/2,g:0,alti:heros[n].z + Math.abs(vecteurs[heros[n].sens][1]/6),lim:10,sens:heros[n].sens});
            heros[n].imgUp = 1;
            heros[n].imgN = 10;
            if (niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] != niveau[heros[n].y][heros[n].x]) return;
            hitSpot(heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],heros[n].z + 0.5,1,heros[n].sens);
            //addParticles("object",heros[n].x,heros[n].y,heros[n].z+0.1,20,0.2*vecteurs[heros[n].sens][1],0.2*vecteurs[heros[n].sens][0],"arbre0",["herbe0","rubisVert"],"deliver");
        }
        else if (use == "boomerang"){
            boomerang.push({"x":heros[n].x,"y":heros[n].y,"vx":0,"vy":0,"sx":heros[n].x,"sy":heros[n].y,"r":0,"alti":niveau[heros[n].y][heros[n].x],"sens":heros[n].sens,"endu":10,"content":[]});
            if (x == 1) heros[n].prim = "blank";
            else{
                if (heros[n].invent.length == 1) heros[n].invent[0] = "blank";
                else {
                    heros[n].invent.splice(heros[n].objet,1);
                }
                if (heros[n].objet >= heros[n].invent.length) heros[n].objet -= 1;
            }
        }
        else if (use == "flowerRod"){
            if (getFloor(heros[n].x,heros[n].y,heros[n].z) != niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]]) return;
            var machin = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]];
            if (machin[0] == ""){
                machin[0] = "herbe0";
            }
            else if (machin[0] == "herbe0") machin[0] = "herbe1";
            else if (machin[0] == "palmier") machin[0] = "palmier1";
            else if (machin[0] == "palmier1") machin[0] = "palmier";
            else if (machin[0] == "arbre0") machin[0] = "arbre1";
            else if (machin[0] == "arbre1") machin[0] = "arbre0";
            if (out == 7 && (machin[0] == "spe1" || machin[0] == "spe2")){
                machin[1] += 10;
            }
            addParticles("flower",heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],0,0,40);
            //particles.push({n:0,type:"flower",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:0,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:40});
        }
        else if (use == "pencil"){
            editHand = editObject[out];
            drawInterface = AEditInterface;
            editnumber = 1;
            editM = 0;
            if (edition == 0)edition = 1;
        }
        else if (use == "pot"){
            addParticles("object",heros[n].x+0.5,heros[n].y+0.5,heros[n].z+0.9,15,0.1*vecteurs[heros[n].sens][1],0.1*vecteurs[heros[n].sens][0],"pot",[""],"break");
            if (x == 1) heros[0].prim = "blank";
            else{
                heros[n].invent.splice(heros[n].objet,1);
                if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
                if (heros[n].invent.length == 0) heros[n].invent[0] = "blank";
            }
        }
        else if (use == "hookShot"){
            if (heros[n].grap == 0 && heros[n].g == 0){
                heros[n].grap = 1;
                heros[n].plane = 0;
                heros[n].grapD = 0;
                heros[n].nGrap = hookShots.length;
                hookShots.push({x:heros[n].x,y:heros[n].y,s:heros[n].sens,z:heros[n].z,chaine:[[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y]]});
            }
        }
        else if (use == "parachale"){
            if (heros[n].grap == 0 && heros[n].z != niveau[heros[n].y][heros[n].x]){
                heros[n].plane = 1;
                heros[n].imgUp = 2;
                heros[n].imgN = 0;
                heros[n].z = Math.ceil(heros[n].z);
            }
        }
        else if (use == "seeds"){
            if (heros[0].seedCount == 0) return;
            else if (out == 7){
                var machin = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]];
                if (machin[0] == "spe0"){
                    addParticles("flower",heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],0,0,40);
                    //particles.push({n:0,type:"flower",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:0,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:40});
                    heros[0].seedCount -= 1;
                    objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] = ["spe1",0,nPas];
                }
            }
        }
        else if (use == "maskWind"){
            cinematicos = 4;
            heros[n].etat = 1;
            imgCinema[0] = n;
            imgCinema[1] = "maskWind";
            imgCinema[2] = "hWind";
        }
        else if (use == "lettre"){

            var to = "martin@memora.tolokoban.org";
            var subject = "Niveau Maker's Pencil " + goto + " out="+out;
            var nnn = niveau;
            var ooo = objNiveau;
            var eee = ennemis;
            var to = "martin@memora.tolokoban.org";
            var subject = "Niveau Maker's Pencil out=" + out + " part A";
            var body = JSON.stringify(nnn);

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

            subject = "Niveau Maker's Pencil out=" + out + " part B";
            body = JSON.stringify(ooo);

            link = document.createElement('a');
            link.setAttribute(
                'href',
                'mailto:' + to
                    + "?subject=" + encodeURI(subject)
                    + "&body=" + encodeURI(body)
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            subject = "Niveau Maker's Pencil out=" + out + " part C";
            body = JSON.stringify(eee);

            link = document.createElement('a');
            link.setAttribute(
                'href',
                'mailto:' + to
                    + "?subject=" + encodeURI(subject)
                    + "&body=" + encodeURI(body)
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            markedLevels.forEach(
                function (ee){
                    if (ee[0] != goto){
                        if (ee[1] == 1){
                            var llevel = iles[ee[0]];
                        }
                        else {
                            var llevel = interieurs[ee[0]];
                        }
                        var nnn = llevel.alti;
                        var ooo = llevel.obj;
                        var eee = llevel.ennemis;
                        var to = "martin@memora.tolokoban.org";
                        var subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " part A";
                        var body = JSON.stringify(nnn);

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

                        subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " part B";
                        body = JSON.stringify(ooo);

                        link = document.createElement('a');
                        link.setAttribute(
                            'href',
                            'mailto:' + to
                                + "?subject=" + encodeURI(subject)
                                + "&body=" + encodeURI(body)
                        );
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " part C";
                        body = JSON.stringify(eee);

                        link = document.createElement('a');
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
            );
        }
    }
}

function donnerHeros(obj,n){
    heros[n].sens = 2;
    heros[n].aura = obj;
    alert(descriptionObj[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "mastersword" || obj == "hookShot" || obj == "boomerang" || obj == "pencil" || obj == "lettre" || obj == "boat" || obj == "pot" || obj == "parachale" || obj == "baton" || obj == "maskWind" || obj == "flowerRod" || obj == "seeds"){
        addObj(obj,n);
    }
    else if (obj == "cle0") {heros[n].cles += 1;}
    else if (obj == "cle1") {heros[n].cles += 5;}
    else if (obj == "fragment") {if (heros[n].vieTotale<20){heros[n].vieTotale += 1;}heros[n].vie = heros[n].vieTotale;}
    else if (obj == "rubisRouge") heros[n].rubis += 10000;
    else if (obj == "aiguille") quests.boussole += 2;
    else if (obj == "vitre") quests.boussole += 3;
}

function addObj(type,n){
    if (heros[n].invent.length < 5){
        heros[n].invent.push(type);
        heros[n].objet = heros[n].invent.length - 1;
    }
    else if (n == 0 && heros[0].prim == "blank"){
        if (heros[0].prim == "blank") heros[0].prim = type;
    }
    else{
        objInvent.push(type);
    }
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
    if (action == "sky") action = 1;
    else if (action == "sky1") action = -1;
    else if (action == "sky2") action = 0.2;
    else if (action == "sky3") action = -0.2;
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    //    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    if (editPlate == 2){
        if (Math.abs(coor[0]-pressurePlate[3]) > Math.abs(coor[1] - pressurePlate[4])){
            if (coor[0] > pressurePlate[0]){
                var ss = 2;
            }
            else var ss = 0;
        }
        else{
            if (coor[1] > pressurePlate[1]){
                var ss = 1;
            }
            else var ss = 3;
        }
        objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2],0,ss);
        //console.log(objNiveau[pressurePlate[0]][pressurePlate[1]]);
        editPlate = 0;
    }
    else if (editPlate == 1 && action != "return"){
        editPlate = 0;
        if (action == 1 || action == -1 || action == 0.2 || action == -0.2){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,action);
        }
        else if (action == "delete"){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,"");
        }
        else if (editM == 1){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,"monstre");
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+4,0,action);
        }
        else{
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,action);
            if (action == "plate" || action == "switch2"){
                editPlate = 1;
                pressurePlate[2] += 3;
            }
            else if (action == "main0" || action == "main1"){
                objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+4,0,50);
                editPlate = 2;
                pressurePlate[2] += 5;
                pressurePlate[3] = coor[0];
                pressurePlate[4] = coor[1];
                return;
            }
        }
    }
    else {
        if (action == 1 || action == -1 || action == 0.2 || action == -0.2){
            if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] = Math.round((niveau[coor[0]][coor[1]] + action)*10)/10;
            Painter.niveau(niveau , textured);
        }
        else if (action == "delete"){
            if (editNs[1] == 0){
                ennemis.forEach(
                    function(e,i){
                        if (Math.round(e.x) == coor[1] && Math.round(e.y) == coor[0]){
                            ennemis.splice(i,1);
                        }
                    }
                );
            }
            else {
                if (editArray[sideEdit[editNs[1]]][editNs[3]] == "pont" && objNiveau[coor[0]][coor[1]][0] == "pont"){
                    objNiveau[coor[0]][coor[1]][1] -= 1;
                }
                else {
                    if (objNiveau[coor[0]][coor[1]].length > 1) {
                        if (objNiveau[coor[0]][coor[1]][0] == "pont" || objNiveau[coor[0]][coor[1]][0] == "plate" || objNiveau[coor[0]][coor[1]][0] == "switch2") objNiveau[coor[0]][coor[1]] = [""];
                        else objNiveau[coor[0]][coor[1]].splice(0,1);
                    }
                    else objNiveau[coor[0]][coor[1]][0] = "";
                }
            }
        }
        else if (editNs[1] == 0){
            //ennemis.push([coor[1] + 0.5,coor[0] + 0.5,editObject[out][i + editNs[2]*10][1],2]);
            findEnnemy(editObject[out][editNs[3]][0],ennemis.length,coor[1] + 0.5,coor[0] + 0.5,2);
        }
        else if (action == "mark"){
            console.log(goto);
            var lol = markedLevels.find(
                function(elem){
                    return elem[0] == goto;
                }
            );
            if (lol == undefined)markedLevels.push([goto,out]);
        }
        else if (action == "fastTravel"){
            teleport = [-1,-1];
            onSea = 5;
            islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        }
        else if (action == "tele"){
            var truck = objNiveau[coor[0]][coor[1]][0];
            if (truck == "house0" || truck == "house1" || truck == "house3" || truck == "tele"){
            }
            else objNiveau[coor[0]][coor[1]] = ["teleport",-1,"void",0,0,0,0];
            teleport = [coor[0],coor[1]];
            onSea = 5;
            islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        }
        else if (action == "pont"){
            if (objNiveau[coor[0]][coor[1]][0] == "pont"){
                objNiveau[coor[0]][coor[1]][1] += 1;
            }
            else objNiveau[coor[0]][coor[1]] = ["pont",3];
        }
        else{
            if (objNiveau[coor[0]][coor[1]][0] != "") objNiveau[coor[0]][coor[1]].splice(0,0,action);
            else objNiveau[coor[0]][coor[1]][0] = action;
            if (action == "house3" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house4");
                else objNiveau[coor[0]][coor[1]+1][0] = "house4";
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
            }
            if (action == "planche0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"planche1");
                else objNiveau[coor[0]][coor[1]+1][0] = "planche1";
            }

            if (action == "moulin0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"moulin1");
                else objNiveau[coor[0]][coor[1]+1][0] = "moulin1";
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
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
            }
            if (action == "lambda0"){
                var dia = prompt("Que doit dire ce PNJ ?");
                if (dia == undefined) dia = "";
                objNiveau[coor[0]][coor[1]] = ["PNJ","lambda0",[[dia],[dia]]];
            }
            else if (action == "house0"){
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
            }
            else if (action == "coffre2"){
                objNiveau[coor[0]][coor[1]][0] = "coffre3";
            }
            else if (action == "main0"){
                objNiveau[coor[0]][coor[1]] = ["main0",50];
                editPlate = 2;
                pressurePlate = [coor[0],coor[1],2,coor[0],coor[1]];
            }
            else if (action == "main1"){
                objNiveau[coor[0]][coor[1]] = ["main1",50];
                editPlate = 2;
                pressurePlate = [coor[0],coor[1],2,coor[0],coor[1]];
            }
            if (action == "plate" || action == "switch2"){
                editPlate = 1;
                pressurePlate = [coor[0],coor[1],0];
            }
        }
    }
}

function hitEnnemis(n,degat,sens){

}

function hitHeros(n,degat,sens){
    if (heros[n].mortal > 0) return;
    if (degat == -1) return;
    heros[n].grap = 0;
    hookShots.splice(heros[n].nGrap,1);
    if (heros[(n+1)%2].nGrap > heros[n].nGrap) heros[(n+1)%2].nGrap -= 1;
    heros[n].nGrap = -1;
    heros[n].vx = 0;
    heros[n].vy = 0;
    if ((heros[n].y + vecteurs[sens][0]) < niveau.length && heros[n].y + vecteurs[sens][0] >= 0){
        if ((heros[n].x + vecteurs[sens][1]) < niveau[0].length && heros[n].x + vecteurs[sens][1] >= 0){
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
    //if (heros[n].vie <= 0){
    //cinematicos = 10;
    //}
}

function waterLevel(n){
    cinematicos = 7;
    imgCinema[0] = n;
}

function say(msg,x,y,n){
    msg = msg[n];
    var alti;
    if (x == undefined || y == undefined){
        x = -8000;
        y = 0;
        alti = 0;
    }
    else {
        if (y < niveau.length && y >= 0 && x < niveau[0].length && x >= 0){
            alti = niveau[y][x];
        }
        else alti = 0;
    }
    alerting = 1;
    //figer = 1;
    addParticles("bla",x,y,alti,0,0,-1,msg);
    //particles.push({n:0,type:"bla",x:x,y:y,g:0,alti:alti,lim:-1,content:msg,actu:"",xx:0,yy:0,y2:0,x2:0});
    //console.log(particles);
}

function unsay(){
    alerting = 0;
    disalert();
}
