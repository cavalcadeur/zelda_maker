function findPath(x,y,z,xx,yy,h){
    var listeA = [[x,y,0,0]];
    var listeB = [];
    var ii = 0;
    while (listeA.length > 0){
        var alphacommando = findBestEle(listeA);
        var actu = listeA[alphacommando];
        listeA.splice(alphacommando,1);
        if (actu[0] == xx && actu[1] == yy){
            //fin ! le chemin a été trouvé
            listeB.push(actu);
            //alert("phase finale du processus !");
            return findFinal(listeB);
        }
        for(var i = 0;i<4;i++){
            var nx = actu[0] + vecteurs[i][1];
            var ny = actu[1] + vecteurs[i][0];
            if (ny >= 0 && nx >= 0 && nx < niveau[0].length && ny < niveau.length){
                if (getFloor(nx,ny,z) + h > getFloor(actu[0],actu[1],z) && getFloor(nx,ny,z) > -1){
                    var elment = [nx,ny,actu[2] + 1];
                    if (findIdentique(elment,listeA) == false && findIdentique(elment,listeB) == false){
                        elment[3] = elment[2] + findDistance(nx,ny,xx,yy);
                        elment[4] = ii;
                        listeA.push(elment);
                    }
                }
            }
        }
        listeB.push(actu);
        ii += 1;
    }
    return [];
}


function findBestEle(liste){
    var r = 0;
    var record = 10000;
    liste.forEach(
        function(e,i){
            if (e[3] >= record){
                r = i;
                record = e[3];
            }
        }
    );
    return r;
}

function findIdentique(elem,liste){
    var hey = 0;
    liste.forEach(
        function (e){
            if (e[0] == elem[0] && e[1] == elem[1]){
                if (e[2] < elem[2]) hey = 1;
            }
        }
    );
    if (hey == 0) return false;
    else return true;
}

function findDistance(x,y,xx,yy){
    return Math.abs(yy-y) + Math.abs(xx-x);
}

function findFinal(liste){
    var result = [];
    var p = liste.length - 1;
    while (p > 0){
        result.push(liste[p]);
        p = liste[p][4];
    }
    return result;
}
