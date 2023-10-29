import { fileRouter } from "@/server/uploadthing";
import { createNextPageApiHandler } from "uploadthing/next-legacy";

const handler = createNextPageApiHandler({
  router: fileRouter,
});

export default handler;
