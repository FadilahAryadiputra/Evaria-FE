"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useRegister from "../_hooks/useRegisterUser";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import useRegisterUser from "../_hooks/useRegisterUser";

export default function Register() {
  const { mutateAsync: register, isPending } = useRegisterUser();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Name is required").min(3),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password have minimum 8 characters")
      .max(25, "Password have maximum 25 characters")
      .required("Password is required"),
    refCode: Yup.string()
      .min(6, "Referal code have 6 characters")
      .max(6, "Referal code have 6 characters")
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <div className="mx-0 mt-8 lg:mx-20">
          <div className="my-8 flex justify-center text-2xl font-bold">
            EVARIA
          </div>
        </div>
        <div className="grid grid-cols-1 items-center gap-6 md:gap-12 p-4 md:grid-cols-2">
          <div className="order-2 md:order-1 flex justify-center md:justify-end p-4">
            <div className="flex flex-col items-center justify-end text-center">
              <div className="mb-4 size-[300px] md:size-[350px] overflow-hidden rounded-md bg-black">
                <Image
                  src="/images/illustration.jpg"
                  alt="Client 1"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="text-lg font-bold">
                Explore and Manage Event Only With Evaria
              </div>
              <div>
                Join and experience the ease of transactions on Evaria
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 p-2 flex justify-center md:justify-normal">
            <Card className="shadow-around-xl w-full max-w-sm border-none shadow-[0_0_10px_0px_rgba(0,0,0,0.25)]">
              <CardHeader className="text-center text-sm">
                <div className="text-2xl font-bold">Register Now</div>
                <div className="flex flex-col">
                  <div className="">By registering, I agree to Evaria&apos;s</div>
                  <div>
                    <span className="font-bold">Terms & Conditions</span> and{" "}
                    <span className="font-bold">Privacy Policy</span>.
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={{ username: "", email: "", password: "", refCode: "" }}
                  validateOnBlur={false}
                  validationSchema={loginSchema}
                  onSubmit={async (values) => {
                    console.log(values)
                    await register(values);
                  }}
                >
                  <Form>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Userame</Label>
                        <Field
                          name="username"
                          as={Input}
                          type="text"
                          placeholder="Your Name"
                          className="bg-white"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Field
                          name="email"
                          as={Input}
                          type="email"
                          placeholder="youremail@example.com"
                          className="bg-white"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                        </div>
                        <Field
                          name="password"
                          as={Input}
                          type="password"
                          placeholder="**********"
                          className="bg-white"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Referral Code (Optional)</Label>
                        </div>
                        <Field
                          name="refCode"
                          as={Input}
                          type="text"
                          maxLength={6}
                          placeholder="Referral Code"
                          className="bg-white"
                        />
                        <ErrorMessage
                          name="refCode"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="mt-5 w-full"
                    >
                      {isPending ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Form>
                </Formik>
              </CardContent>
              <CardFooter className="flex-col text-center text-sm">
                <div className="flex flex-col">
                  <div className="flex justify-center gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?
                    </p>
                    <Link href={"/login"} className="text-sm font-semibold underline">
                      Sign In
                    </Link>
                  </div>
                  <div className="flex justify-center gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hosting events?
                    </p>
                    <Link href={"/register/organizer"} className="text-sm font-semibold underline">
                      Join as an Organizer!
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="mt-auto border-t-3 py-2">
        <div className="flex justify-center">© Copyright 2025, Evaria</div>
      </footer>
    </>
  );
}
