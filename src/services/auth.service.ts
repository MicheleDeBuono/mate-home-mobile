// Mock del servizio di autenticazione
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };
  private isAuth: boolean = false;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async checkAuth(): Promise<boolean> {
    console.log('AuthService.checkAuth - Checking stored auth state:', this.isAuth);
    return this.isAuth;
  }

  async login(email: string, password: string): Promise<void> {
    console.log('AuthService.login - Processing login request for:', email);
    
    // Simuliamo una chiamata API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      console.log('AuthService.login - Login successful');
      this.token = 'mock-jwt-token';
      this.isAuth = true;
    } else {
      console.error('AuthService.login - Invalid credentials');
      throw new Error('Invalid credentials');
    }
  }

  async logout(): Promise<void> {
    console.log('AuthService.logout - Processing logout request');
    
    // Simuliamo una chiamata API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.token = null;
    this.isAuth = false;
    console.log('AuthService.logout - Logout successful');
  }

  async signUp(data: any): Promise<AuthResponse> {
    console.log('AuthService: Processing signup request');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.token = 'mock-jwt-token';
    this.isAuth = true;
    return {
      user: this.mockUser,
      token: this.token,
    };
  }

  async isAuthenticated(): Promise<boolean> {
    console.log('AuthService: Checking authentication status');
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.isAuth;
  }

  async getCurrentUser(): Promise<User | null> {
    console.log('AuthService: Getting current user');
    if (!this.token) return null;
    return this.mockUser;
  }
}

// Esportiamo un'istanza singleton
export const authService = AuthService.getInstance();
