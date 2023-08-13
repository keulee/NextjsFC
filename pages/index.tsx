import Head from "next/head";
import React, { useEffect } from "react";
import Tweet from "../components/tweet";
import FlottingButton from "../components/flottingButton";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import ButtonProfile from "../components/ButtonProfile";

//로그인 여부를 확인하여 로그인이 되어있다면 홈페이지를 그렇지 않다면 계정 생성 / 로그인 페이지로 이동하세요.
//After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.
//로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 합니다.
//또한 트윗을 작성할 수 있어야 합니다.

interface tweetWithUser extends Post {
  user: User;
  _count: { Fav: number };
}

interface TweetType {
  ok: boolean;
  tweets: tweetWithUser[];
}

export default () => {
  const { user, isLoading } = useUser();
  // console.log("index.tsx->", user);
  const { data } = useSWR<TweetType>("/api/tweets");
  // console.log("tweet api->", data);
  // const router = useRouter();
  // if (!user) {
  // router.replace("/create-account");
  // }
  return (
    <div>
      <Head>
        <title>My Mini Tweet | MiNi X Tweet</title>
      </Head>
      <div className="flex flex-col items-center mt-10 font-semibold">
        <div className="sm:text-7xl xl:text-8xl">Hi {user?.name} !</div>
        <div>Let them hear your stories and connect with others :D</div>
      </div>
      <div>
        {data?.tweets ? (
          <div className=" flex flex-col space-y-3 py-10 sm:px-24 2xl:px-96">
            {data?.tweets?.map((tweet) => (
              <Tweet
                id={tweet.id}
                key={tweet.id}
                title={tweet.title}
                text={
                  tweet.text.length > 70
                    ? `${tweet.text.substring(0, 70)} ...(read mord) `
                    : tweet.text
                }
                userName={tweet.user?.name}
                hearts={tweet._count.Fav}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-40">
            <h1>There's no story ! Start with your stories first :D</h1>
          </div>
        )}
        <FlottingButton href="/tweets/create">
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
        </FlottingButton>
        <ButtonProfile href={`/users/profiles/${user?.id}`}>
          <svg
            className="h-10 w-10"
            data-name="Layer 1"
            id="Layer_1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <path
              d="M16,20a8,8,0,1,1,8-8A8,8,0,0,1,16,20ZM16,6a6,6,0,1,0,6,6A6,6,0,0,0,16,6Z"
              stroke="white"
            />
            <path
              d="M30,32H28A12,12,0,0,0,4,32H2a14,14,0,0,1,28,0Z"
              stroke="white"
            />
          </svg>
        </ButtonProfile>
      </div>
    </div>
  );
};
