import { useForm } from "react-hook-form";
import Input from "../../components/input";
import TextArea from "../../components/textArea";
import useMutate from "../../lib/useMutate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FlottingButton from "../../components/flottingButton";
import Head from "next/head";

interface CreateTweetForm {
  title: string;
  text: string;
  tag?: string;
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
    <div>
      <div>
        <Head>
          <title>My Mini Tweet | Create Tweet</title>
        </Head>
      </div>
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
              <Input
                register={register("tag")}
                label="Tag"
                type="text"
                placeholder="daybyday, meme, joke, ..."
              />
            </div>
            <div className="flex justify-center">
              <button className="border-2 rounded-md bg-sky-500 text-white w-32 h-10">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
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
    </div>
  );
}
