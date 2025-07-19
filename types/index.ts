export interface APICall<Response = any> {
  data: Response;
  success: boolean;
  message: string;
}

export interface LoginData {
  email: string;
  name: string;
  token: string;
}

export interface MeData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export type LoginResponse = APICall<LoginData>;
