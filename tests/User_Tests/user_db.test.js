const { expect } = require("chai");
const {
  UsernameExists,
  EmailExists,
  CreateUser,
  FindUserByUserId,
} = require("../../Services/Users/User_DB");
const db = require("../../models");

/*let test_user = {
    first_name: 'test',
    last_name: 'test',
    username: 'test_test',
    email: 'test@test.com',
    password: 'test_test',
    permission_id: 1;
}*/
describe("User DB Test Suite", () => {
  it("should see if a username exists in db", async () => {
    const check = await UsernameExists("");
    expect(check).to.be.null;
    expect(check === undefined).to.be.false;
    expect(check === false).to.be.false;
  });
  it("should throw an error because no username was passed.", async () => {
    try {
      const check = await UsernameExists();
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("No Username was passed as an argument");
    }
  });
  it("should create a user, see if username already exists, and fail,", async () => {
    const test = await CreateDummyUser();
    const check = await UsernameExists("Farrukh Adeel");
    expect(check).to.be.an("object");
    await DestroyDummyUser(test);
  });

  it("should see if a email exists in db", async () => {
    const check = await EmailExists("");
    expect(check).to.be.null;
    expect(check === undefined).to.be.false;
    expect(check === false).to.be.false;
  });
  it("should throw an error because no email was passed.", async () => {
    try {
      const check = await EmailExists();
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("No Email  was passed as an argument");
    }
  });
  it("should create a user, see if email already exists, and fail,", async () => {
    const test = await CreateDummyUser();
    const check = await EmailExists("test@test.com");
    expect(check).to.be.an("object");
    await DestroyDummyUser(test);
  });

  it("should create a new user", async () => {
    const first_name = "test";
    const last_name = "test";
    const email = "test@test.com";
    const username = "test_test";
    const password = "test_test";
    const permission_id = 1;

    const args = {
      first_name,
      last_name,
      username,
      email,
      password,
      permission_id,
    };
    const user = await CreateUser(args);
    //destroy user instance in database because its a test,
    await user.destroy({ force: true });
    expect(user).to.be.an("object");
    expect(user.first_name).to.equal(first_name);
    expect(user.last_name).to.equal(last_name);
    expect(user.username).to.equal(username);
    expect(user.email).to.equal(email);
    expect(user.password).to.equal(password);
    expect(user.permission_id).to.equal(permission_id);
  });

  it("should throw an error because no username is passed", async () => {
    try {
      const first_name = "test";
      const last_name = "test";
      const email = "test@test.com";
      const username = "test_test";
      const password = "test_test";
      const permission_id = 1;
      const user = await CreateUser({
        first_name,
        last_name,
        email,
        password,
        permission_id,
      });
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: username");
    }
  });
  it("should throw an error because no first_name is passed", async () => {
    try {
      const last_name = "test";
      const email = "test@test.com";
      const username = "test_test";
      const password = "test_test";
      const permission_id = 1;
      const user = await CreateUser({
        last_name,
        email,
        username,
        password,
        permission_id,
      });
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: first_name");
    }
  });
  it("should throw an error because no last_name is passed", async () => {
    try {
      const first_name = "test";
      const email = "test@test.com";
      const username = "test_test";
      const password = "test_test";
      const permission_id = 1;
      const user = await CreateUser({
        first_name,
        email,
        username,
        password,
        permission_id,
      });
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: last_name");
    }
  });
  it("should throw an error because no password is passed", async () => {
    try {
      const first_name = "test";
      const last_name = "test";
      const email = "test@test.com";
      const username = "test_test";

      const permission_id = 1;
      const user = await CreateUser({
        first_name,
        last_name,
        email,
        username,
        permission_id,
      });
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: password");
    }
  });
  it("should throw an error because no email is passed", async () => {
    try {
      const first_name = "test";
      const last_name = "test";
      const password = "test_test";
      const username = "test_test";
      const permission_id = 1;
      const user = await CreateUser({
        first_name,
        last_name,
        username,
        password,
        permission_id,
      });
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: email");
    }
  });
  it("should create a user and assign them permission id of 2 as default.", async () => {
    const first_name = "test";
    const last_name = "test";
    const password = "test_test";
    const username = "test_test";
    const email = "test@test.com";
    const user = await CreateUser({
      first_name,
      last_name,
      username,
      password,
      email,
    });
    //destroy user instance in database because its a test,
    await user.destroy({ force: true });
    expect(user).to.be.an("object");
    expect(user.first_name).to.equal(first_name);
    expect(user.last_name).to.equal(last_name);
    expect(user.username).to.equal(username);
    expect(user.email).to.equal(email);
    expect(user.password).to.equal(password);
    expect(user.permission_id).to.equal(2);
  });
  it("should throw an error because an invalid permission_id is passed to create user", async () => {
    try {
      const first_name = "test";
      const last_name = "test";
      const password = "test_test";
      const username = "test_test";
      const email = "test@test.com";
      const permission_id = "asdf";
      const user = await CreateUser({
        first_name,
        last_name,
        username,
        password,
        email,
        permission_id,
      });
    } catch (err) {
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: permission_id not found");
    }
  });
  it("should create a new user with a valid permission_id by lookup in the permission table.", async () => {
    const first_name = "test";
    const last_name = "test";
    const password = "test_test";
    const username = "test_test";
    const email = "test@test.com";
    const permission_id = 1;
    const user = await CreateUser({
      first_name,
      last_name,
      username,
      password,
      email,
      permission_id,
    });
    //destroy user instance in database because its a test,
    await user.destroy({ force: true });
    expect(user).to.be.an("object");
    expect(user.first_name).to.equal(first_name);
    expect(user.last_name).to.equal(last_name);
    expect(user.username).to.equal(username);
    expect(user.email).to.equal(email);
    expect(user.password).to.equal(password);
    expect(user.permission_id).to.equal(1);
  });
  it("should return a user based on their id ", async () => {
    const user = await CreateDummyUser();
    const found = await FindUserByUserId(user.id);

    await DestroyDummyUser(user);
    expect(found).to.be.an("object");
    expect(found).to.have.property("permission_id");
    expect(found.username).to.equal("Farrukh Adeel");
    expect(found.permission_id).to.equal(1);
  });
  it("should throw an error when finding a user by id and no user_id is passed. ", async () => {
    const user = await CreateDummyUser();
    try {
      await FindUserByUserId();
    } catch (err) {
      await DestroyDummyUser(user);
      expect(err).to.be.an("Error");
      expect(err.message).to.equal("Invalid argument: user_id");
    }
  });
});
//helpers functions
async function CreateDummyUser() {
  return await db.user.create({
    first_name: "farrukh",
    last_name: "adeel",
    username: "Farrukh Adeel",
    password: "test_test",
    email: "test@test.com",
    permission_id: 1,
  });
}
async function DestroyDummyUser(user) {
  return await user.destroy({ force: true });
}
