export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  
  // Skip middleware for auth pages
  if (to.path.startsWith('/auth')) {
    return;
  }
  
  // Initialize auth if not already done
  if (!auth.user && import.meta.client) {
    await auth.initializeAuth();
  }
  
  // Check if user is authenticated
  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login');
  }
  
  // Verify token is still valid
  try {
    const token = auth.getToken;
    
    await auth.verifyToken(token);

    // if (token) {
    //   await auth.verifyToken(token);
    // } else {
    //   throw new Error('No token found');
    // }
  } catch (err) {
    console.error('Token verification failed:', err);
    auth.clearAuth();
    return navigateTo('/auth/login');
  }
});
