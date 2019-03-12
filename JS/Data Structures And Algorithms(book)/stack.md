# Stack

**Description**

Making Stack with JavaScript Class and divideBy2 Function

**JS**

      class Stack{
        constructor(arr = []){

          this.items = arr;
        }

        push(element){
          this.items.push(element);
        };

        pop(){
          return this.items.pop();
        };

        peek(){
          return this.items[this.items.length-1];
        };

        isEmpty(){
          return this.items.length == 0;
        };

        size(){
          return this.items.length
        };

        clear(){
          this.items = [];
        };

        print(){
          console.log(this.items.join(' '));
        };
      }

      function divideBy2(decNumber){ // 10진수를 넣으면 2진수로 변형된 String을 return함
        let stack = new Stack(),
            binaryString = '';

        while(decNumber > 0 ){
          stack.push(decNumber%2);
          stack.print();
          decNumber = Math.floor(decNumber/2);
        }
        while(!stack.isEmpty()){
          binaryString += stack.pop();
        }
        return binaryString;
      }

      console.log(divideBy2(11));

**What I Learned**
  - Stack의 이해
  - JS Class 만들기

**ref**
  - Learning JavaScript Data Structures And Algorithms 75p.
