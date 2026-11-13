"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImagePlaceholder } from "./image-placeholder";

type ImageWithFallbackProps = Omit<ImageProps, "onError" | "alt"> & {
  alt: string;
  /** Nhãn khung thay thế; mặc định "Ảnh minh hoạ – sẽ thay ảnh thật". */
  placeholderLabel?: string;
  /** Class cho khung thay thế (mặc định lấp đầy khung cha). */
  placeholderClassName?: string;
};

/**
 * `next/image` có dự phòng: file ảnh chưa có (404) hoặc tải lỗi → hiện `ImagePlaceholder` thay vì ảnh vỡ.
 * Dùng cho ảnh sản phẩm/tin tức mà `src/data/*.ts` trỏ tới nhưng có thể chưa đặt file.
 */
export function ImageWithFallback({ placeholderLabel, placeholderClassName, alt, ...props }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <ImagePlaceholder alt={alt} label={placeholderLabel} className={placeholderClassName} />;
  }
  return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
