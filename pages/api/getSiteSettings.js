import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

const query = groq`
    *[_type == "siteSettings"][0]
`;

export default async function handler(req, res) {
  const siteSettings = await sanityClient.fetch(query);
  res.status(200).json({ siteSettings });
}
