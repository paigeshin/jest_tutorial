### Installations

```bash
npm install -D jest
```

### Convention

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5cf5c32-e8ba-4221-b326-3fa83b761e91/Untitled.png)

### Package.json

```bash
  "scripts": {
    "test": "jest"
  },
```

```bash
{
  "name": "jest_tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "testwatch": "jest --watchAll"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.4.5"
  },
  "dependencies": {
    "axios": "^0.24.0"
  }
}
```

- npm test ⇒ run test
- npm run testwatch ⇒ when file changes, run test

# Functions

### Code to be tested

```jsx
const axios = require("axios");

const functions = {
  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: (x) => x,
  createUser: () => {
    const user = { firstName: "Paige" };
    user["lastName"] = "Shin";
    return user;
  },
  fetchUser: () =>
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.data)
      .catch((err) => "error"),
};

module.exports = functions;
```

### Test Code

```jsx
const functions = require("./functions");

// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

// beforeAll(() => initDatabase());
// afterAll(() => closeDatabase());

// const initDatabase = () => console.log("Database Initialized...");
// const closeDatabase = () => console.log("Database Closed...");

const nameCheck = () => console.log("Checking Name...");

// target with beforeEach
describe("Checking Names", () => {
  beforeEach(() => nameCheck());
  test("User is Jeff", () => {
    const user = "Jeff";
    expect(user).toBe("Jeff");
  });
});

test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

test("Adds 2 + 2 to NOT equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// CHECK FOR TRUTHY & FALSY VALUES
// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefiend
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false

test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

test("Should be falsy", () => {
  // null is falsy value
  // 0 is falsy value
  // undefined is falsy value
  expect(functions.checkValue(null)).toBeFalsy();
  expect(functions.checkValue(0)).toBeFalsy();
  expect(functions.checkValue(undefined)).toBeFalsy();
  expect(functions.checkValue(2)).not.toBeFalsy();
});

// to equal
test("User should be Paige Shin object", () => {
  // object must be compared with `toEqual`
  expect(functions.createUser()).toEqual({
    firstName: "Paige",
    lastName: "Shin",
  });
});

// Less than and greather than
test("Should be under 1600", () => {
  const load1 = 800;
  const load2 = 700;
  expect(load1 + load2).toBeLessThan(1600);
});

// Regex
test("There is no I in team", () => {
  expect("team").not.toMatch(/I/i);
});

// Arrays
test("Admin should be in usernames", () => {
  uesrnames = ["john", "karen", "admin"];
  expect(uesrnames).toContain("admin");
});

// Working with async data
// Promise
test("User fetched name should be Leanne Graham", () => {
  // With expect.assertions(n), you're telling Jest that you expect the current test to perform n assertions
  expect.assertions(1); // async..
  return functions.fetchUser().then((data) => {
    expect(data.name).toEqual("Leanne Graham");
  }); // when testing with async
});

// Working with async data
// Async Await
test("User fetched name should be Leanne Graham", async () => {
  // With expect.assertions(n), you're telling Jest that you expect the current test to perform n assertions
  expect.assertions(1); // async..
  const data = await functions.fetchUser();
  expect(data.name).toEqual("Leanne Graham");
});
```

### Code to be tested

```jsx
const chunkArray = (arr, len) => {
  // init chunked arr
  const chunkedArr = [];

  // Loop through arr
  arr.forEach((element) => {
    // Get last element
    const last = chunkedArr[chunkedArr.length - 1];

    // Check if last and if last length is equal to the chunk len
    if (!last || last.length === len) {
      chunkedArr.push([element]);
    } else {
      last.push(element);
    }
  });

  return chunkedArr;
};

module.exports = chunkArray;
```

### Test Code

```jsx
const chunkArray = require("./chunk");

test("chunkArray function exists", () => {
  expect(chunkArray).toBeDefined();
});

test("Chunk an array of 10 values with length of 2", () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const len = 2;
  const chunkedArr = chunkArray(numbers, len);

  expect(chunkedArr).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ]);
});
```

### Code to be tested

```jsx
const reverseString = (str) => str.toLowerCase().split("").reverse().join("");

module.exports = reverseString;
```

### Test Code

```jsx
const reverseString = require("./reversestring");

test("reverseString function exists", () => {
  expect(reverseString).toBeDefined();
});

test("String reverses", () => {
  expect(reverseString("hello")).toEqual("olleh");
});

test("String reverses with uppercase", () => {
  expect(reverseString("Hello")).toEqual("olleh");
});
```

### Code to be tested

```jsx
function isAnagram(str1, str2) {
  return formatStr(str1) === formatStr(str2);
}

// Helper function
function formatStr(str) {
  return str.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("");
}

module.exports = isAnagram;
```

### Test Code

```jsx
const isAnagram = require("./anagram");

test("isAnagram function exists", () => {
  expect(typeof isAnagram).toEqual("function");
});

test('"cinema" is an anagram of "iceman"', () => {
  expect(isAnagram("cinema", "iceman")).toBeTruthy();
});

test('"Dormitory" is an anagram of "dirty room##"', () => {
  expect(isAnagram("Dormitory", "dirty room##")).toBeTruthy();
});

test('"Hello" is not an anagram of "Aloha"', () => {
  expect(isAnagram("Hello", "Aloha")).toBeFalsy();
});
```
