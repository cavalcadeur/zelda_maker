function action(t){
    if (edition == 1) return;
    //Painter.scrollCenter(heros[0].x,heros[0].y,heros[0].scrollSpeed);
    //var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
            if (h.imgN > 0){
                h.imgN -= 1;
                if (h.imgN == 0) h.imgUp = 0;
            }
            if (h.invent[h.objet] == "batonF"){
                h.timerF -= 1;
                if (h.timerF == 0){
                    if (h.invent.length == 1){
                        h.invent[0] = "blank";
                    }
                    else {
                        h.invent.splice(h.objet,1);
                        h.objet = 0;
                    }
                }
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
                        else if (niveau[gy][gx] > h.z + 0.5) h.grap = 2;
                        else if (h.grapD > 50) h.grap = 2;
                        else if (getFloor(gx,gy,h.z+0.5) >= h.z+0.5){
                            h.grap = 3;
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
                        if (getFloor(h.x + vecteurs[h.sens][1],h.y + vecteurs[h.sens][0],h.z) >= h.z+0.5){
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
                        else if (truc[3] == 1 || truc[3] == -1 || truc[3] == 0.2 || truc[3] == -0.2){
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
                    else if (truc[0] == "bourgeon"){
                        heros[0].seedCount += 3;
                        supress = 0;
                    }
                    else if (truc[0] == "teleport"){
                        teleport = [h.y,h.x];
                        goToLevel(truc[1],truc[2],truc[3],truc[4],truc[5],truc[6]);
                    }
                    else if (truc[0] == "boomerang" || truc[0] == "mastersword" || truc[0] == "pencil" || truc[0] == "boat" || truc[0] == "hookShot" || truc[0] == "parachale" || truc[0] == "baton" || truc[0] == "seeds" || truc[0] == "flowerRod" || truc[0] == "maskWind"){
                        if (truc[0] == "boomerang") {addObj(truc[0],n);}
                        else donnerHeros(truc[0],n);
                        supress = 0;
                    }
                    else if (truc[0] == "avaleur1"){
                        if (h.z == niveau[h.y][h.x]){
                            h.stun = 10020;
                            objNiveau[h.y][h.x][0] = "avaleur2";
                        }
                    }
                    else if (truc[0] == "textBox"){
                        if (h.z == niveau[h.y][h.x]){
                            addParticles("bla",0,0,60000,0,0,-1,truc[1]);
                            //particles.push({n:0,type:"bla",x:0,y:0,g:0,alti:60000,lim:-1,content:truc[1],actu:"",xx:0,yy:0,y2:0,x2:0});
                            objNiveau[h.y][h.x] = [""];
                        }
                    }
                    if (supress == 0){
                        if (truc.length > 1) objNiveau[h.y][h.x].splice(0,1);
                        else objNiveau[h.y][h.x][0] = "";
                    }
                }

                if (h.invent[h.objet] == "baton"){
                    if (h.y + vecteurs[(h.sens+1)%4][0] < niveau.length){
                        if (h.x + vecteurs[(h.sens+1)%4][1] < niveau[0].length){
                            if (objNiveau[h.y + vecteurs[(h.sens+1)%4][0]][h.x + vecteurs[(h.sens+1)%4][1]][0] == "torche"){
                                h.invent[h.objet] = "batonF";
                                h.timerF = 200;
                            }
                        }
                    }
                }
                if (h.imgUp != 1){
                    if (1 == keys[heros[n].touche[1]]) {if (0 == keys[heros[n].touche[3]]) move(1,n,0);}
                    else if (1 == keys[heros[n].touche[3]]) move(3,n,0);
                    else if (1 == keys[heros[n].touche[0]]){if (0 == keys[heros[n].touche[2]]) move(0,n,0);}
                    else if (1 == keys[heros[n].touche[2]]) move(2,n,0);
                }
            }
            if (h.plane == 1){
                if (h.z > getFloor(h.x,h.y,h.z)) h.g = 0.01;
                else {
                    h.g = 0;
                    h.z = getFloor(h.x,h.y,h.z);
                    h.plane = 0;
                    h.vx = 0;
                    h.vy = 0;
                    h.imgUp = 0;
                    h.imgN = 0;
                    if (h.z <= -1){
                        fall(h,n);
                    }
                }
                h.z -= h.g;
                if (figer == 1) {}

            }
            else if (h.grap == 0){
                if ((h.z > getFloor(h.x,h.y,h.z) )) h.g += 0.05;
                else {
                    h.g = 0;
                    h.z = getFloor(h.x,h.y,h.z);
                    if (h.z <= -1){
                        fall(h,n);
                    }
                }
                h.z -= h.g;
            }
            if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
            else {
                h.anim(n);
                
                ennemis.forEach(
                    function(e){
                        if (e.pv == 0) return;
                        e.touchDamage(h.x + h.vx/50,h.y + h.vy/50,h.z,n);
                    }
                );
            }
        });
    //if (heros[0].vx != 0 || heros[0].vy != 0 || heros[0].g != 0 || edition == 1)Painter.scrolling();
}

