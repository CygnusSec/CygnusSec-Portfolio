import React from "react";

const pdfFiles = [
  { name: "Create and setup an environment", file: "/pdfs/Lab_work_1.pdf" },
  { name: "Security Threats and Scanning", file: "/pdfs/Lab_work_02.pdf" },
  { name: "Firewall (Iptables)", file: "/pdfs/Lab_3_iptables.pdf" },
  { name: "Snort", file: "/pdfs/Lab_work_04.pdf" },
  { name: "Snort Rule", file: "/pdfs/snort_rule.txt" },
  { name: "Practice report", file: "/pdfs/Lab_Report_Final.pdf" },
];

const PdfList = () => {
  return (
    <div className="bg-glass shadow-md rounded-xl p-6 w-full max-w-lg">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        Downloadable Resources
      </h3>

      <ul className="space-y-3">
        {pdfFiles.map((pdf) => (
          <li
            key={pdf.name}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{pdf.name}</span>
            <a href={pdf.file} download className="btn-download">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfList;
