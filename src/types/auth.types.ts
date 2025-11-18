export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
}

export type AuthAction =
  | { type: "AUTH_SUCCESS"; payload: AuthUser }
  | { type: "AUTH_LOADING" }
  | { type: "AUTH_ERROR"; payload: AuthError }
  | { type: "AUTH_LOGOUT" };
