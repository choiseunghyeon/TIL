# Sort Array By parity

**Description**

Given an array A of non-negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.

You may return any answer array that satisfies this condition.

- 양의 정수가 있는 A라는 배열에서 짝수 뒤에 홀수 요소들이 구성되어 있는 A를 반환하라
- [3,1,2,4]일 경우 [2,4,3,1] or [4,2,1,3] 짝수 요소들끼리의 정렬 또는 홀수 요소들끼리의 정렬은 상관 없음 짝수 요소 뒤에 홀수 요소가 오기만 하면 끝

**JavaScript**

      /**
       * @param {number[]} A
       * @return {number[]}
       */
      // 시간 복잡도 O(n)
      var sortArrayByParity = function(A) {
          // A의 끝값을 알고 있기 때문에 정렬되는 result의 length 또한 같음
          즉 odd의 경우 맨 뒤에서 부터 넣어주고 even의 경우 처음부터 넣어주면 됨
          let odd = A.length - 1;
          let even = 0;
          let result = [];
          A.forEach( val => {
              if(val % 2 === 0)
                  result[even++] = val;
              else
                  result[odd--] = val;
          })

          return result;
      };

**What I Learned**
- even배열 odd배열로 각각 넣고 합치는 것이 아닌 하나의 배열에 넣을 수 있는 생각의 전환!
