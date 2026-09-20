export type ExperienceMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  poster?: string;
  alt?: string;
  caption?: string;
};

export type ExperienceResourceLink = {
  id: string;
  label: string;
  type:
    | "video"
    | "document"
    | "presentation"
    | "report"
    | "project"
    | "organization"
    | "repository"
    | "event"
    | "other";
  url: string;
  description?: string;
  external?: boolean;
};

export type ExperienceItem = {
  id: string;
  kind: "leadership" | "work";
  organization: string;
  role: string;
  duration: string;
  scope?: string[];
  responsibilities: string[];
  challenge?: string;
  actions?: string[];
  contributions?: string[];
  skills?: string[];
  outcome?: string[];
  reflection?: string;
  media?: ExperienceMedia[];
  resources?: ExperienceResourceLink[];
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "aiesec-team-leader",
    kind: "leadership",
    organization: "AIESEC in BINUS",
    role: "Team Leader of Program Specialist in Engagement with AIESEC",
    duration: "February 2026 — Present",
    scope: [
      "Led a team of 4.",
      "Designed a 2-month leadership curriculum.",
      "Program scale: 120 delegates and 20 coaches.",
      "Curriculum included 4 core capacity-building sessions.",
      "Managed the execution of 7 program events.",
      "Secured 4 speakers and 2 panelists.",
      "Facilitated collaboration with Kawan Lama Group."
    ],
    responsibilities: [
      "Led the team responsible for designing a 2-month leadership curriculum.",
      "Developed and assessed a capstone project comprising 3 mini-projects to measure participant learning outcomes.",
      "Managed the execution of 7 program events, including 4 core capacity-building sessions.",
      "Secured 4 speakers and 2 panelists.",
      "Facilitated collaboration with Kawan Lama Group.",
      "Oversaw event operations, stakeholder coordination, and technical execution.",
      "Continuously improved the program based on participant response and delivery needs."
    ],
    challenge: "The main challenge was creating a curriculum that was relevant and engaging to the customers while still maintaining the organization's direction toward exchange.",
    actions: [
      "Streamlined the Program Specialist workflow by developing supporting tools and trackers in Google Sheets.",
      "Used the tools to support task distribution, project tracking, and document compliance."
    ],
    outcome: [
      "Delivered the leadership program across its planned curriculum and event structure.",
      "Achieved an average participant satisfaction score (NPS) of over 9.5/10.",
      "Established a capstone structure designed to assess participant learning outcomes."
    ],
    reflection: "Understanding data is important when developing programs and making decisions. Secondary sources can help fill information gaps during curriculum development. Communication and narrative-building are crucial when creating curricula that are appealing to customers."
  },
  {
    id: "aiesec-staff-engagement",
    kind: "leadership",
    organization: "AIESEC in BINUS",
    role: "Staff of Program in Engagement with AIESEC & Brand Activation",
    duration: "February 2025 — January 2026",
    scope: [
      "Program-related organizational work within AIESEC in BINUS."
    ],
    responsibilities: [
      "Helped develop the AFL curricula for both Winter Peak and Summer Peak.",
      "Contributed to curriculum development with a focus on addressing delegates' pain points, especially around leadership."
    ],
    outcome: [
      "Contributed to shaping leadership-focused learning content for AFL program cycles."
    ]
  },
  {
    id: "aiesec-igv-winter",
    kind: "leadership",
    organization: "AIESEC in BINUS — Incoming Global Volunteer (IGV) Winter Peak",
    role: "Organizing Committee of Program",
    duration: "August 2025 — January 2026",
    scope: [
      "Planned a 6-week weekly schedule and agenda for Local Volunteers (LV) and Exchange Participants (EP).",
      "Coordinated program activities involving LV and EP.",
      "Worked with partner demands related to program activities.",
      "Orchestrated the “On The Map” project aligned with SDG Target 8.9."
    ],
    responsibilities: [
      "Crafted a 6-week weekly schedule and agenda details for Local Volunteers and Exchange Participants.",
      "Accommodated partner demands related to program activities.",
      "Orchestrated the “On The Map” project aligned with SDG Target 8.9.",
      "Prepared session rundowns and materials.",
      "Executed and served as a Person In Charge (PIC) for IGV sessions.",
      "Induced and monitored project progress handled by LV and EP."
    ],
    challenge: "A key challenge was managing the SMSEs while supporting their operational needs and translating those needs into practical improvements.",
    outcome: [
      "Helped improve the workflow of SMSEs by applying design thinking.",
      "Developed practical outputs including social media plans, new banners/menus, and finance worksheets.",
      "Supported the delivery of IGV Winter Peak through scheduling, session preparation, execution, and progress monitoring.",
      "Coordinated an SDG-aligned project as part of the program."
    ]
  },
  {
    id: "aiesec-lc5lc",
    kind: "leadership",
    organization: "AIESEC in BINUS — LC5LC",
    role: "Conference Committee Vice President of Delegate Service for LC5LC",
    duration: "September 2025 — December 2025",
    scope: [
      "Led a team of 13 people.",
      "Team members came from 5 different universities.",
      "Coordinated delegate service from pre-event to post-event.",
      "Built operational tools using Google Sheets."
    ],
    responsibilities: [
      "Led a team of 13 people from 5 different universities.",
      "Distributed delegate-service tasks, including broadcasts, forms, and WhatsApp community communication.",
      "Conducted and led meetings for onboarding, preparation, and team discussions.",
      "Created a Google Sheets tool for progress tracking, task assignment, and job distribution.",
      "Created a delegate dashboard using Google Sheets containing event details, group distribution, and lost & found information.",
      "Coordinated with different divisions regarding delegate flow and event information.",
      "Maintained communication and assistance for delegates from pre-event through post-event."
    ],
    outcome: [
      "Supported an event attended by 150+ delegates from 5 different universities.",
      "Received a highly positive response from participants.",
      "Supported an environment where delegates were able to bond and build connections with one another.",
      "Established operational tracking and delegate-information tools to support the committee's work."
    ]
  },
  {
    id: "zens-action",
    kind: "leadership",
    organization: "The Zen’s Action",
    role: "Co-founder & Head of Content Creation",
    duration: "July 2021 — May 2024",
    scope: [
      "Focused on increasing awareness, especially around mental health and environmental issues.",
      "Grew the organization's account to 730+ followers from the ground up.",
      "Led discussions on strategic direction and content approach.",
      "Managed and assessed the performance of the content committee."
    ],
    responsibilities: [
      "Grew the organization's account to 730+ followers from the ground up.",
      "Led discussions on the strategic direction and content approach for the organization.",
      "Developed and executed plans aligned with organizational goals.",
      "Managed and assessed the performance of the content committee to support high-quality content creation."
    ],
    challenge: "The role involved building the organization's audience from the ground up while establishing a strategic content direction and managing a content committee.",
    outcome: [
      "Grew the organization's account to 730+ followers.",
      "Established and executed content plans aligned with organizational goals.",
      "Managed the performance of the content committee."
    ]
  },
  {
    id: "himti-hishot",
    kind: "leadership",
    organization: "Himpunan Mahasiswa Teknik Informatika (HIMTI)",
    role: "Website Developer for HISHOT 2025",
    duration: "April 2025 — July 2025",
    scope: [
      "Contributed to the front-end of the HISHOT 2025 website.",
      "Used Node.js and CSS (Tailwind).",
      "Used GitHub and Git for version control and collaboration."
    ],
    responsibilities: [
      "Developed part of the front-end using Node.js and CSS (Tailwind).",
      "Utilized GitHub and Git for version control and collaborative development."
    ],
    outcome: [
      "Contributed to the development of the HISHOT 2025 website.",
      "Supported collaborative development through version-control practices."
    ]
  },
  {
    id: "binus-lab-assistant",
    kind: "work",
    organization: "Bina Nusantara University",
    role: "Part-time Laboratory Assistant",
    duration: "August 2025 — Present",
    scope: [
      "Taught 15 different classes across 8 different laboratory subjects.",
      "Achieved a student satisfaction score of 3.78/4.0 covering first two semesters.",
      "Supported students with programming concepts, debugging, and best practices.",
      "Evaluated quizzes, projects, and final examinations.",
      "Designed project cases for practicum evaluation.",
      "Proctored midterm and final examinations."
    ],
    responsibilities: [
      "Lecture/taught 15 different classes covering 8 laboratory subjects, including Human-Computer Interaction, Programming for Business, and Software Architecture.",
      "Assisted students in understanding course material, including debugging, programming concepts, and best practices.",
      "Evaluated students' quizzes, projects, and final exams.",
      "Designed project cases for practicum evaluation, including a Computer Graphics project using ThreeJS.",
      "Proctored midterm and final examinations."
    ],
    contributions: [
      "Applied both teaching and technical skills to support practical learning, while also contributing to assessment design through project cases for laboratory evaluation."
    ],
    skills: [
      "Teaching",
      "Technical Support",
      "Programming",
      "Debugging",
      "Assessment",
      "Human-Computer Interaction",
      "Software Architecture",
      "Data Structures",
      "Algorithm and Programming",
      "Software Quality Assurance",
      "Computational Physics",
      "ThreeJS",
      "Communication",
      "Student Support"
    ],
    outcome: [
      "Achieved a 3.78/4.0 satisfaction score.",
      "Delivered laboratory instruction across 15 classes and 8 laboratory subjects.",
      "Supported student learning through technical assistance, debugging support, and programming guidance.",
      "Contributed assessment materials through practicum project-case design."
    ]
  }
];
