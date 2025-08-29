import API from "./api";

export const registerUser = async (userData) => {
  const { data } = await API.post("/users/register", userData);
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};


export const logoutUser = () => {
  localStorage.removeItem("token");
};
