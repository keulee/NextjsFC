import useSWR from "swr";

// interface userType {
//   data: any;
//   isLoading: boolean;
// }
export default function Profile() {
  const { data, isLoading } = useSWR("/api/users/user");
  console.log("here->", data);
  // const {detail } =useSWr("")

  return (
    <div>
      <div>{data?.profile?.name}</div>
      <div>{data?.profile?.email}</div>
      {/* <div>
        {data?.profile?.Fav?.map((post) => {
          <p>{post}</p>;
        })}
      </div> */}
      <button>Log out</button>
    </div>
  );
}
