import Loading from "@/components/Loading";
import { Suspense } from "react";
import EventBody from "./_components/EventBody";
import Navbar from "@/components/Navbar";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pb-20">
        <Suspense fallback={<Loading />}>
          <EventBody slug={slug} />
        </Suspense>
      </main>
    </>
  );
};

export default EventDetail;
