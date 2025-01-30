export const getFileExtension = (fileName: string) => {
  const lastDotPosition = fileName.lastIndexOf(".") + 1;
  return lastDotPosition > 0 ? fileName.slice(lastDotPosition) : undefined;
};
