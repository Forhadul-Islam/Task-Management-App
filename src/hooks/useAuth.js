export default function useAuth() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth?.username) {
    return auth;
  } else {
    return false;
  }
}
