import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("File URL: ", file.url);
    }
  ),
} satisfies FileRouter;

export type typeFileRouter = typeof fileRouter;
