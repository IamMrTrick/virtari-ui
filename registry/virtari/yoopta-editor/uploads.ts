async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new globalThis.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export const imageUpload = async (file: File) => {
  const sizes = await getImageDimensions(file);
  return {
    id: file.name,
    src: URL.createObjectURL(file),
    alt: file.name,
    fit: "cover" as const,
    sizes,
  };
};

export const videoUpload = async (file: File) => ({
  id: file.name,
  src: URL.createObjectURL(file),
  sizes: { width: 800, height: 480 },
});

export const fileUpload = async (file: File) => ({
  id: file.name,
  src: URL.createObjectURL(file),
  name: file.name,
  size: file.size,
  format: file.name.split(".").pop() ?? "",
});
