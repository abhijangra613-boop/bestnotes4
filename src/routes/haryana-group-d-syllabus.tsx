import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "../components/Layout";

export const Route = createFileRoute("/haryana-group-d-syllabus")({
  head: () => ({
    meta: [
      {
        title:
          "Haryana Group D Syllabus & Exam Pattern | BestNotes",
      },
      {
        name: "description",
        content:
          "Check Haryana Group D syllabus and subject-wise exam weightage. Complete syllabus for Haryana GK, General Awareness, General Science, Reasoning, Quantitative Ability, Hindi and English.",
      },
      {
        name: "keywords",
        content:
          "Haryana Group D syllabus, HSSC Group D syllabus, Haryana CET Group D syllabus, Haryana Group D exam pattern, Group D Haryana GK syllabus, Haryana Group D notes",
      },
      {
        name: "robots",
        content: "index, follow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://bestnotes.shop/haryana-group-d-syllabus",
      },
    ],
  }),

  component: HaryanaGroupDSyllabusPage,
});

const examPattern = [
  {
    subject: "General Awareness",
    weightage: "15%",
  },
  {
    subject: "General Science (Physics, Chemistry & Biology)",
    weightage: "15%",
  },
  {
    subject: "Reasoning",
    weightage: "10%",
  },
  {
    subject: "Quantitative Ability",
    weightage: "15%",
  },
  {
    subject: "English Language",
    weightage: "10%",
  },
  {
    subject: "Hindi Language",
    weightage: "10%",
  },
  {
    subject: "General Knowledge of Haryana",
    weightage: "25%",
  },
];

const syllabus = [
  {
    title: "General Awareness",
    weightage: "15%",
    description:
      "Questions relating to India and neighbouring countries, especially pertaining to History, Indian Polity & Constitution, Art & Culture and Geography.",
  },
  {
    title: "General Science",
    weightage: "15%",
    description:
      "General Science includes questions from Physics, Chemistry and Biology.",
  },
  {
    title: "Reasoning",
    weightage: "10%",
    description:
      "Alphabetical Order, Series, Coding-Decoding, Direction and Distance, Order and Ranking, Blood Relation, Analogy, Classification, Clock, Calendar, Mirror Image, Water Image, Syllogism, Sitting Arrangement, Inserting the Missing Characters, Statement and Assumption, Statement and Conclusion, Counting Figures, Non-Verbal Series, Analogy and Classification.",
  },
  {
    title: "Quantitative Ability",
    weightage: "15%",
    description:
      "Number System, Simplification, Decimals, Fractions, Relationship Between Numbers, LCM, HCF, Ratio & Proportion, Percentage, Roots, Average, Profit & Loss, Discount, Simple & Compound Interest, Mensuration, Partnership Business, Mixture and Allegation, Time & Work, Time & Distance, Trigonometry, Basic Algebra and Geometry.",
  },
  {
    title: "English Language",
    weightage: "10%",
    description:
      "English Grammar, Spot the Error, Fill in the Blanks, Synonyms, Antonyms, Spellings and Detecting Mis-spelt Words, Idioms & Phrases, Improvement of Sentences, Active and Passive Voice of Verbs, Direct and Indirect Narration, Shuffling of Sentence Parts and Tenses.",
  },
  {
    title: "Hindi Language",
    weightage: "10%",
    description:
      "वर्ण, स्वर, व्यंजन, शब्द, संज्ञा, सर्वनाम, विशेषण, क्रिया, क्रिया विशेषण, वचन, लिंग, कारक, काल, तद्भव-तत्सम शब्द, अलंकार, विकारी शब्द, अविकारी शब्द, पद, पदबंध, मुहावरे, लोकोक्तियाँ, संधि, उपसर्ग, प्रत्यय, समास, पर्यायवाची, विलोम व अनेकार्थी शब्द, वाक्य शोधन, विराम चिन्ह तथा अनेक शब्दों के लिए एक शब्द।",
  },
  {
    title: "General Knowledge of Haryana",
    weightage: "25%",
    description:
      "General awareness of Haryana including History, Literature, Geography, Economy, Civics, Polity, Environment, Art, Culture, Customs, Society, Current Affairs and important events of Haryana.",
  },
];

