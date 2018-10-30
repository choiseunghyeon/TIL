class ArrayList {
  constructor(){
    this.array = [];
  }
  insert(item){
    this.array.push(item);
  }
  toString(){
    return this.array.join();
  }
  swap(index1, index2){
    // swap
    [ this.array[index1], this.array[index2] ] = [ this.array[index2], this.array[index1] ] 
  }
}

class Sort {
  bubbleSort(arrayList){
    let array = arrayList.array;
    let length = array.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length-1-i; j++) {
        if(array[j] > array[j+1])
          arrayList.swap(j,j+1);
      }
    }
    return array;
  }

}

function createRandomNumArray(size){
  let arrayList = new ArrayList();
  for (var i = 0; i < size; i++) {
    let value = Math.floor((Math.random() * 10)+1);
    arrayList.insert(value);
  }
  return arrayList;
}
const sort = new Sort();
let arrayList = createRandomNumArray(5);
console.log(arrayList.toString());
console.log('??');
console.log(sort.bubbleSort(arrayList));
