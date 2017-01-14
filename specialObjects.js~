var Liste = function() {
    function Liste( content ) {
        var number = content.length - 1;
        var elements = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
        content.forEach(
            function(e,i){
                elements[i] = e;
            }
        );
        this.elements = elements;
        this.number = number;
    }

    /**
     * @return void
     */
    Liste.prototype.top = function() {
        return this.elements[this.number];        
    };

    /**
     * @return void
     */
    Liste.prototype.pop = function() {
        this.elements[this.number] = -1;
        if (this.number != 0) this.number -= 1;
    };

    /**
     * @return void
     */
    Liste.prototype.add = function(n) {
        if (this.number != 9) this.number += 1;
        this.elements[this.number] = n;
    };

    /**
     * @return void
     */
    Liste.prototype.second = function(n) {
        if (this.number == 0) return -1;
        else return this.elements[this.number-1];
    };

    return Liste;
}();
