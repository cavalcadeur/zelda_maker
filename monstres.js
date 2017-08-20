function monstreType(type,x,y){
    var listeBidon = {"bokoblin":{x:x,y:y,pv:2,img:"bokoblin",sens:2,z:5,g:0,v:0.02,n:50,ia:"evo",stop:0,stun:0,att:0.5,vue:4,iaS:"lurk"},
                      "feu":{x:x,y:y,pv:2,img:"feu",sens:2,z:5,g:0,v:0.05,n:20,ia:"mur",stop:0,stun:0,att:1},
                      "chuchu":{x:x,y:y,pv:1,img:"chuchu",sens:2,z:5,g:0,v:0.01,n:100,ia:"chercheur",stop:0,stun:0,att:0.5},
                      "scie":{x:x,y:y,endu:0,pv:1,img:"scie",sens:2,z:5,g:0,v:0.2,n:5,ia:"wait",stop:0,stun:0,att:0.5},
                      "ballon":{x:x,y:y,pv:1,img:"ballon",sens:2,z:5,g:0,v:0.025,n:40,nn:0,ia:"ball",stop:0,stun:0,att:-1},
                      "moblin":{x:x,y:y,pv:5,img:"moblin",sens:2,z:5,g:0,v:0.01,n:100,nn:0,ia:"evo",stop:0,stun:0,att:1,vue:3,iaS:"lurk"},
                      "main":{x:x,y:y,pv:3,img:"main",sens:2,z:5,g:0,v:0.1,n:10,nn:0,ia:"evo",stop:0,stun:0,att:1,goto:"tEau1",out:3,xx:8,yy:8,vue:5,iaS:"lurk"}};
    return listeBidon[type];
}
