export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null; // Returns true if token exists
};

export const logout = () => {
  localStorage.removeItem("token"); // Remove token
  window.location.href = "/"; // Redirect to login page
};
