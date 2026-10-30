"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, RotateCw, Check, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { uploadAsset } from "@/lib/supabase/storage";
import { cn, hasValidImage } from "@/lib/utils";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "heroes" | "projects" | "blog" | "general";
  recommendedSize?: string;
  aspectRatio?: "arch" | "cover" | "square";
  helperText?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  folder = "general",
  recommendedSize = "1920 × 1080 px (WebP, PNG, JPG)",
  aspectRatio = "cover",
  helperText,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (PNG, JPG, WebP, SVG).");
      return;
    }

    setUploading(true);
    setError(null);

    const { url, error: uploadError } = await uploadAsset(file, folder);

    setUploading(false);

    if (uploadError) {
      setError(uploadError);
      return;
    }

    if (url) {
      onChange(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setShowUrlInput(false);
      setCustomUrl("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657]">
          {label}
        </label>
        <span className="text-[10px] font-mono text-[#a9937c]">
          {recommendedSize}
        </span>
      </div>

      {hasValidImage(value) ? (
        /* Image Preview Box */
        <div className="relative border border-[#e8e2d9] rounded-xl overflow-hidden bg-[#faf8f5] group">
          <div
            className={cn(
              "relative w-full flex items-center justify-center overflow-hidden bg-[#f4f0e8]",
              aspectRatio === "arch" && "h-64 sm:h-72 arch-frame max-w-[260px] mx-auto my-3",
              aspectRatio === "cover" && "h-48 sm:h-60",
              aspectRatio === "square" && "w-32 h-32 rounded-xl mx-auto my-3"
            )}
          >
            {value.startsWith("http") || value.startsWith("data:") || value.startsWith("/") ? (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <ImageIcon className="w-8 h-8 text-[#a9937c] mb-1" />
                <span className="text-xs font-mono text-[#7d6657] truncate max-w-[200px]">
                  {value}
                </span>
              </div>
            )}
          </div>

          {/* Action Overlay */}
          <div className="p-3 bg-white border-t border-[#e8e2d9] flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-[#634f43] truncate max-w-[260px]">
              {value.startsWith("data:") ? "Image Asset (Loaded)" : value.split("/").pop()}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] hover:bg-[#f4f0e8] text-xs font-mono text-[#201a16] transition-colors"
              >
                <RotateCw className={cn("w-3 h-3 text-[#7d6657]", uploading && "animate-spin")} />
                <span>{uploading ? "Uploading..." : "Replace"}</span>
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1.5 rounded-lg border border-[#e8e2d9] hover:bg-red-50 text-[#7d6657] hover:text-red-600 transition-colors"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all bg-[#faf8f5]/60 flex flex-col items-center justify-center gap-3 cursor-pointer",
            dragActive
              ? "border-[#201a16] bg-[#f4f0e8]"
              : "border-[#e8e2d9] hover:border-[#ded2c0] hover:bg-[#faf8f5]"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-10 h-10 rounded-full bg-white border border-[#e8e2d9] flex items-center justify-center shadow-sm">
            {uploading ? (
              <RotateCw className="w-4 h-4 text-[#201a16] animate-spin" />
            ) : (
              <Upload className="w-4 h-4 text-[#7d6657]" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-[#201a16]">
              {uploading ? "Uploading image..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-[11px] text-[#7d6657] font-mono">
              WebP, PNG, JPG, or SVG
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-[11px] font-mono text-[#7d6657] hover:text-[#201a16] underline underline-offset-2 flex items-center gap-1"
            >
              <LinkIcon className="w-3 h-3" />
              <span>Or enter image URL</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Direct URL Input Popup */}
      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} className="flex gap-2 p-3 bg-white border border-[#e8e2d9] rounded-xl shadow-sm">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 px-3 py-1.5 rounded-lg border border-[#e8e2d9] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="px-2 py-1.5 rounded-lg border border-[#e8e2d9] text-[#7d6657] hover:bg-[#faf8f5]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {/* Helper text or Error message */}
      {error && (
        <p className="text-xs text-red-600 font-mono flex items-center gap-1 mt-1">
          <span>Error: {error}</span>
        </p>
      )}
      {helperText && !error && (
        <p className="text-[11px] text-[#7d6657] leading-relaxed">
          {helperText}
        </p>
      )}
    </div>
  );
}
