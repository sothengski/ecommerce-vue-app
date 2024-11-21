export const isAuthenticated = () => !!localStorage.getItem("user-token");

export const login = (token) => {
  localStorage.setItem("user-token", token);
};

export const logout = () => {
  localStorage.removeItem("user-token");
};
