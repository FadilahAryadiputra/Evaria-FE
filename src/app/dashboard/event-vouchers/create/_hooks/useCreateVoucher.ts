import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  code: string;
  discount: number;
  quota: number;
  startDate: Date;
  endDate: Date;
  eventId: string;
}

const useCreateEventVoucher = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      await axiosInstance.post(
        "/event-vouchers/create-event-voucher",
        {
          code: payload.code,
          discount: payload.discount,
          quota: payload.quota,
          startDate: payload.startDate.toISOString(),
          endDate: payload.endDate.toISOString(),
          eventId: payload.eventId,
        },
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );
    },
    onSuccess: async () => {
      toast.success("Create voucher success");
      await queryClient.invalidateQueries({ queryKey: ["event-vouchers"] });
      router.push("/dashboard/event-vouchers");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useCreateEventVoucher;
