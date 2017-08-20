

function questPNJ(x,y,n){
    var perso = objNiveau[y][x][1];
    if (perso == "chef"){
        if (quests[perso] == 1){
            objNiveau[y][x][2] = [["Tu veux partir à l'aventure ? Je comprends, c'est la fougue de la jeunesse j'imagine. Tu peux prendre mon bateau si tu veux. Si tu navigues droit vers l'est, tu trouveras un vieux sage qui possède une carte maritime. Va lui demander."],["Tu veux partir à l'aventure ? Je comprends, c'est la fougue de la jeunesse j'imagine. Tu peux prendre mon bateau si tu veux. Si tu navigues droit vers l'est, tu trouveras un vieux sage qui possède une carte maritime. Va lui demander."]];
            iles["depart"].obj[15][13] = [""];
            iles["depart"].obj[14][13] = ["PNJ","jehan",[["Le chef m'a dit que tu pouvais prendre son bateau. Il est juste ici, va le chercher, il t'appartient."],["Le chef m'a dit que tu pouvais prendre son bateau. Il est juste ici, va le chercher, il t'appartient."]]];
            quests["jehan"] = 1;
            quests["garcon"] = 2;
        }
    }
    else if (perso == "sage"){
        if (quests.boussoleF == 0)
        {
            objNiveau[y][x][2] = [["Bienvenue Link. J'ai entendu dire que la statue de ton village a été volée. C'est une plus grande tragédie encore que ce que tu imagines. En effet, celui qui l'a volée a en tête de sombres desseins qui pourraient mener à sa perte le monde entier. Avec cette statue en sa possession, il tient le monde à sa merci.","Tu vas croire que je radote et tu n'aurais pas tort, après tout je suis completement sénile et peut-être qu'en vérité je ne te raconte que des mensonges depuis le début. Mais par pitié fais moi confiance quand bien même tu ne me connais absolument pas.","L'épée que détiens cette statue est en vérité une épée légendaire que l'on appellerait monado si on était japonais. Il s'agit de l'épée du métamorphe. Elle dormait jusque là sous l'apparence d'une simple statue mais elle peut devenir très dangeureuse si elle est manipulée à des fins mauvaises.","Tu dois la récuperer Link. Munis toi d'une épée que tu trouveras dans un de ces coffres au dessus de moi et part reprendre cette statue."],["Bienvenue mystérieux deuxième joueur. J'ai entendu dire que la statue de ton village a été volée. C'est une plus grande tragédie encore que ce que tu imagines. En effet, celui qui l'a volée a en tête de sombres desseins qui pourraient mener à sa perte le monde entier. Avec cette statue en sa possession, il tient le monde à sa merci.","Tu vas croire que je radote et tu n'aurais pas tort, après tout je suis completement sénile et peut-être qu'en vérité je ne te raconte que des mensonges depuis le début. Mais par pitié fais moi confiance quand bien même tu ne me connais absolument pas.","L'épée que détiens cette statue est en vérité une épée légendaire que l'on appellerait monado si on était japonais. Il s'agit de l'épée du métamorphe. Elle dormait jusque là sous l'apparence d'une simple statue mais elle peut devenir très dangeureuse si elle est manipulée à des fins mauvaises.","Tu dois la récuperer, mystérieux deuxième joueur. Munis toi d'une épée que tu trouveras dans un de ces coffres au dessus de moi et part reprendre cette statue."]];
            questObj.carteMaritime = 1;
            quests.boussoleF += 1;
        }
        else if (quests.boussoleF == 1) objNiveau[y][x][2] = [["Tu veux encore m'écouter raconter des salades ? Soit ! Je vais t'en dire plus sur l'aventure qui t'attends.","Si tu décide d'attaquer ton adversaire de front, tu risques d'essuyer un cuisant échec. C'est pourquoi je te conseille de rassembler des troupes pour lancer un assaut naval d'envergure. Cela peut te sembler être un plan totalement absurde et c'est effectivement le cas mais si tu es comme moi, ton amour des bateaux prendra bien vite le dessus et tu comprendras que ce plan est surtout génialement badass.","Je vais t'indiquer où trouver des troupes.","Tu peux aller chez les gorons, leur force physique ne sera pas de trop. Demande également au chef de ton village s'il n'a pas un ou deux navires de guerre. Ce sont les seuls troupes qui me viennent à l'esprit mais je suis sûr qu'il en existe d'autres de par le monde."],["Tu veux encore m'écouter raconter des salades ? Soit ! Je vais t'en dire plus sur l'aventure qui t'attends.","Si tu décide d'attaquer ton adversaire de front, tu risques d'essuyer un cuisant échec. C'est pourquoi je te conseille de rassembler des troupes pour lancer un assaut naval d'envergure. Cela peut te sembler être un plan totalement absurde et c'est effectivement le cas mais si tu es comme moi, ton amour des bateaux prendra bien vite le dessus et tu comprendras que ce plan est surtout génialement badass.","Je vais t'indiquer où trouver des troupes.","Tu peux aller chez les gorons, leur force physique ne sera pas de trop. Demande également au chef de ton village s'il n'a pas un ou deux navires de guerre. Ce sont les seuls troupes qui me viennent à l'esprit mais je suis sûr qu'il en existe d'autres de par le monde."]];
        else if (quests.boussoleF == 3) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple du feu et au temple du vent.";
        else if (quests.boussoleF == 4) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple de l'eau et au temple du feu.";
        else if (quests.boussoleF == 5) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple du vent selon mes souvenirs.";
        else if (quests.boussoleF == 6) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple de l'eau.";
        else if (quests.boussoleF == 7) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple du feu.";
        else if (quests.boussoleF == 9) objNiveau[y][x][2] = "Tu as finalement reconstitué la boussole. Il n'y a plus de temps à perdre si tu veux retrouver ce satané voleur !";

        //quests.boussoleF += quests.boussole;
        //quests.boussole = 0;
    }
    else if (perso == "jehan"){
        if (quests[perso] == 0){ quests["chef"] = 1; quests["garcon"] = 1;}
    }
    else if (perso == "garcon"){
        if (quests[perso] == 1) objNiveau[y][x][2] = "Tu cherches le chef ? C'est mon père et il est très fort ! Il habite dans la maison ronde au nord du village.";
        else if (quests[perso] == 2) objNiveau[y][x][2] = "Tu t'en vas ? C'est dommage ... Un jour, moi aussi je partirai à l'aventure sur mon bateau pour vaincre des monstres et sauver une princesse";
    }
    else if (perso == "dev"){
        if (quests.dev == 0){
            objNiveau[6][8] = ["textBox","Pour consulter un récapitulatif des touches, il vous suffit d'appuyer sur a. La touche i vous sera sans doute utile plus tard, elle permet d'afficher l'inventaire.","Félicitations ! Vous venez de faire vos premiers pas dans Maker's Pencil. Sachez cependant que ce jeu est amateur. Vous pouvez donc contribuer à son amélioration en créant des îles mais gardez à l'esprit qu'il ne sera peut-être pas à la hauteur de vos attentes."];
            particles.push({n:0,type:"fumeeF",x:8,y:6,g:0,alti:0,lim:40});
            quests.dev = 1;
        }
        else if (quests.dev == 1){
            objNiveau[8][8] = ["","","Avant de commencer dans le vif du sujet, j'aimerais préciser qu'il s'agit d'un jeu amateur. C'est pourquoi il se peut que vous soyez confronté à des bugs, des graphismes médiocres ou des contrôles crispants. Alors soyez indulgent et n'attendez pas un triple A photoréaliste sans saveur mais irréprochable techniquement. J'espere cependant que vous prendrez plaisir à jouer et qu'au moins vous ne perdrez pas trop votre temps à le faire."];
            try {
                ctx.ellipse(-500,-500,5,1,0,-Math.PI,Math.PI);
            }
            catch (e) {
                objNiveau[8][8] = ["","","Avant de commencer dans le vif du sujet, j'aimerais préciser qu'il s'agit d'un jeu amateur. C'est pourquoi il se peut que vous soyez confronté à des bugs, des graphismes médiocres ou des contrôles crispants. Je constate d'ailleurs que vous risquez d'avoir quelques difficultés, sans doute parce que vous utilisez un firefox antérieur à la version 48.0 ou que vous utilisez Internet Explorer. Il y a peut-être une partie du jeu qui sera fonctionnel mais malheureusement pas l'intégralité ... Désolé."];
            }
            console.log(objNiveau[8][8]);
            objNiveau[6][8] = ["PNJ","dev","Coucou !"];
            particles.push({n:0,type:"fumeeF",x:8,y:8,g:0,alti:0,lim:40});
            quests.dev = 2;
        }
        else if (quests.dev == 2){
            objNiveau[6][8] = ["","","Pour voir un récapitulatif des touches (ou si vous désirez les modifier), il suffit d'appuyer sur a. Si vous avez un ami, il peut jouer le mystérieux 2eme joueur. C'est le goron en cosplay en bas à gauche."];
            objNiveau[7][1] = ["PNJ","dev","Coucou ! Petit FDP !"];
            particles.push({n:0,type:"fumeeF",x:8,y:6,g:0,alti:0,lim:40});
            quests.dev = 3;
        }
        else if (quests.dev == 3){
            objNiveau[7][1] = ["","","Un dernier petit détail : ce jeu est aussi un Zelda Maker. Il vous suffit de trouver le pinceau pour créer vos propres niveaux. (le pinceau est disponible quel que soit le mode de jeu choisi)"];
            particles.push({n:0,type:"fumeeF",x:1,y:7,g:0,alti:0,lim:40});
            quests.dev = 4;
        }
    }
    else if (perso == "merchant"){
        if (objNiveau[y][x][3] != undefined){
            cinematicos = 9;
            imgCinema[0] = [x,y,objNiveau[y][x][2],n,objNiveau[y][x][3]];
        }
    }
}



