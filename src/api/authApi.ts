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

export type VerifyCode = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
};

export type VerifyCodeResponse = {
  code: string;
  message: string;
  data: VerifyCode;
  timestamp: string;
};

export type RegisterRequest = {
  username: string;
};

export type RegisterUserOptions = {
  accessToken?: string;
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

export type RegisterApiResponse = {
  code: string;
  message: string;
  data: RegisterResponse;
  timestamp: string;
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
): Promise<VerifyCode> => {
  const response = await publicAxios.post<VerifyCodeResponse>(
    "/api/v1/auth/verify-code",
    data,
  );

  return response.data.data;
};

export const registerUser = async (
  data: RegisterRequest,
  options?: RegisterUserOptions,
): Promise<RegisterResponse> => {
  const response = await authAxios.post<RegisterApiResponse>(
    "/api/v1/auth/register",
    data,
    options?.accessToken
      ? {
          headers: {
            Authorization: `Bearer ${options.accessToken}`,
          },
        }
      : undefined,
  );

  return response.data.data;
};
