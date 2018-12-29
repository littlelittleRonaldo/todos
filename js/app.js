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
        isSelected:'all'
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