"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Footer = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    toast.success("Form Submitted");
    router.replace("/");
  };
  return (
    <footer className="bg-secondary flex flex-col px-4 md:px-34">
      <div className="flex flex-col md:flex-row justify-between py-12">
        <div className="flex flex-col gap-2 max-w-[400px]">
          <div className="font-bold">Evaria</div>
          <ul className="list-disc pl-4">
            <li>Your trusted marketplace for unforgettable events.</li>
            <li>Secure tickets. Verified events. No surprises.</li>
            <li>All events. One marketplace.</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full">
          <div className="flex flex-col items-end">
            <div>
              <div className="font-bold">Support</div>
              <div>Help Center</div>
              <div>Terms of Service</div>
              <div>Privacy Policy</div>
              <div>Legal</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div>
              <div className="font-bold">Product</div>
              <div>Overview</div>
              <div>Features</div>
              <div>Tutorials</div>
              <div>Pricing</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div>
              <div className="font-bold">Company</div>
              <div>About</div>
              <div>Blog</div>
              <div>Careers</div>
              <div>Contact</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
