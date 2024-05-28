import { NextApiRequest, NextApiResponse } from "next/types";
const { VOYAGER_API_ENDPOINT } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { classHash } = req.query;

  if (!classHash) {
    return res.status(400).json({ error: "Contract address is required" });
  }

  try {
    const response = await fetch(`VOYAGER_API_ENDPOINT/${classHash}/code`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch contract code:", error);
    res.status(500).json({ error: "Failed to fetch contract code" });
  }
}

// export { GET };
