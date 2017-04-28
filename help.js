function helpPencil(name){
    var listeHP = {"gear":"Le sous-menu engrenage contient des objets comme les interrupteurs.","loot":"Le sous-menu loot contient les rubis, trésors et objets.","outDoor":"Le sous-menu exterieur contient les arbres et les maisons ainsi que les herbes.","inDoor":"Le sous-menu d'interieur contient les décorations pour l'interieurs des maisons.","monsters":"Le sous-menu monstres contient les monstres. Wow mind blow !!!","sky":"Le sous-menu sky contient les objets qui sont dans le ciel ! Les éoliennes tout ça ...","fireTemple":"Le sous-menu temple du feu contient les objets qui décorent le temple du feu.","special":"Le sous-menu special contient les objets spécifiques à la teleportation. Le teleporteur, le fast travel, le marquage...","lambda0":"Cette outil permet de placer un PNJ sur la carte.","tele":"C'est un teleporteur invisible. Quand un personnage monte dessus, il est teleporté à l'endroit choisi. Cliquer sur une case teleporteur ou maison avec cet outil permet de changer sa destination.","coffre2":"Le coffre invisible cache les objets en dessous. Il est supprimé quand tous les monstres de la pièce sont morts, dévoilant ce qui se cache en dessous.","fastTravel":"L'outil fusée ou fastTravel permet d'aller vers n'importe qu'elle endroit préalablement marqué. Pointer vers une île nouvelle revient à annuler le fastTravel.","plate":"un interrupteur"};
    if (listeHP[name] != undefined)alert(listeHP[name]);
    else{
        alert("Je pense que l'aide n'est pas nécessaire pour cette objet.");
    }
}

function Help(){
    ctx.fillStyle = colorSet[out][3];
    ctx.fillRect(0,0,W,H);
    backDraw();
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "30px purisa";
    ctx.textAlign = "left";
    ctx.fillText("Joueur 1",20,50);
    ctx.textAlign = "right";
    ctx.fillText("Joueur 2",W-20,50);
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],60,120);
    ctx.drawImage(imgMenu[heros[0].prim],270,120);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-110,120);
    ctx.font = "20px purisa";
    ctx.textAlign = "left";
    ctx.fillText("espace",50,210);
    ctx.fillText("maj",275,210);
    ctx.fillText("ctrl",275,250);
    ctx.textAlign = "center";
    ctx.fillText("entrée",W-90,210);
    ctx.fillText("touche 0",W-90,250);
    ctx.font = "25px purisa";
    ctx.fillText("i : inventaire",W/2,200);
    ctx.fillText("a : ouvrir/fermer l'aide",W/2,300);
    if (questObj.carteMaritime == 1) ctx.fillText("m : carte maritime",W/2,400);
}

function clickHelp(){
    console.log(rigolote);
    if (rigolote[0] != -1) return;
    console.log("Prout ?");
    if (mouse[1] > 275 && mouse[1] < 325){
        if (mouse[0] > 190 && mouse[0] < 230){
            rigolote = [0,4];
        }
        else if (mouse[0] > 230 && mouse[0] < 270){
            rigolote = [0,5];
        }
    }
    else if (mouse[1] < 120){
        if (mouse[0] > 190 && mouse[0] < 230){
            rigolote = [0,6];
        }
    }
    else if (mouse[1] > W - 130){
        if (mouse[0] > 190 && mouse[0] < 230){
            rigolote = [1,4];
        }
        else if (mouse[0] > 230 && mouse[0] < 270){
            rigolote = [1,5];
        }
    }
    else {
        return;
    }
    console.log("I'm in !");
    alert("Maintenant que tu as cliqué, cher joueur, te voilà obligé d'appuyer sur une touche qui servira à effectuer cette action.");
}

function toucheHelp(key){
    if (rigolote[0] == -1){
        if (key == 65) onSea =  0;
        return;
    }
    else if (key == 77 || key == 73 || key == 65){
        alert("Cette touche est l'une des trois touches maudites qui ne doivent pas être modifiées par le joueur sous peine de voir la terre disparaître.");
    }
    else{
        heros[rigolote[0]].touche[rigolote[1]] = key;
        rigolote = [-1,-1];
    }
}
