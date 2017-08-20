function drawPot(f,i){
    if (f.n < 33){
        var vx = f.n*((f.ox - f.x)/32);
        var vy = f.n*((f.oy - f.y)/32);
        Painter.img( ctx, f.x + vx, f.y + vy, f.alti, imgElement.pot );
        f.alti += f.g / 50;
        f.g -= 1;
        f.n += 1;
    }
    else if (f.n == 33) {
        var objectsB = ["rubisVert","rubisVert","coeur","coeur","rubisBleu"];
        var choix = objectsB[rnd(objectsB.length - 1)];
        var truc = objNiveau[Math.round(f.oy)][Math.round(f.ox)][0];
        if (objNiveau[Math.round(f.oy)][Math.round(f.ox)].length == 1 && objNiveau[Math.round(f.oy)][Math.round(f.ox)][0] == "") objNiveau[Math.round(f.oy)][Math.round(f.ox)][0] = choix;
        else if (isSolid(Math.round(f.ox),Math.round(f.oy))){

        }
        else objNiveau[Math.round(f.oy)][Math.round(f.ox)].splice(0,0,choix);
        f.g = 5;
        f.n += 1;
        f.alti = niveau[Math.round(f.oy)][Math.round(f.ox)];
    }
    else if (f.n < 44){
        drawDebris("pot",f.n - 34,f.ox,f.oy,f.alti);
        f.alti += f.g / 50;
        f.g -= 1;
        f.n += 1;
    }
    else pots.splice(i,1);
}

function drawQuakePP(e){
    Painter.drawQuake(e.n);
}

function drawDebris(e){
    Painter.img( ctx, e.x - e.n/25, e.y, e.alti, imgDebris[e.name + "0"] );
    Painter.img( ctx, e.x  - e.n/20, e.y, e.alti, imgDebris[e.name + "1"] );
    Painter.img( ctx, e.x, e.y, e.alti, imgDebris[e.name + "2"] );
    Painter.img( ctx, e.x + e.n/25, e.y, e.alti, imgDebris[e.name + "3"] );
    Painter.img( ctx, e.x  + e.n/50, e.y, e.alti, imgDebris[e.name + "4"] );
}

function drawFumee(e){
    if (e.n < 0) return;
    else if (e.n < 8){
        Painter.imgFullControl( ctx, e.x,e.y,e.alti,e.n/8,1-e.n/8,imgDebris[e.name]);
    }
    else if (e.n < 16){
        //if (n > 15)ctx.globalAlpha = 1 - (n-15)/5;
        for (var i = 0;i < 8;i ++){
            Painter.img( ctx, e.x + Math.cos((Math.PI/4)*i)*(e.n-7)*0.01,e.y + Math.sin((Math.PI/4)*i)*(e.n-7)*0.01,e.alti,imgDebris[e.name]);
            Painter.img( ctx, e.x + Math.cos((Math.PI/4)*i)*(e.n-7)*0.03,e.y + Math.sin((Math.PI/4)*i)*(e.n-7)*0.03,e.alti,imgDebris[e.name]);
        }
        //ctx.globalAlpha = 1;
    }
    else if (e.n < 21){
        ctx.globalAlpha = 1 - (e.n-15)/6;
        for (var i = 0;i < 8;i ++){
            Painter.img( ctx, e.x + Math.cos((Math.PI/4)*i)*(e.n-7)*0.01,e.y + Math.sin((Math.PI/4)*i)*(e.n-7)*0.01,e.alti,imgDebris[e.name]);
            Painter.img( ctx, e.x + Math.cos((Math.PI/4)*i)*(e.n-7)*0.03,e.y + Math.sin((Math.PI/4)*i)*(e.n-7)*0.03,e.alti,imgDebris[e.name]);
        }
        ctx.globalAlpha = 1;
    }
}

function drawFire(type,n,x,y,alti){
    Painter.img( ctx, x, y, alti,imgDebris[type+(Math.round(n)%4)]);
}

function drawFlamme(type,n,x,y,alti,kgb){
    if (alti < -4) kgb.g = 50;
    if (kgb.g > 0) var number = 0;
    else number = 1;
    if (alti > -2) Painter.img( ctx, x, y, alti, imgDebris[type+number]);
}

function drawHit(e){
    Painter.drawHit(ctx,e.x,e.y,e.alti,e.n);
}

function drawRond(kgb){
    ctx.globalAlpha = (30-kgb.n)/30;
    Painter.imgScaleTot(ctx,kgb.x+0.3,kgb.y,kgb.alti-2,kgb.s+kgb.n/30,imgDebris[kgb.type]);
    ctx.globalAlpha = 1;
}

function drawEclabousse(kgb){
    var points = [[20,20,1],[20,-20,4],[-20,-20,-1],[-20,20,0],[0,0,15]];
    points.forEach(
        function (e){
            Painter.img(ctx,kgb.x+(e[0]/100)*(1+kgb.n/30),kgb.y+(e[1]/100)*(1+kgb.n/30),kgb.alti+e[2]/100,imgDebris[kgb.type]);
        }
    );
}

function drawFade(n){
    ctx.globalAlpha = 1 - n/30;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.globalAlpha = 1;
}

function drawSword(e){
    Painter.img(ctx,e.x,e.y,e.z,imgDebris["sword"+e.sens]);
}

function drawEole(truc){
    Painter.imgPale(ctx,truc.x+0.02,truc.y,truc.alti-0.48,truc.n/200,imgDebris.pale0);
}

