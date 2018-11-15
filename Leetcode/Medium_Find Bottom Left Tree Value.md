# Find Bottom Left Tree Value

**Description**

Given a binary tree, find the leftmost value in the last row of the tree.

- 주어진 binary tree에서 제일 깊은 레벨에 있는 node중 작은 값을 찾아 return하라


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
       * @return {number}
       */
      var findBottomLeftValue = function(root) {
          // 각 level별로 node의 값을 저장하기 위해 levelArr 선언
          // levelArr[0]에는 0번쨰 레벨인 root의 값이 levelArr[1]에는 1번째 레벨의 node들의 값이 들어갈 것이다.
          // 즉 맨 마지막 levelArr에 있는 값들이 제일 깊은 곳에 있는 node들의 값이 된다.
          let levelArr = [];
          let level = 0;
          preOrderNode(root, levelArr, level);

          // tree의 선위 순회가 끝나고 levelArr의 마지막(제일 깊은) 배열에서 최솟값을 찾아 return한다.
          let lastIndex = levelArr.length - 1;
          let lastLevel = levelArr[lastIndex];
          let min = lastLevel[0];
          lastLevel.forEach( val => {
              if(val > 0 && val < min)
                  min = val;
          })
          return min
      };
      // 해당 레벨의 node는 levelArr에서 해당 level index에 값을 push
      function preOrderNode(node, levelArr, level){
          // base case설정
          if(node !== null){
              // 해당 level의 값이 초기화 되어 있지 않으면 []로 설정
              if(levelArr[level] === undefined)
                  levelArr[level] = [];
              levelArr[level].push(node.val)
              level++;
              preOrderNode(node.left, levelArr, level);
              preOrderNode(node.right, levelArr, level);
          }
      }


**What I Learned**
- binary Tree에 대한 깊은 이해
- 선위 순회를 통해 해당 문제를 해결하는 방법 
