"use strict";

// zhf

// JavaScript is synchronous.
// Excute the code block by orger after hoisting (호이스팅이 된 이후부터 코드가 작성한 순서에 맞춰 동기적으로 실행)
// hoisting: var, function declaration (var, function 선언들이 자동적으로 제일 위로 올라가는 것)

// 동기: 정해진 순서에 맞게 코드가 실행되는 것
// 비동기: 언제 코드가 실행될지 예측할 수 없는 것
// 콜백함수: 어떤 함수가 실행을 마친 후에 실행되는 함수, 인자로 전달된 함수

console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");

// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log("sync callback"));

// Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

// Callback Hell example
/*
    콜백 지옥의 문제점
    - 가독성이 떨어짐
    - 비즈니스 로직을 이해하기 어려움
    - 에러가 발생하거나 디버깅을 하는 경우에도 어려움
    - 유지보수 어려움
*/
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "ellie" && password === "dream") ||
        (id === "coder" && password === "academy")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter youre password");
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
