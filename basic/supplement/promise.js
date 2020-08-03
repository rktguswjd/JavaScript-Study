"use strict";
// 1. promise
// promise객체는 비동기 계산을 위해 사용된다.
// promise는 비동기 요청에 대하겨, 비동기 실행이 완료된 후 결과 값 또는 실패의 이유를 콜백 함수로 전달된다.
// 상태
// -fulfilled: 비동기 동작 정상 완료
// -rejected: 비동기 동작 중 에러 발생

const stateCheck = function (bool) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bool) {
        resolve("fulfilled 상태. then으로 연결 !");
      } else {
        reject("rejected 상태. catch로 연결 !");
      }
    }, 1000);
  });
};

stateCheck(false) //
  .then(console.log)
  .catch(console.log);

// then() 메서드는 호출한 Promise가 resolve()를 호출했을 때 반환 값을 콜백함수로 받아주며, 이 때 새로운 Promise를 반환
// catch() 메서드는 호출한 Promise가 reject()를 호출했을 때 반환 값을 콜백함수로 받아주며, 이 때 새로운 Promise를 반환
// then()과 catch()는 동시에 수행되지 않음

// 2. then(), catch()을 활용한 비동기 동작 연결
const test = function (bool) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bool) {
        resolve("fulfilled 상태. then으로 연결 !");
      } else {
        reject("rejected 상태. catch로 연결 !");
      }
    }, 1000);
  });
};
test(true)
  .then(function (result) {
    console.log("1) " + result);
    return test(true);
  })
  .then(function (result) {
    console.log("2) " + result);
    return test(false);
  })
  .then(function (result) {
    console.log("3) " + result);
    return test(true);
  })
  .catch(function (result) {
    console.log("4) " + result);
    return test(true);
  })
  .then(function (result) {
    console.log("5) " + result);
    return test(true);
  });

// 3. Promise의 메서드 종류

// (a) all
// all() 메서드를 호출할 때, 인자로 여러 Promise들을 넘겨준다.
// 모든 promise가 fulfilled되거나, promise가 하나라도 rejected된 경우 promise를 반환한다.
const promiseAll1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "promise1");
});
const promiseAll2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "promise2");
});
Promise.all([promiseAll1, promiseAll2]).then(function (value) {
  console.log(value);
});

// (b) race
// fulfilled, rejected 상관없이 처음으로 종료된 promise를 반환
const promiseRace1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "promise1");
});
const promiseRace2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "promise2");
});
Promise.race([promiseRace1, promiseRace2]).then(function (value) {
  console.log(value);
});

// 4. 올바르지 못한 promise사용
// promise는 비동기 처리에서 콜백 지옥을 해결하기 위해 고안되었다.
// 하지만 promise를 사용해 또 콜백을 만드는 코드를 짤 수 있는데, 이는 promise를 잘 사용하고 있는 않은 것.
