import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

export default async function CreateAccountApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  const userEmail = await db?.user.findUnique({
    where: {
      email,
    },
  });
  if (userEmail) {
    //     console.log("user already existed");
    return res.status(200).json({ ok: true, userValid: true });
  }
  if (!userEmail) {
    return res.status(404).json({ ok: true, userValid: false });
    //     await db?.user.create({
    //       data: {
    //         name,
    //         email,
    //         avatar: "xx",
    //       },
    //     });
    //     return res.status(200).json({ ok: true, isExisted: false });
    //     // return res.status(401).json({ ok: false, error: "Please log in." });
  }
  //   return res.json({
  // ok: true,
  //   });
  //   res.status(200).end();
}
