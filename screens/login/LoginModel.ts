// Model - Tipos e interfaces para Login
export interface LoginFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  error?: string;
}

export class LoginModel {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  static validateName(name: string): boolean {
    return name.trim().length >= 2;
  }

  static validateLoginForm(email: string, password: string): string | null {
    if (!email || !password) {
      return 'Please fill in all fields';
    }
    if (!this.validateEmail(email)) {
      return 'Invalid email';
    }
    if (!this.validatePassword(password)) {
      return 'Password must be at least 6 characters';
    }
    return null;
  }

  static validateRegisterForm(
    name: string,
    email: string,
    password: string,
  ): string | null {
    const loginError = this.validateLoginForm(email, password);
    if (loginError) return loginError;

    if (!name) {
      return 'Please enter your name';
    }
    if (!this.validateName(name)) {
      return 'Name must be at least 2 characters';
    }
    return null;
  }
}
