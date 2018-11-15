# Sort Array By Parity II

**Description**

Given an array A of non-negative integers, half of the integers in A are odd, and half of the integers are even.

Sort the array so that whenever A[i] is odd, i is odd; and whenever A[i] is even, i is even.

You may return any answer array that satisfies this condition.

- 주어진 양의 정수 배열에서 절반은 짝수 절반은 홀수이다.
- 배열의 index가 짝수면 짝수 값이 홀수면 홀수 값이 들어간다
- ex)index가 0,2,4이면 A[0] A[2] A[4]에는 짝수의 값이 1,3,4,이면 A[1] A[3] A[5]에는 홀수의 값이 들어간다.

**JavaScript**
      /**
       * @param {number[]} A
       * @return {number[]}
       */
       // 시간 복잡도 O(n)
      var sortArrayByParityII = function(A) {
          let result = [];
          let evenIndex = 0, oddIndex = 1;

          A.forEach( num => {
              let verdict = num % 2

              if( verdict === 0){
                  result[evenIndex] = num;
                  evenIndex += 2;
              } else {
                  result[oddIndex] = num;
                  oddIndex += 2;
              }

          })

          return result;
      };

**What I Learned**
- 문제를 풀기에 앞서 어떤 자료구조와 어떻게 풀어나갈지 생각해보고 그에 따른 시간복잡도를 생각하게 되었다.
