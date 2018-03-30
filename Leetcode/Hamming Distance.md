# Hamming Distance

**Description**

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, calculate the Hamming distance.

- 두 숫자를 2진수로 표현했을 때 같은 위치에서 서로 다른 값을 찾아내면 된다.
- 0100(4) 0001(1)의 Hamming Distance는 2이다.

**JavaScript**

    /**
    * @param {number} x
    * @param {number} y
    * @return {number}
    */
    var hammingDistance = function(x, y) {
      return (x^y).toString(2).split('').filter(num=>num=='1').length
    };
    //x와 y를 비트단위 베타적 논리합으로 구하면 서로다른 값을 1로 표시한다.
    // ex(0100^0001)은 0101이 된다.
    //즉 베타적 논리합에 구해서 나온 비트의 1의 갯수는 Hamming Distance가 된다.

**What I Learned**
- toString()함수를 통해 2진수 8진수 10진수로 변형이 가능하다 매개변수로 원하는 진수의 숫자를 넣어주면 된다.


**ref**
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8%EB%8B%A8%EC%9C%84_%EC%97%B0%EC%82%B0%EC%9E%90

- https://ko.wikipedia.org/wiki/%ED%95%B4%EB%B0%8D_%EA%B1%B0%EB%A6%AC
