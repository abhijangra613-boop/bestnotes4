import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/haryana-group-d-syllabus")({
  head: () => ({
    meta: [
      {
        title:
          "Haryana Group D Syllabus 2026 & Exam Pattern | BestNotes",
      },
      {
        name: "description",
        content:
          "Check Haryana CET Group D Syllabus 2026, exam pattern, subject-wise syllabus, Haryana GK, Maths, Reasoning, Science, Hindi and English topics.",
      },
      {
        name: "keywords",
        content:
          "Haryana Group D syllabus 2026, HSSC Group D syllabus, Haryana CET Group D exam pattern, Group D syllabus Haryana, HSSC CET syllabus",
      },
      {
        name: "robots",
        content: "index, follow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.bestnotes.shop/haryana-group-d-syllabus",
      },
    ],
  }),

  component: HaryanaGroupDSyllabusPage,
});

const examPattern = [
  {
    subject: "Haryana General Knowledge",
    questions: 25,
    marks: 25,
  },
  {
    subject: "General Awareness",
    questions: 15,
    marks: 15,
  },
  {
    subject: "General Science",
    questions: 15,
    marks: 15,
  },
  {
    subject: "Mathematics / Quantitative Ability",
    questions: 15,
    marks: 15,
  },
  {
    subject: "Reasoning",
    questions: 10,
    marks: 10,
  },
  {
    subject: "Hindi",
    questions: 10,
    marks: 10,
  },
  {
    subject: "English",
    questions: 10,
    marks: 10,
  },
];

const syllabus = [
  {
    title: "Haryana General Knowledge",
    description:
      "History of Haryana, geography, economy, polity, civics, environment, art and culture, literature, customs, society, important events and Haryana current affairs.",
  },
  {
    title: "General Awareness",
    description:
      "Indian history, geography, Indian polity and Constitution, art and culture, important national events and general awareness related to India and neighbouring countries.",
  },
  {
    title: "General Science",
    description:
      "Basic concepts of Physics, Chemistry and Biology, including science topics generally studied up to the secondary-school level.",
  },
  {
    title: "Mathematics / Quantitative Ability",
    description:
      "Number system, simplification, decimals, fractions, LCM and HCF, ratio and proportion, percentage, average, profit and loss, discount, simple and compound interest, time and work, time and distance, mensuration, algebra and geometry.",
  },
  {
    title: "Reasoning Ability",
    description:
      "Series, analogy, classification, coding-decoding, blood relations, direction sense, ranking, logical reasoning, clock and calendar, syllogism and other reasoning-based questions.",
  },
  {
    title: "Hindi Language",
    description:
      "Hindi grammar, vocabulary, संधि, समास, उपसर्ग, प्रत्यय, पर्यायवाची, विलोम शब्द, मुहावरे, लोकोक्तियां, वाक्य शुद्धि and related language topics.",
  },
  {
    title: "English Language",
    description:
      "English grammar, vocabulary, tenses, articles, prepositions, synonyms and antonyms, error spotting, active and passive voice, direct and indirect speech and comprehension.",
  },
];

