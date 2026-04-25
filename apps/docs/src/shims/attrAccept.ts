type FileLike = {
  name?: string | null;
  type?: string | null;
};

export default function attrAccept(
  file: FileLike | null | undefined,
  acceptedFiles: string | string[] | null | undefined,
): boolean {
  if (!file || !acceptedFiles) return true;

  const acceptedFilesArray = Array.isArray(acceptedFiles)
    ? acceptedFiles
    : acceptedFiles.split(",");

  if (acceptedFilesArray.length === 0) return true;

  const fileName = (file.name ?? "").toLowerCase();
  const mimeType = (file.type ?? "").toLowerCase();
  const baseMimeType = mimeType.replace(/\/.*$/, "");

  return acceptedFilesArray.some((type) => {
    const validType = type.trim().toLowerCase();

    if (!validType) return false;
    if (validType.charAt(0) === ".") {
      return fileName.endsWith(validType);
    }
    if (validType.endsWith("/*")) {
      return baseMimeType === validType.replace(/\/.*$/, "");
    }
    return mimeType === validType;
  });
}
