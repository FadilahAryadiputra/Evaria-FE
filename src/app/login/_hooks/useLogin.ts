import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<User>("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      onAuthSuccess({ user: data });
      toast.success("login success");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useLogin;
