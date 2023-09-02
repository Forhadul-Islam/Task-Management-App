export const userLoggedIn = (user) => {
  localStorage.setItem("auth", JSON.stringify(user));
};

export const userLoggedOut = () => {
  localStorage.removeItem("auth");
};
