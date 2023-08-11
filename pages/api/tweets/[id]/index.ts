import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import withHandler from "../../../../lib/withHandler";
import { withApiSession } from "../../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.body->", req.body);
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await db.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  // const tags = await db.post.findMany({
  //   select: {
  //     tag: true,
  //   },
  // });

  const cleanTags = tweet?.tag?.split(",").map((singleTag) => ({
    tag: {
      contains: singleTag.trim().toLowerCase().split(" ").join(""),
    },
  }));
  // console.log(tweet);
  console.log(cleanTags);
  const relatedTweet = await db.post.findMany({
    where: {
      OR: cleanTags,
      AND: {
        id: {
          not: tweet?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.fav.findFirst({
      where: {
        postId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  // res.status(200);
  console.log(relatedTweet);
  res.json({
    ok: true,
    tweet,
    isLiked,
    relatedTweet,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
