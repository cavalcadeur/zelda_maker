var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = [{"x":8,"y":13,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"prim":"blank","imgUp":0,"imgN":0},{"x":9,"y":13,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"imgUp":0,"imgN":0}];
var questObj = {"carteMaritime":0,"boussole":0};
var objInvent = [];
var seaLimit = [1200,900];
var ennemis = [];
var boomerang = [];
var editPlate = 0;
var pressurePlate = [];
var useless = ["blank",""];
var pots = [];
var out = 1;
var colorSet = [["rgb(97,97,97)","rgb(65,65,65)",[140,140,140,-30,-30,-30],"rgb(0,0,0)"],["rgb(107,93,66)","rgb(90,70,50)",[20,80,10,10,40,5],"rgb(72,98,178)"],["rgb(137,97,97)","rgb(115,65,65)",[200,140,140,-20,-30,-30],"rgb(209,82,28)"],["rgb(80,80,130)","rgb(40,40,85)",[140,140,200,-30,-30,-20],"rgb(0,0,50)"]];
var niveau = [];
var quests = {"chef":0,"jehan":0,"garcon":0,"boussole":0,"boussoleF":0};
var alerting = 0;
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
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
var imgArbre = ["arbre0","arbre1","bush0","herbe0","herbe1","fleur2","coffre0","coffre1","coffre2","coffre3","porte0","cle0","cle1","bleu0","bleu1","rouge0","rouge1","switch0","switch1","house0","house1","house2","house3","house4","lambda0","table0","table1","etagere","tabouret","planche0","planche1","armure","tableau","autel","torche","torche1","lit0","lit1","majora","plate","plate1","stele","templeFeu0","templeFeu1","templeFeu2","templeEau0","templeEau1","templeEau2","palmier","gear","loot","return","outDoor","inDoor","monsters","fireTemple","bougie","switch2","switch3","checkPoint","unCheckPoint","wSwitch0","wSwitch1","tele","main0","main1","statue0","miniTempleEau","mark"];
var nDalle = 0;
var imgEnnemi = ["dark","bokoblin","moblin","link","feu","chuchu","bossFeu","bossFeuDead","scie","ballon","main","mCorps","mPierreA","mPierreB","statue"];
var mouse = [0,0];
var editObject = [["rien","loot","gear","outDoor","inDoor","fireTemple","monsters","lambda0"],["rien","loot","gear","outDoor","inDoor","monsters","lambda0"],["rien","loot","gear","outDoor","inDoor","fireTemple","monsters","lambda0"],["rien","loot","gear","outDoor","inDoor","fireTemple","monsters","lambda0"]];
var editHand = [];
var editnumber = 1;
var editArray = {"gear":["bleu0","rouge0","switch0","wSwitch0","wSwitch1","plate","switch2","coffre2","checkPoint","tele","mark","return"],"loot":["rubisVert","rubisBleu","rubisRouge","coeur","fragment","coffre0","coffre1","porte0","cle0","cle1","mastersword","boomerang","hookShot","boat","return"],"outDoor":["arbre0","arbre1","palmier","bush0","herbe0","herbe1","house0","house1","house3","return"],"inDoor":["pot","fleur2","etagere","armure","tableau","tabouret","table0","planche0","lit0","return"],"monsters":["bokoblin","chuchu","moblin","feu","main","scie","ballon","return"],"fireTemple":["torche","torche1","autel","bougie","main0","main1","statue0","stele","return"]};
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
var respawnPoint = [0,0];
var markedLevels = [["tFeu1",2],["tEau1",3],["tEau4",3],["aqua",1],["sage",1],["in4",0]];
var islandData = {};
var fondfond = new Image();
var fondInvent = new Image();
fondInvent.src = "images/menu4.png";

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
                        if (f != iles[key].obj[y][x]) ilesDif[i][1].push([y,x,iles[key].obj[y][x]]);
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
    alert("Cette sauvegarde est maintenant terminée. Dites moi en commentaire si le chargement était long. Moi je vous dit au revoir et n'oubliez pas de vous abonner à la chaîne et de liker cette video avant d'aller en voir une autre. MERCI.");
    figer = 0;
}

function unSave(){
    window.localStorage.setItem("ilesDif",JSON.stringify(-1));
    window.location.reload();
}

