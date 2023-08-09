import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "tweetSession",
  password: "BEJQc9VNkL8qKVzbaXUkaZHuFs40GauPq1r9y4wX1f",
};

//one: function to get the session from api route
//two: function to get the session from SSR of Next.js
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
