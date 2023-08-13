import useSWR from "swr";
import useUser from "../../../lib/useUser";
import FlottingButton from "../../../components/flottingButton";

export default function Profile() {
  const { user, isLoading } = useUser();
  console.log("here->", user?.name);
  // const {detail } =useSWr("")

  const handleLogout = (e) => {
    // console.log(e.tar);
  };
  return (
    <div>
      <div className="flex flex-col gap-y-10 h-full w-full">
        <div className="flex justify-center gap-x-10 mt-10">
          <div className="w-48 h-48 rounded-full bg-slate-500" />
          <div className="flex flex-col justify-end font-semibold">
            <div className="text-2xl">{user?.name}</div>
            <div>{user?.email}</div>
          </div>
        </div>
        <div>My favorite tweets</div>
        <div className="grid">
          {user?.Fav?.map((tweet) => (
            <div key={tweet.id}>
              <p>{tweet.post.title}</p>
              <p>{tweet.post.text}</p>
            </div>
          ))}
        </div>
        <button onClick={handleLogout}>Log out</button>
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
