import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";

// const RandomPhoto = (): string => {
//   const photos = [
//     "/images/cat/cat00.jpeg",
//     "/images/cat/cat01.jpeg",
//     "/images/cat/cat02.jpeg",
//     "/images/cat/cat03.jpeg",
//     "/images/cat/cat04.jpeg",
//     "/images/cat/cat05.jpeg",
//     "/images/cat/dog00.jpeg",
//     "/images/cat/dog01.jpeg",
//     "/images/cat/dog02.jpeg",
//     "/images/cat/dog03.jpeg",
//   ];
//   return photos[Math.floor(Math.random() * photos.length)];
// };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.body);
  const { name, email } = req.body;
  // const photo = RandomPhoto();
  // console.log("photo? =>", photo);
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
