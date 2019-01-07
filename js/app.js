var key = 'vue_todos';
var localStorage_todos = {
    get(){
        var todosStr = localStorage.getItem(key) || '[]';
        return JSON.parse(todosStr);
    },
    set(list){
        localStorage.setItem(key,JSON.stringify(list))
    }
}

var vm = new Vue ({
    el:'#app',
    data:{
        thing:'',
        list:localStorage_todos.get(),
        updated:[],
        editedDesc:'',
        isSelected:'all',
        isEn: true
    },
    computed:{
        allDone: {
            get:function(){
                var flag = true;
                this.list.forEach(item => {
                    if(!item.isCompleted) {
                        flag = false
                    }
                });
                return flag;
            },
            set:function(newVal){
                this.list.forEach(item => {
                    item.isCompleted = newVal;
                });
            }
        },
        restTodo(){
            var arr = this.list.filter(item => {
                return !item.isCompleted
            });
            return arr.length;
        },
        newList(){
            if (this.isSelected == 'all') {
                return this.list;
            }else if (this.isSelected == 'active') {
                return this.list.filter(item => {
                    return !item.isCompleted;
                })
            }else {
                return this.list.filter(item => {
                    return item.isCompleted;
                })
            }
        },
        content(){
            if (this.isEn) {
                return {
                    title: 'todos',
                    word_1: 'What needs to be done?',
                    word_2: 'item left',
                    word_3: 'All',
                    word_4: 'Active',
                    word_5: 'Completed',
                    word_6: 'Clear completed',
                    word_7: 'Double-click to edit a todo',
                    word_8: 'Template by ',
                    word_9: 'Sindre Sorhus',
                    word_10: 'Created by ',
                    word_11: 'shark',
                    word_12: 'Part of ',
                    word_13: 'TodoMVC',
                    word_14: '如果你只认得我,点我!'
                }
            }else {
                return {
                    title: '土豆丝',
                    word_1: '还有么四要奏滴?',
                    word_2: '过还冒奏',
                    word_3: '全部',
                    word_4: '要奏冒奏滴',
                    word_5: '奏完了滴',
                    word_6: '去掉奏完滴',
                    word_7: '双击666,不是,是双击编辑',
                    word_8: '模板来自 ',
                    word_9: '辛德罗 索罗斯',
                    word_10: '作者是 ',
                    word_11: '西崖客',
                    word_12: '来自 ',
                    word_13: 'TodoMVC',
                    word_14: 'If you only recognize me, click on me!'
                }
            }
        }
    },
    methods:{
        add(){
            var newTodo = {
                id:+ new Date(),
                desc:this.thing,
                isCompleted:false,
                isEdit:false
            }
            if (this.thing.trim()) {
                this.list.push(newTodo);
                this.thing = '';
            }
        },
        des(i){
            this.list.splice(i,1);
        },
        edit(item){
            this.editedDesc = item.desc;
            item.isEdit=true;
        },
        cancel(item){
            item.desc = this.editedDesc;
            item.isEdit=false;
        },
        clearCompleted(){
            return this.list = this.list.filter(item => {
                return !item.isCompleted
            })
        },
        filterList(val){
            this.isSelected = val;
        },
        toggleLang(){
            this.isEn = !this.isEn;
        }
    },
    directives:{
        'focus':{
            update:function(el,binding){
                if (binding.value) {
                    el.focus();
                }
            }
        }
    },
    watch:{
        list:{
            handler(newVal) {
                localStorage_todos.set(newVal);
            },
            deep:true
        }
    }
})