function precharge(){
    ctx.fillrect = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    fondfond.src = "images/Title.png";
    fondfond.onload = function(){
        ctx.drawImage(fondfond,0,0,W,H);
        savedMap = JSON.parse(JSON.stringify(iles));
        savedHouseMap = JSON.parse(JSON.stringify(interieurs));
        var ilesDif = JSON.parse(window.localStorage.getItem("ilesDif"));
        if (ilesDif != null && ilesDif != -1){
            ilesDif.forEach(
                function(e){
                    e[1].forEach(
                        function(f){
                            iles[e[0]].obj[f[0]][f[1]] = f[2];
                        }
                    );
                    e[2].forEach(
                        function(f){
                            iles[e[0]].alti[f[0]][f[1]] = f[2];
                        }
                    );
                }
            );
            var ilesDifHouse = JSON.parse(window.localStorage.getItem("ilesDifHouse"));
            ilesDifHouse.forEach(
                function(e){
                    e[1].forEach(
                        function(f){
                            interieurs[e[0]].obj[f[0]][f[1]] = f[2];
                        }
                    );
                    e[2].forEach(
                        function(f){
                            interieurs[e[0]].alti[f[0]][f[1]] = f[2];
                        }
                    );
                }
            );
            heros = JSON.parse(window.localStorage.getItem("heros"));
            heros[0].objet = 0;
            heros[1].objet = 0;
            var where = JSON.parse(window.localStorage.getItem("whereAmI"));
            quests = JSON.parse(window.localStorage.getItem("quests"));
            questObj = JSON.parse(window.localStorage.getItem("questObj"));
            objInvent = JSON.parse(window.localStorage.getItem("objInvent"));
            out = where[0];
            goto = where[1];
            respawnPoint[0] = heros[0].x;
            respawnPoint[1] = heros[0].y;
            if (goto != ""){
                if (out == 1){
                    niveau = iles[goto].alti;
                    objNiveau = iles[goto].obj;
                }
                else{
                    niveau = interieurs[goto].alti;
                    objNiveau = interieurs[goto].obj;
                }
                Painter.niveau( niveau );
            }
        }
        charge();
    };
}

function charge(){
    var coeur = ["coeurVide","coeur1","coeur05"];
    var debris = ["pot0","pot1","pot2","pot3","pot4","palmier0","palmier1","palmier2","palmier3","palmier4","herbe0","herbe1","herbe2","herbe3","herbe4","fumeeM","fumeeF","feu0","feu1","feu2","feu3","flamme0","flamme1","hook","chaineA","hitA","hitB","rond","eclabousse","rondB","eclabousseB","sword0","sword1","sword2","sword3"];
    var imgInterface = ["blank","mastersword","boomerang","hookShot","pencil","boat","pot","lettre","GPS","aiguille","vitre"];
    var imgRubis = ["rubisVert","rubisBleu","rubisRouge","rubisBlanc","fragment","coeur"];
    var imgPNJ = ["lambda0","jehan","chef","fleurFan","lambda1","forgeron","pretresse","sage","aide","garcon","nadel","pancarte"];
    var armes = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","boat0","boat1","boat2","boat3","pot0","pot1","pot2","pot3","lettre0","lettre1","lettre2","lettre3"];
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + imgInterface.length + debris.length + coeur.length + (imgEnnemi.length*4) + imgPNJ.length + nDalle;
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
    goto = "depart";
    out = 1;
    niveau = iles["depart"].alti;
    objNiveau = iles["depart"].obj;
    Painter.niveau( niveau );
    resize();
    Crossed.init(W,H);
    respawnPoint = [8,13];
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
            if (onSea == 4) inventclick(x,y);
            else if (onSea == 5) TPclick(x,y);
            else if (edition == 0) {
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
            if (event.keyCode == 16 && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0);}}
            else if (event.keyCode == 13 && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(1);}}
            else if (event.keyCode == 32 && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0,1);}}
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
            if (event.keyCode == 17 && onSea == 0) changeArme(0);
            else if (event.keyCode == 96 && onSea == 0) changeArme(1);
            else if (event.keyCode == 77) { 
                if (onSea == 1) onSea = 2;
                else if (onSea == 2) onSea = 1;
            }
            else if (event.keyCode == 73) { 
                if (onSea == 0) goInvent();
                else if (onSea == 4) endInvent();
            }
        }
    );
    for(var i = 0;i < 17;i ++){
        waves.push([rnd(W),rnd(H),-rnd(200) + 100]);
    }
    precharge();
}

function animation(){
    fondfond.src = "images/menu5.png";
    fondfond.onload = function(){};
    alert("Utilisez les flèches pour vous déplacer et maj pour interagir avec la case en face de vous. La maison tout à gauche vous en dira plus long sur le jeu si vous le désirez. Placez vous une case plus bas et dirigez vous vers elle avec la flèche du haut. Petit rappel des autres touches : j1 : flèches maj et ctrl ; j2 : pavé numérique entrée du pavé et 0 ; Crossed : c");
    var f = function(t) {
        if (Crossed.testCrossed() == 1){
            if (onSea == 0) draw(t);
            else if (onSea == 5) TPisland();
            else sail(t);
            Crossed.drawMenu(ctx,W,H);
        }
        else{
            if (onSea == 0) action(t);
            else if (onSea == 1)sail(t);
            else if (onSea == 2) drawSea();
            else if (onSea == 4) drawInvent();
            else if (onSea == 5) TPisland();
            window.requestAnimationFrame(f);
        }
    };
    window.requestAnimationFrame(f);
}

