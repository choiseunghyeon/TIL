# Self Dividing Numbers

**Description**

A self-dividing number is a number that is divisible by every digit it contains.

For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0, and 128 % 8 == 0.

Also, a self-dividing number is not allowed to contain the digit zero.

Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.

- 숫자를 각각 나눠 각각 나눠진 그 수가 0으로 나누어 떨어지면 Self Dividing Number가 된다.
- 128을 각각 나누면 1, 2, 8이 되고 그 각 수가 128로 나누어 0이 되면 된다. 128 % 1 == 0, 128 % 2 ==0, 128 % 8 == 0이 되면 Self Dividing Number가 된다.

**JavaScript**

      /**
       * @param {number} left
       * @param {number} right
       * @return {number[]}
       */
      var selfDividingNumbers = function(left, right) {
          let result=[]
          for(; left <= right ; left++ ){
              let verdict = left.toString().split('').every((val)=> left % parseInt(val) == 0)
              if(verdict == true)
                  result.push(left);
          }
          return result
      };

**What I Learned**
- every() 함수는 배열을 돌면서 하나라도 조건에 맞지 않으면 false를 뱉어낸다. 즉 모든 배열이 조건에 부합해야 true가 된다.


**ref**
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every
