import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.body);
  const { email } = req.body;
  //   console.log(method);
  //   console.log(name);
  //   console.log(email);
  //   if (method !== "POST") {
  // return res.status(500).json({ ok: false });
  // return { ok: false };
  //   }
  const user = await db?.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ ok: false });
  }
  if (user) {
    //     console.log("user already existed");
    req.session.user = {
      id: user.id,
    };
    await req.session.save();

    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
