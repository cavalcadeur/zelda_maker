var Bokoblin = function(){
    var x = 0;
    var y = 0;
    var z = 0;
    var r = 0;
    var g = 0;
    var img = 2;
    var mort = 0;
    var scale = 1;
    var fx;
    var fy;
    var fm;
    var n = 0;
    var sens = 2;
    var high = 1;
    var eyeSight = 5;
    var champsVision = [];
    var objectif = [0,0,0];
    var degat = 0.5;
    var pv = 2;
    var flyMode = 1;

    function walking(){
        if (n == 0){
            if (rnd(30) == 1){
                this.doing = dancing;
                n -= 1;
            }
            else if (rnd(50) == 1){
                this.doing = idling;
            }
            else if (rnd(50) == 1){
                this.doing = looking;
                n -= 1;
            }
            else{
                var direc = accessible();
                if (direc.length == 0){
                    this.doing = dancing;
                }
                else{
                    sens = direc[rnd(direc.length)];
                }
                img = sens;
            }
        }
        x += vecteurs[sens][1]/50;
        y += vecteurs[sens][0]/50;
        n += 1;
        if (n%10 == 0){
            vision();
            var truc = react();
            if (truc == "go"){
                this.doing = going;
                n = 0;
            }
            else if (truc == "hit"){
                this.doing = attacking;
                n = 0;
            }
        }
        if (n == 50){
            n = 0;
        }
    }

    function dancing(){
        if (n == 0){
            if (rnd(30) == 1){
                this.doing = idling;
                scale = 1;
                n -= 1;
            }
            else if (rnd(20) == 2){
                this.doing = walking;
                scale = 1;
                n -= 1;
            }
            else{
                if (g == 0){
                    g = 0.8;
                    z += 0.1;
                    img = 13;
                    scale = scale * -1;
                }
                else n -= 1;
            }
        }
        n += 1;
        if (n == 50) n = 0;
    }

    function idling(){
        if (n == 0){
            img = 12;
            if (rnd(60) == 1){
                this.doing = dancing;
                n = -1;
            }
            else if (rnd(60) == 1){
                this.doing = walking;
                n -= 1;
            }
            else if (rnd(40) == 1){
                this.doing = looking;
                n -= 1;
            }
        }
        n += 1;
        if (n == 80) n = 0;
    }

    function looking(){
        if (n == 0){
            if (rnd(40) == 1){
                this.doing = dancing;
                n = -1;
            }
            else if (rnd(40) == 1){
                this.doing = walking;
                n -= 1;
            }
            else{
                sens = (sens+1)%4;
                img = sens;
                vision();
                var truc = react();
            }
        }
        if (n%5 == 0){
            vision();
            var truc = react();
            //alert(truc);
        }
        n += 1;
        if (truc == "go"){
            //alert("Matelot");
            this.doing = going;
            n = 0;
        }
        else if (truc == "hit"){
            this.doing = attacking;
            n = 0;
        }
        if (n == 80) n = 0;
    }

    function attacking(){
        if (n == 0){
            sens = objectif[2];
            img = 4 + sens;
        }
        else if (n == 30){
            img = 8 + sens;
        }
        else if (n == 35){
            if (Math.abs(z - heros[0].z) < high){
                if (Math.floor(x) + vecteurs[sens][1] == heros[0].x && Math.floor(y) + vecteurs[sens][0] == heros[0].y){
                    hitHeros(0,degat,sens);
                }
            }
            if (Math.abs(z - heros[1].z) < high){
                if (Math.floor(x) + vecteurs[sens][1] == heros[1].x && Math.floor(y) + vecteurs[sens][0] == heros[1].y){
                    hitHeros(1,degat,sens);
                }
            }
            n = -1;
            vision();
            var truc = react();
            if (truc == "go"){
                this.doing = going;
                n = -1;
            }
            else if (truc == "hit"){
                this.doing = attacking;
                n = -1;
            }
            else {
                this.doing = walking;
            }
        }
        n += 1;
    }

    function damageFly(){
        if (n == 0) {
            img = 13;
            z += 0.1;
            g = 1;
        }
        else if (n <= 25){
            x += vecteurs[sens][1] / 25 * flyMode;
            y += vecteurs[sens][0] / 25 * flyMode;
        }
        else if (g == 0){

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
            for (var i = 0;i < 4; i++){
                sens = i;
                vision();
                var truc = react();
                if (truc == "go"){
                    this.doing = going;

                    return;
                }
                else if (truc == "hit"){
                    this.doing = attacking;

                    return;
                }
            }
            r = -0.2;
            this.doing = looking;
        }
        n += 1;
        r += 0.2;
    }

    function going(){
        if (n == 0){
            var direc = accessible();
            if (direc.length == 0){
                this.doing = dancing;
            }
            else{
                var aa = 0;
                if (Math.floor(x) == objectif[0]){
                    if (Math.floor(y) > objectif[1]){
                        if (direc.indexOf(0) != -1){
                            aa = direc.indexOf(0);
                        }
                        else {
                            sens = rnd(direc.length);
                        }
                    }
                    else if (Math.floor(y) < objectif[1]){
                        if (direc.indexOf(2) != -1){
                            aa = direc.indexOf(2);
                        }
                        else {
                            sens = rnd(direc.length);
                        }
                    }
                    else {
                        for (var i = 0;i < 4; i++){
                            sens = i;
                            vision();
                            var truc = react();
                            if (truc == "go"){
                                this.doing = going;
                                n = 0;
                                return;
                            }
                            else if (truc == "hit"){
                                this.doing = attacking;
                                n = 0;
                                return;
                            }
                        }
                        this.doing = looking;
                        n = -1;
                    }

                }
                else{
                    if (Math.floor(x) > objectif[0]){
                        if (direc.indexOf(3) != -1){
                            aa = direc.indexOf(3);
                        }
                        else {
                            sens = rnd(direc.length);
                        }
                    }
                    else if (Math.floor(x) < objectif[0]){
                        if (direc.indexOf(1) != -1){
                            aa = direc.indexOf(1);
                        }
                        else {
                            sens = rnd(direc.length);
                        }
                    }
                    else {
                        for (var i = 0;i < 4; i++){
                            sens = i;
                            vision();
                            var truc = react();
                            if (truc == "go"){
                                this.doing = going;
                                n = 0;
                                return;
                            }
                            else if (truc == "hit"){
                                this.doing = attacking;
                                n = 0;
                                return;
                            }
                        }
                        this.doing = looking;
                        n = -1;
                    }

                }
                sens = direc[aa];
            }
            img = sens;
        }
        x += vecteurs[sens][1]/30;
        y += vecteurs[sens][0]/30;
        n += 1;
        if (n == 30){
            n = 0;
        }
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
                this.doing = looking;
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
            if (Math.abs(z - heros[0].z) < high){
                if (Math.floor(x) == heros[0].x && Math.floor(y) == heros[0].y){
                    hitHeros(0,degat,sens);
                }
            }
            if (Math.abs(z - heros[1].z) < high){
                if (Math.floor(x) == heros[1].x && Math.floor(y) == heros[1].y){
                    hitHeros(1,degat,sens);
                }
            }

        },
        display: function(){
            Painter.imgEnnemy( ctx, x, y, z, scale, r, imgMonstre[img] );
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
            if (XX == Math.floor(x) && YY == Math.floor(y)){
                if (z <= ZZ && z + high >= ZZ) return true;
                else return false;
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
        }
    };
}
