export type ProjectMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  poster?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: string;
};

export type ProjectResourceLink = {
  id: string;
  label: string;
  type: "github" | "live" | "figma" | "video" | "document" | "report" | "demo" | "other";
  url: string;
  description?: string;
  external?: boolean;
};

export type ProjectCategory = "Machine Learning" | "UI/UX" | "Web" | "Other" | "Research" | "Data Analytics" | "Accessibility" | "Hackathon";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  type: string;
  oneLineProblem: string;
  description: string;
  role?: string;
  technologies: string[];
  media: ProjectMedia[];
  process: string[];
  outcome?: string[];
  year?: string;
  resources?: ProjectResourceLink[];
  links?: {
    github?: string;
    live?: string;
    figma?: string;
  };
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "political-bias-classifier",
    title: "Political Bias Classifier",
    category: "Machine Learning",
    type: "NLP / Machine Learning / Web Application",
    year: "2026",
    oneLineProblem: "A natural language processing system that analyzes news article titles and sources to classify political bias while exposing the reasoning context behind the prediction.",
    description: "Political Bias Classifier is a group project that combines classical NLP and machine learning into an interactive application for political-bias analysis. The system preprocesses article text, extracts linguistic and named-entity features, evaluates multiple classification models, and exposes the results through a Streamlit application.",
    role: "I contributed to the initial model framework and conceptualization of the system. I was responsible for outlining the feature extraction and text-processing approach that shaped the machine learning pipeline.",
    process: [
      "Text cleaning, tokenization, stop-word removal, and lemmatization",
      "TF-IDF n-gram features",
      "Word2Vec-based feature representation",
      "Named Entity Recognition using spaCy",
      "Combined feature representation for classification",
      "Comparison of Random Forest, Naive Bayes, Logistic Regression, and Support Vector Machine models",
      "Streamlit interface for text, URL, and file-based analysis"
    ],
    outcome: [
      "Random Forest evaluation: 96% accuracy",
      "0.96 macro F1-score",
      "0.9981 ROC-AUC",
      "Developed an interactive application that allows users to analyze article titles/sources, compare model predictions, inspect named entities, and export an analytical report."
    ],
    technologies: ["Python", "Streamlit", "scikit-learn", "NLTK", "spaCy", "Gensim", "pandas", "NumPy", "newspaper3k", "TF-IDF", "Word2Vec"],
    media: [
      {
        id: "pbc-demo",
        type: "video",
        src: "/assets/projects/PoliticalBiasClassifier_Demo.mp4",
        caption: "Application Demo",
      },
      {
        id: "pbc-explanation",
        type: "video",
        src: "/assets/projects/PoliticalBiasClassifier_Explanation.mp4",
        caption: "Project Explanation",
      }
    ],
    resources: [
      {
        id: "pbc-github",
        label: "GitHub",
        type: "github",
        url: "https://github.com/ciriciri123/PoliticalBiasClassifier/tree/main",
        external: true
      }
    ],
    links: {
      github: "https://github.com/ciriciri123/PoliticalBiasClassifier/tree/main"
    }
  },
  {
    id: "floodcast",
    title: "FloodCast",
    category: "Machine Learning",
    type: "Research / Machine Learning / Web Application",
    year: "2026",
    oneLineProblem: "A lead-time flood forecasting system for Jakarta that uses rainfall history and large-scale climate teleconnection features to estimate future flood risk.",
    description: "FloodCast is a research project investigating whether ENSO and IOD teleconnection features can improve monthly flood forecasting in DKI Jakarta. The project combines a classical Random Forest pipeline with lagged climate features, Bayesian hyperparameter optimization, SHAP-based interpretation, and a deployed web interface for prediction.\n\nThe work was developed as part of a research paper titled “Enhancing Lead-Time Flood Forecasting in Jakarta via Random Forest with ENSO and IOD Teleconnection Features”, which was accepted to the International Conference on Information and Communication Technology for Young Scientists and Academics (ICICYTA 2026).",
    role: "Conceptualization · Writing – Original Draft · Visualization · Data Curation · Investigation\n\nI contributed to the research direction, data preparation and investigation, visualization of findings, and the original manuscript development.",
    process: [
      "Curated flood, rainfall, ENSO, and IOD datasets",
      "Engineered lagged climate features across 1–6 months",
      "Compared baseline, ENSO-enhanced, IOD-enhanced, and combined feature sets",
      "Used Random Forest as the core forecasting model",
      "Applied Bayesian optimization with Optuna for hyperparameter tuning",
      "Used SHAP to interpret feature contributions",
      "Deployed the trained model through a Flask web application"
    ],
    outcome: [
      "Best documented configuration: rainfall + seasonality + lagged IOD (DMI) features",
      "AUC: 0.724",
      "F1-score: 0.687",
      "Accuracy: 0.656 on the chronological hold-out evaluation",
      "Deployed a functional web application that provides flood-risk predictions and displays the main SHAP drivers behind each prediction",
      "Research paper accepted to ICICYTA 2026"
    ],
    technologies: ["Python", "scikit-learn", "Random Forest", "Optuna", "SHAP", "pandas", "NumPy", "Matplotlib", "Flask", "joblib", "HTML/CSS/JavaScript"],
    media: [
      {
        id: "fc-image",
        type: "image",
        src: "/assets/projects/FloodCast.png",
        caption: "FloodCast Interface",
      }
    ],
    resources: [
      {
        id: "fc-github",
        label: "GitHub",
        type: "github",
        url: "https://github.com/ciriciri123/FloodCast",
        external: true
      },
      {
        id: "fc-report",
        label: "Paper Report (PDF)",
        type: "report",
        url: "https://drive.google.com/file/d/169-K-fScZilqWyWVQjXLfDK7I83sTixK/view?usp=sharing",
        external: true
      }
    ],
    links: {
      github: "https://github.com/ciriciri123/FloodCast"
    }
  },
  {
    id: "moneytalks",
    title: "MoneyTalks — Rupiah Banknote Detector",
    category: "Machine Learning",
    type: "Computer Vision / OCR / Web Application / Accessibility",
    year: "2026",
    oneLineProblem: "An accessibility-focused application that identifies Indonesian Rupiah banknotes from a camera feed and announces the detected denomination aloud.",
    description: "MoneyTalks is a team project built as an accessibility aid for blind and visually-impaired users. It combines computer vision and OCR into a decision-fusion pipeline, then delivers the result through a web application with Indonesian text-to-speech and model-management capabilities.",
    role: "I contributed to the conceptualization of the project and created the first draft of the web-development direction, helping translate the recognition pipeline into an accessible user-facing application.",
    process: [
      "ORB feature extraction and HSV color histograms",
      "Bag-of-Visual-Words representation with KMeans",
      "TF-IDF weighting and SVM classification",
      "Tesseract OCR for printed denomination recognition",
      "Levenshtein-based fuzzy matching for OCR results",
      "Decision fusion between computer vision and OCR predictions",
      "Confidence gating for uncertain detections",
      "Flask-based web application with text-to-speech",
      "Supabase persistence for scans, metadata, users, and model versions"
    ],
    outcome: [
      "Supports recognition of Indonesian Rupiah denominations from Rp1,000 to Rp100,000",
      "Provides spoken denomination output in Indonesian",
      "Includes a web application for live detection and testing",
      "Includes an admin panel for stored scans and model-version management"
    ],
    technologies: ["Python", "Flask", "OpenCV", "scikit-learn", "SVM", "KMeans", "ORB", "Tesseract OCR", "pytesseract", "NumPy", "joblib", "gTTS", "Supabase", "bcrypt", "pytest", "HTML/CSS/JavaScript"],
    media: [
      {
        id: "mt-demo",
        type: "video",
        src: "/assets/projects/MoneyTalks_Demo.mp4",
        caption: "Application Demo",
      },
      {
        id: "mt-explanation",
        type: "video",
        src: "/assets/projects/MoneyTalks_Explanation.mp4",
        caption: "Project Explanation",
      }
    ],
    resources: [
      {
        id: "mt-github",
        label: "GitHub",
        type: "github",
        url: "https://github.com/ciriciri123/MoneyTalks",
        external: true
      },
      {
        id: "mt-report",
        label: "Report (PDF)",
        type: "report",
        url: "https://docs.google.com/document/d/1gcm_NlEsEdWq25iliZO5n0-4l-ohGQ_b3k1mBqk0Zj4/edit?usp=sharing",
        external: true
      }
    ],
    links: {
      github: "https://github.com/ciriciri123/MoneyTalks"
    }
  },
  {
    id: "hospital-triage",
    title: "Hospital Triage & Identity Verification",
    category: "Web",
    type: "Healthcare / AI / Computer Vision / Hackathon",
    year: "2026",
    oneLineProblem: "A hospital-support interface designed to help handle patients with mild symptoms by collecting symptom information, generating an initial LLM-assisted assessment, and verifying patient identity through facial recognition.",
    description: "For Hackathon 8.0, our team developed a hospital-facing web interface intended to streamline the early handling of patients with mild symptoms. Patients provide their symptoms through a form, the system generates a possible illness assessment using an LLM, and facial verification is used to confirm identity so that the collected information can support faster doctor diagnosis.",
    role: "Project development and implementation within the team.",
    process: [
      "Patient symptom collection through a web form",
      "LLM-generated preliminary illness assessment",
      "Face detection using MTCNN",
      "Facial embeddings using FaceNet",
      "K-Nearest Neighbors classification for identity recognition",
      "Image processing using OpenCV and NumPy",
      "Patient/staff reporting and visualization using pandas and Matplotlib",
      "Flask-served web interface for interaction"
    ],
    outcome: [
      "Built a functional web interface for patient interaction and hospital workflow support",
      "Combined symptom intake, AI-assisted preliminary assessment, and facial identity verification in one concept",
      "Achieved a Top 15 placement in Hackathon 8.0"
    ],
    technologies: ["Python", "Flask", "Flask-CORS", "MTCNN", "FaceNet", "keras-facenet", "scikit-learn", "KNN", "Joblib", "OpenCV", "NumPy", "pandas", "Matplotlib", "HTML", "CSS", "JavaScript", "Jupyter Notebook"],
    media: [
      {
        id: "ht-image",
        type: "image",
        src: "/assets/projects/HospitalTriageAndIdentityVerification.png",
        caption: "Interface",
      }
    ],
    resources: [
      {
        id: "ht-github",
        label: "GitHub",
        type: "github",
        url: "https://github.com/ciriciri123/Hackathon8.0_TBJayaMakmur",
        external: true
      }
    ],
    links: {
      github: "https://github.com/ciriciri123/Hackathon8.0_TBJayaMakmur"
    }
  },
  {
    id: "product-inventory",
    title: "Product Inventory & Ordering System",
    category: "Web",
    type: "Web Development / CRUD / E-Commerce Workflow",
    year: "2025",
    oneLineProblem: "An individual web application for documenting products and managing the workflow around product categories, shopping carts, and orders.",
    description: "Product Inventory & Ordering System is an individual Laravel project created to help document and manage products in a structured web application. The system includes product and category management, user authentication, shopping-cart functionality, and order processing.",
    role: "Individual Project — End-to-end development",
    process: [
      "Built the application using the Laravel MVC structure",
      "Implemented product and category management",
      "Added user registration, login, and authentication flows",
      "Developed shopping-cart operations",
      "Implemented order and order-detail handling",
      "Added protected routes for authenticated users and administrators"
    ],
    outcome: [
      "Functional web application for product documentation and management",
      "Supports product categorization, authentication, cart operations, and order workflows"
    ],
    technologies: ["PHP 8", "Laravel 9", "Laravel Sanctum", "Laravel Mix", "JavaScript", "Axios", "Guzzle"],
    media: [
      {
        id: "pi-image",
        type: "image",
        src: "/assets/projects/ProductInventoryAndOrderingSystem.png",
        caption: "Interface",
      }
    ],
    resources: [
      {
        id: "pi-github",
        label: "GitHub",
        type: "github",
        url: "https://github.com/ciriciri123/PTChipiChapa-PendataanBatang-RiccyRiandyIntan",
        external: true
      }
    ],
    links: {
      github: "https://github.com/ciriciri123/PTChipiChapa-PendataanBatang-RiccyRiandyIntan"
    }
  },
  {
    id: "stocksense",
    title: "StockSense — Restaurant Inventory Intelligence",
    category: "Machine Learning",
    type: "Data Analytics / Machine Learning / Web Application",
    year: "2026",
    oneLineProblem: "A restaurant operations application that combines sales forecasting, inventory management, and ingredient recommendations to help restaurants plan stock around expected demand.",
    description: "StockSense is a restaurant inventory-intelligence application that brings together menu, pantry, ingredient, and sales data in a single web interface. The system provides an operational dashboard, sales forecasting, and ingredient recommendations by translating predicted dish demand into projected ingredient requirements and purchase needs.",
    role: "I generated the core idea, focused on the web-development direction, and helped break down the overall application concept into its main features and workflow.",
    process: [
      "Broke the application into dashboard, menu, pantry, ingredient, sales, forecasting, recommendation, and settings modules",
      "Integrated historical sales data for forecasting",
      "Built daily Random Forest forecasting models for individual dishes",
      "Generated rolling multi-day forecasts from historical sales patterns",
      "Converted forecasted dish demand into aggregate ingredient requirements",
      "Compared projected ingredient needs against current pantry stock",
      "Developed the web interface for managing data and interacting with forecasts and recommendations",
      "Added visual dashboards and charts for operational decision-making"
    ],
    outcome: [
      "Built a functional restaurant inventory-intelligence web application",
      "Provides sales dashboards, menu and pantry management, sales-data upload, forecasting, and ingredient purchase recommendations",
      "Forecasting results can be exported for further use",
      "Connects demand forecasting directly to inventory planning rather than treating forecasting and stock management as separate workflows"
    ],
    technologies: ["PHP", "Python", "pandas", "NumPy", "scikit-learn", "Random Forest", "joblib", "Matplotlib", "Tailwind CSS", "Chart.js", "HTML/CSS/JavaScript"],
    media: [
      {
        id: "ss-image",
        type: "image",
        src: "/assets/projects/Stocksense_Photo.png",
        caption: "StockSense Dashboard",
      },
      {
        id: "ss-demo",
        type: "video",
        src: "/assets/projects/StockSense_Demo.mp4",
        caption: "Application Demo",
      }
    ],
    resources: [
      {
        id: "ss-github",
        label: "GitHub",
        type: "github",
        url: "https://github.com/gigachen/aol_ai",
        external: true
      }
    ],
    links: {
      github: "https://github.com/gigachen/aol_ai"
    }
  }
];
