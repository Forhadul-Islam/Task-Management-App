export default function useAuth() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth?.username) {
    console.log({ auth });
    return auth;
  } else {
    return false;
  }
}
