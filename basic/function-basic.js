// 함수 선언
function doSomething() {
  const result = add(2, 3);
  console.log(result);
}

function add(a, b) {
  const sum = a + b;
  return sum;
}

// 함수 호출
doSomething(add);

const addFun = add;
console.log(add);
console.log(addFun(1, 2));
