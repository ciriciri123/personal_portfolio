export type ResearchMedia = {
  id: string;
  type: "image" | "video" | "pdf";
  src: string;
  thumbnail?: string;
  poster?: string;
  alt?: string;
  caption?: string;
};

export type ResearchResourceLink = {
  id: string;
  label: string;
  type: "paper" | "doi" | "video" | "presentation" | "dataset" | "supplementary" | "document" | "other";
  url: string;
  description?: string;
  external?: boolean;
};

export type ResearchCategory = "Machine Learning & AI" | "Environmental Science" | "Biomedical / Life Science" | "Other";

export type ResearchWork = {
  id: string;
  title: string;
  area: string;
  category: ResearchCategory;
  objective: string;
  methodology: string;
  role?: string;
  contribution?: string[];
  findings?: string;
  status?: string;
  year?: string;
  media: ResearchMedia[];
  resources?: ResearchResourceLink[];
};

export const RESEARCH_DATA: ResearchWork[] = [
  {
    id: "floodcast-forecasting",
    title: "Enhancing Lead-Time Flood Forecasting in Jakarta via Random Forest with ENSO and IOD Teleconnection Features",
    area: "Machine Learning · Climate Science · Flood Forecasting",
    category: "Machine Learning & AI",
    year: "2026",
    status: "Conference Research · ICICYTA 2026",
    objective: "Can lagged ENSO and IOD teleconnection indices improve monthly flood prediction in Jakarta, while also identifying which climate signals provide useful lead-time information?",
    methodology: "A Random Forest classification pipeline was developed using hydrometeorological variables together with lagged ENSO (ONI, SOI) and IOD (DMI) features. Four feature configurations were compared — baseline, ENSO, IOD, and combined ENSO+IOD — with Bayesian hyperparameter optimization using Optuna and model interpretation through SHAP.",
    role: "Researcher · Conceptualization · Investigation · Data Curation · Writing — Original Draft · Visualization",
    contribution: [
      "Helped conceptualize the research direction and research questions.",
      "Contributed to investigation and data curation for the study.",
      "Wrote the original draft of the research paper.",
      "Created visualizations to communicate model performance and findings."
    ],
    findings: "IOD features consistently improved model performance, with the optimal configuration reaching an AUC of 0.7459, accuracy of 0.6557, and F1-score of 0.6866. SHAP analysis identified DMI_lag2, the two-month-lagged IOD index, as the most important teleconnection feature, while ENSO features reduced performance in the Jakarta setting.",
    media: [
      {
        id: "fc-paper",
        type: "image",
        src: "/assets/research/EnhancingFloodForecasting_paper.png",
        caption: "Research Paper"
      },
      {
        id: "fc-conference",
        type: "image",
        src: "/assets/research/EnhancingFloodForecasting_conference.png",
        caption: "ICICYTA 2026 Conference"
      }
    ],
    resources: [
      {
        id: "fc-paper-pdf",
        label: "Paper (PDF)",
        type: "paper",
        url: "https://drive.google.com/file/d/169-K-fScZilqWyWVQjXLfDK7I83sTixK/view?usp=sharing",
        external: true
      },
      {
        id: "fc-shorts",
        label: "Shorts Explanation (Social Media Style)",
        type: "video",
        url: "https://youtube.com/shorts/K8Ztdogr_rw?si=aTDLxuXs18Kz1dWH",
        external: true
      }
    ]
  },
  {
    id: "cataract-detection-web-app",
    title: "Evaluation of Supervised Machine Learning Model for Cataract Detection Implementation in Web Application",
    area: "Machine Learning & AI · Healthcare · Web Application",
    category: "Machine Learning & AI",
    year: "2023–2024",
    status: "Research & Development Project",
    objective: "Can a supervised machine-learning model be used to identify cataracts from medical images and be implemented as an accessible web application for healthcare support?",
    methodology: "A research-and-development process was combined with a classical Software Development Life Cycle approach. The research developed and evaluated an SVM-based cataract classifier, integrated the model into a Flask web application, and assessed the product through alpha testing and professional beta evaluation.",
    role: "Researcher · Concept Development · Background & Problem Framing · Web Developer",
    contribution: [
      "Helped find and refine the core research idea.",
      "Built the research background and problem statement.",
      "Fully developed the web application.",
      "Helped design and build the user input / symptom form."
    ],
    findings: "The final prototype model reported 91.8% accuracy, 95.1% precision, 89.2% recall, and 91.8% F1-score. The web application successfully connected the machine-learning model to an accessible product interface, although the report identified the model itself as an area requiring further improvement.",
    media: [
      {
        id: "cd-paper",
        type: "image",
        src: "/assets/research/CataractDetection_paper.png",
        caption: "Research Report"
      }
    ],
    resources: [
      {
        id: "cd-paper-pdf",
        label: "Paper (PDF)",
        type: "paper",
        url: "https://drive.google.com/file/d/1LLuP3eWutfsns9vc5cKgeiWSS4TgmFdS/view?usp=sharing",
        external: true
      }
    ]
  },
  {
    id: "elephantopus-scaber-antibacterial",
    title: "In Vitro and In Silico Test of Antibacterial Properties of Elephantopus scaber Against Gram-Negative Escherichia coli Bacteria",
    area: "Biomedical / Life Science · Microbiology · Computational Biology",
    category: "Biomedical / Life Science",
    year: "2023",
    status: "Award-Winning Student Research",
    objective: "Can Elephantopus scaber extract demonstrate antibacterial activity against Escherichia coli and what compounds may contribute to that activity at the molecular level?",
    methodology: "The research combined wet-lab antibacterial testing with phytochemical screening and in-silico molecular docking. E. scaber leaves were extracted using Soxhlet extraction, evaluated through agar-disk diffusion, screened for phytochemicals, and analyzed through molecular docking against the DNA Gyrase protein of E. coli.",
    role: "Lead Research Contributor · Background & Problem Framing · Methodology · Laboratory Experimentation · Computational Analysis · Results Interpretation · Conclusion Development",
    contribution: [
      "I contributed to most stages of the research, from refining the background and research problem through methodology development, laboratory experiments, software-based analysis, interpretation of results, and development of the conclusions."
    ],
    findings: "The extract produced inhibition zones against E. coli, with the largest reported diameter reaching 13 mm for concentrations from 7,500–15,000 ppm. Phytochemical screening identified flavonoids, saponins, steroids, and tannins, while molecular docking identified Luteolin, Quercetin-7-olate, and Quercetin as the three strongest-binding flavonoid derivatives among those tested.",
    media: [
      {
        id: "es-paper",
        type: "image",
        src: "/assets/research/InVitroAndInSilicoTest_paper.png",
        caption: "Research Paper"
      },
      {
        id: "es-video",
        type: "video",
        src: "/assets/research/InVitroAndInSilicoTest_video.mp4",
        caption: "ISPO Presentation Video"
      },
      {
        id: "es-cert-ispo",
        type: "image",
        src: "/assets/research/InVitroAndInSilicoTest_certificate_ispo.jpg",
        caption: "Bronze Medal - ISPO 2023"
      },
      {
        id: "es-cert-ifest",
        type: "image",
        src: "/assets/research/InVitroAndInSilicoTest_certificate_ifest.jpg",
        caption: "Gold Medal - iFest 2023"
      }
    ],
    resources: [
      {
        id: "es-paper-pdf",
        label: "Paper (PDF)",
        type: "paper",
        url: "https://drive.google.com/file/d/1L51eBbWIvVP8WNagyEP7SpQvf5FNoA4N/view?usp=sharing",
        external: true
      },
      {
        id: "es-video-link",
        label: "ISPO Video",
        type: "video",
        url: "https://www.youtube.com/watch?v=v31L9mJvvkY",
        external: true
      }
    ]
  }
];
