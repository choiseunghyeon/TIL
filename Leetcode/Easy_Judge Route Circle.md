# Judge Route Circle

Initially, there is a Robot at position (0, 0). Given a sequence of its moves, judge if this robot makes a circle, which means it moves back to the original place.

The move sequence is represented by a string. And each move is represent by a character. The valid robot moves are R (Right), L (Left), U (Up) and D (down). The output should be true or false representing whether the robot makes a circle.

- 로봇이 moves에서 오는 명령에 의해 움직인다.
- moves 명령 이후에 로봇이 제자리에 있다면 true 즉 U와 D의 숫자가 같고 R와 L의 숫자가 같으면 된다.


**JavaScript**

    /**
     * @param {string} moves
     * @return {boolean}
     */
    var judgeCircle = function(moves) {
        let moveCount = moves.split('').reduce((a,val)=>{a[val] = a[val]+1; return a;},{R:0,L:0,U:0,D:0});
        return moveCount.R == moveCount.L && moveCount.U == moveCount.D ? true : false;  
    };

**What I Learned**
- reduce() 배열함수에 관한 사용법
  - reduce내부 콜백함수의 매개변수 첫번째는 accumulator  두번째는 currentValue 세번째는 currentIndex 네번째는 Index가 들어간다.
  - 콜백함수 다음으로 initialValue의 값을 줄 수 있음 이렇게 될경우 index 0부터 실행
  - 콜백함수에서 return 값이 accumulator의 값이 됨
- JavaScript에는 python의 count와 같은 배열안의 조건에 맞는 값의 갯수를 구하는 함수가 없다.(외부 라이브러리에는 있음)

**ref**
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
