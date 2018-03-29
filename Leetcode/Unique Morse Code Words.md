# Unique Morse Code Words

**Description**
International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows: "a" maps to ".-", "b" maps to "-...", "c" maps to "-.-.", and so on.

For convenience, the full table for the 26 letters of the English alphabet is given below:

    [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]

Now, given a list of words, each word can be written as a concatenation of the Morse code of each letter. For example, "cab" can be written as "-.-.-....-", (which is the concatenation "-.-." + "-..." + ".-"). We'll call such a concatenation, the transformation of a word.

- 주어진 배열 0번째 부터 a로 시작. 즉 1번째는 b 2번째는 c
- words로 들어오는 문자열들의 각 문자들을 Morse부호로 변형하라
- 유니크한 Morse부호의 갯수를 return하라

**JavaScript**

    /**
    * @param {string[]} words
    * @return {number}
    */
    const morse = [".-","-...","-.-.","-..",".","..-.","--.",
             "....","..",".---","-.-",".-..","--","-.",
             "---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];

    // 소문자로만 이루어진 문자열들
    // a == ascii코드로 97  문자가 a이면 97-97 = 0 즉 morse배열의 순서와 일치
    // 즉 a를 기준으로 들어오는 문자의 아스키코드를 빼면 morse array의 해당 문자 인덱스를 구할 수 있음
    const calcIdx = char => char.charCodeAt() - 'a'.charCodeAt()  

    var uniqueMorseRepresentations = function(words) {


    let transformations = words.map((cv) => {
        let temp = cv.split('').map((v)=>morse[calcIdx(v)])
        return temp.join(''); // array to string
    })

    let sett = new Set(transformations); // string 뿐만 아니라 배열또한 생성자 매개변수에 넣을 수 있음

    return sett.size

    };


**What I Learned**
- new Set(); 생성자 함수(constructor)에 매개변수로 string뿐만 아니라 배열또한 넣을 수 있다.
- array to string함수 join 함수 array.join('')시 공백없이 배열의 변수들을 스트링으로 합침
- charCodeAt함수 문자.charCodeAt()을 통해 ascii코드 값을 알 수 있음 
