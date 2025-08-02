import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  title: string;
  category: string;
  location: string;
  description: string;
  content: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  thumbnail: File | null;
}

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();

      form.append("thumbnail", payload.thumbnail!);
      form.append("title", payload.title);
      form.append("category", payload.category);
      form.append("location", payload.location);
      form.append("description", payload.description);
      form.append("content", payload.content);
      form.append("startDate", payload.startDate.toISOString());
      form.append("endDate", payload.endDate.toISOString());
      form.append("startTime", payload.startTime.toISOString());
      form.append("endTime", payload.endTime.toISOString());

      await axiosInstance.post("/events", form, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
    },
    onSuccess: async () => {
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/dashboard/events");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useCreateEvent;