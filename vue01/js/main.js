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
                list: [],
                limit: 10,
            },
            matchHomes: {
                title: 'パナソニック ホームズの住まい',
                subTitle: 'Panasonic Homes HOUSE',
                list: [],
                limit: 10,
            },
            matchRc: {
                title: 'RC・鉄骨造',
                subTitle: 'RC・STEEL FRAME',
                list: [],
                limit: 10,
            },
        },
        computed: {
            itemLength: function() {
                return this.items.length;
            },
            matchMokuzou_limited: function() {
                const target = this.matchMokuzou
                return target.list.slice(0, target.limit)
            },
            matchHomes_limited: function() {
                const target = this.matchHomes
                return target.list.slice(0, target.limit)
            },
            matchRc_limited: function() {
                const target = this.matchRc
                return target.list.slice(0, target.limit)
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
        methods: {
            viewMore: function(el) {
                const target = el
                target.limit = target.list.length
            }
        }
    });
}
