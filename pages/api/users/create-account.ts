import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.body);
  const { name, email } = req.body;
  // const { method } = req;
  //   console.log(method);
  //   console.log(name);
  //   console.log(email);
  // if (method !== "POST") {
  // return res.status(500).json({ ok: false });
  // return { ok: false };
  // }
  const user = await db?.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    console.log("user already existed");
    return res.status(201).json({ ok: true, isExisted: true });
  }
  if (!user) {
    await db?.user.create({
      data: {
        name,
        email,
        avatar: "xx",
      },
    });
    return res.status(200).json({ ok: true, isExisted: false });
    // return res.status(401).json({ ok: false, error: "Please log in." });
  }
  //   return res.json({
  // ok: true,
  //   });
  //   res.status(200).end();
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
