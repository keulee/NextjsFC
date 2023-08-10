// 트윗의 상세 정보를 보는 페이지 입니다.
// 사용자는 id에 해당하는 트윗의 내용과 '좋아요' 버튼을 볼 수 있어야 합니다.
// '좋아요'버튼을 클릭했 을 경우 좋아요의 상태값이 데이터베이스에 저장되어야 하며 useSWR의 mutate를 사용하여 업데이트를 반영해야 합니다.

import Link from "next/link";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import cls from "../../lib/utils";
import { Post, User } from "@prisma/client";
import useSWR from "swr";
import Head from "next/head";
import FlottingButton from "../../components/flottingButton";
import Tag from "../../components/tag";
import useMutate from "../../lib/useMutate";

interface TweetWithUser extends Post {
  user: User;
}

interface tweetDataType {
  ok: boolean;
  tweet: TweetWithUser;
  isLiked: Boolean;
}

export default function TweetId() {
  const { user, isLoading } = useUser();
  console.log("tweets/[id]->", user, isLoading);
  const router = useRouter();
  console.log("router.query =>", router.query);
  const { data, mutate } = useSWR<tweetDataType>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  console.log("tweet/[id]->", data);
  const [toggleFav] = useMutate(`/api/tweets/${router.query.id}/fav`);
  const onFavClick = () => {
    // console.log("here");
    if (!isLoading) {
      toggleFav({});
    }
    if (!data) return;
    mutate((prev) => prev && { ...prev, isLiked: !data.isLiked }, false);
  };
  return (
    <div>
      <Head>
        <title>My Mini Tweet | {data?.tweet.title} </title>
      </Head>
      <div className="flex flex-col space-y-5 py-10 px-96">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.tweet?.user?.name}
              </p>
              <Link
                // legacyBehavior
                href={`/users/profiles/${data?.tweet.userId}`}
              >
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.tweet.title}
              </h1>
              <p className=" my-6 text-gray-700">{data?.tweet.text}</p>
            </div>
            <div>
              <div className="flex items-center justify-between space-x-2">
                <button
                  onClick={onFavClick}
                  className={cls(
                    "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center",
                    data?.isLiked ? "text-red-400 " : "text-gray-400"
                  )}
                >
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill={data?.isLiked ? "tomato" : "none"}
                    viewBox="0 0 24 24"
                    stroke={data?.isLiked ? "tomato" : "currentColor"}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            {data?.tweet.tag?.split(",").map((tag, index) => (
              <Tag id={data.tweet.id} key={index} tag={tag.trim()} />
            ))}
          </div>
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
    </div>
  );
}
