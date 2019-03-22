# N-Repeated Element in Size 2N Array

In a array A of size 2N, there are N+1 unique elements, and exactly one of these elements is repeated N times.

Return the element repeated N times.

- 2N개의 A배열에서 N번 반복되는 값을 찾아서 return 하라.
- 배열의 길이가 6(2N)개일 떄, 한개의 값은 3번(N) 반복된다.

Example 1:

  Input: [1,2,3,3]
  Output: 3

Example 2:

  Input: [2,1,2,5,3,2]
  Output: 2


**JavaScript**
    /**
     * @param {number[]} A
     * @return {number}
     */
    // 실행시간에서 제일 큰 비중을 차지하는 for문이 N번 만큼 돌기 때문에.
    // 시간복잡도는 O(n)
    var repeatedNTimes = function(A) {
        let hashTable = [];
        for(let i = 0 ; i < A.length ; i++){
            if(hashTable[A[i]]==undefined)
                hashTable[A[i]]=0;
            else
                return A[i];   
        }

        /*
        // javascript에서 obj를 이용하여서도 풀 수 있음
        // python의 dict라고 생각하면 편함.
        let obj = {};
        for(let i = 0 ; i < A.length ; i++){
            if(!obj.hasOwnProperty(A[i]))
              obj[A[i]]=0;
            else
              return A[i];  
        */
    };

**What I Learned**
- 적절한 자료구조를 선택하는 것만으로 문제 해결에 빠르게 접근할 수 있으며 효율적인 로직이 구현됨.
