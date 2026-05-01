import React from "react";

const pdfFiles = [
  { name: "Create and setup an environment", file: "/pdfs/Lab_work_1.pdf", size: "877 KB" },
  { name: "Security Threats and Scanning", file: "/pdfs/Lab_work_02.pdf", size: "8.3 MB" },
  { name: "Firewall (Iptables)", file: "/pdfs/Lab_3_iptables.pdf", size: "505 KB" },
  { name: "Snort IDS/IPS", file: "/pdfs/Lab_work_04.pdf", size: "268 KB" },
  { name: "Snort Rules Guide", file: "/pdfs/snort_rule.txt", size: "5.6 KB" },
  { name: "Final Lab Report", file: "/pdfs/Lab_Report.pdf", size: "163 KB" },
];

const PdfList = () => {
  return (
    <div className="bg-glass border border-green-500/30 rounded-xl p-6 w-full">
      <h3 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-2">
        <span>📚</span> Downloadable Resources
      </h3>

      <div className="space-y-3">
        {pdfFiles.map((pdf) => (
          <div
            key={pdf.name}
            className="flex justify-between items-center p-4 bg-black/30 rounded border border-green-500/20 hover:border-green-400/50 transition group"
          >
            <div className="flex-1">
              <span className="text-gray-300 group-hover:text-green-400 transition">
                {pdf.name}
              </span>
              <span className="text-gray-500 text-sm ml-3">
                ({pdf.size})
              </span>
            </div>
            <a 
              href={pdf.file} 
              download 
              className="btn-download flex items-center gap-2"
            >
              <span>⬇</span> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfList;
