function monstreType(type,x,y){
    var listeBidon = {"bokoblin":{x:x,y:y,pv:2,img:"bokoblin",sens:2,z:5,g:0,v:0.02,n:0,ia:"random",stop:0,stun:0,att:0.5},"feu":{x:x,y:y,pv:2,img:"feu",sens:2,z:5,g:0,v:0.05,n:0,ia:"mur",stop:0,stun:0,att:1},"chuchu":{x:x,y:y,pv:1,img:"chuchu",sens:2,z:5,g:0,v:0.01,n:0,ia:"chercheur",stop:0,stun:0,att:0.5},"scie":
{x:x,y:y,ox:x,oy:y,pv:1,img:"scie",sens:2,z:5,g:0,v:0,n:0,ia:"wait",stop:0,stun:0,att:0.5}};
    return listeBidon[type];
}
