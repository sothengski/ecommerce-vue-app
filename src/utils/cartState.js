// Save the data in localStorage
export const updateCartItemCount = (count) => {
  localStorage.setItem("cartItemCount", JSON.stringify(count));
};

// Retrieve data from localStorage
export const loadCartItemCount = () => {
  try {
    const count = JSON.parse(localStorage.getItem("cartItemCount"));
    return count || null; // Return null if no data is found
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return null; // Return null if parsing fails
  }
};
