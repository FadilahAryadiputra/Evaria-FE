"use client";

import Footer from "@/components/Footer";
import PaginationSection from "@/components/PaginationSection";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import Navbar from "@/components/Navbar";
import useGetTransactions from "./_hooks/useGetTransactions";
import { Input } from "@/components/ui/input";
import TransactionCardSkeleton from "./_components/TransactionCardSkeleton";
import TransactionCard from "./_components/TransactionCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 1000);

  const { data: transactions, isPending } = useGetTransactions({
    page,
    search: debounceSearch,
  });

  return (
    <>
      <main className="flex-grow">
        <Navbar />
        <div className="container mx-auto">
          <section className="flex flex-col gap-8 px-4 py-8">
            <div className="text-2xl font-bold">Transaction History</div>
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 flex w-[400px]"
            />
            <div className="flex flex-col gap-6">
              {isPending && <TransactionCardSkeleton count={8} />}
              {transactions?.data.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
            {transactions && (
              <div className="mt-12">
                <PaginationSection meta={transactions.meta} setPage={setPage} />
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
