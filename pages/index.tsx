import Head from "next/head";
import React from "react";
import Tweet from "../components/tweet";
import FlottingButton from "../components/flottingButton";

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
      <div>Let them hear your stories and connect with others :D</div>
    </div>
    <div className="flex flex-col space-y-5 py-10 px-96">
      {[1, 1, 1, 1, 1, 1].map((tweet, index) => (
        <Tweet id={index} key={index} title="hello world" hearts={1} />
      ))}
      <FlottingButton href="/tweet/create">
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12H15M12 9V15M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        {/* <svg
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
        </svg> */}
      </FlottingButton>
    </div>
  </div>
);
