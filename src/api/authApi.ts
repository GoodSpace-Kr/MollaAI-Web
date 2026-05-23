import { authAxios, publicAxios } from "./axiosInstance";

export type SendCodeRequest = {
  phoneNumber: string;
};

export type SendCodeResponse = {
  code: string;
  message: string;
  data: null;
  timestamp: string;
};

export type VerifyCodeRequest = {
  phoneNumber: string;
  code: string;
};

export type VerifyCodeResponse = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
};

export type RegisterRequest = {
  username: string;
};

export type RegisterResponse = {
  id: string;
  phoneNumber: string;
  username: string;
  isRegistered: boolean;
  englishLevel: string;
  status: string;
  firstCallAt: string;
  registeredAt: string;
};

export const sendAuthCode = async (
  data: SendCodeRequest,
): Promise<SendCodeResponse> => {
  const response = await publicAxios.post<SendCodeResponse>(
    "/api/v1/auth/send-code",
    data,
  );

  return response.data;
};

export const verifyAuthCode = async (
  data: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  const response = await publicAxios.post<VerifyCodeResponse>(
    "/api/v1/auth/verify-code",
    data,
  );

  return response.data;
};

export const registerUser = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await authAxios.post<RegisterResponse>(
    "/api/v1/auth/register",
    data,
  );

  return response.data;
};
