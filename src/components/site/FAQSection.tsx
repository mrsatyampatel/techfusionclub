import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFaqs: FAQItem[] = [
  {
    question: "What is Tech Fusion Club (TFC) at SRMU?",
    answer:
      "Tech Fusion Club (TFC) is the premier official student-led technical club at Shri Ramswaroop Memorial University (SRMU), Lucknow. Founded in 2019, TFC drives campus software culture, hands-on engineering, open source, and national hackathons.",
  },
  {
    question: "Who can join Tech Fusion Club at Shri Ramswaroop Memorial University?",
    answer:
      "Any student enrolled at Shri Ramswaroop Memorial University (SRMU) — regardless of engineering department, study year, or prior coding experience. We conduct beginner-friendly onboarding bootcamps every semester across Web Dev, AI/ML, App Dev, Cybersecurity, Cloud, and Design.",
  },
  {
    question: "Is there any membership fee to join TFC SRMU?",
    answer:
      "No. Tech Fusion Club is a university-recognized student technical society under the Head Technical Society, SRMU. Membership and internal learning bootcamps are completely free for all students.",
  },
  {
    question: "What is Viveka (The Intelligence) fest at SRMU?",
    answer:
      "Viveka is the university's flagship annual national technical festival organized entirely by Tech Fusion Club. It features 36-hour hackathons, algorithmic coding battles, AI project exhibitions, robotics arenas, and technical workshops with industry mentors.",
  },
  {
    question: "Where is Tech Fusion Club and SRMU located?",
    answer:
      "Tech Fusion Club operates at Shri Ramswaroop Memorial University (SRMU), situated on Deva Road, Lucknow / Barabanki, Uttar Pradesh 225003. Coding meetups and labs take place in the CS engineering building and central computer facilities.",
  },
  {
    question: "How does TFC help students with internships and engineering careers?",
    answer:
      "TFC emphasizes shipping real production software, contributing to open source, and building collaborative teamwork experience. Club alumni work as software engineers, cloud architects, and developers across top tech firms.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border/60">
      {homeFaqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary-glow"
            >
              <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180 text-primary-glow",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