function HaryanaGroupDSyllabusPage() {
  return (
    <Page>
      <article className="container-page py-12 md:py-16 max-w-5xl">

        {/* BREADCRUMB */}

        <nav
          aria-label="Breadcrumb"
          className="text-sm text-muted-foreground mb-6"
        >
          <Link
            to="/"
            className="hover:text-primary"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>
            Haryana Group D Syllabus 2026
          </span>
        </nav>


        {/* HERO */}

        <header className="max-w-3xl">

          <span className="badge-primary">
            Updated for 2026
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Haryana Group D Syllabus 2026 & Exam Pattern
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Check the Haryana CET Group D syllabus and exam
            pattern for 2026. Understand the subject-wise
            syllabus for Haryana GK, General Awareness,
            General Science, Mathematics, Reasoning, Hindi
            and English before starting your preparation.
          </p>

        </header>


        {/* QUICK INFORMATION */}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            label="Exam"
            value="Haryana CET Group D"
          />

          <InfoCard
            label="Conducting Body"
            value="HSSC"
          />

          <InfoCard
            label="Total Questions"
            value="100"
          />

          <InfoCard
            label="Total Marks"
            value="100"
          />

        </section>


        {/* EXAM PATTERN */}

        <section className="mt-16">

          <h2 className="text-3xl font-bold">
            Haryana Group D Exam Pattern 2026
          </h2>

          <p className="mt-3 text-muted-foreground leading-relaxed">
            The Group D examination covers Haryana-specific
            general knowledge along with general awareness,
            science, mathematics, reasoning, Hindi and
            English. Candidates should verify the latest
            official notification before appearing for the
            examination.
          </p>


          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">

            <table className="w-full text-left">

              <thead className="bg-muted">

                <tr>

                  <th className="p-4 font-semibold">
                    Subject
                  </th>

                  <th className="p-4 font-semibold">
                    Questions
                  </th>

                  <th className="p-4 font-semibold">
                    Marks
                  </th>

                </tr>

              </thead>


              <tbody>

                {examPattern.map((item) => (

                  <tr
                    key={item.subject}
                    className="border-t border-border"
                  >

                    <td className="p-4 font-medium">
                      {item.subject}
                    </td>

                    <td className="p-4">
                      {item.questions}
                    </td>

                    <td className="p-4">
                      {item.marks}
                    </td>

                  </tr>

                ))}


                <tr className="border-t border-border bg-muted/50 font-bold">

                  <td className="p-4">
                    Total
                  </td>

                  <td className="p-4">
                    100
                  </td>

                  <td className="p-4">
                    100
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>


        {/* SYLLABUS */}

        <section className="mt-16">

          <h2 className="text-3xl font-bold">
            Haryana Group D Subject-Wise Syllabus
          </h2>

          <p className="mt-3 text-muted-foreground">
            Prepare each subject systematically according
            to the examination syllabus.
          </p>


          <div className="mt-8 grid gap-5">

            {syllabus.map((item) => (

              <div
                key={item.title}
                className="card-soft p-6"
              >

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* PREPARATION */}

        <section className="mt-16">

          <h2 className="text-3xl font-bold">
            How to Prepare for Haryana Group D 2026
          </h2>

          <div className="mt-6 card-soft p-6">

            <ol className="space-y-4 list-decimal pl-5 text-muted-foreground">

              <li>
                Understand the complete syllabus and exam
                pattern before beginning preparation.
              </li>

              <li>
                Give special attention to Haryana General
                Knowledge and Haryana current affairs.
              </li>

              <li>
                Practice Mathematics and Reasoning questions
                regularly to improve speed.
              </li>

              <li>
                Revise basic Physics, Chemistry and Biology
                concepts.
              </li>

              <li>
                Practice Hindi and English grammar questions
                and previous-year exam questions.
              </li>

              <li>
                Attempt mock tests and analyse your mistakes
                before the examination.
              </li>

            </ol>

          </div>

        </section>


        {/* NOTES CTA */}

        <section className="mt-16 card-soft p-8 md:p-10 text-center">

          <span className="badge-success">
            Study Material
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            Prepare with Haryana Group D Notes
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Explore subject-wise Haryana Group D notes in
            Hindi and English for Haryana GK, Mathematics,
            Reasoning, General Science, Current Affairs and
            more.
          </p>

          <Link
            to="/"
            hash="notes"
            className="btn-primary mt-6 inline-flex"
          >
            View Group D Notes
          </Link>

        </section>


        {/* FAQ */}

        <section className="mt-16">

          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>


          <div className="mt-6 space-y-4">

            <FAQ
              question="What is the Haryana Group D syllabus for 2026?"
              answer="The syllabus includes Haryana General Knowledge, General Awareness, General Science, Mathematics or Quantitative Ability, Reasoning, Hindi and English."
            />

            <FAQ
              question="How many questions are there in the Haryana Group D exam?"
              answer="The exam pattern commonly referenced for Haryana CET Group D consists of 100 questions carrying a total of 100 marks. Candidates should always check the latest HSSC notification for final examination instructions."
            />

            <FAQ
              question="Which subject is important for Haryana Group D preparation?"
              answer="Haryana General Knowledge is an important part of the syllabus. Candidates should prepare Haryana history, geography, polity, economy, culture and current affairs along with the other subjects."
            />

            <FAQ
              question="Where can I get Haryana Group D notes?"
              answer="BestNotes provides subject-wise Group D study notes in Hindi and English, including Haryana GK, Mathematics, Reasoning, General Science and Current Affairs."
            />

          </div>

        </section>


        {/* DISCLAIMER */}

        <div className="mt-12 text-xs text-muted-foreground leading-relaxed border-t border-border pt-6">

          BestNotes is an independent educational platform
          and is not affiliated with the Haryana Staff
          Selection Commission. Exam details may change.
          Candidates should verify the latest syllabus,
          eligibility criteria and examination instructions
          from the official HSSC website.

        </div>

      </article>
    </Page>
  );
}


function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="card-soft p-5">

      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>

      <div className="mt-2 font-semibold">
        {value}
      </div>

    </div>

  );

}


function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {

  return (

    <details className="card-soft p-5">

      <summary className="font-semibold cursor-pointer">
        {question}
      </summary>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {answer}
      </p>

    </details>

  );

}