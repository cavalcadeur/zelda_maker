var firstTime = true;

window.alert = function(msg,n) {
    var elem = document.getElementById("alert");
    elem.textContent = msg;
    elem.className = 'show';
    if (firstTime) {
        elem.addEventListener('click', function() {
            elem.className = '';
			if (n != -1) first[n] += 1;
        });
    }
};

window.disalert = function(n) {
    var elem = document.getElementById("alert");
    elem.className = ' ';
};

