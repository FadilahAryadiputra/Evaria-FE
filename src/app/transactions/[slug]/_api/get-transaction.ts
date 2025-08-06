import { axiosInstance } from "@/lib/axios";
import { Transaction } from "@/types/transaction";
import { cache } from "react";


export const getTransaction = cache(async (slug: string) => {
  const { data } = await axiosInstance.get<Transaction>(`/transactions/${slug}`);
  console.log(data)
  return data;
})