function action(t){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
            if (h.imgN > 0){
                h.imgN -= 1;
                if (h.imgN == 0) h.imgUp = 0; 
            }
            if (h.grap > 0){
                if (h.grap == 1){
                    h.grapD += 2;
                    var gx = h.x + (vecteurs[h.sens][1] * ((h.grapD+10)/10));
                    var gy = h.y + (vecteurs[h.sens][0] * ((h.grapD+10)/10));
                    hookShots[heros[n].nGrap].x = gx;
                    hookShots[heros[n].nGrap].y = gy;
                    if (h.grapD/10 == Math.floor(h.grapD/10)){
                        if (gy == niveau.length || gy < 0 || gx < 0 || gx == niveau[0].length){
                            h.grap = 2;
                        }
                        else if (niveau[gy][gx] > h.z) h.grap = 2;
                        else if (h.grapD > 50) h.grap = 2;
                        else if (niveau[gy][gx] == Math.floor(h.z)){
                            if (isSolid(gx,gy) == true) h.grap = 3;
                        }
                    }
                }
                else if (h.grap == 2){
                    h.grapD -= 2;
                    var gx = h.x + (vecteurs[h.sens][1] * ((h.grapD+10)/10));
                    var gy = h.y + (vecteurs[h.sens][0] * ((h.grapD+10)/10));
                    hookShots[heros[n].nGrap].x = gx;
                    hookShots[heros[n].nGrap].y = gy;
                    if (h.grapD == 0) {
                        h.grap = 0;
                        hookShots.splice(h.nGrap,1);
                        if (heros[(n+1)%2].nGrap > heros[n].nGrap) heros[(n+1)%2].nGrap -= 1;
                        heros[n].nGrap = -1;
                    }
                }
                else if (h.grap == 3){
                    if (h.vx == 0 && h.vy == 0){
                        var gx = h.x + (vecteurs[h.sens][1] * (h.grapD/10));
                        var gy = h.y + (vecteurs[h.sens][0] * (h.grapD/10));
                        if (isSolid(h.x + vecteurs[h.sens][1],h.y + vecteurs[h.sens][0]) == true){ 
                            h.grap = 0;
                            hookShots.splice(h.nGrap,1);
                            if (heros[(n+1)%2].nGrap > heros[n].nGrap) heros[(n+1)%2].nGrap -= 1;
                            heros[n].nGrap = -1;
                        }
                        else move(h.sens,n,1);
                    }
                }
                if (h.grap != 0){
                    var hx = h.x + h.vx/50;
                    var hy = h.y + h.vy/50;
                    var cx = (hookShots[h.nGrap].x - hx)/6;
                    var cy = (hookShots[h.nGrap].y - hy)/6;
                    hookShots[h.nGrap].chaine.forEach(
                        function(m,i){
                            m[0] = hx + cx*(i+1);
                            m[1] = hy + cy*(i+1);
                        }
                    );
                }
            }
            else if (h.vx == 0 && h.vy == 0 && figer == 0){
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
                        else if (truc[3] == 1 || truc[3] == -1){
                            niveau[truc[2]][truc[1]] += truc[3];
                            Painter.niveau(niveau);
                        }
                        else if (truc[3] == "monstre"){
                            ennemis.push(monstreType(truc[4],truc[1],truc[2]));
                        }
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
                        teleport = [h.y,h.x];
                        goToLevel(truc[1],truc[2],truc[3],truc[4],truc[5],truc[6]);
                    }
                    else if (truc[0] == "boomerang" || truc[0] == "mastersword" || truc[0] == "pencil" || truc[0] == "boat" || truc[0] == "hookShot"){
                        if (truc[0] == "boomerang") {addObj(truc[0],n);}
                        else donnerHeros(truc[0],n);
                        supress = 0;
                    }
                    if (supress == 0){
                        if (truc.length > 1) objNiveau[h.y][h.x].splice(0,1);
                        else objNiveau[h.y][h.x][0] = "";
                    }

                }
                if (h.imgUp == 0){
                    if (1 == keys[controlKeys[n][1]]) move(1,n,0);
                    else if (1 == keys[controlKeys[n][3]]) move(3,n,0);
                    else if (1 == keys[controlKeys[n][0]]) move(0,n,0);
                    else if (1 == keys[controlKeys[n][2]]) move(2,n,0);
                }
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
                        if (e.img == "main") {                            
                            goToLevel(e.out,e.goto,e.xx,e.yy,e.xx,e.yy);
                            particles.push({n:0,x:niveau[niveau.length-1].length -1,y:niveau.length - 1,type:"fadeOut",lim:30,alti:-1,g:0});
                        }
                        else hitHeros(n,e.att,Sens);
                    }
                }
            );
            if (h.grap == 0){
                if ((h.vx != 0 && h.vy != 0) || (h.z > niveau[h.y][h.x] && h.g < 5)) h.g += 0.05;
                else {h.g = 0; h.z = niveau[h.y][h.x];
                      if (h.z < 0){
                          if (out == 1 || out == 3){
                              particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rond",lim:30,alti:-1,g:0});
                              particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousse",lim:30,alti:-1,g:15});
                          }
                          else if (out == 2){
                              particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rondB",lim:30,alti:-1,g:0});
                              particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousseB",lim:30,alti:-1,g:15});
                          }
                          heros[n].x = respawnPoint[0];
                          heros[n].y = respawnPoint[1];
                          heros[n].vie -= 0.5;
                          heros[n].stun = 20;
                          heros[n].mortal = 60;
                      }
                     }
                h.z -= h.g;
            }
            if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
            else if (h.vx > 0) {h.vx -= 5; }
            else if (h.vy > 0) {h.vy -= 5; }
            else if (h.vx < 0) {h.vx += 5; }
            else if (h.vy < 0) {h.vy += 5; }
        });
    if (heros[0].vx != 0 || heros[0].vy != 0 || heros[0].g != 0 || edition == 1)Painter.scrolling();
    draw();
}

