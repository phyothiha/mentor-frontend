export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  
  // Initialize authentication on app startup
  if (import.meta.client) {
    await auth.initializeAuth();
  }
});
