# Range Sum of BST

**Description**
Given the root node of a binary search tree, return the sum of values of all nodes with value between L and R (inclusive).

The binary search tree is guaranteed to have unique values.

- 주어진 Binary Search Tree에서 L과 R 사이의 수를 더하여 리턴하라(L과 R포함)
- BST는 고유한 값들만을 가진다.

**JavaScript**

      /**
       * Definition for a binary tree node.
       * function TreeNode(val) {
       *     this.val = val;
       *     this.left = this.right = null;
       * }
       */
      /**
       * @param {TreeNode} root
       * @param {number} L
       * @param {number} R
       * @return {number}
       */
      var rangeSumBST = function(root, L, R) {
          let sum = 0;

          function treeTraversal(node){
            // 재귀 함수의 base case
              if(node !== null){

                  // 현재 노드의 val가 L보다 크거나 같고 R보다 작거나 같으면 더하기
                  if(node.val >= L && node.val <= R)
                      sum += node.val
                  R을 가진 node 기준 R보다 큰 val를 가진 오른쪽 노드는 찾을 필요가 없기 때문에 left로 진행
                  if(node.val === R)
                      treeTraversal(node.left);
                  L을 가진 node 기준 L보다 작은 왼쪽 노드는 찾을 필요가 없으므로 right로 진행
                  else if(node.val === L)
                      treeTraversal(node.right);
                  아무것도 아닌경우 양방향 진행
                  else{
                      treeTraversal(node.left);
                      treeTraversal(node.right);
                  }

              }   
          }

         treeTraversal(root)

          return sum;
      };

**What I Learned**
- BST를 순회하면서 재귀함수를 사용해봄
- BST에 대한 이해도 
