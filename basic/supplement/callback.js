"use strict";
// 콜백 함수의 동기적 실행과 비동기적 실행

// 동기적 fakeSetTimeout
function fakeSetTimeout(callback, delay) {
  callback();
}
console.log(0);
fakeSetTimeout(() => {
  console.log("동기");
}, 0);
console.log(1);

// 비동기적 setTimeout
console.log(0);
setTimeout(() => {
  console.log("비동기");
}, 0); // 0초뒤에 실행하라는 것이 아닌 0초뒤에 큐에 넣어라!
console.log(1);
