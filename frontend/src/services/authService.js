import API from "./api";

// Register user
export const registerUser = async (userData) => {
  const { data } = await API.post("/users/register", userData); // make sure backend route matches
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

// Login user
export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData); // backend route
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // also remove user info
};
