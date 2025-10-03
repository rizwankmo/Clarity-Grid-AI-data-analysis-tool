'use client'
import React, { useRef, useState } from "react";
import Papa from "papaparse";

const PAGE_SIZE = 10;

type RowData = Record<string, string>;

function CSVUpload({ onData }: { onData: (data: RowData[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // TODO: Implement CSV upload UI and logic here
  return (
    <div>
      {/* CSV upload component UI goes here */}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to CSV Grid</h1>
      <p className="text-lg text-gray-800 mb-8 text-center max-w-xl">
        Easily upload, analyze, and visualize your CSV data. Start by navigating to the CSV Analyzer!
      </p>
    </main>
  );
}
