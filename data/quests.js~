function init(){
    Painter.init(50,35,30,10,2);

    colorSet = [[[97,97,97],"rgb(65,65,65)",[140,140,140,-30,-30,-30],[0,0,0]],[[90,88,96],"rgb(72,71,77)",[20,70,10,7,22,5],[72,98,178]],[[137,97,97],"rgb(115,65,65)",[200,140,140,-20,-30,-30],[209,82,28]],[[80,80,130],"rgb(40,40,85)",[140,140,200,-30,-30,-20],[0,0,50]],[[170,170,170],"rgb(150,150,150)",[210,210,210,-20,-20,-20],[0,0,15]],[[97,97,97],"rgb(65,65,65)",[140,140,140,-30,-30,-30],[28,134,182]],[[34,70,2],"rgb(19,55,0)",[30,120,20,-5,-20,-2],[20,40,0]],[[0,70,2],"rgb(19,55,0)",[30,120,20,-5,-20,-2],[0,30,30]],[[0,25,30],"rgb(0,20,25)",[4,35,45,0,7,7],[0,5,10]]];

    quests = {"chef":0,"jehan":0,"garcon":0,"boussole":0,"boussoleF":0,"dev":0,"sky":0,"pencil":0};

    imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];

    imgArbre = ["arbre0","arbre1","arbre3","bush0","herbe0","herbe1","fleur2","coffre0","coffre1","coffre2","coffre3","porte0","cle0","cle1","bleu0","bleu1","rouge0","rouge1","switch0","switch1","house0","house1","house2","house3","house4","lambda0","table0","table1","etagere","tabouret","armure","tableau","autel","torche","torche1","lit0","lit1","majora","plate","plate1","stele","templeFeu0","templeFeu1","templeFeu2","templeEau0","templeEau1","templeEau2","palmier","gear","special","fastTravel","loot","outDoor","inDoor","monsters","fireTemple","sky","sky1","sky2","sky3","bougie","switch2","switch3","checkPoint","unCheckPoint","wSwitch0","wSwitch1","tele","main0","main1","statue0","miniTempleEau","mark","avaleur1","avaleur2","marque","moulin0","moulin1","arbreG0","arbreG1","arbreG2","arbreG3","arbreG4","arbreG5","arbreG6","arbreG7","arbreG8","arbreG9","canon0","canon1","canon2","eole0","houseSky0","houseSky1","houseSky2","houseSky3","arbreEole0","arbreEole1","arbreEole2","tombe0","portail0","portail1","portail2","fleur3","rocher","pont","foret0","foret1","foret2","foret3","foret4","foret5","sanctuaire","serre0","serre1","serre2","sleepingGoddess","spe","palmier1","save","delete"];

    nSpeImg = 10;

    editObject = [[["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]]];

    editArray = {"gear":["bleu0","rouge0","switch0","wSwitch0","wSwitch1","plate","switch2","checkPoint"],"loot":["rubisVert","rubisBleu","rubisRouge","coeur","fragment","coffre0","coffre1","porte0","cle0","cle1","mastersword","boomerang","hookShot","parachale","baton","boat"],"herbe0":["herbe0","herbe1","arbre0","arbre1","arbre3","palmier","bush0","avaleur1","sleepingGoddess"],"outDoor":["house0","pont","house1","house2","house3","house4","moulin0","moulin1","lambda0"],"inDoor":["pot","fleur2","etagere","armure","tableau","tabouret","table0","table1","lit0","lit1"],"monsters":["bokoblin","chuchu","moblin","feu","scie","ballon"],"fireTemple":["torche","torche1","autel","bougie","main0","main1","statue0","stele","rocher"],"sky":["sky","sky1","sky2","sky3","delete"],"special":["tele","mark","coffre2","fastTravel"],"spe":["spe0","spe1","spe2","spe3","spe4","spe5","spe6","spe7","spe8","spe9"]};

    boatPosition = [200,100];

    chargImage.coeur = ["coeurVide","coeur1","coeur05"];
    chargImage.debris = ["pot0","pot1","pot2","pot3","pot4","palmier0","palmier1","palmier2","palmier3","palmier4","herbe0","herbe1","herbe2","herbe3","herbe4","fumeeM","fumeeF","feu0","feu1","feu2","feu3","flamme0","flamme1","hook","chaineA","excla","hitB","rond","eclabousse","rondB","eclabousseB","sword0","sword1","sword2","sword3","pale0","bla","fumeeP"];
    chargImage.interface = ["blank","mastersword","boomerang","hookShot","pencil","boat","pot","lettre","GPS","aiguille","vitre","corps","parachale","baton","batonF","maskWind","flowerRod","seeds"];
    chargImage.rubis = ["rubisVert","rubisBleu","rubisRouge","rubisBlanc","fragment","coeur","bourgeon"];
    chargImage.PNJ = ["lambda0","jehan","chef","fleurFan","lambda1","forgeron","pretresse","sage","aide","garcon","nadel","pancarte","lambda2","dev","windTribe1","windTribe2","merchant","goron","oldGoron","goronMineCart"];
    chargImage.truc = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","pot0","pot1","pot2","pot3","baton0","baton1","baton2","baton3","batonF0","batonF1","batonF2","batonF3"];
}

function drawObj(x,y,f,e){
    if (niveau[y][x] <= -1){
        if (isFloodable(x,y) == false){
            if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
            else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
            else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
            else if (objNiveau[y][x][0] == "pont") Painter.img( ctx, x+0.1,y + 0.5,f + objNiveau[y][x][1],imgElement[objNiveau[y][x][0]]);
            else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
        }
    }
    else{
        if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
        else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
        else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
        else if (objNiveau[y][x][0] == "pont") Painter.img( ctx, x+0.1,y + 0.5,f + objNiveau[y][x][1],imgElement[objNiveau[y][x][0]]);
        else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
    }
}


function taille(caseT){
    var tailles = {"bleu0":1.1,"coffre0":1.1,"coffre1":0.6,"rouge1":1.1,"arbre0":2,"arbre1":2,"arbreEole1":1.5,"armure":1.6,"autel":1.1,"bougie":1.3,"canon0":0.5,"canon1":1.3,"canon2":0.5,"checkPoint":1.2,"unCheckPoint":1.2,"eole0":1.3,"etagere":1.7,"fleur2":1.1,"fleur3":0.6,"house0":2,"house1":1.8,"house2":1.8,"house3":1.8,"house4":3,"houseSky0":0.5,"houseSky1":2,"houseSky2":0.5,"houseSky3":2,"PNJ":1.5,"lit0":0.8,"lit1":0.8,"main0":1.3,"main1":1.3,"miniTempleEau":2,"moulin0":3,"moulin1":3,"palmier":1.2,"plate":0.2,"plate1":0.1,"portail0":3,"portail2":3,"porte0":1.5,"pot":0.4,"statue0":1.3,"switch0":1,"switch1":1,"switch2":1,"switch3":1,"table0":0.8,"table1":0.8,"tabouret":0.6,"tombe0":1.4,"torche":1.3,"torche2":1.3,"torche1":0.3,"templeEau0":3,"templeEau1":3,"templeEau2":3,"templeFeu0":3,"templeFeu1":3,"templeFeu2":3,"rocher":1.1,"arbre3":6,"sanctuaire":6,"serre0":3,"serre1":3.5,"serre2":3,"wallI":12,"foret0":4.2,"foret1":4.2,"foret2":4.2,"foret3":4.2,"foret4":4.2,"foret5":4.2,wSwitch0:1.1,wSwitch1:1.1,"sleepingGoddess":2,"palmier1":3.2,"spe0":[0,0,0,0,0,0,3,0,2.5][out],"spe1":[0,0,0,0,0,0,0.5,0,2.2][out],"spe2":[0,0,0,0,0,0,1.01,0,2.3][out],"spe3":[0,0,0,0,0,0,1.01,0,2.3][out],"spe4":[0,0,0,0,0,0,1.01][out],"spe5":[0,0,0,0,0,0,0][out],"spe6":[0,0,0,0,0,0,0][out],"spe7":[0,0,0,0,0,0,0][out],"spe8":[0.5,0,0,0,0,0,0][out],"spe9":[0,0,0,0,0,0,0][out]};
    if (tailles[caseT] == undefined) return 0;
    else return tailles[caseT];
}
