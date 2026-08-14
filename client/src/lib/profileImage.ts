export function cropAndCompressProfileImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Imagem inválida"));
      image.onload = () => {
        const side = Math.min(image.naturalWidth, image.naturalHeight);
        const sourceX = (image.naturalWidth - side) / 2;
        const sourceY = (image.naturalHeight - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext("2d");
        if (!context) return reject(new Error("Seu navegador não suporta processamento de imagem"));
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(image, sourceX, sourceY, side, side, 0, 0, 512, 512);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
