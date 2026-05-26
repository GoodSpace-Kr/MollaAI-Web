// 개발용 (추후 삭제)

import { publicAxios } from "@/api/axiosInstance";

export type DevLoginRequest = {
  phoneNumber: string;
};

export type DevLoginData = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
};

export type DevLoginResponse = {
  code: string;
  message: string;
  data: DevLoginData;
  timestamp: string;
};

export const devLogin = async (
  data: DevLoginRequest,
): Promise<DevLoginData> => {
  const response = await publicAxios.post<DevLoginResponse>(
    "/api/v1/dev/login",
    data,
  );

  return response.data.data;
};
