function getPrimeNumber(maxNumber){
  let result = [];

  for (let i = 1; i <= maxNumber; i++) {
    let isPrimeNumber = true;
    // i을 반으로 나눈 값 이상으로 비교를 해도 무조건 나머지가 생기므로(자기 자신 제외) 비교 할 필요가 없음
    let halfValue = Math.floor( ( i/2 ) )

    for (let j = 2; j < i; j++) {

      if( i % j == 0 ){
        isPrimeNumber = false;
        break;
      }
      if( halfValue < j)
        break;
    }
    if(isPrimeNumber === true){
      result.push(i);
    }
  }
  return result
}

function getPrimeNumber2(maxNumber){
  let result = [];

  for (let i = 1; i <= maxNumber; i++) {
    let isPrimeNumber = true;

    for (let j = 2; j < i; j++) {

      if( i % j == 0 ){
        isPrimeNumber = false;
        break;
      }
    }
    if(isPrimeNumber === true){
      result.push(i);
    }
  }
  return result
}

function isSame(arr1, arr2){
  return arr1.every((val, index) => {
    return val === arr2[index];
  })
}
const arr1 = getPrimeNumber(10000);
const arr2 = getPrimeNumber2(10000);
console.log(isSame(arr1,arr2));

// 각 함수 10번씩 실행 후 performance.now로 성능 비교한 결과 input은 100000(십만개)
// getPrimeNumber =  [1378, 1353, 1346, 1348, 1356, 1350, 1366, 1352, 1352, 1353]
// getPrimeNumber2 = [2475, 2448, 2446, 2431, 2432, 2432, 2433, 2429, 2441, 2430]
// 개선된 함수가 약 2배 가까이 성능 향상을 이뤄냄
