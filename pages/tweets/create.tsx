import { useForm } from "react-hook-form";
import Input from "../../components/input";
import TextArea from "../../components/textArea";
import useMutate from "../../lib/useMutate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface CreateTweetForm {
  title: string;
  text: string;
  image?: FileList;
}

export default function TweetCreate() {
  const { register, handleSubmit } = useForm<CreateTweetForm>();
  const [createTweet, { data, loading }] = useMutate("/api/tweets");
  const router = useRouter();
  const onValid = (data: CreateTweetForm) => {
    console.log(data);
    if (loading) return;
    createTweet(data);
  };
  console.log("create.ts->", data, loading);
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/tweets/${data.tweet.id}`);
      // console.log(data.product);
    }
  }, [data]);
  const [imageSrc, setImageSrc] = useState<any>("");
  const encodeFileToBase64 = (fileBlob: Blob): any => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <div className="flex w-full justify-center items-center h-full">
      <div className="max-w-6xl w-full h-full mt-40">
        <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
          <div className="text-center text-5xl font-medium">
            Write down your story !
          </div>
          <Input
            register={register("title", { required: true })}
            label="Title"
            type="text"
            required
          />
          <TextArea
            register={register("text", { required: true })}
            label="Text"
            name="text"
            required
          />
          <div>
            upload photos
            <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              {!imageSrc ? (
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <img className="h-48" src={imageSrc} />
              )}
              <input
                // {...register("image")}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={(e) => {
                  encodeFileToBase64(e?.target?.files[0]);
                }}
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button className="border-2 rounded-md bg-sky-500 text-white w-32 h-10">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
