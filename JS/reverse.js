function reverse(arr){
  let length = arr.length;
  let lastIndex = length-1;
  // 중간 값을 기준으로 양 끝에 있는 값들을 순차적으로 swap 하면 완성
  // 2로 나눈 몫의 값 까지만 실행하면 양끝 값을 바꿀 수 있음
  // 2로 나누어 떨이지지 않는 값의 경우(5,7 등) 중간 값은 변경되지 않아도 되기 때문에 floor로 소수점 아래의 값을 버림
  let halfLength = Math.floor(length / 2);

  for (var i = 0; i < halfLength; i++)
    [ arr[i], arr[lastIndex-i] ] = [ arr[lastIndex-i], arr[i] ]

  return arr;
}

let array = [1,2,3,4,5,6,7];
console.log(reverse(array));
