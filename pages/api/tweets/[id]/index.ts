import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import withHandler from "../../../../lib/withHandler";
import { withApiSession } from "../../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log("req.body->", req.body);
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

  const cleanTags = tweet?.tag?.split(",").map((singleTag) => ({
    tag: {
      contains: singleTag.trim().toLowerCase().split(" ").join(""),
    },
  }));
  // console.log(tweet);
  // console.log("cleanTag->", cleanTags);
  cleanTags === null ? null : cleanTags;
  const relatedTweet = await db.post.findMany({
    where: {
      OR: cleanTags === undefined ? [] : cleanTags,
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
  // console.log("related Tweet->", relatedTweet);
  res.json({
    ok: true,
    tweet,
    isLiked,
    relatedTweet,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
