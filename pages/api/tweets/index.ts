import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tweets = await db.post.findMany({
      include: {
        _count: {
          select: {
            Fav: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({ ok: true, tweets });
  }
  if (req.method === "POST") {
    const {
      body: { title, text, image, tag },
      session: { user },
    } = req;
    // console.log(tag);
    //태그 다시 만들어줘야됨. 중간 공백 없애고 toLowerCase하기
    // const TagWithoutComma = tag.split(",").split(" ");
    // console.log(TagWithoutComma;
    const tweet = await db.post.create({
      data: {
        title,
        text,
        image: "xx",
        tag: tag,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
