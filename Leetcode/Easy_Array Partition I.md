# Array Partition I

**Description**

Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.

- 오름차순의 숫자들을 제일 낮은 수끼리 짝을짓고 짝 지어진 곳에서 제일 작은 값들의 합을 구하면 된다.
- [1,2,3,4,5,5]가 있을때 (1,2), (3,4), (5,5)가 짝이 된다. 여기서 각 짝에서 제일 작은 값 1, 3, 5를 더하면 된다.

**JavaScript**

    /**
     * @param {number[]} nums
     * @return {number}
     */
    var arrayPairSum = function(nums) {
        return nums.sort((a,b)=>a-b).reduce((a,val,i)=>{return i%2==0 ? a+val : a;}, 0);
        // sort함수는 배열 자체를 변경한다.
        // sort함수 내부에 원하는 작동을 하는 function을 넣어줄 수 있다. (a,b)=>a-b의 경우 ascending order(오름차순)
        //(a,b)=>b-a의 경우 descending order(내림차순)이 된다.
        //정렬된 배열에서의 i%2가 0인 값들은(0,2,4,...) 짝으로 지어졌을때 최소 값이 된다.
    };

**What I Learned**
- sort()함수를 그냥 돌릴경우 [1,5,10,20]의 경우 [1,10,20,5]가 된다 즉 맨 앞의 값을 기준으로 삼는다 따라서 callback함수를 넘겨주어 우리가 원하는 sort를 해주어야 한다.
- sort함수에 (a,b)=>a-b콜백 함수를 넘겨주면 ascending order(오름차순)이 된다.


**ref**
- https://www.w3schools.com/jsref/jsref_sort.asp
