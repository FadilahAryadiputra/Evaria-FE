import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQuery extends PaginationQueries {
  search?: string;
}

const useGetTransactions = (queries?: GetTransactionsQuery) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["transactions", queries],
    queryFn: async () => {
      if (!user?.accessToken) {
        throw new Error("No token available");
      }

      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/transactions",
        {
          params: queries,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      return data;
    },
  });
};

export default useGetTransactions;