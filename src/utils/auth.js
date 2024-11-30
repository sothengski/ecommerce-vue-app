// Check if the user is authenticated
export const isAuthenticated = () => !!localStorage.getItem("user");

// Save the data in localStorage
export const savedUserData = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const savedUserId = (userId) => {
  localStorage.setItem("userId", JSON.stringify(userId));
};

// Remove user data from localStorage
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
};

// Retrieve user data from localStorage
export const getUserData = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser || null; // Return null if no user is found
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null; // Return null if parsing fails
  }
};
