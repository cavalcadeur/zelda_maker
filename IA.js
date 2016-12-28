function choseDirection(n){
    var choices = [0,1,2,3];
    var final = [];
    choices.forEach(
        function(e){
            var x = Math.round(ennemis[n].x) + vecteurs[e][1];
            var y = Math.round(ennemis[n].y) + vecteurs[e][0];
            if (x >= 0 && y >= 0  && y < niveau.length){
                if (x < niveau[y].length){
                    if (niveau[y][x] > -1){
                        if (niveau[y][x] <= Math.round(ennemis[n].z)){
                            if (isSolid(x,y) == false){ final.push(e);}
                        }
                    }
                    else if (ennemis[n].img == "main"){
                        if (Math.abs(niveau[y][x] - Math.round(ennemis[n].z)) < 2){
                            if (isSolid(x,y) == false && niveau[y][x] > -1){ final.push(e);}
                        }
                    }
                    else if (ennemis[n].img == "mPierreA" || ennemis[n].img == "mPierreB"){
                        if (niveau[y][x] <= Math.round(ennemis[n].z)){
                            if (isSolid(x,y) == false) final.push(e);
                        }
                    }
                }
            }
        }
    );
    if (ennemis[n].ia == "evo"){
        if (ennemis[n].iaS == "lurk"){
            if (final.length == 0){
                return 4;
            }
            else ennemis[n].sens = final[rnd(final.length)];
            var find = vueIA(ennemis[n]);
            if (find >= 0){
                particles.push({n:0,type:"excla",x:ennemis[n].x,y:ennemis[n].y,g:0,alti:ennemis[n].z,lim:20});
                ennemis[n].iaS = "fonce";
                ennemis[n].nn = find+1;
            }
            else if (rnd(100) < 5){
                ennemis[n].iaS = "spy";
                ennemis[n].nn = 4;
            }
        }
        else if (ennemis[n].iaS == "fonce"){
            ennemis[n].nn -= 1;
            if (ennemis[n].nn == 0 || final.indexOf(ennemis[n].sens) != -1) ennemis[n].iaS = "lurk";
        }
        else if (ennemis[n].iaS == "spy"){
            ennemis[n].nn -= 1;
            if (ennemis[n].nn == 0) ennemis[n].iaS = "lurk";
            ennemis[n].sens = (ennemis[n].sens + 1)%4;
            var find = vueIA(ennemis[n]);
            if (find >= 0){
                particles.push({n:0,type:"excla",x:ennemis[n].x,y:ennemis[n].y,g:0,alti:ennemis[n].z,lim:20});
                ennemis[n].iaS = "fonce";
                ennemis[n].nn = find;
            }
            else return 4;
        }
        return ennemis[n].sens;
    }
    else if (ennemis[n].ia == "random"){
        if (final.length == 0){
            return 4;
        }
        else return final[rnd(final.length)];
    }
    else if (ennemis[n].ia == "chercheur"){
        if (heros[0].x > Math.round(ennemis[n].x) && final.indexOf(1) != -1) var cc = 1;
        else if (heros[0].x < Math.round(ennemis[n].x) && final.indexOf(3) != -1) var cc = 3;
        else if (heros[0].y > Math.round(ennemis[n].y) && final.indexOf(2) != -1) var cc = 2;
        else if (heros[0].y < Math.round(ennemis[n].y) && final.indexOf(0) != -1) var cc = 0;
        else {
            if (heros[0].x == Math.round(ennemis[n].x) && heros[0].y == Math.round(ennemis[n].y)){
                if (final.length == 0){
                    var cc = 4;
                }
                else var cc = final[rnd(final.length)];
            }
            else {
                var cc = 4;
            }
        }
        return cc;
    }
    else if (ennemis[n].ia == "fonce"){
        if (final.indexOf(ennemis[n].sens) != -1){
            ennemis[n].endu += 1;
            return ennemis[n].sens;
        }
        else {
            ennemis[n].ia = "retour";
            return (ennemis[n].sens+2)%4;
        }
    }
    else if (ennemis[n].ia == "retour"){
        if (ennemis[n].endu == 0) {
            ennemis[n].ia = "wait";
            return 4;
        }
        if (final.indexOf(ennemis[n].sens) != -1){
            ennemis[n].endu -= 1;
            return ennemis[n].sens;
        }
        else {
            ennemis[n].ia = "wait";
            return 4;
        }
    }
    else if (ennemis[n].ia == "ball"){
        if (ennemis[n].v == 0.025) return 4;
        else {
            if (final.indexOf(ennemis[n].sens) == -1){
                ennemis[n].sens = (ennemis[n].sens +2)%4;
            }
            if (ennemis[n].nn == 0) ennemis[n].nn = 1;
            else {
                ennemis[n].nn = 0;
                ennemis[n].v = ennemis[n].v / 2;
            }
            return ennemis[n].sens;
        }
    }
    else if (ennemis[n].ia == "wait"){
        var zeta = 4;
        heros.forEach(
            function(e){
                if (e.x == Math.round(ennemis[n].x)){
                    if (e.y < Math.round(ennemis[n].y)){
                        ennemis[n].ia = "fonce";
                        zeta = 0;
                    }
                    else {
                        ennemis[n].ia = "fonce";
                        zeta = 2;
                    }
                }
                else if (e.y == Math.round(ennemis[n].y)){
                    if (e.x < Math.round(ennemis[n].x)){
                        ennemis[n].ia = "fonce";
                        zeta = 3;
                    }
                    else {
                        ennemis[n].ia = "fonce";
                        zeta = 1;
                    }
                }
            }
        );
        if (final.indexOf(zeta) != -1) return zeta;
        else return 4;
    }
    else if (ennemis[n].ia == "mur"){
        for(var i = 0;i < 4;i++){
            if (final.indexOf(((ennemis[n].sens+3) + i)%4) != -1) return ((ennemis[n].sens+3) + i)%4;
        }
        return 4;
    }
    else if (ennemis[n].ia == "waitS"){
        ennemis[n].nnn += 1;
        if (ennemis[n].nnn == 2){
            particles.push({n:0,type:"quake",x:0,y:0,g:0,alti:0,lim:50});
            particles.push({n:-33,type:"fumeeF",x:5,y:2,g:0,alti:0,lim:40});
            particles.push({n:-14,type:"fumeeF",x:9,y:5,g:0,alti:0,lim:40});
            particles.push({n:-21,type:"fumeeF",x:7,y:8,g:0,alti:0,lim:40});
            particles.push({n:-24,type:"fumeeF",x:9,y:10,g:0,alti:0,lim:40});
            particles.push({n:0,type:"fumeeF",x:ennemis[n].x,y:ennemis[n].y,g:0,alti:0,lim:40});
            ennemis[n].img = "mCorps";
            ennemis[n].pv = 5;
            ennemis[n].ia = "stop";
            ennemis.push({"x":ennemis[n].x + 1,"y":ennemis[n].y,"endu":0,"pv":2,"img":"mPierreA","sens":2,"z":0,"g":0,"v":0.1,"n":10,"nn":0,"ia":"wait","stop":0,"stun":0,"att":1});
            ennemis.push({"x":ennemis[n].x - 1,"y":ennemis[n].y,"endu":0,"pv":2,"img":"mPierreB","sens":2,"z":0,"g":0,"v":0.1,"n":10,"nn":0,"ia":"wait","stop":0,"stun":0,"att":1});
        }
        return 4;
    }
    else if (ennemis[n].ia == "stop") {
        ennemis[n].g = -0.2;
        ennemis[n].z += 0.05;
        return 4;
    }
}

function vueIA(guy){
    var XX = Math.round(guy.x);
    var YY = Math.round(guy.y);
    var LL = [];
    for (var i = 0;i < guy.vue;i++){
        XX += vecteurs[guy.sens][1];
        YY += vecteurs[guy.sens][0];
        var ZZ = getAlti(XX,YY);
        if (ZZ - guy.z > 1){
            i = guy.vue;
        }
        if (ZZ - guy.z > -1) LL.push([XX,YY]);
    }
    var NN = -8;
    LL.forEach(
        function(e,i){
            if (heros[0].x == e[0] && heros[0].y == e[1]){
                NN = i;
            }
            else if (heros[1].x == e[0] && heros[1].y == e[1]){
                NN = i;
            }
        }
    );
    return NN;
}

function getAlti(x,y){
    if (x < 0 || y < 0 || y >= niveau.length || x >= niveau[0].length){
        return 6666666;
    }
    else {
        return (niveau[y][x] + taille(objNiveau[y][x]));
    }
}
