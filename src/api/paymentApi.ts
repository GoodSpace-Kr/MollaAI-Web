import { authAxios } from "./axiosInstance";

export type ApprovePaymentRequest = {
  tid: string;
  orderId: string;
  amount: number;
  planType: string;
};

export type ApprovePaymentData = {
  paymentId: string;
  tid: string;
  orderId: string;
  amount: number;
  status: string;
  paidAt: string;
};

type ApprovePaymentResponse = {
  code: string;
  message: string;
  data: ApprovePaymentData;
  timestamp: string;
};

export const approvePayment = async (
  data: ApprovePaymentRequest,
): Promise<ApprovePaymentData> => {
  const response = await authAxios.post<ApprovePaymentResponse>(
    "/api/v1/payments/approve",
    data,
  );
  return response.data.data;
};
