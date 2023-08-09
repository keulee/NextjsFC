import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/withSession";
import withHandler from "../../../lib/withHandler";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.session.user?.id;
  // console.log(userId);
  if (!userId) {
    return res.status(401).end();
  }
  const profile = await db.user.findUnique({
    where: { id: userId },
  });
  // console.log(profile);
  return res.json({ ok: true, profile });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
