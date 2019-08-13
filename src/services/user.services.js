import { userLogin } from "../apis/searchAPI";
import { alertConstants as SAVEKEY } from "../constants";
import { history } from "../helpers";

const login = async (username, password) => {
  try {
    const response = await userLogin.get(`?search=${username}`);
    const { name, birth_year } = response.data.results[0];
    let userData;
    if (response.data.count !== 0) {
      if (username === name && password === birth_year) {
        let userFullName = name.split(" ");
        userData = {
          userFullName: name,
          firstName: userFullName[0],
          lastName: userFullName[userFullName.length - 1],
          birthYear: birth_year
        };
        localStorage.setItem(SAVEKEY.USERSTORAGE, JSON.stringify(userData));
        history.push("/");
      } else {
        userData = 404;
      }
    } else {
      userData = 404;
    }
    return userData;
  } catch (err) {
    return 404;
  }
};

const logout = async () => {
  let user;
  user = await localStorage.removeItem(SAVEKEY.USERSTORAGE);
  history.push("/login");
  return user;
};

const getUser = async () => {
  let user;
  if (localStorage.getItem(SAVEKEY.USERSTORAGE) !== null) {
    user = await JSON.parse(localStorage.getItem(SAVEKEY.USERSTORAGE));
    if (user) {
      history.push("/");
    }
  }
  return user;
};

export const userService = {
  login,
  logout,
  getUser
};
