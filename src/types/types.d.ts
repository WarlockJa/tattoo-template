// image upload
interface FileUploadItem {
  file: File;
  status: "pending" | "success" | "error";
  height?: number;
  width?: number;
  aria: string;
}
