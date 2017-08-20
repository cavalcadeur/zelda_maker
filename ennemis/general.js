// Fonctions relatives aux ennemis (à tous les ennemis parce que comme ça c'est plus pratique)


// fonction qui trouve le bon ennemi, le crée et le prépare au combat

function findEnnemy(nom,id,x,y,m){
    if (nom == "cochon"){
        ennemis[id] = new Cochon();
    }
    else if (nom == "chuchu"){
        ennemis[id] = new Chuchu();
    }

    ennemis[id].create(x,y,m);
}
