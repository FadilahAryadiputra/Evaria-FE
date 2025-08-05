import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  title: string;
  price: number;
  description: string;
  limit: number;
  eventId: string;
}

const useCreateEventTicket = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post(
        "/events/create-event-ticket",
        payload,
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        },
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["event-tickets"] });
      router.push("/dashboard/event-tickets");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useCreateEventTicket;
