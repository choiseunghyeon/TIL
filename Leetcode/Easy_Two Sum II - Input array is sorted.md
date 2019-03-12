# Two Sum II - Input array is sorted

**Description**

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.

Note:

Your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.

- 오름차순으로 정렬된 정수 배열이 있다.
- 값 두개를 더하여 target과 일치하는 두 값의 index들을 반환하면 되는데 작은 index의 값이 index1에 있으면 된다.
- 동일한 값을 두개 사용할 수 없으며 해결되는 값이 정확히 한개 있다.

**JavaScript**
      /**
       * @param {number[]} numbers
       * @param {number} target
       * @return {number[]}
       */
       시간 복잡도 O(n)
      var twoSum = function(numbers, target) {
          let hashTable = [];

          for(let i = 0 ; i< numbers.length ; i++){
              let val = numbers[i];
              let sub = target - val;
              let findedIndex = hashTable[sub]
              // hashTable에 해당 값이 존재하면 return
              if(findedIndex !== undefined)
                  return findedIndex < i ? [findedIndex+1, i+1] : [i+1, findedIndex+1];
              // 그렇지 않으면 찾는 값이 hashTable에 없기 때문에 현재 값을 저장하고 다음을 진행
              else
                  hashTable[val] = i;        

          }
          return -1;
      };


**What I Learned**
- hashTable을 다시 사용해봄