function drawRocher(truc){
    if (truc.n == 0){
        if (truc.endu == 0){
            truc.lim = 1;
        }
        else if (niveau[truc.y+vecteurs[truc.sens][0]][truc.x+vecteurs[truc.sens][1]] + taille(objNiveau[truc.y+vecteurs[truc.sens][0]][truc.x+vecteurs[truc.sens][1]][0]) > truc.alti){
            truc.lim = 1;
        }
        else if (truc.y+vecteurs[truc.sens][0] == 0 || truc.y+vecteurs[truc.sens][0] == niveau.length){
            truc.lim = 1;
        }
        else {
            truc.endu -= 1;
        }
    }
    else if (truc.n < 10){
        truc.x += vecteurs[truc.sens][1] / 10;
        truc.y += vecteurs[truc.sens][0] / 10;
        if (truc.alti <= niveau[Math.round(truc.y)][Math.round(truc.x)]){
            truc.alti = niveau[Math.round(truc.y)][Math.round(truc.x)];
            truc.g = 0;
        }
    }
    else {
        if (truc.alti <= niveau[Math.round(truc.y)][Math.round(truc.x)]){
            truc.alti = niveau[Math.round(truc.y)][Math.round(truc.x)];
            truc.lim = truc.n + 1;
        }

    }
    Painter.img(ctx,truc.x,truc.y,truc.alti,imgElement.rocher);
}

function drawBla(truc){
    //var viteModo = 2;

    ctx.globalAlpha = 1 - truc.n%(truc.viteModo*15)/(truc.viteModo*15);
    Painter.img(ctx,truc.x + truc.x2,truc.y + truc.y2,truc.alti+1.8 + truc.n%(truc.viteModo*15)/(truc.viteModo*15),imgDebris.bla);
    ctx.globalAlpha = 1;

    alert(truc.actu);
}

function drawExploM(truc){
    Painter.drawExploM(ctx,truc.x,truc.y,truc.alti,truc.n);
}

function drawPow(type){
    Painter.drawPow(ctx,type.x,type.y,type.alti,type.n);
}

function drawTexte(truc){
    Painter.drawTexte(ctx,truc.x,truc.y,truc.alti,truc.cont);
}

function drawExcla(truc){
    var viteModo = 2;

    ctx.globalAlpha = 1 - truc.n/40;
    Painter.img(ctx,truc.x,truc.y,truc.alti+1.8 + truc.n/8,imgDebris.excla);
    ctx.globalAlpha = 1;
}

function drawTitre(kgb){
    if (kgb.n < kgb.lim){
        if (kgb.n > 350){
            ctx.globalAlpha = (400-kgb.n)/50;
        }
        if (kgb.n < 100){
            ctx.drawImage(kgb.imgN,(W-kgb.imgN.width)/2,-200 + kgb.n*2);
        }
        else {
            ctx.drawImage(kgb.imgN,(W-kgb.imgN.width)/2,0);
        }
        ctx.globalAlpha = 1;
    }
}


function drawObjectFly(kgb){
    /*
    // application des collisions

    var floor = getFloor(Math.round(kgb.x),Math.round(kgb.y),kgb.alti);
    if (kgb.alti + kgb.vector[2] < floor){
        //kgb = {n:0,type:"fumeeF",x:kgb.x,y:kgb.y,g:0,alti:floor,lim:40};
        kgb.alti = floor;
        kgb.type = "fumeeP";
        kgb.n = 0;
        kgb.lim = 80;
        console.log(kgb.carry);
        kgb.carry.forEach(
            function (e,i){
                objNiveau[Math.round(kgb.y)][Math.round(kgb.x)].splice(i,0,e);
            }
        );

        return;
    }

    // application de la vitesse

    kgb.x += kgb.vector[0];
    kgb.y += kgb.vector[1];
    kgb.alti += kgb.vector[2]/2;

    // application de l'acceleration

    kgb.vector[2] -= 0.1;
     */
    //dessin

    Painter.img(ctx,kgb.x-0.5,kgb.y-0.5,kgb.alti,imgElement[kgb.name]);

}

function drawFlower(kgb){
    var color = ["rgb(191,0,0)","rgb(29,164,28)","rgb(93,86,206)","rgb(38,147,142)","rgb(253,244,0)","rgb(27,101,82)","rgb(0,209,239)","rgb(12,113,44)"];
    var coor = Painter.realCoor(kgb.x+0.5,kgb.y,kgb.alti+3);
    if (kgb.n < 10){
        for (var i = 0;i < 8;i++){
            ctx.fillStyle = color[i];
            ctx.fillRect(coor[0] + Math.cos(Math.PI/4*i)*kgb.n*2,coor[1]+ Math.sin(Math.PI/4*i)*kgb.n*2,6,6);
            //ctx.fillRect(coor[0] + Math.cos(Math.PI/4*i)*kgb.n,coor[1]+ Math.sin(Math.PI/4*i)*kgb.n,4,4);
        }
    }
    else {
        if (kgb.n > 30) ctx.globalAlpha = 1 - (kgb.n-30)/10;
        for (var i = 0;i < 8;i++){
            ctx.fillStyle = color[i];
            ctx.fillRect(coor[0] + Math.cos(Math.PI/4*i)*20 + Math.cos(kgb.n/6+i)*30,coor[1]+ Math.sin(Math.PI/4*i)*20 + (kgb.n-10),6,6);
            ctx.fillRect(coor[0] + Math.cos(Math.PI/4*i)*10 + Math.sin(kgb.n/6+i)*30,coor[1]+ Math.sin(Math.PI/4*i)*10 - (kgb.n-10),4,4);
        }
        ctx.globalAlpha = 1;
    }
}
