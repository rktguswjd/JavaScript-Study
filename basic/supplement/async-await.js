"use strict";
// 콜백 함수가 깊어지면 코드가 복잡해지게 되므로 ES6에서 Promise를 도입
// 하지만 Promise를 사용해도 여전히 코드가 복잡해 ES8에서 async와 await을 도입
// 덕분에 비동기 코드를 동기적으로 깔끔하게 처리

// - 콜백의 깊이가 깊지 않을 때는 작성하기 간편한 콜백함수를 호출하거나, Promise를 사용하는 것이 더 나은 방법일 수도 있다.
// - async/awwait이 할 수 없는 동작을 Promise로 해결할 수 있는 경우도 있다.

// 1. async / await 키워드
/* 
        async function keyWord(){
         await someAsyncFunction(){...}
         await anotherAsyncFunction(){...}
        }
    
    위 예제는 someAsyncFunction, anotherAsyncFunction 두 함수가 비동기 코드일지라도 async / await이 적용되면,
    항상 someAsyncFunction  ->  anotherAsyncFunction  순서대로 함수가 실행된다.
    이 때 async/await은 Promise 방식을 사용하기 때문에 someAsyncFunction과 anotherAsyncFunction 함수는 Promise를 리턴해야 한다!  
*/

// 2. 비동기 함수가 Promise를 사용하지 않는 예제 (async/await 적용이 안된 예제)
async function test() {
  await foo(1, 2000);
  await foo(2, 500);
  await foo(3, 1000);
}

function foo(num, sec) {
  setTimeout(() => console.log(num), sec);
}

test();
/*
    setTimeout()함수를 호출할 때 async/await을 사용해서 noPromise()함수 실행 결과 1,2,3 순서대로
    응답되기를 기대한 것. 하지만 1,2,3 순서대로 호출되지 않고 이벤트가 끝난 순서대로 호출되었다.b
    즉, async/await으로 비동기 코드를 동기식으로 바꾸고 싶었지만 비동기 코드가 그대로 수행되었다!
*/

// 3. 비동기 함수에 Promise를 사용하는 예제( async / await이 적용되어 동기적으로 출력 )
async function test2() {
  await foo2(1, 2000);
  await foo2(2, 500);
  await foo2(3, 1000);
}

function foo2(num, sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(num);
      resolve("async는 Promise방식을 사용합니다!");
    }, sec);
  });
}
test2();
/*
    foo2()함수가 Primise를 반환하도록 수정했더니 의도대로 비동기 함수들이 순서대로 1,2,3을 출력했다.
    그 이유는 await은 Promise를 받기 때문이다. 즉, 비동기 함수 foo2() 실행 결과 Promise를 리턴하면 await은
    이를 받아 동기적으로 수행하게 해준다.
*/
