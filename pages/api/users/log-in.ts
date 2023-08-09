import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function LoginApi(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.body);
  const { email } = req.body;
  const { method } = req;
  //   console.log(method);
  //   console.log(name);
  //   console.log(email);
  if (method !== "POST") {
    return res.status(500).json({ ok: false });
    // return { ok: false };
  }
  const user = await db?.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ ok: true, userValid: false });
  }
  if (user) {
    //     console.log("user already existed");
    req.session.user = {
      id: user.id,
    };
    await req.session.save();
    return res.status(200).json({ ok: true, userValid: true });
  }
}

export default withApiSession(LoginApi);
