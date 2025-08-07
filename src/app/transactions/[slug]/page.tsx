import Loading from "@/components/Loading";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import TransactionBody from "./_components/TransactionBody";
import { getTransaction } from "./_api/get-transaction";

interface PageProps {
  params: {
    slug: string;
  };
}

const TransactionDetail = async ({ params }: PageProps) => {
  const transaction = await getTransaction(params.slug);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pb-20">
        <Suspense fallback={<Loading />}>
          <TransactionBody transaction={transaction} />
        </Suspense>
      </main>
    </>
  );
};

export default TransactionDetail;