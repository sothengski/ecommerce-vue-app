import http from "../http-common";

class CategoryService {
  // Get all categories data
  getAllCategories() {
    return http.get("/categories");
  }

  // Get a category data by Id
  getCategoryById(categoryId) {
    return http.get(`/categories/${categoryId}`);
  }

  // Create a new category
  createCategory(inputData) {
    return http.post(`/categories`, inputData);
  }

  // Update a category
  updateCategoryById(categoryId, data) {
    return http.put(`/categories/${categoryId}`, data);
  }

  // Delete a category
  deleteCategory(categoryId) {
    return http.delete(`/categories/${categoryId}`);
  }
}

export default new CategoryService();
