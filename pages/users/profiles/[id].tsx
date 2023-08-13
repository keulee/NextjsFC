import useSWR from "swr";
import useUser from "../../../lib/useUser";
import FlottingButton from "../../../components/flottingButton";
import { Fav, User } from "@prisma/client";
import Link from "next/link";
import Head from "next/head";

interface userWithFav extends User {
  Fav: Fav[];
}

interface userdataType {
  user: User;
  isLoading: boolean;
}

export default function Profile() {
  const { user, isLoading } = useUser();
  // console.log("here->", user?.name);
  // const {detail } =useSWr("")
  return (
    <div>
      <Head>
        <title>My Mini X Tweet | Profile</title>
      </Head>
      <div className="flex flex-col gap-y-10">
        <div className="flex justify-center gap-x-10 mt-10">
          <div className="w-48 h-48 rounded-full bg-slate-500" />
          <div className="flex flex-col justify-end font-semibold">
            <div className="text-2xl">{user?.name}</div>
            <div>{user?.email}</div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-md sm:mx-24 xl:mx-96">
          <div className="text-xl font-semibold bg-sky-100 text-center mb-5">
            My favorite tweets
          </div>
          <div className="grid grid-cols-1 gap-5">
            {user?.Fav?.map((tweet) => (
              <Link href={`/tweets/${tweet.postId}`} key={tweet.id}>
                <a className="border p-5 border-pink-300 rounded-md">
                  <div className="text-lg font-semibold mb-2 bg-pink-100">
                    {tweet.post.title}
                  </div>
                  <div>
                    {tweet.post.text.length >= 100
                      ? `${tweet.post.text.substring(0, 100)}...(read more)`
                      : tweet.post.text}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
        {/* <button onClick={handleLogout}>Log out</button> */}
      </div>
      <FlottingButton href="/">
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </FlottingButton>
    </div>
  );
}
