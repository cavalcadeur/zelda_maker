function drawSea(){
    var seaScroll = [boatPosition[1]*3 - 10-W/2,boatPosition[0]*3-30-H/2];
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    backg.backGroundMap();
    if (questObj["carteMaritime"] == 1){
        sea.forEach(
            function(e){
                drawIsland(e[0],e[1]*3-seaScroll[1],e[2]*3-seaScroll[0]);
            }
        );
        ctx.drawImage(imgBoat,boatPosition[1]*3 - 10 - seaScroll[0],boatPosition[0]*3 - 30 - seaScroll[1],30,30);
    }
    else {
        alert("Vous ne possédez pas encore de carte maritime !");
        onSea = 1;
    }
}

function drawIsland(ile,Y,X){
    var truc = iles[ile].alti;
    truc.forEach(
        function(f,y){
            f.forEach(
                function(g,x){
                    if (g <= -1) return;
                    ctx.fillStyle = "rgb("+(20+g*5)+","+(80+g*20)+","+(10+g*2)+")";
                    ctx.fillRect(x*3 + X,y*3 + Y,4,4);
                }
            );
        }
    );

}

function goToLevel(oo,go,x,y,x2,y2,scrollStore,d,n){
    ennemis.forEach(
        function (e,i){
            ennemis[i] = e.takeBack();
        }
    );
    particles.forEach(
        function(e,i){
            particles[i] = deComposeParticle(e);
        }
    );
    boomerang.forEach(
        function(e,n){
            if (e.endu > 5) {
                var X = e.x - vecteurs[e.sens][1]*(10-e.endu);
                var Y = e.y - vecteurs[e.sens][0]*(10-e.endu);
            }
            else{
                var X = e.x + vecteurs[e.sens][1]*(e.endu);
                var Y = e.y + vecteurs[e.sens][0]*(e.endu);
            }
            if (objNiveau[Y][X][0] == "main1") objNiveau[Y][X][0] = "main0";
            else objNiveau[Y][X].splice(0,0,"boomerang");
        }
    );
    boomerang = [];
    if (oo == -1 || go == "void"){
        onSea = 5;
        islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        return;
    }
    heros[0].x = x;
    heros[0].y = y;
    heros[1].x = x2;
    heros[1].y = y2;
    heros[0].grap = 0;
    heros[0].grapD = -1;
    heros[1].grap = 0;
    heros[1].grapD = -1;
    hookShots = [];
    out = oo;
    chooseBack(oo);
    for(var i = 0;i<nSpeImg;i++){
        imgElement["spe"+i].src = "images/elements/spe/"+ out +"/spe" + i + ".png";
    }

    for (var i = 0;i<70;i++){
        imgMonstre[i].src = "images/ennemis/" + out + "/e" + i + ".png";
    }
    goto = go;
    if (oo == 1){
        if (iles[go].particles == undefined){
            particles = [];
        }
        else {
            particles = iles[go].particles;
        }
        niveau = iles[go].alti;
        ennemis = iles[go].ennemis;
        objNiveau = iles[go].obj;
        textured = iles[go].textures;
        
        // attention, les voisins sont forcément exterieurs si la pièce est une île.
        var voisins = iles[go].voisins;
    }
    else{
        if (interieurs[go].particles == undefined){
            particles = [];
        }
        else {
            particles = interieurs[go].particles;
        }
        niveau = interieurs[go].alti;
        ennemis = interieurs[go].ennemis;
        objNiveau = interieurs[go].obj;
        textured = interieurs[go].textures;

        // attention, les voisins sont forcément interieurs si la pièce est interieure.
        var voisins = interieurs[go].voisins;

    }
    canvImg = [0,0,0,0];
    if (voisins != undefined){
        voisins.forEach(
            function (e,i){
                if (oo == 1){
                    var Vniveau = iles[e[0]].alti;
                    var Vennemis = iles[e[0]].ennemis;
                    var VobjNiveau = iles[e[0]].obj;
                    var Vtextures = iles[e[0]].textures;
                }
                else {
                    var Vniveau = interieurs[e[0]].alti;
                    var Vennemis = interieurs[e[0]].ennemis;
                    var VobjNiveau = interieurs[e[0]].obj;
                    var Vtextures = interieurs[e[0]].textures;
                }

                canvImg[e[1]] = [document.createElement("canvas")];
                canvImg[e[1]][1] = canvImg[e[1]][0].getContext("2d");

                canvImg[e[1]][0].setAttribute("width",Painter.getRealWidth(Vniveau)+700);
                canvImg[e[1]][0].setAttribute("height",Painter.getRealHeight(Vniveau)+700);
                
                Painter.niveau(Vniveau , Vtextures);
                Painter.scrollVoisin(Vniveau);
                drawRoom(0,canvImg[e[1]][1],Vniveau,VobjNiveau);
            }
        );
    }
    if (x == -1) heros[0].x = niveau[0].length - 1;
    if (x2 == -1) heros[1].x = niveau[0].length - 1;
    if (y == -1) heros[0].y = niveau.length - 1;
    if (y2 == -1) heros[1].y = niveau.length - 1;
    if (d != undefined){
        heros[n].anim = walkAnim;
            
            //heros[n].x +=  vecteurs[d][1];
            //heros[n].y +=  vecteurs[d][0];
        heros[n].vx += -50 * vecteurs[d][1];
        heros[n].vy += -50 * vecteurs[d][0];
    }
    ennemis.forEach(
        function (e,i){
            findEnnemy(e[2],i,e[0],e[1],e[3]);
            //ennemis[i] = findEnnemy(e[2]);
        }
    );
    particles.forEach(
        function(e,i){
            particles[i] = composeParticle(e);
        }
    );
    onSea = 0;
    respawnPoint = [x,y];
    heros[0].z = niveau[heros[0].y][heros[0].x];
    heros[1].z = niveau[heros[1].y][heros[1].x];
    Painter.niveau(niveau , textured);
    if (scrollStore == undefined){
        Painter.scroll(0,0);
        Painter.centerScroll(x,y,0,W,H);
    }
    else{
        Painter.adjustScroll(scrollStore,heros[0].x - vecteurs[d][1],heros[0].y - vecteurs[d][0],heros[0].z);
    }
    if (out == 7){
        objNiveau.forEach(
            function (e,yz){
                e.forEach(
                    function (g,xz){
                        if (g[0] == "spe1"){
                            objNiveau[yz][xz][1] += nPas - objNiveau[yz][xz][2];
                            objNiveau[yz][xz][2] = nPas;
                            if (objNiveau[yz][xz][1] > 1000) objNiveau[yz][xz][0] = "spe2";
                        }
                        if (g[0] == "spe2"){
                            objNiveau[yz][xz][1] += nPas - objNiveau[yz][xz][2];
                            objNiveau[yz][xz][2] = nPas;
                            var listo = ["rubisBleu","bourgeon","rubisRouge"];
                            if (objNiveau[yz][xz][1] > 6000) objNiveau[yz][xz] = ["spe3",listo[rnd(listo.length)],"spe0"];
                        }
                    }
                );
            }
        );
    }
    setColors(out,5);
    if (go == "sky4" && quests.sky == 0){
        cinematicos = 5;
        heros[0].x += 1;
    }
}

function defineTele(gg,outa){
    if (objNiveau[teleport[0]][teleport[1]][0] == "teleport"){
        objNiveau[teleport[0]][teleport[1]][1] = outa;
        objNiveau[teleport[0]][teleport[1]][2] = gg;
    }
    else {
        objNiveau[teleport[0]][teleport[1]][1] = gg;
    }

}

function chooseBack(oo){
    if (oo == 1){
        backDraw = backg.fa;
    }
    else if (oo == 2){
        backDraw = backg.fb;
    }
    else if (oo == 3){
        backDraw = backg.fc;
    }
    else if (oo == 5){
        backDraw = backg.fe;
    }
    else if (oo == 6 || oo == 7){
        backDraw = backg.ff;
    }
    else if (oo == 4){
        backDraw = backg.fd;
    }
    else if (oo == 8){
        backDraw = backg.fg;
    }
    else {
        backDraw = backg.nothing;
    }
    console.log(backDraw);
}
