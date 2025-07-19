export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  
  // Initialize auth if not already done
  // if (!auth.user && import.meta.client) {
  //   await auth.initializeAuth();
  // }
  
  // If user is already authenticated, redirect to dashboard
  if (auth.isAuthenticated) {
    return navigateTo('/dashboard');
  }
});
