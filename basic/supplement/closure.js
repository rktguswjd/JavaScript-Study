"use strict";
// 1. Closure: 이미 생명주기가 끝난 외부 함수의 변수를 참조하는 함수
function outer() {
  var x = 10;
  function inner() {
    x++;
    console.log(x);
  }
  return inner;
}
/*
    예를 들어, outer() 함수가 선언될 당시에 그 내부에는 x라는 변수와 inner()함수를
    정의하고 있고 outer()함수는 inner함수를 반환한다.
    만약 outer()함수 외부에서 outer()함수를 호출하면 다음과 같은 실행 순서를 따른다.
        1. inner 함수가 반환되어 inner()함수 실행
        2. outer() 함수에서 정의된 변수 x를 참조해서 ++연산자를 수행

    즉, outer()함수를 호출하면 inner함수에서 변수 x가 자신의 유효범위가 아님에도, outer()
    함수에 정의된 변수를 참조한다. 이 때 inner()함수를 클로저라고 하며, outer()함수에
    정의된 변수 x를 자유변수라고 한다.
    
    함수형 언어가 아니라면 inner()함수의 유효범위 밖에서, 즉 outer()내부에 존재하고 inner()함수
    외부에 존재하는 변수, 함수에 접근할 수 없지만 자바스크립트에서는 클로저를 통해 접근할 수 있으며
    값을 변경할 수도 있다.
    그 이유는 outer()함수가 선언될 당시의 유효한 환경을 기억하고 있다가, outer()함수를
    호출할 때 기억했던 환경을 사용할 수 있기 때문이다.
*/

// 2. 클로저를 사용하여 값 추측
var x = -10;
var foo = outer();
foo(); // (a)
foo(); // (b)
console.log(x); // (c)
/*
    (a)foo() 함수를 호출했을 때 x는 선언될 당시의 환경인 10을 기억하고 있기 때문에 11이됨
    (b)foo()는 이전 foo()함수 호출 결과x는 11이 되었으므로, x값이 변경된 11을 기억하고 있기 때문에 12가됨
    (c)x출력은 outer()함수의 유효범위가 아니었기 때문에 독립적인 값을 갖게됨, -10
*/

// 3. 클로저를 통한 캡슐화
// 클로저 덕분에 자바스트립트에서는 객체지향 프로그래밍, 즉 변수 또는 함수를 private으로 활용할 수 있다
// 클로저는 변수의 유효범위를 제한하려는 용도로 사용할 수 있다.(캡슐화 가능)
function Capsule() {
  var x = 10; // =>private int x=10;
  this.getX = function () {
    return x;
  };
  this.setX = function (newNum) {
    x = newNum;
  };
}
foo = new Capsule();
console.log(foo.getX());
console.log(foo.x); // 직접 x에 접근하면, undefined를 반환

foo.setX(20);
console.log(foo.getX());
/*  
    클로저는 단순히 생성시점 유효 범위의 환경을 순간 포착하는 것 뿐만 아니라,
    외부에는 노출시키지 않으면서 선언 당시 유효범위의 접근을 가능하게 하고 
    상태를 수정할 수 있게 해주는 정보 은닉 수단으로 활용할 수도 있다.
*/

// 4. 클로저로 인해 발생할 수 있는 문제
// 비동기로 동작하는 함수를 사용하는 함수 내에서 반복문을 작성할 때, 클로저로 인해 문제가 발생할 수 있음
function count() {
  for (var i = 1; i < 10; i++) {
    console.log(i);
  }
}
count();

function count2() {
  for (var i = 1; i < 10; i++) {
    setTimeout(() => console.log(i), 1000);
  }
}
count2();

/*
    count2()함수를 호출하면 반복문을 9번 수행하는데, 반복문을 수행할 때마다 변수i를 공유하고 있다.
        1. i === 1 일 때 1초 뒤에 console.log(i)를 수행합니다.
        2. 이어서 i === 2가 되고 역시 1초 뒤에 console.log(i)를 수행합니다.
        3. 이어서 i === 3이 되고 역시 1초 뒤에 console.log(i)를 수행합니다.
        4. ... (반복) ...
        5. 이어서 i === 9이 되고 역시 1초 뒤에 console.log(i)를 수행합니다.

    컴퓨터는 연산 속도가 엄청나므로 setTimeout()함수를 호출하는 반복문 9번을 수행하는데 1초가 안걸린다.
    그래서 처음 i===1일때 1초 뒤에 호출하려고 했던 console.log(i)가 실행되기 전에 i===10이 된 상태이다.
    따라서 결과는 10을 9번 출력하게 된다.
*/

// 해결책 1 -  즉시 실행함수
// function count() {
//     for (var i = 1; i < 10; i++) {
//         (function(count){
//             setTimeout(function(){
//                 console.log(count);
//             }, 1000);
//         })(i);
//     }
// }
// count();

// 해결책 2 - 블록스코프(let)
// function count() {
//     for (let i = 1; i < 10; i++) {
//         setTimeout(function(){
//             console.log(i);
//         }, 1000);
//     }
// }
// count();
