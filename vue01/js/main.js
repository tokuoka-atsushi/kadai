"use strict";

document.addEventListener("DOMContentLoaded", getItemList)

function getItemList() {
    var app = new Vue({
        el: '#ItemList',
        data: {
            items: [],
        },
        created: function() {
            axios.get('../../common/js/data.json').then(function(response) {
                this.items = response.data
            }.bind(this));
        },
    });
}
