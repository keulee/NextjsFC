// 트윗의 상세 정보를 보는 페이지 입니다.
// 사용자는 id에 해당하는 트윗의 내용과 '좋아요' 버튼을 볼 수 있어야 합니다.
// '좋아요'버튼을 클릭했 을 경우 좋아요의 상태값이 데이터베이스에 저장되어야 하며 useSWR의 mutate를 사용하여 업데이트를 반영해야 합니다.

import Link from "next/link";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import cls from "../../lib/utils";

export default function TweetId() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">"data"</p>
              <Link
                // legacyBehavior
                href={`/users/profiles/{id}`}
              >
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">"tweet name"</h1>
            <p className=" my-6 text-gray-700">"tweet description"</p>
            <div className="flex items-center justify-between space-x-2">
              {" "}
              {/* <Button large text="Talk to seller" /> */}
              <button
                className={cls(
                  "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center"
                  // data?.isLiked
                  // ? "text-red-400 hover:text-red-500"
                  // : "text-gray-400 hover:text-gray-500"
                )}
              >
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
