# Jewels and Stones


**Description**

You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".

- J로 넘어온 문자와 일치하는 문자가 S에 몇개가 있으냐 이다.
- 여기서 대소문자는 구별된다 다시말해 a와 A는 다른 문자로 취급받는다.

**JavaScript**

	/**
 	 * @param {string} J
	 * @param {string} S
 	 * @return {number}
	*/
	var numJewelsInStones = function(J, S) {
	   let setj = new Set(J);
 	   return S.split('').filter((v) => setj.has(v)).length
	};



**What I Learned**

- new Set(); 생성자 함수(constructor)에 string을 매개변수로 주면  고유한 문자만을 지정한다. ex) let a = new Set('abcdeee'); => a는 a,b,c,d,e의 문자를 가지고 있다.
- Set이 가지고 있는 function들에 대해 배움 ex) setj.add('a'); setj.has('a');


**ref**

 - https://msdn.microsoft.com/ko-kr/library/dn251547(v=vs.94).aspx
