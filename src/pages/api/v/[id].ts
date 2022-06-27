import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
axios.defaults.timeout = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.headers);
  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: "Id is required" });

  const video = await (
    await fetch(`https://api2.musical.ly/aweme/v1/aweme/detail/?aweme_id=${id}`)
  ).json();

  if (!video?.aweme_detail)
    return res.status(400).json({ error: "Id is invalid" });

  return res.redirect(video.aweme_detail?.video?.play_addr?.url_list?.[0]);
}
