/* The Computer Language Benchmarks Game
   http://benchmarksgame.alioth.debian.org/
   contributed by Isaac Gouy 
   *reset*
*/

function TreeNode(left,right,item){
   this.left = left;
   this.right = right;
}

TreeNode.prototype.itemCheck = function(){
   if (this.left==null) return 1;
   else return 1 + this.left.itemCheck() + this.right.itemCheck();
}

function bottomUpTree(depth){
   if (depth>0){
      return new TreeNode(
          bottomUpTree(depth-1)
         ,bottomUpTree(depth-1)
      );
   }
   else {
      return new TreeNode(null,null);
   }
}


function CheckTree(depthToCheck)
{
   console.log("min depth is " + depthToCheck);
   var depthToCheck = depth;
   var n = arguments[0];
   var maxDepth = Math.max(depthToCheck + 2, n);
   var stretchDepth = maxDepth + 1;

   var check = bottomUpTree(stretchDepth).itemCheck();
   console.log("stretch tree of depth " + stretchDepth + "\t check: " + check);

   var longLivedTree = bottomUpTree(maxDepth);
   for (var depth=depthToCheck; depth<=maxDepth; depth+=2){
      var iterations = 1 << (maxDepth - depth + depthToCheck);

      check = 0;
      for (var i=1; i<=iterations; i++){
         check += bottomUpTree(depth).itemCheck();
      }
      console.log(iterations + "\t trees of depth " + depth + "\t check: " + check);
   }

   console.log("long lived tree of depth " + maxDepth + "\t check: " 
      + longLivedTree.itemCheck());
}

module.exports = function() {
    this.CheckTree = function(depthToCheck) { console.log(depthToCheck); CheckTree(depthToCheck); }
};


