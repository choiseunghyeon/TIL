# Delete Columns to Make Sorted

**Description**

We are given an array A of N lowercase letter strings, all of the same length.
Now, we may choose any set of deletion indices, and for each string, we delete all the characters in those indices.
For example, if we have an array A = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"], and the remaining columns of A are ["b","v"], ["e","y"], and ["f","z"].  (Formally, the c-th column is [A[0][c], A[1][c], ..., A[A.length-1][c]].)
Suppose we chose a set of deletion indices D such that after deletions, each remaining column in A is in non-decreasing sorted order.
Return the minimum possible value of D.length.

- 길이가 똑같은 string 배열을 입력값으로 줌.
- 각 배열에 있는 n번째 숫자들이 오름차순으로 알파벳 정렬이 되어 있으면 삭제하지 않아도 됨
- ["cba","daf","ghi"]배열에서 index 0번째인 c,d,g는 순서대로 오름차순이기 때문에 삭제하지 않아도 됨 하지만 index 1번째는 b,a,g인데 오름차순이 아니라 삭제 카운트에 추가

**JavaScript**

    /**
    * @param {string[]} A
    * @return {number}
    */
    var minDeletionSize = function(A) {
    let output=0;
    let valLength = A[0].length;
    for( let i = 0 ; i < valLength ; i++){
        for(let k = 0 ; k < A.length-1 ; k++){
            let currentChar = A[k][i].charCodeAt();
            let nextChar = A[k+1][i].charCodeAt();
            if(currentChar > nextChar){
                output+=1;
                break;
            }

        }
    }
    return output;
    };

**What I Learned**
- charCodeAt()을 통해 알파벳을 ascii값으로 변환하여 비교
