# Two Sum

**Description**

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

- 주어진 정수들 중에서 두개의 정수를 더해서 특정 target의 값이 나오면 이 두 index를 반환
- 똑같은 element를 두번 사용 불가능
- target이 4이고 nums가 [2,4,6 ...] 일때 nums[0] * 2는 안되지만 nums가 [2,2,4,6 ...]일 때 nums[0] + nums[1]은 가능

**JavaScript**

      /**
       * @param {number[]} nums
       * @param {number} target
       * @return {number[]}
       */
       // 시간복잡도: O(n)
      var twoSum = function(nums, target) {
          let hashTable = [];
          for(let i = 0 ; i < nums.length ; i++){
      		let currentVal = nums[i];
      		let sub = target - currentVal;

              if(hashTable[sub] === undefined)
                  hashTable[currentVal] = i;
              else
                  return [hashTable[sub], i]
          }
      };

**What I Learned**
- hashTable을 알고 있었지만 실제 사용해봄
- 시간복잡도의 단축을 위해 자료구조를 적절히 사용


**ref**
- https://www.youtube.com/watch?v=FHphOv2mmIA
