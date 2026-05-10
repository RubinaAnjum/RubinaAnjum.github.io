"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-700 transition-colors"
    >
      <Printer size={15} />
      Print / Save PDF
    </button>
  );
}
