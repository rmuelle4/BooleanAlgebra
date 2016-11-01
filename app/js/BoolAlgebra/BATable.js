/**
 * Created by Sergej on 12.10.2016.
 */
var BATable = function(rootNode){
    var $this = this;
    this.letters = [];
    this.groups = BAGroup.groups;

    this.bits = [];

    this.isLoading = false;

    /**@TODO auf neusten Stand umbauen */

    var searchLetter = function(node){
        if (!node || node.value == "") return false;
        if (node.isClips()) {
            searchLetter(node.clipInfo.rootNode);
        }
        else if (node.isGroup() && !(node.child1 || node.child2)){
            searchLetter(node.group.expression.rootNode);
        }
        else if (!node.isLeaf()) {
            searchLetter(node.child1);
            searchLetter(node.child2);
        } else {
            if ($this.letters.indexOf(node.value) < 0) {
                $this.letters.push(node.value);
            }

        }
    };

    this.build = function(){
        this.isLoading = true;
        this.letters.clear();
        searchLetter(rootNode);
        this.isLoading = false;
    };
    this.build();

    this.updateView = function(){
        this.isLoading = true;
        this.bits.clear();

        var lettersCount = this.letters.length;
        var max = Math.pow(2, lettersCount);

        for (var l = 0; l < max; l++) {
            var bitLine = { letters: [], groups: [], clips: [] };

            var lTemp = l;
            var valueObject = {};
            for (var i = lettersCount - 1; i >= 0; i--) {
                var letter = this.letters[lettersCount - 1 - i];
                var v = 0;
                var vTemp = Math.pow(2,i);

                if (lTemp >= vTemp) {
                    lTemp -= vTemp;
                    v = 1;
                }
                bitLine.letters.push({value: v});
                valueObject[letter] = v;
            }

            bitLine.param = valueObject;
            bitLine.result = {};

            this.bits.push(bitLine);
        }
        this.isLoading = false;
    };
};