function move(d,n,gg){
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
    if (gg == 0){
        if (heros[n].x + vecteurs[d][1] == niveau[heros[n].y].length | heros[n].x + vecteurs[d][1] == -1 | heros[n].y + vecteurs[d][0] == niveau.length | heros[n].y + vecteurs[d][0] == -1) return;
        if (niveau[heros[n].y][heros[n].x] + 1 < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) return;

        if (isSolid(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0]) == true) {
            if (heros[n].sens == 0){
                if (objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "house0" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "house1" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "house3" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "houseHelp" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "templeFeu1" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "templeEau1" || objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0] == "miniTempleEau"){
                    teleport = [heros[n].y+vecteurs[d][0],heros[n].x+vecteurs[d][1]];
                    if (objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][1] == "void"){
                        goToLevel(out,"void",0,0,0,0);
                    }
                    else {
                        goto = objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][1];
                        if (interieurs[goto] == undefined){
                            out = 1;
                            goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                        }
                        else {
                            out = interieurs[goto].out;
                            goToLevel(out,goto,interieurs[goto].heros[0][1],interieurs[goto].heros[0][0],interieurs[goto].heros[1][1],interieurs[goto].heros[1][0]);
                        }                    
                        if (goto == "help1") alert("Place toi face à un personnage et appuie sur la touche maj pour lui parler.");
                    }
                }
            }
            return;
        }
        if (niveau[heros[n].y][heros[n].x] < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) heros[n].g = -0.2;
    }
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
            function(e,n){
                if (n < 7) rondNiveau(e);
            }
        );
    }
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    Painter.cell( ctx, x, y, f ,0);
                    if (objNiveau[y][x][0] == "coffre3") objetMort = 1;
                    else if (objNiveau[y][x][0] == "main0"){
                        if (edition == 0 && figer == 0){
                            objNiveau[y][x][1] -=1;
                            if (objNiveau[y][x][1] == 0){
                                objNiveau[y][x][0] = "main1";
                                boomerang.push({"x":x,"y":y,"vx":0,"vy":0,"sx":x,"sy":x,"r":0,"alti":niveau[y][x],"sens":objNiveau[y][x][2],"endu":10,"content":[]});
                            }
                        }
                    }
                    if (niveau[y][x] < 0){
                        if (isFloodable(x,y) == false){
                            if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                            else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                            else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                            else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                        }
                    }
                    else{
                        if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                        else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                        else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                        else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                    }
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
                    hookShots.forEach(
                        function(omg){
                            if (y == Math.round(omg.y) && x == Math.round(omg.x)){
                                var rr = (omg.s * Math.PI)/2;
                                Painter.imgBoomerang(ctx,omg.x,omg.y,omg.z,rr,imgDebris["hook"]);
                            }
                            omg.chaine.forEach(
                                function(m){
                                    if (y == Math.round(m[1]) && x == Math.ceil(m[0])){
                                        Painter.img(ctx,m[0],m[1],omg.z,imgDebris["chaineA"]);
                                    }
                                }
                            );
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
                                        boomerang.splice(i,1);
                                        return;
                                    }
                                    else if (f.endu == 5) f.sens = (f.sens+2)%4;
                                    if ((f.y + vecteurs[f.sens][0]) <= -1 | (f.x + vecteurs[f.sens][1]) <= -1 | (f.y + vecteurs[f.sens][0]) >= niveau.length | (f.x + vecteurs[f.sens][1]) >= niveau[f.y].length){
                                        if (f.endu <= 5) f.endu = 1;
                                        else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                    }
                                    else {
                                        var machin = objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]];
                                        var truc = machin[0];
                                        if (niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] > f.alti | (isSolid(f.x +  + vecteurs[f.sens][1],f.y + vecteurs[f.sens][0]) == true && niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] == f.alti)){
                                            if (f.endu <= 5) f.endu = 1;
                                            else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                            if (truc == "switch0" | truc == "switch1") changeColor();
                                            else if (truc == "wSwitch0") {waterLevel(1);machin[0] = "wSwitch1";}
                                            else if (truc == "wSwitch1") {waterLevel(-1);machin[0] = "wSwitch0";}
                                            else if (truc == "switch2"){
                                                if (machin[3] == "") objNiveau[machin[2]][machin[1]] = [""];
                                                else if (machin[3] == 1 || machin[3] == -1){
                                                    niveau[machin[2]][machin[1]] += machin[3];
                                                    Painter.niveau(niveau);
                                                }
                                                else if (machin[3] == "monstre"){
                                                    ennemis.push(monstreType(machin[4],machin[1],machin[2]));
                                                }
                                                else {
                                                    for (var i = machin.length-1;i>2;i--){
                                                        objNiveau[machin[2]][machin[1]].splice(0,0,machin[i]);
                                                    }
                                                }
                                                machin[0] = "switch3";
                                            }
                                            else if (truc == "main1"){
                                                machin[0] = "main0";
                                                machin[1] = 120;
                                                boomerang.splice(i,1);
                                                return;
                                            }
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
                    particles.forEach(
                        function(kgb,iii){
                            if (y == Math.ceil(kgb.y) && x == e.length - 1){
                                if (kgb.type == "herbe" || kgb.type == "palmier") drawDebris(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);
                                else if (kgb.type == "fumeeM" || kgb.type == "fumeeF") {drawFumee(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                                else if (kgb.type == "sword") {drawSword(kgb.n,kgb.lim,kgb.sens,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                                else if (kgb.type == "feu") {drawFire(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                                else if (kgb.type == "flamme") drawFlamme(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti,kgb);
                                else if (kgb.type == "quake") Painter.drawQuake(kgb.n);
                                else if (kgb.type == "hitA" || kgb.type == "hitB") {drawHit(kgb.type,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                                else if (kgb.type == "rond" || kgb.type == "rondB") {drawRond(kgb.n,kgb.x,kgb.y,kgb.s,kgb.alti,kgb.type);kgb.g = 0;}
                                else if (kgb.type == "eclabousse" || kgb.type == "eclabousseB") drawEclabousse(kgb.n,kgb.x,kgb.y,kgb.alti,kgb.type);
                                else if (kgb.type == "fadeOut") drawFade(kgb.n);
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
    Painter.img( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, heros[n].z, imgHeros[heros[n].sens + 4*n + heros[n].imgUp*8] );
    if (heros[n].invent[heros[n].objet] != "blank" && heros[n].imgUp == 0) {
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
    if (ennemis[n].z > altitude && ennemis[n].img != "mPierreA" && ennemis[n].img != "mPierreB") {
        ennemis[n].z -= ennemis[n].g;
        ennemis[n].g += 0.05;
    }
    else if (ennemis[n].z < altitude){
        ennemis[n].g = 0;
        ennemis[n].z = altitude;
    }
    if (edition == 0 && figer == 0){
        if (ennemis[n].n == Math.round(1/ennemis[n].v)){
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
    ctx.drawImage(imgMenu[heros[0].prim],W-105,0);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-50,55);
    if (edition == 1 && editHand[editnumber] != "rien"){
        if (editM == 0 || editHand[editnumber] == "return") ctx.drawImage(imgElement[editHand[editnumber]],mouse[1],mouse[0]- imgElement[editHand[editnumber]].height / 2);
        else ctx.drawImage(imgMonstre[editHand[editnumber]+2],mouse[1],mouse[0]- imgMonstre[editHand[editnumber]+2].height / 2);
    }
    if (editPlate == 1 || editPlate == 2){
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

function attack(n,x){
    if (heros[n].imgUp != 0) return;
    if (x == 1) {
        var use = heros[0].prim;
    }
    else var use = heros[n].invent[heros[n].objet];
    if (use == "boat"){
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
    if ((truc == "coffre0" || truc == "porte0" || truc == "pot" || truc == "PNJ" || truc == "checkPoint" || truc == "unCheckPoint") && niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] == niveau[heros[n].y][heros[n].x]){
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
        else if (truc == "checkPoint"){
            save();
        }
        else if (truc == "unCheckPoint"){
            unSave();
        }
    }
    else if (use == "mastersword"){
        var machin = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]];
        var truc = machin[0];
        particles.push({n:0,type:"sword",x:heros[n].x + (vecteurs[heros[n].sens][1]/2) + vecteurs[heros[n].sens][0]/5,y:heros[n].y + vecteurs[heros[n].sens][0]/2,g:0,alti:heros[n].z + Math.abs(vecteurs[heros[n].sens][1]/6),lim:10,sens:heros[n].sens});
        heros[n].imgUp = 1;
        heros[n].imgN = 10;
        if (niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] != niveau[heros[n].y][heros[n].x]) return;
        if (truc == "herbe0" | truc == "herbe1" | truc == "pot" | truc == "palmier"){
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1){
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            }
            else {
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = grassContent[rnd(grassContent.length - 1)];
            }
            if (truc == "herbe0" || truc == "herbe1") particles.push({n:0,type:"herbe",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:5,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:10});
            else if (truc == "palmier") particles.push({n:0,type:"palmier",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:5,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:15});
        }
        else if (truc == "switch0" || truc == "switch1") changeColor();
        else if (truc == "wSwitch0") {waterLevel(1);machin[0] = "wSwitch1";}
        else if (truc == "wSwitch1") {waterLevel(-1);machin[0] = "wSwitch0";}
        else if (truc == "switch2"){
            if (machin[3] == "") objNiveau[machin[2]][machin[1]] = [""];
            else if (machin[3] == 1 || machin[3] == -1){
                niveau[machin[2]][machin[1]] += machin[3];
                Painter.niveau(niveau);
            }
            else if (machin[3] == "monstre"){
                ennemis.push(monstreType(machin[4],machin[1],machin[2]));
            }
            else {
                for (var i = machin.length-1;i>2;i--){
                    objNiveau[machin[2]][machin[1]].splice(0,0,machin[i]);
                }
            }
            machin[0] = "switch3";
        }
        ennemis.forEach(
            function(e,gg){
                if (Math.round(e.x) == heros[n].x + vecteurs[heros[n].sens][1] && Math.round(e.y) == heros[n].y + vecteurs[heros[n].sens][0]){
                    hitEnnemis(gg,1,heros[n].sens);
                }
            }
        );
    }
    else if (use == "boomerang"){
        boomerang.push({"x":heros[n].x,"y":heros[n].y,"vx":0,"vy":0,"sx":heros[n].x,"sy":heros[n].y,"r":0,"alti":niveau[heros[n].y][heros[n].x],"sens":heros[n].sens,"endu":10,"content":[]});
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
        if (heros[n].invent.length == 0) heros[n].invent[0] = "blank"; 
    }
    else if (use == "pencil"){
        editHand = editObject[out];
        editnumber = 1;
        editM = 0;
        if (edition == 0)edition = 1;
        else if (editPlate == 0){
            edition = 0;
            casePencil = ["ah","ah"];
            console.log(JSON.stringify(niveau));
            console.log(JSON.stringify(objNiveau));
            console.log(JSON.stringify(ennemis));
        }
    }
    else if (use == "pot"){
        pots.push({"alti":niveau[heros[n].y][heros[n].x] + 0.9,"g":15,"x":heros[n].x + heros[n].vx / 50,"y":heros[n].y + heros[n].vy / 50,"ox":heros[n].x + vecteurs[heros[n].sens][1] * 3,"oy":heros[n].y + vecteurs[heros[n].sens][0] * 3,"n":0});
        var nPot = pots.length - 1;

        while (pots[nPot].oy >= niveau.length){pots[nPot].oy -= 1;}
        while (pots[nPot].oy < 0){pots[nPot].oy += 1;}
        while (pots[nPot].ox >= niveau[0].length){pots[nPot].ox -= 1;}
        while (pots[nPot].ox < 0){pots[nPot].ox += 1;}
        while (niveau[pots[nPot].oy][pots[nPot].ox] > pots[nPot].alti) {pots[nPot].ox -= vecteurs[heros[n].sens][1];pots[nPot].oy -= vecteurs[heros[n].sens][0];}
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
        if (heros[n].invent.length == 0) heros[n].invent[0] = "blank"; 
    }
    else if (use == "hookShot"){
        if (heros[n].grap == 0 && heros[n].g == 0){
            heros[n].grap = 1;
            heros[n].grapD = 0;
            heros[n].nGrap = hookShots.length;
            hookShots.push({x:heros[n].x,y:heros[n].y,s:heros[n].sens,z:heros[n].z,chaine:[[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y]]});
        }
    }
    else if (use == "lettre"){
        var to = "martin@memora.tolokoban.org";
        var subject = "Niveau Maker's Pencil " + goto + " out="+out;
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
                    var subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1];
                    var body = JSON.stringify(nnn) + JSON.stringify(ooo) + JSON.stringify(eee);
                    
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
        );
    }
}

function donnerHeros(obj,n){
    heros[n].sens = 2;
    heros[n].aura = obj;
    var description = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl et attaquez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl puis appuyez sur maj pour déchainer votre créativité.","boat":"Vous trouvez un bateau. Utilisez le pour naviquer vers de nouvelles aventures. Pour cela, mettez vous face à une case de mer et appuyez sur maj.","pot":"C'est un pot de fleur !!! Attention c'est fragile.","fragment":"Un receptacle de coeur ! Vous gagnez un coeur supplémentaire et tous vos coeurs sont regénérés.","coeur":"C'est un coeur ! Cela devrait vous permettre de vous soigner. Ne me demandez pas comment.","lettre":"C'est une lettre metaphysique !! Elle vous permet de briser le 4eme mur en envoyant l'île dans laquelle vous vous trouvez au créateur du jeu. Si elle est jugée interessante, elle sera intégrée dans le jeu. A vos pinceaux, créateurs de tous poils !!!","tabouret":"Un vieux tabouret moche. En plus il ne ressemble pas à un tabouret mais plutôt à une table basse.","fleur2":"Un vase rempli de fleur !!! Voilà qui ferait plaisir à votre amant.","table0":"Une moitié de table ... Surtout ne croquez pas dedans !","table1":"C'est une demi-table. C'est aussi inutile que déplaisant à voir.","etagere":"Une etagere. Mais qu'est ce qu'il y a dedans ?","coffre1":"Vous obtenez un coffre déjà ouvert. Gné ????????","house0":"Woaw ! Mais c'est une maison ! Posez la avant d'avoir une crampe aux bras.","house1":"Une moitié de maison. Il est difficile d'avoir un meilleur rapport inutilité/encombrement.","house2":"Vous obtenez une moitié de maison. Vous restez sans voix.","house3":"Mais qu'est ce que c'est que cette horreur ???","house4":"Vous obtenez une moitié de maison. Le doute s'insinue en vous : et si tout était lié ?","armure":"Un bouclier et des épées !!! Pas de bol, c'est en plastique...","torche":"Pourquoi avoir mis une torche dans un coffre ? Pourquoi ?","rubisBlanc":"C'est le légendaire rubis blanc. Il vaut 10 000 fucking rubis verts !!! Votre fortune est faite.","stele":"Ils arrivent ...","aiguille":"Vous avez découvert une aiguille magnetisée. C'est un des trois élements de la boussole.","palmier":"Vous obtenez un palmier. Tout est dit.","plate":"Un interrupteur au sol. Je suis presque certain que ça n'a rien à faire dans vos mains.","hookShot":"C'est un grappin, il permet d'aggriper un objet solide afin d'être tracté jusqu'à lui. Assignez le avec ctrl et utilisez le avec maj. Il peut parcourir jusqu'à 5 cases !","statue0":"C'est une statue, elle vous dit quelque chose mais un détail vous fait douter ... Peut-être est-ce le fait que la tête soit une main ?","vitre":"Vous avez découvert une vitre de boussole. C'est un des trois éléments nécéssaires à la fabrication de la boussole des éléments. C'est sans doute peu utile une vitre, vu comme ça mais c'est très pratique pour éviter que le cadran soit plein de poussière !"};
    alert(description[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "mastersword" || obj == "hookShot" || obj == "boomerang" || obj == "pencil" || obj == "lettre" || obj == "boat" || obj == "pot"){
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
        console.log(objNiveau[pressurePlate[0]][pressurePlate[1]]);
        editPlate = 0;
    }
    else if (editPlate == 1 && action != "return"){
        editPlate = 0;
        if (action == 1 || action == -1){
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
        if (action == 1 || action == -1){
            if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] += action;
            Painter.niveau(niveau);
        }
        else if (action == "delete"){
            if (editM == 1){
                ennemis.forEach(
                    function(e,i){
                        if (Math.round(e.x) == coor[1] && Math.round(e.y) == coor[0]){
                            ennemis.splice(i,1);
                        }
                    }
                );
            }
            else {
                if (objNiveau[coor[0]][coor[1]].length > 1) objNiveau[coor[0]][coor[1]].splice(0,1);
                else objNiveau[coor[0]][coor[1]][0] = "";
            }
        }
        else if (action == "return"){
            editHand = editObject[out];
            editnumber = 1;
            editM = 0;
        }
        else if (editM == 1){
            ennemis.push(monstreType(action,coor[1],coor[0]));
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
        else{
            if (objNiveau[coor[0]][coor[1]][0] != "") objNiveau[coor[0]][coor[1]].splice(0,0,action);
            else objNiveau[coor[0]][coor[1]][0] = action;
            if (action == "house3" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house4");
                else objNiveau[coor[0]][coor[1]+1][0] = "house4";
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
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
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
            }
            if (action == "lambda0"){
                objNiveau[coor[0]][coor[1]] = ["PNJ","lambda0","blablabla"];
            }
            else if (action == "house0"){
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
            }
            else if (action == "coffre2"){
                objNiveau[coor[0]][coor[1]][0] = "coffre3";
            }
            else if (action == "tele"){
                objNiveau[coor[0]][coor[1]] = ["teleport",-1,"void",0,0,0,0];
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
    if (ennemis[n].pv <= 0) return;
    if (ennemis[n].img == "feu" || ennemis[n].img == "scie") return;
    if (ennemis[n].img == "moblin"){
        if (ennemis[n].sens == (sens+2)%4 && sens != 4){
            degat = 0;
        }
    }
    if (ennemis[n].ia == "ball"){
        ennemis[n].sens = sens;
        if (degat == 0) ennemis[n].v = 0.05;
        else ennemis[n].v = 0.1;
        ennemis[n].n = Math.round(1/ennemis[n].v);
        return;
    }
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
    if (degat == 0) {ennemis[n].stun = 2;particles.push({n:0,type:"hitB",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:10});}
    else particles.push({n:0,type:"hitA",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:10});
    ennemis[n].x = Math.round(ennemis[n].x);
    ennemis[n].y = Math.round(ennemis[n].y);
    if (sens < 4 && ennemis[n].img != "mCorps"){
        if (Math.round(ennemis[n].y) + vecteurs[sens][0] < niveau.length){
            if (Math.round(ennemis[n].x) + vecteurs[sens][1] < niveau[Math.round(ennemis[n].y) + vecteurs[sens][0]].length){
                if (niveau[Math.round(ennemis[n].y)][Math.round(ennemis[n].x)] == niveau[Math.round(vecteurs[sens][0] + ennemis[n].y)][Math.round(vecteurs[sens][1] + ennemis[n].x)]){
                    ennemis[n].x = Math.round(vecteurs[sens][1] + ennemis[n].x);
                    ennemis[n].y = Math.round(vecteurs[sens][0] + ennemis[n].y);
                }
            }
        }
    }
    if (ennemis[n].pv <= 0) {
        particles.push({n:0,type:"fumeeM",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:40});
        ennemis[n].pv = 0;
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
        else if (ennemis[n].img == "mCorps"){
            ennemis.forEach(
                function (e,n){
                    hitEnnemis(n,10000,4); 
                }
            );
        }
    }
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
    if ((heros[n].y + vecteurs[sens][0]) < niveau.length){
        if (niveau[heros[n].y][heros[n].x] >= niveau[heros[n].y + vecteurs[sens][0]][heros[n].x + vecteurs[sens][1]] && (heros[n].x + vecteurs[sens][1]) < niveau[heros[n].y + vecteurs[sens][0]].length){
            if (isSolid(heros[n].x + vecteurs[sens][1],heros[n].y + vecteurs[sens][0]) == false){
                heros[n].x += vecteurs[sens][1];
                heros[n].y += vecteurs[sens][0];
            }
        }
    }
    heros[n].vie -= degat;
    heros[n].stun = 20;
    heros[n].mortal = 60;
}

function waterLevel(n){
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(fff,x){
                    niveau[y][x] += n;
                }
            );
        }
    );
    Painter.niveau(niveau);
    Painter.scrollYPlus(30*n);
    heros.forEach(
        function (e){
            e.z += n;
        }
    );
    ennemis.forEach(
        function (e,c){
            ennemis[c].z += n;
            if (e.z < 0){
                ennemis[c].pv = 0;
            }
        }
    );
    boomerang.forEach(
        function(e){
            e.alti += n;
        }
    );
}

function isSolid(x,y){
    var truc = objNiveau[y][x][0];
    if (truc == "arbre0" || truc == "coffre0" || truc == "coffre1" || truc == "porte0" || truc == "bleu0" || truc == "rouge1" || truc == "switch0" || truc == "switch1" || truc == "house0" || truc == "house1" || truc == "house2" || truc == "house3" || truc == "house4" || truc == "pot" || truc == "PNJ" || truc == "fleur2" || truc == "table0" || truc == "table1" || truc == "etagere" || truc == "armure" || truc == "tabouret" || truc == "autel" || truc == "torche" || truc == "torche1" || truc == "lit0" || truc == "lit1" || truc == "stele" || truc == "houseHelp" || truc == "templeFeu0" || truc == "templeEau0" || truc == "templeFeu1"|| truc == "templeFeu2" || truc == "templeEau1"|| truc == "templeEau2" || truc == "palmier" || truc == "arbre1" || truc == "bougie" || truc == "switch2" || truc == "switch3" || truc == "checkPoint" || truc == "unCheckPoint" || truc == "wSwitch0" || truc == "wSwitch1" || truc == "main0" || truc == "main1" || truc == "statue0" || truc == "miniTempleEau") return true;
    else return false;
}

function isFloodable(x,y,carteChelouWeshWesh){
    if( typeof carteChelouWeshWesh === 'undefined' ) carteChelouWeshWesh = objNiveau; 
    var truc = carteChelouWeshWesh[y][x][0];
    if (truc == "herbe0" || truc == "pot" || truc == "coffre0" || truc == "coffre1" || truc == "switch0" || truc == "switch1" || truc == "switch2" || truc == "switch3" || truc == "checkPoint" || truc == "herbe1" || truc == "PNJ" || truc == "armure" || truc == "table0" || truc == "table1" || truc == "unCheckPoint" || truc == "fleur2" || truc == "coeur" || truc == "rubisVert" || truc == "rubisRouge" || truc == "rubisBleu" || truc == "rubisBlanc" || truc == "statue0") return true;
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
            objNiveau[y][x][2] = "Tu veux partir à l'aventure ? Je comprends, c'est la fougue de la jeunesse j'imagine. Tu peux prendre mon bateau si tu veux. Si tu navigues droit vers l'est, tu trouveras un vieux sage qui possède une carte maritime. Va lui demander.";
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
            if (quests.boussoleF == 0)
            { 
                objNiveau[y][x][2] = "Bienvenue Link. Le heros du vent est hors de la portée de ton bateau. Voici cependant la carte des mers que tu peux utiliser avec la touche m quand tu es en mer. Pour naviguer plus loin, il te faudra reconstruire la boussole des elements. Malheureusement, elle a été brisée en 3 morceaux qu'il te faut aller chercher dans les temples du feu, de l'eau et du vent.";
                questObj.carteMaritime = 1;
            }
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
