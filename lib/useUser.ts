import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/user");
  console.log("useUser->", data, error);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/create-account");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
