import { useState } from "react";

interface mutateType {
  data: any;
  loading: boolean;
  error: object;
}

export default function useMutate(
  url: string
): [(data: any) => void, mutateType] {
  const [data, setData] = useState<undefined | any>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | any>(undefined);
  const fn = (data: any) => {
    // console.log(data);
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  //   console.log(data);
  return [fn, { data, loading, error }];
}
