import { reactive } from "vue";
import { isAuthenticated } from "@/utils/auth";

export const authState = reactive({
  isAuthenticated: isAuthenticated(), // Initialize with current authentication state
});
