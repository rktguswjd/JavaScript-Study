"use strict";

// async & await
// clear style of using promise :)

// 1. async
async function fetchUser() {
  //do network reqeust in 10 secs...
  return "ellie";
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await !
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return "apple";
}

async function getBanana() {
  await delay(1000);
  return "banana";
}

/*
    사과를 받는데 await을 사용해서 1초, 그다음 바나나를 호출하면서 1초를 기다리기 때문에 순차적으로 실행이되어 비효율적
    사과와 바나나를 받아오는데 서로 연관이 되어있지 않기 때문에 서로 기다릴 필요가 전혀 없다
    async function pickFruits(){
        const apple=await getApple();
        const banana=await getBanana();
        return `${apple} + ${banana}`;
    }
    
    따라서 아래 코드처럼 사과와 바나나를 병렬적으로 동시에 한번에 기다렸다가 출력할 수 있음
    하지만 사과를 다운받는데 바나나가 필요없고, 바나나를 다운받는데 사과가 필요없어서 병렬적으로 기능을 수행할 수 있는
    경우에는 아래 코드 처럼 더럽게 작성하지는 않음 !
 */
async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

// 3. useful Promise APIs
// Promise.all: promise배열을 전달하게 되면 모든 promise들이 병렬적으로 다 받을 때 까지 모아주는 역할
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}
pickAllFruits().then(console.log);

// Promise.race: 배열에 전달된 promise들 중에서 가장 먼저 값을 리턴하는 배열만 전달이 되어짐
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