function fall(h,n){
    var truc = objNiveau[h.y][h.x];
    if (truc != "avaleur1" && truc != "avaleur2"){
        if (out == 1 || out == 3){
            addParticles("rond",h.x,h.y,-1,0,0,30,0.3);
            //particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rond",lim:30,alti:-1,g:0});
            addParticles("eclabousse",h.x,h.y,-1,15,0,30,0);
            //particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousse",lim:30,alti:-1,g:15});
        }
        else if (out == 2){
            addParticles("rondB",h.x,h.y,-1,0,0,30,0.3);
            //particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rondB",lim:30,alti:-1,g:0});
            addParticles("eclabousseB",h.x,h.y,-1,15,0,30,0);
            //particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousseB",lim:30,alti:-1,g:15});
        }
        if (niveau[respawnPoint[1]][respawnPoint[0]] < 0){
            var xxx = 0;
            while (niveau[respawnPoint[1]][respawnPoint[0]] < 0){
                xxx += 1;
                respawnPoint[0] += 1;
                if (respawnPoint[0] == niveau[0].length) {
                    respawnPoint[0] = 0;
                    respawnPoint[1] += 1;
                    if (respawnPoint[1] == niveau.length) {
                        respawnPoint[1] = 0;
                    }
                }
                if (xxx == 500){
                    niveau[respawnPoint[1]][respawnPoint[0]] = 0;
                }
            }
        }
        heros[n].x = respawnPoint[0];
        heros[n].y = respawnPoint[1];
        heros[n].stun = 20;
        heros[n].mortal = 60;
    }
}

