export type CertificateMedia = {
  id: string;
  type: "image" | "pdf";
  src: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;
};

export type CertificateResourceLink = {
  id: string;
  label: string;
  type: "verification" | "credential" | "document" | "issuer" | "course" | "other";
  url: string;
  description?: string;
  external?: boolean;
};

export type CertificateType = "Qualification" | "Recognition";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  type: CertificateType;
  focus?: string[];
  description?: string;
  media: CertificateMedia[];
  resources?: CertificateResourceLink[];
  verificationUrl?: string;
};

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "ielts-academic-8",
    title: "IELTS Academic — Overall Band 8.0",
    issuer: "IELTS · British Council · IDP · Cambridge Assessment English",
    date: "28 November 2023",
    type: "Qualification",
    focus: ["English Proficiency", "Academic English", "Communication"],
    description: "An IELTS Academic qualification demonstrating advanced English-language proficiency, with an overall band score of 8.0 and a C1 CEFR level.\n\nScore Breakdown:\n- Listening: 8.5\n- Reading: 9.0\n- Writing: 6.5\n- Speaking: 7.0\n- Overall: 8.0\n- CEFR: C1",
    media: [
      {
        id: "ielts-report",
        type: "image",
        src: "/assets/certificates/IELTS.png",
        alt: "IELTS Academic Test Report Form showing an overall band score of 8.0",
        caption: "IELTS Academic Test Report Form — Overall Band 8.0"
      }
    ],
    resources: [
      {
        id: "ielts-trf",
        label: "IELTS Test Report Form Number",
        type: "credential",
        url: "#",
        description: "Official test report reference (23ID001748INTR161A) supplied for credential verification."
      }
    ]
  },
  {
    id: "scrimba-learn-javascript",
    title: "Learn JavaScript",
    issuer: "Scrimba",
    date: "29 August 2026",
    type: "Qualification",
    focus: ["JavaScript", "Web Development", "Programming"],
    description: "Completed Scrimba's Learn JavaScript course, consisting of 238 lessons and approximately 9.4 hours of learning.",
    media: [
      {
        id: "scrimba-javascript",
        type: "image",
        src: "/assets/certificates/scrimba_basicJavascript.png",
        alt: "Scrimba Certificate of Completion for Learn JavaScript",
        caption: "Scrimba — Learn JavaScript Certificate of Completion"
      }
    ]
  },
  {
    id: "hackathon-8-finalist",
    title: "Hackathon 8.0 — Finalist",
    issuer: "BNCC (Computer Club), BINUS University · TechnoScape",
    date: "30 May – 1 June 2025",
    type: "Recognition",
    focus: ["Hackathon", "Software Development", "AI", "Computer Vision", "Healthcare Technology"],
    description: "Recognized as a Finalist of Hackathon 8.0 as part of Team TB Jaya Makmur, competing under the theme “Hack the Horizon: Redefining Boundaries with Code.”\n\nThe team developed a healthcare-support concept designed to help hospitals handle patients with mild symptoms through symptom intake, AI-assisted preliminary assessment, and facial identity verification.",
    media: [
      {
        id: "hackathon-finalist",
        type: "image",
        src: "/assets/certificates/Hackathon_BNCC.png",
        alt: "Certificate of Finalist for Hackathon 8.0 awarded to Riccy Riandy Intan",
        caption: "Hackathon 8.0 — Certificate of Finalist"
      }
    ],
    resources: [
      {
        id: "hackathon-repository",
        label: "Hackathon Project Repository",
        type: "document",
        url: "https://github.com/ciriciri123/Hackathon8.0_TBJayaMakmur",
        description: "Project repository for the Hackathon 8.0 team project.",
        external: true
      }
    ]
  },
  {
    id: "ifest-2023-gold",
    title: "I-FEST² 2023 — Gold Medal",
    issuer: "I-FEST² / ATAST",
    date: "21 March 2023",
    type: "Recognition",
    focus: ["Scientific Research", "Engineering & Technology", "International Competition", "Biology"],
    description: "Awarded a Gold Medal at the International Festival of Science and Technology in Tunisia 2023 for scientific research.\n\nThe recognition is associated with my research project on the antibacterial properties of Elephantopus scaber against Escherichia coli.",
    media: [
      {
        id: "ifest-gold",
        type: "image",
        src: "/assets/certificates/ifest_2023.jpg",
        alt: "Gold Certificate of Achievement from the International Festival of Science and Technology in Tunisia 2023",
        caption: "I-FEST² 2023 — Gold Certificate of Achievement"
      }
    ],
    resources: [
      {
        id: "antibacterial-research",
        label: "Related Research",
        type: "document",
        url: "#",
        description: "Portfolio research entry for the associated antibacterial study."
      }
    ]
  },
  {
    id: "ispo-2023-bronze",
    title: "Indonesian Science Project Olympiad 2023 — Bronze Medalist",
    issuer: "Indonesian Science Project Olympiad · Eduversal Foundation",
    date: "24–26 February 2023",
    type: "Recognition",
    focus: ["Biology", "Scientific Research", "Science Competition"],
    description: "Recognized as a Bronze Medalist in the Biology branch of the Indonesian Science Project Olympiad 2023 Final.\n\nThe award is associated with my research project investigating the antibacterial properties of Elephantopus scaber against Escherichia coli.",
    media: [
      {
        id: "ispo-bronze",
        type: "image",
        src: "/assets/certificates/ispo_2023.jpg",
        alt: "ISPO 2023 Certificate of Achievement recognizing Riccy Riandy Intan as a Bronze Medalist in Biology",
        caption: "Indonesian Science Project Olympiad 2023 — Bronze Medalist"
      }
    ],
    resources: [
      {
        id: "ispo-verification",
        label: "Official ISPO Judging Document",
        type: "verification",
        url: "https://www.ispo.or.id/wp-content/uploads/2023/02/15-2-ISPO-SK-PENJURIAN-2023.docx.pdf",
        description: "Official ISPO 2023 judging document supplied for verification.",
        external: true
      }
    ],
    verificationUrl: "https://www.ispo.or.id/wp-content/uploads/2023/02/15-2-ISPO-SK-PENJURIAN-2023.docx.pdf"
  }
];
