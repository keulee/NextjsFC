import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../../lib/withHandler";
import { withApiSession } from "../../../../lib/withSession";
import db from "../../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.body);
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await db.fav.findFirst({
    where: {
      postId: Number(id),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await db.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
