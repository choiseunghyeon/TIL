# Squares of a Sorted Array

**Description**

Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing order.

- in non-decreasing order로 정렬된 정수 배열이 주어질 떄, 각 값들을 제곱하고 in non-decreasing order로 정렬하여 리턴.

Example 1:
  Input: [-4,-1,0,3,10]
  Output: [0,1,9,16,100]

Example 2:
  Input: [-7,-3,2,3,11]
  Output: [4,9,9,49,121]

**JavaScript**

    /**
     * @param {number[]} A
     * @return {number[]}
     */
    var sortedSquares = function(A) {
        A = A.map(val=>val*val);
        A = mergeSort(A);
        return A;
    };

    function mergeSort(arr){
        return mergeDiv(arr);
    }

    function mergeDiv(arr){
        let length = arr.length;
        if(length == 1)
            return arr;
        let mid = Math.floor(length/2);
        let left = arr.slice(0,mid);
        let right = arr.slice(mid,length);

        return merge(mergeDiv(left), mergeDiv(right));
    }

    function merge(left, right){
        let li = 0, ri = 0;
        let leftLastIndex = left.length, rightLastIndex = right.length;
        let mergedArr=[];
        while(li<leftLastIndex && ri<rightLastIndex){
            if(left[li]<right[ri])
                mergedArr.push(left[li++]);
            else
                mergedArr.push(right[ri++]);
        }


        while(li<leftLastIndex)
            mergedArr.push(left[li++])

        while(ri<rightLastIndex)
                mergedArr.push(right[ri++])

        return mergedArr;
    }

    Shortest version
    var sortedSquares = function(A) {
        A = A.map(val=>val*val);
        A.sort( (a, b) => a-b );
        return A;
    };
**What I Learned**
- 예전에 공부하던 merge sort를 직접 구현해보면서 구현능력을 키움
- LeetCode에서 Submit하면 Runtime과 Memory사용량을 알 수 있는데
sort((a,b)=>a-b)함수를 사용하면 Runtime이 더 빠르고 Memory사용량이 더 적은걸 봤을 때 sort함수는 quick sort로 구현되어 있다는 걸 알게됨
- merge sort나 quick sort를 구현하는 것보다 Array가 제공하는 sort함수를 쓰는게 더 간결하고 빠름.
