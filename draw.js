function drawRoom(kk,ctxa,nivniv,objNivniv){
    nivniv.forEach(
        function(e,y){
            //Painter.line( ctx, y,0);
            e.forEach(
                function(f,x){
                    Painter.cell( ctxa, x, y, f ,0,nivniv);

                    drawObj(x,y,f,e,ctxa,objNivniv);
                    //testTerrain(x,y,f);
                    //if (objNiveau[y][x][0] != "") ctx.drawImage(imgElement[objNiveau[y][x][0]],x*50 - (tElement[objNiveau[y][x][0]][0] - 50)/2 + scrollX,y*50 - 20*niveau[y][x] - (tElement[objNiveau[y][x][0]][1]-40) + scrollY);
                    hookShots.forEach(
                        function(omg){
                            if (y == Math.round(omg.y) && x == Math.round(omg.x)){
                                var rr = (omg.s * Math.PI)/2;
                                Painter.imgBoomerang(ctxa,omg.x,omg.y,omg.z,rr,imgDebris["hook"]);
                            }
                            omg.chaine.forEach(
                                function(m){
                                    if (y == Math.round(m[1]) && x == Math.ceil(m[0])){
                                        Painter.img(ctxa,m[0],m[1],omg.z,imgDebris["chaineA"]);
                                    }
                                }
                            );
                        }
                    );
                }
            );
            if (kk == 1){
                heros.forEach(
                    function(h,n){
                        if (y == h.y) drawHeros(n);
                        if (h.vy > 0 && y == h.y + 1) drawHeros(n);
                    }
                );

                ennemis.forEach(
                    function(a,m){
                        if (a.giveY() == y)drawEnnemi(m);
                    }
                );
                pots.forEach(
                    function(g,i){
                        if (y == Math.round(g.y + g.n*((g.oy - g.y)/32))) drawPot(g,i);
                    }
                );
                boomerang.forEach(
                    function(f,i){
                        if ((y == f.y) | (f.vy > 0 && y == f.y + 1)){
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
                                    addParticles("debris",f.x,f.y,niveau[f.y][f.x],5,0,10,"herbe");
                                    //particles.push({n:0,type:"herbe",x:f.x,y:f.y,g:5,alti:niveau[f.y][f.x],lim:10});
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
            particles.forEach(
                function(kgb,iii){
                    if (y == Math.ceil(kgb.y)){
                        kgb.draw(kgb,ctxa);
                        kgb.act(kgb,iii);
                    }
                }
            );
        }
    );
}
