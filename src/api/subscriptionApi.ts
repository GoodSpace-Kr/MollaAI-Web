import { authAxios } from "./axiosInstance";

export type PlanType = "beginner" | "premium";

export type SubscriptionStatus = "active" | "expired";

export type MySubscription = {
  id: string;
  planType: PlanType;
  dailyLimitMinutes: number;
  remainingMinutesToday: number;
  startedAt: string;
  expiresAt: string | null;
  status: SubscriptionStatus;
};

export type GetMySubscriptionResponse = {
  code: string;
  message: string;
  data: MySubscription;
  timestamp: string;
};

export const getMySubscription = async (): Promise<MySubscription> => {
  const response = await authAxios.get<GetMySubscriptionResponse>(
    "/api/v1/subscriptions/me",
  );

  return response.data.data;
};
