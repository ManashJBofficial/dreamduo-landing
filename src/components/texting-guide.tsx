import Image from "next/image";
import questions from "@/content/assets/texting-questions.json";
import photos from "@/content/assets/texting-questions-photos.json";
import { TextQuestionPicker } from "@/components/text-question-picker";
import { getLocalImageSize } from "@/lib/images";

export function TextingQuestionPicker() {
  return <TextQuestionPicker questions={questions} />;
}

export function TextingQuestions() {
  return <ol className="my-8 list-decimal space-y-5 pl-7 text-[17px] leading-relaxed text-slate-800 marker:font-bold marker:text-rose-700">
    {questions.map(question => <li key={question} className="pl-2">{question}</li>)}
  </ol>;
}

export function TextingStockPhoto() {
  const photo = photos.connection;
  const src = `/blog/dirty-questions-to-ask-your-partner-over-text/${photo.file}`;
  return <figure className="my-8">
    <Image src={src} alt={photo.alt} {...getLocalImageSize(src)} sizes="(max-width: 1024px) 100vw, 48rem" loading="lazy" className="h-auto w-full rounded-xl" />
  </figure>;
}
