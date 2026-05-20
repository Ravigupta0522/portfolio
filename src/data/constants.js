export const SKILLS = [
  { name: "Flutter", level: 94, color: "#54C5F8", icon: "📱", category: "mobile" },
  { name: "Dart", level: 91, color: "#00B4AB", icon: "🎯", category: "mobile" },
  { name: "React Native", level: 87, color: "#61DAFB", icon: "⚛️", category: "mobile" },
  { name: "Firebase", level: 83, color: "#FFA000", icon: "🔥", category: "backend" },
  { name: "Node.js", level: 76, color: "#68A063", icon: "🟢", category: "backend" },
  { name: "REST/GraphQL", level: 85, color: "#FF6B6B", icon: "🌐", category: "backend" },
  { name: "Figma", level: 78, color: "#F24E1E", icon: "🎨", category: "design" },
  { name: "Git & CI/CD", level: 80, color: "#F05032", icon: "⚙️", category: "devops" },
];

export const SKILL_CATEGORIES = [
  {
    title: "Mobile Development",
    icon: "📱",
    color: "#A18CD1",
    category: "mobile",
    items: ["Flutter", "Dart", "React Native", "Swift (basic)", "Kotlin (basic)", "Expo"],
  },
  {
    title: "Backend & Cloud",
    icon: "☁️",
    color: "#4ECDC4",
    category: "backend",
    items: ["Firebase", "Node.js", "REST APIs", "GraphQL", "AWS", "Supabase"],
  },
  {
    title: "Architecture",
    icon: "🏗️",
    color: "#F7971E",
    category: "mobile",
    items: ["Clean Arch", "BLoC", "Riverpod", "Redux", "MVVM", "GetX"],
  },
  {
    title: "Tools & DevOps",
    icon: "⚙️",
    color: "#FF6B6B",
    category: "devops",
    items: ["Git", "GitHub Actions", "Fastlane", "Figma", "Postman", "Sentry"],
  },
];

export const PROJECTS = [
  {
    title: "My Todo List",
    tag: "Flutter · Firebase",
    desc: "My Todo List is an app that helps you keep track of your tasks. It is a simple and easy-to-use app that can be used by anyone. It is a great app for people who want to keep their lives organized.",
    color1: "#FF6B6B", color2: "#FF8E53", emoji: "✅",
    stats: ["Flutter", "Firebase", "iOS & Android"],
    github: "https://github.com/yourusername/shopease",
    live: "https://shopease-demo.web.app",
  },
  {
    title: "My Campus",
    tag: "Flutter · Firebase",
    desc: "My Campus is an app that helps you keep track of your campus activities. It is a simple and easy-to-use app that can be used by anyone. It is a great app for people who want to keep their lives organized.",
    color1: "#4ECDC4", color2: "#44A08D", emoji: "🎓",
    stats: ["Flutter", "Firebase", "Cross Platform"],
    github: "https://github.com/yourusername/fittrack-pro",
    live: "https://fittrackpro.app",
  },
  {
    title: "Jarro - The Smarty Ordering System",
    tag: "Flutter · Firebase",
    desc: "Jarro - The Smarty Ordering System is an app that helps you keep track of your orders. It is a simple and easy-to-use app that can be used by anyone. It is a great app for people who want to keep their lives organized.",
    color1: "#A18CD1", color2: "#FBC2EB", emoji: "🍽️",
    stats: ["Flutter", "Firebase", "Smart Ordering"],
    github: "https://github.com/yourusername/payzap",
    live: "https://payzap-demo.vercel.app",
  },
  {
    title: "Donation Project",
    tag: "React Native · Firebase",
    desc: "Donation project is an app that helps you keep track of your donations. It is a simple and easy-to-use app that can be used by anyone. It is a great app for people who want to keep their lives organized.",
    color1: "#F7971E", color2: "#FFD200", emoji: "❤️",
    stats: ["React Native", "Firebase", "Open Source"],
    github: "https://github.com/yourusername/talksphere",
    live: "https://talksphere.live",
  },
];


export const EXPERIENCE = [
  {
    role: "Flutter Developer",
    company: "VSafe Softwares",
    period: "Jan 2026 – Present",
    color: "#6A11CB",
    points: [
      "Worked as a Flutter Developer building modern cross-platform mobile applications",
      "Developed and improved the Jarro digital restaurant ordering system project",
      "Designed responsive UI/UX screens with smooth animations and real-time features",
      "Integrated Firebase, REST APIs, authentication, and payment-related functionalities",
      "Collaborated with the development team to optimize app performance and user experience",
    ],
  },
  {
    role: "B.Tech — Computer Science Artificial Intelligence",
    company: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
    period: "2022 – 2026",
    color: "#F7971E",
    points: [
      "Graduated with 8.4 CGPA",
      "Won 2 hackathons and a state-level mobile development competition",
      "Specialized in Mobile App Development, Web Technologies, and AI-based solutions",
      "Built multiple real-world projects using Flutter, React, Firebase, and Python",
    ],
  },
  {
    role: "Intermediate (12th)",
    company: "CBSE Board",
    period: "2020 – 2022",
    color: "#43CEA2",
    points: [
      "Completed higher secondary education with 60%",
      "Focused on Mathematics and Computer Science subjects",
      "Participated in technical and extracurricular activities",
    ],
  },
  {
    role: "High School (10th)",
    company: "CBSE Board",
    period: "2018 – 2020",
    color: "#4FACFE",
    points: [
      "Completed secondary education with 71%",
      "Active participant in science and computer activities",
      "Built interest in programming and technology during school years",
    ],
  },

];


export const NAV = ["home", "about", "skills", "projects", "experience", "contact"];
