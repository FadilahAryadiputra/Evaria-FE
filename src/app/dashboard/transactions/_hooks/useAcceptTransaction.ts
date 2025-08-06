import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Payload {
  transactionId: string;
}

const useAcceptTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async ({ transactionId }: Payload) => {
      await axiosInstance.patch(
        `/transactions/${transactionId}/accept-transaction`, {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
    },
    onSuccess: async () => {
      toast.success("Transaction accepted successfully!");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] }); // adjust queryKey if needed
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useAcceptTransaction;