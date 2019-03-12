# Queue

**Description**

Making Queue with JavaScript Class

**JS**

      class Queue{
        constructor(arr = []){
          this.items = arr;
        };

        enqueue(element){
          this.items.push(element);
        };
        dequeue(){
          return this.items.shift();
        };
        front(){
          return this.items[0];
        };
        isEmpty(){
          return 0 == this.items.length;
        };
        size(){
          return this.items.length;
        };
        print(){
          console.dir(this.items);
        };
        clear(){
          this.items = [];
        }
      }


      // max priority queue _ priority 값이 높은게 제일 앞으로.
      class PriorityQueue extends Queue{
        constructor(){
          super();
        }
        enqueue(element,priority){
            let queue = {element: element, priority: priority};
            let added = false;
            if(this.isEmpty())
              this.items.push(queue);
            else{
              for (var i = 0; i < this.items.length; i++) {
                if(priority > this.items[i].priority ){
                  this.items.splice(i,0,queue);
                  added = true;
                  break;
                }
              }
              if(!added)
                this.items.push(queue);
            }
        }
      }


      function hotPotato(nameList, num){ // 환형큐의 대표적 예
        let queue = new Queue();
        for (var i = 0; i < nameList.length; i++) {
          queue.enqueue(nameList[i]);
        }

        let eliminated = '';
        while(queue.size() > 1){
          for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
          }
          eliminated = queue.dequeue();
          console.log(eliminated+'을(를) 뜨거운 감자 게임에서 퇴장시킵니다.');
        }
        return queue.dequeue();
      }

      let names = ['최','김','이'];
      let winner = hotPotato(names,11);
      console.log('승자는 '+winner+'입니다.');

**What I Learned**
  - Queue의 이해, PriorityQueue
  - JS Class 상속

**ref**
 - Learning JavaScript Data Structures And Algorithms 85p.
