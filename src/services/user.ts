import { API } from "./index";

function login(data: Login) {
  try {
    return API.post("/user/login", data)
  } catch (err) {
    console.error("login: ", err);
    throw err;
  }
};

function getUser() {
  try {
    return API.get("/user")
  } catch (err) {
    console.error("getUser: ", err);
    throw err;
  }
}

const UserService = {
  login,
  getUser
}

export default UserService;