
Vue.component('item-list', {
    data: function() {
        return {
            items: [],
            test: "test"
        }
    },
    created: function() {
        axios.get('../../common/js/data.json').then(function(response) {
            this.items = response.data
            console.log(this.items);
        }.bind(this));
    },
    template: `
        <div>
            <ul class="Items">
                <li v-for="item in this.items" :key="item.num" class="Items__item">
                    <img src="http://placehold.jp/24/cc9999/993333/482x289.png" class="Items__img">
                    <div class="Items__textarea">
                        <p class="Items__title">{{ item.title }}</p>
                        <p class="Items__subtext">{{ item.familyName }}</p>
                    </div>
                </li>
            </ul>
        </div>
    `
})

const app = new Vue({
    el: '#app',
});