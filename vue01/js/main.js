"use strict";

document.addEventListener("DOMContentLoaded", getItemList)

function getItemList() {
    var app = new Vue({
        el: '#ItemList',
        data: {
            items: [],
            matchMokuzou: {
                title: '木造',
                subTitle: 'WOODEN HOUSE',
                list: []
            },
            matchHomes: {
                title: 'パナソニック ホームズの住まい',
                subTitle: 'Panasonic Homes HOUSE',
                list: []
            },
            matchRc: {
                title: 'RC・鉄骨造',
                subTitle: 'RC・STEEL FRAME',
                list: []
            },
            limit: 10,
        },
        computed: {
            itemLength: function() {
                return this.items.length;
            },
            matchMokuzou_limited: function() {
                return this.matchMokuzou.list.slice(0, this.limit)
            },
            matchHomes_limited: function() {
                return this.matchHomes.list.slice(0, this.limit)
            },
            matchRc_limited: function() {
                return this.matchRc.list.slice(0, this.limit)
            },
        },
        created: function() {
            axios.get('../../common/js/data.json').then(function(response) {
                this.items = response.data
                this.matchMokuzou.list = response.data.filter((item) => {
                    return item.typeText === '木造';
                });
                this.matchHomes.list = response.data.filter((item) => {
                    return item.typeText === 'パナソニック ホームズの住まい';
                });
                this.matchRc.list = response.data.filter((item) => {
                    return item.typeText === 'RC・鉄骨造';
                });
            }.bind(this));
        },
    });
}
