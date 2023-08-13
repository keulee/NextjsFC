//로그인을 진행하는 페이지입니다.

import { useForm } from "react-hook-form";
import useMutate from "../lib/useMutate";
import { useRouter } from "next/router";
import Input from "../components/input";
import cls from "../lib/utils";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import Head from "next/head";

interface inputType {
  email: string;
}

export default function LogIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<inputType>();
  const [login, { data, loading, error }] = useMutate("/api/users/log-in");
  const router = useRouter();
  const onValid = (input: inputType) => {
    login(input);
    // console.log(loading);
    // console.log(error);
  };

  // console.log("log-in.tsx->", data?.ok, loading, error);
  const onError = (error: any) => {
    // console.log(error);
  };
  useEffect(() => {
    if (data?.ok) {
      alert("Welcome!");
      router.replace("/");
    }
    if (data?.ok === false) {
      alert("User not found. Verify your email please");
      reset();
    }
  }, [data, router]);
  const toCreateAccount = () => {
    router.push("/create-account");
  };
  return (
    <div>
      <Head>
        <title>My Mini Tweet | Log in</title>
      </Head>
      <div className="flex flex-col items-center mt-56 space-y-4">
        <div className="sm:text-6xl xl:text-7xl">MY MiNi X TWEET '3'</div>
        <div className="text-3xl">Welcome to My MiNi X Tweet!</div>
        <div className="text-lg pb-5">
          Enter your email and dive into MiNi X Tweet world :D
        </div>
        <form
          className="flex flex-col items-center border xl:w-1/4"
          onSubmit={handleSubmit(onValid, onError)}
        >
          <div className="p-11 rounded-md space-y-5 w-full">
            <Input
              register={register("email", { required: true })}
              label="Email"
              type="email"
              placeholder="hello@tweet.com"
              required
            ></Input>
          </div>
          <button className="font-normal border-2 w-36 h-10 rounded-md bg-sky-500 text-white mb-7">
            {loading ? "Loading..." : "Login!"}
          </button>
        </form>
        <button
          onClick={toCreateAccount}
          className="font-normal border-2 sm:w-36 xl:w-36 h-10 rounded-md bg-slate-400 text-white mb-7"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
