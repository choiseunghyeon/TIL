# To Lower Case

**Description**

Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.

- 소문자의 string을 return 하라.
- For instance, Hello -> hello, HI -> hi

**JavaScript**

      /**
       * @param {string} str
       * @return {string}
       */
      // return str.toLowerCase() 하면 되지만 built-in 함수 말고 직접 구현해보자!
      // 시간복잡도 O(n)
      var toLowerCase = function(str) {
          let strArr = str.split('');
          for(let i = 0 ; i< strArr.length ; i++){
              let ascii = str.charCodeAt(i);
              // ascii값으로 65는 A 90은 Z 대문자 이면 if 성립
              if( ascii >= 65 && ascii <=90 )
                  // 32는 대문자 A(65)와 소문자 (97)의 차이
                  strArr[i] = String.fromCharCode(ascii+32)
          }

          return strArr.join('');
      };


**What I Learned**
- ascii 코드표를 다시 봄으로써 65~90이 대문자 라는 사실과 +32를 통해 소문자로 바꿀 수 있다는 점을 확인
- String.fromCharCode() 함수를 통해 ascii 코드를 char로 바꾸 작업 경험 
