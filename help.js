function helpPencil(name){
    var listeHP = {"gear":"Le sous-menu engrenage contient des objets comme les interrupteurs.","loot":"Le sous-menu loot contient les rubis, trésors et objets.","outDoor":"Le sous-menu exterieur contient les arbres et les maisons ainsi que les herbes.","inDoor":"Le sous-menu d'interieur contient les décorations pour l'interieurs des maisons.","monsters":"Le sous-menu monstres contient les monstres. Wow mind blow !!!","sky":"Le sous-menu sky contient les objets qui sont dans le ciel ! Les éoliennes tout ça ...","fireTemple":"Le sous-menu temple du feu contient les objets qui décorent le temple du feu.","special":"Le sous-menu special contient les objets spécifiques à la teleportation. Le teleporteur, le fast travel, le marquage...","lambda0":"Cette outil permet de placer un PNJ sur la carte.","tele":"C'est un teleporteur invisible. Quand un personnage monte dessus, il est teleporté à l'endroit choisi. Cliquer sur une case teleporteur ou maison avec cet outil permet de changer sa destination.","coffre2":"Le coffre invisible cache les objets en dessous. Il est supprimé quand tous les monstres de la pièce sont morts, dévoilant ce qui se cache en dessous.","fastTravel":"L'outil fusée ou fastTravel permet d'aller vers n'importe qu'elle endroit préalablement marqué. Pointer vers une île nouvelle revient à annuler le fastTravel.","plate":"un interrupteur"};
    if (listeHP[name] != undefined)alert(listeHP[name]);
    else{
        alert("Je pense que l'aide n'est pas nécessaire pour cette objet.");
    }
}

function Help(){
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    waves.forEach(
        function(e){
            waveNiveau(e);
        }
    );
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "30px serif";
    ctx.fillText("Joueur 1",20,50);
    ctx.fillText("Joueur 2",W-150,50);
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],60,120);
    ctx.drawImage(imgMenu[heros[0].prim],270,120);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-110,120);
    ctx.font = "20px serif";
    ctx.fillText("espace",50,210);
    ctx.fillText("maj",275,210);
    ctx.fillText("ctrl",275,250);
    ctx.fillText("entrée",W-115,210);
    ctx.fillText("touche 0",W-115,250);
}
