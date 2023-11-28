import { API } from "./index";

function login(data: Login) {
  try {
    return API.post("/user/login", data)
  } catch (err) {
    console.error("login: ", err);
    throw err;
  }
};

const UserService = {
  login
}

export default UserService;