function move(d,n,gg){
    if (heros[n].stun > 0) return;
    if (heros[n].sens != d){
        heros[n].sens = d;
        heros[n].delay = 4;
        if (n == 0){
            if (heros[0].prim == "mastersword" && keys[32] == 1){
                attack(0,1);
            }
        }
        if (heros[n].invent[heros[n].objet] == "mastersword"){
            if ((n == 0 && keys[16] == 1) || (n == 1 && keys[13] == 1))
                attack(n);
        }
        return;
    }
    if (heros[n].delay != 0){
        heros[n].delay -= 1;
        return;
    }
    // if (gg == 0 && heros[n].plane == 0 && heros[n].g == 0){
    if (heros[n].x + vecteurs[d][1] == niveau[heros[n].y].length || heros[n].x + vecteurs[d][1] == -1 || heros[n].y + vecteurs[d][0] == niveau.length || heros[n].y + vecteurs[d][0] == -1){
        if (heros[n].x + vecteurs[d][1] == niveau[heros[n].y].length && canvImg[1] != 0){
            goToLevel(out,findVoisin(1),0,heros[n].y,0,heros[n].y,Painter.scrollStore(heros[n].x,heros[n].y,heros[n].z),d,n);
            
        }
        else if (heros[n].x + vecteurs[d][1] <= -1 && canvImg[3] != 0){
            
            goToLevel(out,findVoisin(3),-1,heros[n].y,-1,heros[n].y,Painter.scrollStore(heros[n].x,heros[n].y,heros[n].z),d,n);
            
            
        }
        return;
    }
    var truc = objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]];
    if (heros[n].sens == 0){
        if (truc[0] == "house0" || truc[0] == "house1" || truc[0] == "house3" || truc[0] == "houseHelp" || truc[0] == "templeFeu1" || truc[0] == "templeEau1" || truc[0] == "miniTempleEau" || truc[0] == "canon1" || truc[0] == "sanctuaire" || truc[0] == "foret1" || truc[0] == "serre1"){
            teleport = [heros[n].y+vecteurs[d][0],heros[n].x+vecteurs[d][1]];
            if (objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][1] == "void"){
                goToLevel(out,"void",0,0,0,0);
            }
            else {
                goto = objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][1];
                if (objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][2] == 666){
                    out = 1;
                    cinematicos = 2;
                    goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                }
                else if (interieurs[goto] == undefined){
                    out = 1;
                    goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                }
                else {
                    out = interieurs[goto].out;
                    goToLevel(out,goto,interieurs[goto].heros[0][1],interieurs[goto].heros[0][0],interieurs[goto].heros[1][1],interieurs[goto].heros[1][0]);
                }
                if (goto == "help1") alert("Place toi face à un personnage et appuie sur la touche maj pour lui parler.");
            }
            if (truc[0] == "canon1"){
                cinematicos = 3;
            }
        }
    }
    if (heros[n].z + 1 < getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z)){
        /*
        if (truc[0] == "rocher"){
            var YY = heros[n].y+vecteurs[d][0];
            var XX = heros[n].x+vecteurs[d][1];
            if (XX + vecteurs[d][1] == -1 || YY + vecteurs[d][0] == -1 || XX + vecteurs[d][1] == niveau[YY].length || YY + vecteurs[d][0] == niveau.length) return;
            if (objNiveau[YY][XX].length == 1 ) objNiveau[YY][XX][0] = "";
            else objNiveau[YY][XX].splice(0,1);
            addParticles("object",XX+0.5,YY+0.5,niveau[YY][XX],0,vecteurs[heros[n].sens][1]*0.19,vecteurs[heros[n].sens][0]*0.19,"rocher",0,"normal");
            //particles.push({n:0,type:"rocher",x:XX,y:YY,g:0,alti:niveau[YY][XX],lim:-5,sens:heros[n].sens,endu:1});
            heros[n].stun = 10;
        }
         */
        return;
    }
    //}
    if (heros[n].plane == 1 || heros[n].g != 0){
        if (heros[n].x + vecteurs[d][1] == niveau[heros[n].y].length | heros[n].x + vecteurs[d][1] == -1 | heros[n].y + vecteurs[d][0] == niveau.length | heros[n].y + vecteurs[d][0] == -1) return;
        if (heros[n].z + 1 < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) return;
    }

    if (heros[n].g == 0){
        if (heros[n].z - getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z) > 1 || getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z) <= -1){
            heros[n].anim = jumpAnim;
            heros[n].datAnim = d;
            //console.log("JUMP !!!");
        }
        else{
            heros[n].anim = walkAnim;
            
            heros[n].x +=  vecteurs[d][1];
            heros[n].y +=  vecteurs[d][0];
            heros[n].vx += -50 * vecteurs[d][1];
            heros[n].vy += -50 * vecteurs[d][0];
        }
    }
    else {
        heros[n].anim = walkAnim;
        
        heros[n].x +=  vecteurs[d][1];
        heros[n].y +=  vecteurs[d][0];
        heros[n].vx += -50 * vecteurs[d][1];
        heros[n].vy += -50 * vecteurs[d][0];
    }
    nPas += 1;
    if (heros[n].etat == 1 && heros[n].g == 0) {heros[n].g = -0.20; heros[n].z += 0.01;}
}

function changeArme(n){
    if (heros[n].etat != 0){
        cinematicos = 4;
        heros[n].etat = 0;
        imgCinema[0] = n;
        imgCinema[1] = "coffre3";
        imgCinema[2] = "heros";
    }
    else{
        if (heros[n].timerF > 0) heros[n].timerF = 0;
        if (heros[n].invent[heros[n].objet] == "batonF") heros[n].invent[heros[n].objet] = "baton";
        heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
    }
}

function getFloor(x,y,z){
    workFloor = objNiveau[y][x][0];
    if (workFloor == "pont"){
        if (z+0.3 >= niveau[y][x] + objNiveau[y][x][1]) return niveau[y][x] + objNiveau[y][x][1];
        else return niveau[y][x];
    }
    else{

        return niveau[y][x] + taille(workFloor);
    }
}

function SuperGetFloor(x,y,z){
    x = Math.round(x);
    y = Math.round(y);
    if (y >= niveau.length || y < 0 || x < 0 || x >= niveau[0].length) return z + 5000;
    workFloor = objNiveau[y][x][0];
    if (workFloor == "pont"){
        if (z+0.3 >= niveau[y][x] + objNiveau[y][x][1]) return niveau[y][x] + objNiveau[y][x][1];
        else return niveau[y][x];
    }
    else{

        return niveau[y][x] + taille(workFloor);
    }
}

function findVoisin(n){
    var result = "void";
    if (out == 1){
        iles[goto].voisins.forEach(
            function(e){
                if (e[1] == n){
                    result = e[0];
                }
            }
        );
    }
    else{
        iles[goto].voisins.forEach(
            function(e){
                if (e[1] == n){
                    result = e[0];
                }
            }
        );
    }
    return result;
}