function isSolid(x,y){
    var truc = objNiveau[y][x][0];
    if (truc == "arbre0" || truc == "coffre0" || truc == "coffre1" || truc == "porte0" || truc == "bleu0" || truc == "rouge1" || truc == "switch0" || truc == "switch1" || truc == "house0" || truc == "house1" || truc == "house2" || truc == "house3" || truc == "house4" || truc == "pot" || truc == "PNJ" || truc == "fleur2" || truc == "table0" || truc == "table1" || truc == "etagere" || truc == "armure" || truc == "tabouret" || truc == "autel" || truc == "torche" || truc == "torche1" || truc == "lit0" || truc == "lit1" || truc == "stele" || truc == "houseHelp" || truc == "templeFeu0" || truc == "templeEau0" || truc == "templeFeu1"|| truc == "templeFeu2" || truc == "templeEau1"|| truc == "templeEau2" || truc == "palmier" || truc == "arbre1" || truc == "bougie" || truc == "switch2" || truc == "switch3" || truc == "checkPoint" || truc == "unCheckPoint" || truc == "wSwitch0" || truc == "wSwitch1" || truc == "main0" || truc == "main1" || truc == "statue0" || truc == "miniTempleEau" || truc == "moulin0" || truc == "moulin1" || truc == "arbreG3" || truc == "arbreG4" || truc == "arbreG5"|| truc == "canon0" || truc == "canon1" || truc == "canon2" || truc == "eole0" || truc == "houseSky0" || truc == "houseSky1" || truc == "houseSky2"  || truc == "houseSky3" || truc == "arbreEole1"  || truc == "tombe0" || truc == "portail0" || truc == "portail2")  return true;
    else return false;
}

