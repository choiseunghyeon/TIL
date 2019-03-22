# Majority Element

Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element always exist in the array.

- 주어진 배열에서 과반수를 차지하는 element를 return하라
- 과반수 element가 배열안에 존재하며 배열은 비어있지 않음.

Example 1:
  Input: [3,2,3]
  Output: 3

Example 2:
  Input: [2,2,1,1,1,2,2]
  Output: 2


**JavaScript**

    /**
    * @param {number[]} nums
    * @return {number}
    */
    // 시간복잡도 O(n)
    var majorityElement = function(nums) {
      let hashTable = [], majorityLength = Math.floor(nums.length/2);

      for(let i = 0 ; i < nums.length ; i++){
          let num = nums[i];
          // 처음 hashTable에 넣으면 1로 초기화 그렇지 않다면 이미 있는 값 +1
          hashTable[num] = hashTable[num] === undefined ? 1 : hashTable[num]+1;

          // 만약 현재 추가한 num의 갯수가 현재 배열의 과반수를 차지한다면 현재 num을 return
          if(hashTable[num] > majorityLength)
             return num;
      }

    };

**What I Learned**
- 적절한 자료구조를 선택하는 것만으로 문제 해결에 빠르게 접근할 수 있으며 효율적인 로직이 구현됨.
