import Link from "next/link";

interface argType {
  title: string;
  id: number;
  text: string;
  hearts: number;
  userName: string;
}

export default function Tweet({ title, id, text, hearts, userName }: argType) {
  return (
    <Link
      legacyBehavior
      className="flex px-4 pt-5 cursor-pointer justify-between"
      href={`/tweets/${id}`}
    >
      <a className="border-4 border-sky-400 rounded-lg">
        {/* <div className="border-4 rounded-lg w-96 h-32 pt-1 px-1 border-sky-500 cursor-pointer">
          <div>title: {title}</div>
        </div> */}
        <div className="flex space-x-4">
          {/* <div className="w-20 h-20 bg-sky-500 rounded-md" /> */}
          <div className="pt-2 flex flex-col w-full">
            <div className="flex bg-sky-50 w-full justify-between pr-2">
              <h3 className="text-2xl font-bold text-gray-900 pl-2">{title}</h3>
              <h3 className="text-l text-gray-900 pl-2">{userName}</h3>
            </div>
            <span className="font-base mt-1 text-gray-900 pl-2">{text}</span>
          </div>
        </div>
        <div className="flex space-x-2 items-end justify-end">
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span className="pr-2 pb-2">{hearts}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