function isFloodable(x,y,carteChelouWeshWesh){
    if( typeof carteChelouWeshWesh === 'undefined' ) carteChelouWeshWesh = objNiveau;
    var truc = carteChelouWeshWesh[y][x][0];
    if (truc == "herbe0" || truc == "pot" || truc == "switch0" || truc == "switch1" || truc == "switch2" || truc == "switch3" || truc == "checkPoint" || truc == "herbe1" || truc == "PNJ" || truc == "armure" || truc == "table0" || truc == "table1" || truc == "unCheckPoint" || truc == "fleur2" || truc == "coeur" || truc == "rubisVert" || truc == "rubisRouge" || truc == "rubisBleu" || truc == "rubisBlanc" || truc == "statue0") return true;
    else return false;
}

var descriptionObj = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl ou i et attaquez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl ou i et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl ou i puis appuyez sur maj pour déchainer votre créativité. Appuyer sur a si vous avec besoin d'aide durant son utilisation.","boat":"Vous trouvez un bateau. Utilisez le pour naviquer vers de nouvelles aventures. Pour cela, mettez vous face à une case de mer et appuyez sur maj.","pot":"C'est un pot de fleur !!! Attention c'est fragile.","fragment":"Un receptacle de coeur ! Vous gagnez un coeur supplémentaire et tous vos coeurs sont regénérés.","coeur":"C'est un coeur ! Cela devrait vous permettre de vous soigner. Ne me demandez pas comment.","lettre":"C'est une lettre metaphysique !! Elle vous permet de briser le 4eme mur en envoyant l'île dans laquelle vous vous trouvez au créateur du jeu. Si elle est jugée interessante, elle sera intégrée dans le jeu. A vos pinceaux, créateurs de tous poils !!!","tabouret":"Un vieux tabouret moche. En plus il ne ressemble pas à un tabouret mais plutôt à une table basse.","fleur2":"Un vase rempli de fleur !!! Voilà qui ferait plaisir à votre amant.","table0":"Une moitié de table ... Surtout ne croquez pas dedans !","table1":"C'est une demi-table. C'est aussi inutile que déplaisant à voir.","etagere":"Une etagere. Mais qu'est ce qu'il y a dedans ?","coffre1":"Vous obtenez un coffre déjà ouvert. Gné ????????","house0":"Woaw ! Mais c'est une maison ! Posez la avant d'avoir une crampe aux bras.","house1":"Une moitié de maison. Il est difficile d'avoir un meilleur rapport inutilité/encombrement.","house2":"Vous obtenez une moitié de maison. Vous restez sans voix.","house3":"Mais qu'est ce que c'est que cette horreur ???","house4":"Vous obtenez une moitié de maison. Le doute s'insinue en vous : et si tout était lié ?","armure":"Un bouclier et des épées !!! Pas de bol, c'est en plastique...","torche":"Pourquoi avoir mis une torche dans un coffre ? Pourquoi ?","rubisBlanc":"C'est le légendaire rubis blanc. Il vaut 10 000 rubis verts !!! Votre fortune est faite.","stele":"Ils arrivent ...","aiguille":"Vous avez découvert une aiguille magnetisée. C'est un des trois élements de la boussole.","palmier":"Vous obtenez un palmier. Tout est dit.","plate":"Un interrupteur au sol. Je suis presque certain que ça n'a rien à faire dans vos mains.","hookShot":"C'est un grappin, il permet d'aggriper un objet solide afin d'être tracté jusqu'à lui. Assignez le avec ctrl ou i et utilisez le avec maj. Il peut parcourir jusqu'à 5 cases !","statue0":"C'est une statue, elle vous dit quelqu'un mais impossible de savoir qui.","vitre":"Vous avez découvert une vitre de boussole. C'est un des trois éléments nécéssaires à la fabrication de la boussole des éléments. C'est sans doute peu utile une vitre, vu comme ça mais c'est très pratique pour éviter que le cadran soit plein de poussière !","corps":"Vous obtenez le corps de la boussole. Vous voilà rempli d'une joie indiscible ! On dit que le grand Linebeck s'en serait un jour servi !","parachale":"C'est un parachale ! Il permet de planer sur de courtes distances. Assignez le avec ctrl ou i et utilisez le avec maj quand vous êtes en l'air.","baton":"C'est un bâton mojo. Il peut s'enflammer et c'est plutôt badass mais faites vite avant qu'il ne se consumme entierement.","maskWind":"Vous obtenez un masque.","bush0":"Un buisson !!! Voilà voilà. C'est un peu decevant n'est ce pas.","pont":"Un pont ! Error 404 ! Joke not Found ! (#plagiatDiscord lol !)","arbre3":"Un arbre !!! Wow !","flowerRod":"Il s'agit de la baguette de floraison aux effets bizarres autant qu'étranges. Utilisez la avec maj ou espace. Ouvrez votre inventaire avec i.","seeds":"Vous obtenez un sac de bourgeons magiques ! Ces bourgeons se greffent avec succès sur les plantules de la serre. Peut-être ont elles un intérêt ailleurs qui sait ? Utilisez les avec maj ou espace. Ouvrez votre inventaire avec i."};
