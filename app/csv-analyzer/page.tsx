'use client'
import React, { useRef, useState } from "react";
import Papa from "papaparse";

const PAGE_SIZE = 10;

type RowData = Record<string, string>;

function CSVUpload({ onData }: { onData: (data: RowData[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: RowData[]; }) => {
        if (Array.isArray(results.data)) {
          onData(results.data as RowData[]);
        } else {
          onData([]);
        }
      },
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    handleFile(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
      onDragOver={e => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={e => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <p className="mb-2 text-gray-800">Drag and drop your CSV file here, or</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => inputRef.current?.click()}
      >
        Select File
      </button>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  );
}

function DataTable({ data }: { data: RowData[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = data.filter(row =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!data.length) return null;
  const columns = Object.keys(data[0]);

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded w-full sm:w-64 text-gray-800 bg-white"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="flex gap-2 items-center justify-end">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >Prev</button>
          <span className="mx-2">Page {page} of {totalPages}</span>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >Next</button>
        </div>
      </div>
      <div className="overflow-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col} className="px-4 py-2 border-b bg-gray-50 text-left text-sm font-semibold text-gray-900">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-100">
                {columns.map(col => (
                  <td key={col} className="px-4 py-2 border-b text-sm text-gray-800">{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CSVAnalyzerPage() {
  const [csvData, setCsvData] = useState<RowData[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">CSV Analyzer</h1>
      <div className="w-full max-w-2xl">
        <CSVUpload onData={setCsvData} />
        <DataTable data={csvData} />
      </div>
    </main>
  );
}