function HaryanaGroupDSyllabusPage() {
  return (
    <Page>
      <article className="container-page py-12 md:py-16 max-w-5xl">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-muted-foreground mb-6"
        >
          <Link to="/" className="hover:text-primary">
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>Haryana Group D Syllabus</span>
        </nav>

        {/* Hero */}
        <header className="max-w-4xl">
          <span className="badge-primary">
            Haryana Group D
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Haryana Group D Syllabus & Exam Pattern
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Check the complete Haryana Group D subject-wise
            syllabus and weightage. The syllabus covers
            General Awareness, General Science, Reasoning,
            Quantitative Ability, English, Hindi and General
            Knowledge of Haryana.
          </p>
        </header>

        {/* Quick Info */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            label="Exam"
            value="Haryana Group D"
          />

          <InfoCard
            label="Haryana GK"
            value="25% Weightage"
          />

          <InfoCard
            label="Subjects"
            value="7 Sections"
          />

          <InfoCard
            label="Computer"
            value="Not Included"
          />
        </section>

        {/* Exam Pattern */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            Haryana Group D Exam Pattern & Weightage
          </h2>

          <p className="mt-3 text-muted-foreground leading-relaxed">
            The subject-wise distribution below shows the
            percentage weightage assigned to each section of
            the Haryana Group D syllabus.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4 font-semibold">
                    Subject
                  </th>

                  <th className="p-4 font-semibold">
                    Weightage
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
                      {item.weightage}
                    </td>
                  </tr>
                ))}

                <tr className="border-t border-border bg-muted/50 font-bold">
                  <td className="p-4">
                    Total
                  </td>

                  <td className="p-4">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Subject-wise syllabus */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            Haryana Group D Subject-Wise Syllabus
          </h2>

          <p className="mt-3 text-muted-foreground">
            Check the topics covered under each subject of
            the Group D syllabus.
          </p>

          <div className="mt-8 grid gap-5">
            {syllabus.map((item) => (
              <div
                key={item.title}
                className="card-soft p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <span className="text-sm font-semibold text-primary">
                    {item.weightage} Weightage
                  </span>
                </div>

                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <section className="mt-16">
          <div className="card-soft p-6">
            <h2 className="text-2xl font-bold">
              Important Note
            </h2>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              Computer is not listed as a separate subject
              in this Group D syllabus. Candidates should
              focus their preparation on the seven sections
              listed above according to their respective
              weightage.
            </p>
          </div>
        </section>

        {/* Preparation */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold">
            How to Prepare for Haryana Group D
          </h2>

          <div className="mt-6 card-soft p-6">
            <ol className="space-y-4 list-decimal pl-5 text-muted-foreground">
              <li>
                Give special attention to Haryana General
                Knowledge as it carries 25% weightage.
              </li>

              <li>
                Prepare General Awareness and General Science
                thoroughly as each section carries 15%
                weightage.
              </li>

              <li>
                Practice Quantitative Ability questions
                regularly to improve speed and accuracy.
              </li>

              <li>
                Practice Reasoning topics including
                coding-decoding, series, blood relations,
                direction, ranking and non-verbal reasoning.
              </li>

              <li>
                Revise Hindi and English grammar topics
                regularly.
              </li>

              <li>
                Study Haryana History, Geography, Economy,
                Polity, Culture and Current Affairs for the
                Haryana GK section.
              </li>
            </ol>
          </div>
        </section>

        {/* Notes CTA */}
        <section className="mt-16 card-soft p-8 md:p-10 text-center">
          <span className="badge-success">
            Group D Study Material
          </span>

          <h2 className="mt-4 text-3xl font-bold">
            Prepare with Haryana Group D Notes
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Explore subject-wise Haryana Group D notes for
            Haryana GK, General Awareness, General Science,
            Mathematics, Reasoning, Hindi and English.
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
            Haryana Group D Syllabus FAQs
          </h2>

          <div className="mt-6 space-y-4">
            <FAQ
              question="What subjects are included in the Haryana Group D syllabus?"
              answer="The syllabus includes General Awareness, General Science, Reasoning, Quantitative Ability, English Language, Hindi Language and General Knowledge of Haryana."
            />

            <FAQ
              question="What is the weightage of Haryana GK in Group D?"
              answer="General Knowledge of Haryana carries 25% weightage."
            />

            <FAQ
              question="Is Computer included in the Haryana Group D syllabus?"
              answer="Computer is not listed as a separate subject in the Group D syllabus used for this page."
            />

            <FAQ
              question="What is included in Haryana General Knowledge?"
              answer="The Haryana GK section includes Haryana History, Literature, Geography, Economy, Civics, Polity, Environment, Art, Culture, Customs, Society, Current Affairs and important events."
            />
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 text-xs text-muted-foreground leading-relaxed border-t border-border pt-6">
          BestNotes is an independent educational platform.
          Candidates should always check the latest official
          recruitment notification and syllabus for any
          subsequent changes before appearing for an
          examination.
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