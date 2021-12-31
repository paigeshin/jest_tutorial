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
