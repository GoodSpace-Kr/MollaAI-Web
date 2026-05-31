import { authAxios } from "./axiosInstance";

export type CreateInquiryRequest = {
  name?: string;
  email?: string;
  content: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  content: string;
  read: boolean;
  createdAt: string;
};

export type CreateInquiryResponse = {
  code: string;
  message: string;
  data: Inquiry;
  timestamp: string;
};

export const createInquiry = async (
  data: CreateInquiryRequest,
): Promise<Inquiry> => {
  const response = await authAxios.post<CreateInquiryResponse>(
    "/api/v1/inquiries",
    data,
  );

  return response.data.data;
};
