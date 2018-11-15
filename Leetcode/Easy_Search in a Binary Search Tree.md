# Search in a Binary Search Tree

**Description**

Given the root node of a binary search tree (BST) and a value. You need to find the node in the BST that the node's value equals the given value. Return the subtree rooted with that node. If such node doesn't exist, you should return NULL.

- BST와 value가 주어지면, BST안에서 value를 가진 node를 찾아 return하라 찾지 못하였다면 null을 return하라.

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
       * @param {number} val
       * @return {TreeNode}
       */
      var searchBST = function(root, val) {
          let node = root;
          while (node !== null){
              if(val < node.val)
                  node = node.left;
              else if( val > node.val)
                  node = node.right;
              else{
                  return node;
              }
          }
          return null;
      };

**What I Learned**
- BST에서 특정 값을 찾는 방법 터득
