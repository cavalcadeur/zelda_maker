var Cochon = function(){
    var x = 0;
    var y = 0;
    var z = 0;
    var r = 0;
    var g = 0;
    var img = 2;
    var mort = 0;
    var scale = 1;
    var scaleY = 1;
    var fx;
    var fy;
    var fm;
    var n = 0;
    var sens = 3;
    var high = 1;
    var eyeSight = 5;
    var champsVision = [];
    var objectif = [0,0,0];
    var degat = 0.5;
    var pv = 300;
    var flyMode = 2;
    var animCount = 0;
    var att = 1;
    var onHeros = [0,0];

    function walking(){
        if (n == 0){
            if (rnd(20) == 30){
                this.doing = standing;
                n -= 1;
            }
            else {
                var direc = accessible();
                if (direc.length == 0){
                    this.doing = standing;
                }
                else{
                    sens = direc[rnd(direc.length)];
                    if (sens == 1) scale = -1;
                    else if (sens == 3) scale = 1;
                }
                //img = sens;
            }
        }
        //x += vecteurs[sens][1]/200;
        //y += vecteurs[sens][0]/200;
        n += 1;
        animCount += 1;
        var fImg = img;
        img = Math.round(animCount/10)%2;
        if (img != fImg) {
            x += vecteurs[sens][1]/20;
            y += vecteurs[sens][0]/20;
        }
        /*
         if (n%10 == 0){
         vision();
         var truc = react();
         if (truc == "go"){
         this.doing = fleeing;
         n = 0;
         }
         else if (truc == "hit"){
         this.doing = attacking;
         n = 0;
         }
         }
         */
        if (n == 200){
            n = 0;
        }
    }

    function standing(){
        if (rnd(500) == 1){
            this.doing = walking;
            var direc = accessible();
            if (direc.length == 0){
                this.doing = standing;
            }
            else{
                sens = direc[rnd(direc.length)];
                if (sens == 1) scale = -1;
                else if (sens == 3) scale = 1;
            }
            img = 0;
        }
    }

    function carriedOver(){
        x = heros[onHeros[1]].x+0.5 + heros[onHeros[1]].vx/50;
        y = heros[onHeros[1]].y+0.5 + heros[onHeros[1]].vy/50;
        z = heros[onHeros[1]].z + 2.9;

        n += 1;
        if (n%6 == 0) img = (img+1)%2;
    }

    function damageFly(){

        x += vecteurs[sens][1] / 25 * flyMode;
        y += vecteurs[sens][0] / 25 * flyMode;
        if (n <= 0) {
            //img = 13;
            x = heros[onHeros[1]].x+0.5 + heros[onHeros[1]].vx/50;
            y = heros[onHeros[1]].y+0.5 + heros[onHeros[1]].vy/50;
            z = heros[onHeros[1]].z + 2.9;
            z += 0.1;
            g = 1;
            n = 0;
        }

        else if (g == 0 && getFloor(Math.floor(x),Math.floor(y),z) <= z){

            n = -1;
            r = 0;
            if (getFloor(Math.floor(x),Math.floor(y),z) <= -1){
                mort = 0;
                if (out == 1 || out == 3){
                    addParticles("rond",Math.floor(x),Math.floor(y),-1,0,0,30,0.3);
                    //particles.push({n:0,x:Math.floor(x),y:Math.floor(y),s:0.3,type:"rond",lim:30,alti:-1,g:0});
                    addParticles("eclabousse",Math.floor(x),Math.floor(y),-1,15,0,30,0);
                    //particles.push({n:0,x:Math.floor(x),y:Math.floor(y),s:0,type:"eclabousse",lim:30,alti:-1,g:15});
                }
                else if (out == 2){
                    addParticles("rondB",Math.floor(x),Math.floor(y),-1,0,0,30,0.3);
                    //particles.push({n:0,x:Math.floor(x),y:Math.floor(y),s:0.3,type:"rond",lim:30,alti:-1,g:0});
                    addParticles("eclabousseB",Math.floor(x),Math.floor(y),-1,15,0,30,0);
                    //particles.push({n:0,x:Math.floor(x),y:Math.floor(y),s:0,type:"eclabousse",lim:30,alti:-1,g:15});
                }
                this.act = nada;
                this.display = nada;
                this.doing = nada;
                this.isThere = nadaR;
                return;
            }
            else if (pv <= 0){
                mort = 0;
                addParticles("fumeeM",Math.floor(x),Math.floor(y),z,0,0,40);
                //particles.push({n:0,type:"fumeeM",x:Math.floor(x),y:Math.floor(y),g:0,alti:z,lim:40});
                addParticles("exploM",Math.floor(x),Math.floor(y),z,0,0,80);
                //particles.push({n:0,type:"exploM",x:Math.floor(x),y:Math.floor(y),g:0,alti:z,lim:80});
                this.act = nada;
                this.display = nada;
                this.doing = nada;
                this.isThere = nadaR;
                return;
            }
            var direc = accessible();
            if (direc.length == 0){
                this.doing = standing;
            }
            else{
                sens = direc[rnd(direc.length)];
                if (sens == 1) scale = -1;
                else if (sens == 3) scale = 1;
            }

            r = -0.2;
            this.doing = walking;
        }
        n += 1;
        r += 0.2;
    }

    function vision(){
        var XX = Math.floor(x);
        var YY = Math.floor(y);
        for (var i = 0;i < eyeSight;i++){
            YY += vecteurs[sens][0];
            XX += vecteurs[sens][1];
            //console.log(XX);
            if (XX > -1 && YY > -1 && XX < niveau[0].length && YY < niveau.length){
                var ZZ = niveau[YY][XX];
                if (ZZ <= z + high && getFloor(XX,YY,z) > z - high){
                    champsVision[i] = [objNiveau[YY][XX][0],XX,YY];
                    //particles.push({n:0,type:"flower",x:XX,y:YY,g:0,alti:z,lim:40});
                }
                if (getFloor(XX,YY,z) > z + high){
                    return;
                }
            }
        }
        //console.log(champsVision);
    }

    function react(){
        var result = "nope";
        for (var i = 0; i < 4;i++){
            sens = (sens+1)%4;
            var XX = Math.floor(x) + vecteurs[sens][1];
            var YY = Math.floor(y) + vecteurs[sens][0];
            if ((XX == heros[0].x && YY == heros[0].y) || (XX == heros[1].x && YY == heros[1].y)){
                if (Math.abs(getFloor(Math.floor(x),Math.floor(y),z) - getFloor(XX,YY,z)) < high){
                    result = "hit";
                    objectif[2] = sens;
                }
            }
        }
        if (result == "nope"){
            champsVision.forEach(
                function (e,i){
                    if (e[1] == heros[0].x && e[2] == heros[0].y){
                        objectif = [e[1],e[2]];
                        result = "go";
                    }
                    else if (e[1] == heros[1].x && e[2] == heros[1].y){
                        objectif = [e[1],e[2]];
                        result = "go";
                    }
                }
            );
        }
        return result;
    }

    function accessible(){
        var result = [];
        for (var i = 0;i<4;i++){
            var YY = Math.floor(y) + vecteurs[i][0];
            var XX = Math.floor(x) + vecteurs[i][1];
            if (XX > -1 && YY > -1 && XX < niveau[0].length && YY < niveau.length){
                var ZZ = getFloor(XX,YY,z);
                if (ZZ <= z + high && ZZ > -1){
                    result.push(i);
                }
            }
        }
        return result;
    }

    function nada(){

    }
    function nadaR(){
        return false;
    }
    function meurs(){
        alert("Je suis MORT !");
        this.act = nada;
        this.display = nada;
        this.doing = nada;
        this.isThere = nadaR;
    }

    return {
        create: function(xx,yy,mm){
            if (mm == 0){
                this.act = nada;
                this.display = nada;
                this.doing = nada;
                this.isThere = nadaR;
                return;
            }
            else {
                x = xx;
                y = yy;
                fx = xx;
                fy = yy;
                fm = mm;
                z = niveau[Math.round(y)][Math.round(x)];
                this.doing = walking;
                mort = mm;
            }
        },
        act: function(){
            if (z > getFloor(Math.floor(x),Math.floor(y),z)){
                g -= 0.1;
                z += g/2;
            }
            else{
                g = 0;
                z = getFloor(Math.floor(x),Math.floor(y),z);
            }
        },
        display: function(){
            Painter.imgEnnemy( ctx, x, y, z, scale, r, imgMonstre[img], scaleY );
        },
        doing: function(){

        },
        giveY(){
            return Math.floor(y);
        },
        giveX(){
            return Math.floor(x);
        },
        takeBack(){
            if (fm == 2) mort = 2;
            return [fx,fy,"bokoblin",mort];
        },
        isThere(XX,YY,ZZ){
            if (Math.hypot(x-XX,y-YY,z-ZZ) < 1){
                return true;
            }
            else return false;
        },
        damage(degat,sensD){
            this.doing = damageFly;
            n = 0;
            sens = sensD;
            pv -= degat;
            scale = 1;
            flyMode = 1;
            addParticles("hitA",Math.floor(x),Math.floor(y),z,0,0,10);
            //particles.push({n:0,type:"hitA",x:Math.floor(x),y:Math.floor(y),g:0,alti:z,lim:10});
            if (Math.floor(x) + vecteurs[sens][1] < 0 || Math.floor(y) + vecteurs[sens][0] < 0 || Math.floor(x) + vecteurs[sens][1] >= niveau[0].length || Math.floor(y) + vecteurs[sens][0] >= niveau.length) flyMode = 0;
            else if (getFloor(Math.floor(x) + vecteurs[sens][1],Math.floor(y) + vecteurs[sens][0],z) > z) flyMode = 0;
        },
        touchDamage(xx,yy,zz,n){
            /*
             if (Math.hypot(x-xx,y-yy,z-zz) < 1){
             if (heros[n].vx > 0) var Sens = 1;
             else if (heros[n].vx < 0) var Sens = 3;
             else if (heros[n].vy < 0) var Sens = 0;
             else if (heros[n].vy < 0) var Sens = 2;
             else var Sens = sens;
             hitHeros(n,att,Sens);
             }
             */
        },
        carried(N){
            onHeros = [0,N];
            this.doing = carriedOver;
            n = 0;
            scaleY = -1;
        },
        throw(s){
            x = heros[onHeros[1]].x+0.5 + heros[onHeros[1]].vx/50;
            y = heros[onHeros[1]].y+0.5 + heros[onHeros[1]].vy/50;
            z = heros[onHeros[1]].z + 2.9;
            //onHeros = [0,0];
            this.doing = damageFly;
            n = -10;
            scaleY = 1;
            sens = s;
        }
    };
}
