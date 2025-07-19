import type { MeData, LoginData } from "~/types";

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as LoginData | null,
    isAuthenticated: false,
  }),
  
  getters: {
    getToken: (state) => state.user?.token || null,
  },
  
  actions: {
    async initializeAuth() {
      if (import.meta.client) {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const userData = await this.verifyToken(token);
            if (userData) {
              this.user = { ...userData, token };
              this.isAuthenticated = true;
            }
          } catch (err) {
            this.clearAuth();
          }
        }
      }
    },
    
    async verifyToken(token: string | null): Promise<MeData | null> {
      if (!token) throw new Error('No token provided');
      
      try {
        const userData = await $fetch<MeData>('http://127.0.0.1:8000/api/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return userData;
      } catch (err) {
        console.error('Token verification failed:', err);
        throw err;
      }
    },
    
    setUser(user: LoginData) {
      this.user = user;
      this.isAuthenticated = true;
      
      if (import.meta.client) {
        localStorage.setItem('token', user.token);
      }
    },
    
    clearAuth() {
      this.user = null;
      this.isAuthenticated = false;
      
      if (import.meta.client) {
        localStorage.removeItem('token');
      }
    },
    
    async logout() {
      try {
        // Optional: Call logout endpoint
        await $fetch('http://127.0.0.1:8000/api/v1/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        });
      } catch (err) {
        console.error('Logout error:', err);
      } finally {
        this.clearAuth();
        await navigateTo('/auth/login');
      }
    }
  }
})
