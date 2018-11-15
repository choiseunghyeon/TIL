# Intersection of Two Arrays

**Description**

Given two arrays, write a function to compute their intersection.

- 두 배열에서 공통적인 값을 반환하라

**JavaScript**

      /**
       * @param {number[]} nums1
       * @param {number[]} nums2
       * @return {number[]}
       */
      //시간복잡도 O(n)
      var intersection = function(nums1, nums2) {
          // nums1에서 중복되는 값을 제한 값이 있는 firstSet을 만들어냄
          let firstSet = nums1.reduce( (acc, num) => {
              acc.add(num);
              return acc;
          }, new Set())

          //num2를 돌면서 firstSet과 중복되는 intersectionSet을 만들어냄
          // 결론적으로 intersectionSet은 num1과 num2에서 중복되는 값을 한개씩 가지게 됨
          let intersectionSet = nums2.reduce( (acc, num) => {
              if(firstSet.has(num))
                  acc.add(num)
              return acc
          }, new Set())

          let resultArr = [];
          intersectionSet.forEach( val => resultArr.push(val))
          return resultArr
      };

**What I Learned**
- Set자료구조의 사용법
