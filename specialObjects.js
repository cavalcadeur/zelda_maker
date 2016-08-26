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

function drawDebris(type,n,x,y,alti){
    Painter.img( ctx, x - n/25, y, alti, imgDebris[type + "0"] );
    Painter.img( ctx, x  - n/20, y, alti, imgDebris[type + "1"] );
    Painter.img( ctx, x, y, alti, imgDebris[type + "2"] );
    Painter.img( ctx, x + n/25, y, alti, imgDebris[type + "3"] );
    Painter.img( ctx, x  + n/50, y, alti, imgDebris[type + "4"] );
}

function drawFumee(type,n,x,y,alti){
    if (n > 9)ctx.globalAlpha = 1 - (n-10)/10;
    for (var i = 0;i < 8;i ++){
        Painter.img( ctx, x + Math.cos((Math.PI/4)*i)*n*0.01,y + Math.sin((Math.PI/4)*i)*n*0.01,alti,imgDebris[type]);
        Painter.img( ctx, x + Math.cos((Math.PI/4)*i)*n*0.02,y + Math.sin((Math.PI/4)*i)*n*0.02,alti,imgDebris[type]);
    }
    ctx.globalAlpha = 1;
}
