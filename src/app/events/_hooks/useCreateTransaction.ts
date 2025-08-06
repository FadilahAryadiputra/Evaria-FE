import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  quantity: number,
  pointUsed: number,
  eventTicketId: string,
}

const useCreateTransaction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      if (!user?.accessToken) {
        throw new Error("No token available");
      }

      await axiosInstance.post(
        "/transactions/create-transaction",
        {
          quantity: payload.quantity,
          pointUsed: payload.pointUsed,
          eventTicketId: payload.eventTicketId,
        },
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Create transaction success");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useCreateTransaction;
