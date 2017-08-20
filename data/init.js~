function init(){
    Painter.init(70,55,30,10,3);
    
    colorSet = [[[97,97,97],"rgb(65,65,65)",[140,140,140,-30,-30,-30],[0,0,0]],[[42,65,101],"rgb(34,53,82)",[20,70,10,2,5,1],[72,98,178]],[[137,97,97],"rgb(115,65,65)",[200,140,140,-20,-30,-30],[209,82,28]],[[80,80,130],"rgb(40,40,85)",[140,140,200,-30,-30,-20],[0,0,50]],[[170,170,170],"rgb(150,150,150)",[210,210,210,-20,-20,-20],[0,0,15]],[[97,97,97],"rgb(65,65,65)",[140,140,140,-30,-30,-30],[28,134,182]],[[34,70,2],"rgb(19,55,0)",[30,120,20,-5,-20,-2],[20,40,0]],[[0,70,2],"rgb(19,55,0)",[30,120,20,-5,-20,-2],[0,30,30]],[[0,25,30],"rgb(0,20,25)",[4,35,45,0,7,7],[0,5,10]]];
    
    quests = {"chef":0,"jehan":0,"garcon":0,"boussole":0,"boussoleF":0,"dev":0,"sky":0,"pencil":0};
    
    imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
    
    imgArbre = ["pont0","pont1","pont2","barriere0","barriere1","barriere2","palmiton","herbe0","herbe1","bush0","house0","house1","house2","palmier","gear","special","fastTravel","loot","outDoor","inDoor","monsters","fireTemple","sky","sky1","sky2","sky3","rocher","spe","save","delete"];
    
    nSpeImg = 10;
    
    editObject = [[["bokoblin",2],["chuchu",17]], [["cochon",0],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]], [["bokoblin",2],["chuchu",17]]];
    
    editArray = {"gear":[],"loot":["rubisVert","rubisBleu","rubisRouge","coeur","fragment","coffre0","coffre1","porte0","cle0","cle1","mastersword","boomerang","hookShot","parachale","baton","boat"],"herbe0":["herbe0","herbe1","palmier","palmiton","bush0","rocher"],"outDoor":["pont0","pont1","pont2","barriere0","barriere1","barriere2","house0","house1","house2","lambda0"],"inDoor":[],"monsters":["bokoblin","chuchu","moblin","feu","scie","ballon"],"fireTemple":[],"sky":["sky","sky1","sky2","sky3","delete"],"special":["tele","mark","coffre2","fastTravel"],"spe":["spe0","spe1","spe2","spe3","spe4","spe5","spe6","spe7","spe8","spe9"]};
    
    boatPosition = [200,100];

    chargImage.coeur = ["coeurVide","coeur1","coeur05"];
    chargImage.debris = ["pot0","pot1","pot2","pot3","pot4","palmier0","palmier1","palmier2","palmier3","palmier4","herbe0","herbe1","herbe2","herbe3","herbe4","fumeeM","fumeeF","feu0","feu1","feu2","feu3","flamme0","flamme1","hook","chaineA","excla","hitB","rond","eclabousse","rondB","eclabousseB","sword0","sword1","sword2","sword3","pale0","bla","fumeeP"];
    chargImage.interface = ["blank","mastersword","boomerang","hookShot","pencil","boat","pot","lettre","GPS","aiguille","vitre","corps","parachale","baton","batonF","maskWind","flowerRod","seeds"];
    chargImage.rubis = ["rubisVert","rubisBleu","rubisRouge","rubisBlanc","fragment","coeur","bourgeon"];
    chargImage.PNJ = ["lambda0","jehan","chef","fleurFan","lambda1","forgeron","pretresse","sage","aide","garcon","nadel","pancarte","lambda2","dev","windTribe1","windTribe2","merchant","goron","oldGoron","goronMineCart"];
    chargImage.truc = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","pot0","pot1","pot2","pot3","baton0","baton1","baton2","baton3","batonF0","batonF1","batonF2","batonF3"];
}

function drawObj(x,y,f,e){
    if (objNiveau[y][x][0] == "coffre3") objetMort = 1;
    else if (objNiveau[y][x][0] == "main0"){
        if (edition == 0 && figer == 0){
            objNiveau[y][x][1] -=1;
            if (objNiveau[y][x][1] == 0){
                objNiveau[y][x][0] = "main1";
                boomerang.push({"x":x,"y":y,"vx":0,"vy":0,"sx":x,"sy":x,"r":0,"alti":niveau[y][x],"sens":objNiveau[y][x][2],"endu":10,"content":[]});
            }
        }
    }
    if (objNiveau[y][x][0] == "pont0" || objNiveau[y][x][0] == "pont1" || objNiveau[y][x][0] == "pont2" || objNiveau[y][x][0] == "herbe1" || objNiveau[y][x][0] == "herbe0" || objNiveau[y][x][0] == "rocher") Painter.img( ctx, x+0.1, y + 0.5, f, imgElement[objNiveau[y][x][0]] );
    //else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
    //else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
    // else if (objNiveau[y][x][0] == "pont") Painter.img( ctx, x+0.1,y + 0.5,f + objNiveau[y][x][1],imgElement[objNiveau[y][x][0]]);
    else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
}

function taille(caseT){
    var tailles = {"palmier":9.2,"pont0":1,"pont1":1,"pont2":1,"barriere0":2.4,"barriere1":2.4,"barriere2":2.4,"palmiton":2,"rocher":0.3,"wallI":12,"house0":4.2,"spe0":[0,0,0,0,0,0,3,0,2.5][out],"spe1":[0,0,0,0,0,0,0.5,0,2.2][out],"spe2":[0,0,0,0,0,0,1.01,0,2.3][out],"spe3":[0,0,0,0,0,0,1.01,0,2.3][out],"spe4":[0,0,0,0,0,0,1.01][out],"spe5":[0,0,0,0,0,0,0][out],"spe6":[0,0,0,0,0,0,0][out],"spe7":[0,0,0,0,0,0,0][out],"spe8":[0.5,0,0,0,0,0,0][out],"spe9":[0,0,0,0,0,0,0][out]};
    if (tailles[caseT] == undefined) return 0;
    else return tailles[caseT];
}
