"use strict";
// Q1. make a string out of an array
{
    const fruits = ['apple', 'banana', 'orange'];
    const result = fruits.join();
    console.log(result);
}

// Q2. make an array out of a string
{
    const fruits = '🍎, 🥝, 🍌, 🍒';
    const result = fruits.split(',');
    console.log(result);
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse();
    console.log(result);
    console.log(array);
}

// Q4. make new array without the first two elements
{
    // splice는 배열자체에서 삭제한 후 값을 리턴
    // splice는 배열의 특정한 부분을 리턴, end는 exclusive(배제됨)
    const array = [1, 2, 3, 4, 5];
    const result = array.slice(2, 5);
    console.log(result);
}

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
    const result = students.find((student, index) => student.score === 90);
    console.log(result);
}

// Q6. make an array of enrolled students
{
    const result = students.filter((student) => student.enrolled);
    console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
    // map: 배열안에 있는 모든 요소들을 콜백함수를 호출하면서 콜백함수에서 가공, 리턴되어진 값들로 대체하는 것
    const result = students.map((student) => student.score);
    console.log(result);
}

// Q8. check if there is a student with the score lower than 50
{
    // some: 배열의 요소중에서 콜백함수가 리턴되는 true가 있는지 없는지를 확인
    // some은 배열의 요소 중 조건에 해당하는 요소가 하나라도 있으면 true
    // every는 배열의 요소가 조건에 모두 해당해야 true
    console.clear();
    const result = students.some((student) => student.score < 50);
    console.log(result);
    const result2 = students.every((student) => student.score < 50);
    console.log(result2);

}

// Q9. compute students' average score
{
    console.clear();
    // reduce: 콜백함수는 배열안에 있는 모든 요소마다 호출됨, 콜백함수에서 return되는 값은 함께 누적된 결과값
    // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    // previousValue: 이전 콜백함수에서 return된 값이 전달되어짐
    // currentValue: 배열의 아이템을 순차적으로 전달받음

    // reduceright: 순서가 거꾸로 호출됨
    const result = students.reduce((prev, curr) => prev + curr.score, 0);
    console.log(result / students.length);

}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
    const result = students.map((student) => student.score).join();
    console.log(result);

    // 50점 이상
    // const result=students
    // .map((student)=>student.score)
    // .filter((score)=>score>=50)
    // .join();
    // console.log(result)
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
    // sort(compareFn?: (a: T, b: T) => number): this;
    // sort의 콜백함수에는 a와b 즉, 이전값과 현재값이 전달되는데 만약 -값을 리턴하게 되면 첫번째가 다음번째보다 작다고 간주가되어져서 정렬됨
    const result = students
        .map((student) => student.score)
        .sort((a, b) => a - b)
        .join();
    console.log(result);
}