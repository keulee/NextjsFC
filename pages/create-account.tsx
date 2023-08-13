//계정을 생성하는 페이지입니다.

import { useForm } from "react-hook-form";
import Input from "../components/input";
import cls from "../lib/utils";
import useMutate from "../lib/useMutate";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

interface inputType {
  name: string;
  email: string;
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputType>();
  const [create, { data, loading, error }] = useMutate(
    "/api/users/create-account"
  );
  const router = useRouter();
  //   console.log(watch());
  const onValid = (input: inputType) => {
    create(input);
  };

  const onError = (error: any) => {
    // console.log(error);
  };
  // console.log(data?.ok, loading, error);
  useEffect(() => {
    if (data?.ok && data?.isExisted) {
      alert("Account already existed! Log in please");
      router.push("/log-in");
    }
    if (data?.ok && !data?.isExisted) {
      alert("Account created ! Log in please");
      router.push("/log-in");
    }
  }, [data]);
  const goLoginPage = () => {
    router.push("/log-in");
  };
  return (
    <div>
      <Head>
        <title>My Mini Tweet | Create Account</title>
      </Head>
      <div className="flex flex-col items-center mt-56 space-y-4">
        <div className="text-7xl">MY MiNi X TWEET '3'</div>
        <div className="text-3xl">Welcome to My MiNi X Tweet!</div>
        <div className="text-lg pb-5">
          Create your account and share your think with others :)
        </div>
        <form
          className="flex flex-col items-center border w-1/4"
          onSubmit={handleSubmit(onValid, onError)}
        >
          <div className="p-11 rounded-md space-y-5 w-full">
            <Input
              register={register("name", {
                minLength: {
                  value: 4,
                  message: "Username must be longer than 4 characters",
                },
                required: true,
              })}
              label="Name"
              type="text"
              placeholder="more than 4 chars"
              required
            ></Input>
            <Input
              register={register("email", { required: true })}
              label="Email"
              type="email"
              placeholder="hello@tweet.com"
              required
            ></Input>
          </div>
          {errors ? (
            <p className={cls("mb-7 text-pink-600")}>{errors?.name?.message}</p>
          ) : null}
          <button className="font-normal border-2 w-2/3 h-10 rounded-md bg-sky-500 text-white mb-7">
            {loading ? "Loading..." : "Let's Create Account !"}
          </button>
        </form>
        <button
          onClick={goLoginPage}
          className="font-normal border-2 w-1/6 h-10 rounded-md bg-slate-400 text-white mb-7"
        >
          I Already have an account
        </button>
      </div>
    </div>
  );
}
