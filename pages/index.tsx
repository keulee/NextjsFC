import Head from "next/head";
import React from "react";
import Tweet from "../components/tweet";

//로그인 여부를 확인하여 로그인이 되어있다면 홈페이지를 그렇지 않다면 계정 생성 / 로그인 페이지로 이동하세요.
//After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.
//로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 합니다.
//또한 트윗을 작성할 수 있어야 합니다.

export default () => (
  <div>
    <Head>
      <title>My Mini Tweet | MiNi X Tweet</title>
    </Head>
    <div className="flex flex-col items-center mt-10 font-semibold">
      <div className="text-8xl">Hi there !</div>
      <div>Let theme hear your stories and connect with others :D</div>
    </div>
    <div className="flex flex-col space-y-5 py-10 px-96">
      {[1, 1, 1, 1, 1, 1].map((product) => (
        <Tweet
          id={product.id}
          key={product.id}
          title="hello world"
          hearts={1}
        />
      ))}
      {/* <FloatingButton href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton> */}
    </div>
  </div>
);
