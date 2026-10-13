import { Download, Printer } from "lucide-react";

interface ArticleDownloadProps {
  title: string;
  description: string;
  file: string;
  printable: string;
}

export function ArticleDownload({ title, description, file, printable }: ArticleDownloadProps) {
  return (
    <aside aria-label={title} className="my-8 rounded-2xl border border-rose-200 bg-rose-50/60 p-5 sm:p-6">
      <p className="!mt-0 !text-lg font-bold !text-slate-900">{title}</p>
      <p className="!mt-2 !text-sm !leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a href={file} download className="inline-flex items-center gap-2 rounded-lg bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-700"><Download size={16} aria-hidden="true" />Download text file</a>
        <a href={printable} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-800 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-700"><Printer size={16} aria-hidden="true" />Open printable version</a>
      </div>
    </aside>
  );
}
