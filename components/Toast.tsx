"use client";

export default function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  if (!message) return null;

  setTimeout(() => onClose(), 3000);

  return (
    <div className="fixed bottom-6 right-6 z-[80] rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  );
}
