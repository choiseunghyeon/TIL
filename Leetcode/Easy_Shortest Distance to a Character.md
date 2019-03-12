# Shortest Distance to a Character

**Description**

Given a string S and a character C, return an array of integers representing the shortest distance from the character C in the string.

- 주어진 문자열 S에서 각 문자들이 주어진 C와의 거리가 얼마나 되는지 구하면 된다.
- S가 'loveleetcode'이고 C가 e일때 S의 첫번쨰 문자열 l과 e의 거리는 3이 된다.

**JavaScript**

      /**
       * @param {string} S
       * @param {character} C
       * @return {number[]}
       */
      var shortestToChar = function(S, C) {

       let indexOfC = S.split('').reduce((a,val,i)=>{ // S에서 C의 index를 구한다.
           if(val==C)
              a.push(i+1)
           return a
       },[]);

       let result = S.split('').reduce((a,val,i)=>{
           let num = i+1;
           let min = Math.min.apply(null,indexOfC.map((val,i)=>{ // S의 각 문자들의 index 값과 C에 해당하는 index의 값을 뺀다. 그리고 그 배열에서 제일 작은 값을 구한다.
               return Math.abs(num-val);
           }))

           a.push(min);
           return a;
       },[]);

       return result
      }
      // 이 예제의 경우 4,6,7,12에 해당하는게 c와 일치하던 S의 index이다(실제로는 3,5,6,11이다 편의상 index+1을 했다.)
      //즉 4,6,7,12들을 해당하지 않는 index와 차를 구해 제일 적은 값이 Shortest Distance가 된다.

**What I Learned**
 - Math.min.apply(null, 배열) 배열안에서 가장 작은 값을 구할려면 apply라는 함수를 써줘야 한다.
 - Math.abs()를 이용하여 절댓값을 구할 수 있다.


**ref**
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/max
