var vm = new Vue({
    el: '.todos',
    data: {
        message: '',
        numberId: 0,
        arrays: [],
        button: '1',
        counter: 0,
        counterCheckbox: 0,
        activeCheckbox: false
    },
    mounted() {
        if (localStorage.getItem('arrays')){
            try {
                this.arrays = JSON.parse(localStorage.getItem('arrays'));
            } catch(e) {
                localStorage.removeItem('arrays');
            }
        }
        if (localStorage.numberId) {
            this.numberId = localStorage.numberId;
        }
        if (localStorage.button) {
            this.button = localStorage.button;
        }
        
    },
    
    
    methods: {        
        saveMessage: function(){            
            if (this.message.replace(/^\s+|\s+$/g,'')) {
                this.arrays.push({id: this.numberId++ , name: this.message, checkbox: false});
                this.message = '';
                this.saveArrays();
                this.persistNumberId();
            }
        },
        deleteTrue: function (list) {
            var deleteList = list;
            for (var i = 0; i < deleteList.length; i++) {
                if (deleteList[i].checkbox == true) {
                    deleteList.splice(i, 1);
                    this.saveArrays();
                    i--;
                }
            }
            return deleteList;
        },
        saveArrays() {
            const parsed = JSON.stringify(this.arrays);
            localStorage.setItem('arrays', parsed);
        },
        persistNumberId() {
            localStorage.numberId = this.numberId;                        
        }, 
        persistNumberButton(){
            localStorage.button = this.button;
        },    
        buttonAll: function(){
            this.button = 1;
            this.persistNumberButton();
        },
        buttonActive: function(){
            this.button = 2;
            this.persistNumberButton();
        },
        buttonCompleted: function(){
            this.button = 3;
            this.persistNumberButton();
        },
        counterArray: function (counter) {
            var arrayCounter = counter;
                for (var i = 0; i < this.arrays.length; i++) {
                    if (this.arrays[i].checkbox == false) {
                        arrayCounter++;
                    } 
                }
            return arrayCounter;
        },
        showMessage: function(array){
            var list = [];
                for (var i = 0; i < array.length; i++) {
                    if (this.button == 2){
                       if (array[i].checkbox == false) {
                           list.push(array[i]); 
                           this.saveArrays();
                            }
                    } else if (this.button == 3){
                        if (array[i].checkbox == true) {
                            list.push(array[i]);                            
                            this.saveArrays();
                            }
                        } else if (this.button == 1){
                            list.push(array[i]); 
                            this.saveArrays();
                        }
                }
            return list;
        },
        deleteArraysId: function(id){
            for(var i = 0; i < this.arrays.length; i++)
                if(id == this.arrays[i].id){
                  this.arrays.splice(i , 1)
                this.saveArrays();
                }
        },
        counterCheckboxTrue: function(counter){ 
            var checkboxFalse = counter;
                 for (var i = 0; i < this.arrays.length; i++) {
                    if(this.arrays[i].checkbox == true){
                         checkboxFalse++;
                    }
                }
            return checkboxFalse;
        },
        checkboxArraysTrue: function(){             
            if (this.arrays.length == this.counterCheckboxTrue(this.counterCheckbox)){                
                for (var i = 0; i < this.arrays.length; i++) {
                    this.arrays[i].checkbox = false;
                    this.saveArrays();
                }
            } else {                
                for (var j = 0; j < this.arrays.length; j++) {
                    this.arrays[j].checkbox = true;
                    this.saveArrays();
                }
            }
            
        },
        
    },

})
