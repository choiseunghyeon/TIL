# Binary Tree Inorder Traversal

**Description**

Given a binary tree, return the inorder traversal of its nodes' values.

- 주어진 binary tree를 중위 순회하여 결과값을 리턴하라.

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
       * @return {number[]}
       */
      // 재귀 함수 호출전 필요한 작업을 하는 함수
      var inorderTraversal = function(root) {
          let arr = [];
          inOrderTreeNode(root, arr);
          return arr;

      };

      function inOrderTreeNode(node, arr){
          // base case를 정하여 재귀함수가 무한히 수행되지 않도록 조건을 검
          if(node !== null){
              // 왼쪽부터 수행하고 그 다음 본인 노드 탐색 이후 오른쪽 노드 방문
              inOrderTreeNode(node.left, arr);
              arr.push(node.val);
              inOrderTreeNode(node.right, arr);
          }
      }

**What I Learned**
- 이론으로 알고 있던 Binary Tree 중위순회 부분을 코드로 구현
