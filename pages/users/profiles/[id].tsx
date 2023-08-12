import useSWR from "swr";
import useUser from "../../../lib/useUser";

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
    </div>
  );
}
