var firstTime = true;

window.alert = function(msg,n) {
    var elem = document.getElementById("alert");
    elem.textContent = msg;
    elem.className = 'show';
};

window.disalert = function(n) {
    var elem = document.getElementById("alert");
    elem.className = ' ';
};

