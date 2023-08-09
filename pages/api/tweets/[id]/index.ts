import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import withHandler from "../../../../lib/withHandler";
import { withApiSession } from "../../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.body->", req.body);
  const {
    query: { id },
    // session: { user },
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
  // res.status(200);
  res.json({
    ok: true,
    tweet,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
