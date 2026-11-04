// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "Sravanthi Pachipala",
  brandName: "SRAVANTHI PACHIPALA",
  role: "Data Analyst",
  city: "Rayachoty, Kadapa, Andhra Pradesh, India",
  phone: "+91 93917 16182",
  email: "pachipalasravanthi2003@gmail.com",
};

export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
};

export const socialLinks = {
  instagram: "",
  youtube: "",
  linkedin: "https://www.linkedin.com/in/sravanthi-pachipala",
  github: "https://github.com/pachipalasravanthi03/",
};

export const heroContent = {
  finalWord: "PORTFOLIO",
  ctaLabel: "Contact",
};

export const aboutContent = {
  heading: "Intro",
  greeting: "Hey, I'm Sravanthi.",
  paragraph:
    "My name is Sravanthi. I have completed my B.Tech in Artificial Intelligence and Data Science. I have basic knowledge of Python and SQL, and I am currently sharpening my skills through the placement training program at TAP Academy to build my career as a Data Analyst.",
  highlights: ["Python", "SQL (MySQL)", "Microsoft Excel", "Power BI"],
};

export const skillRows = [
  { label: "Programming", items: ["Python", "SQL", "MySQL", "Data Structures", "Pandas", "NumPy", "C Programming"] },
  { label: "Data Analytics", items: ["Data Cleaning", "Data Analysis", "Exploratory Data Analysis", "Microsoft Excel", "Power BI", "Data Visualization", "Statistical Analysis"] },
  { label: "AI & Machine Learning", items: ["Machine Learning", "SVM", "Model Evaluation", "Predictive Modeling", "Artificial Intelligence", "Algorithms"] },
  { label: "Tools & Skills", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "MySQL Workbench", "Communication", "Problem Solving", "Teamwork"] },
];

export const servicesContent = {
  headingLines: ["WHAT I", "CAN DO"],
  items: [
    {
      title: "DATA CLEANING",
      description:
        "I clean, preprocess, and structure raw and noisy datasets to ensure high data quality and integrity for reliable downstream analysis.",
      capabilities: [
        "Handling missing values and inconsistencies",
        "Data transformation and standardization",
        "Duplicate and anomaly removal",
        "Pandas and Excel data wrangling",
        "Data validation and structured formatting",
      ],
      cta: { label: "VIEW PROJECTS", href: "#projects" },
    },
    {
      title: "DATA ANALYSIS",
      description:
        "I perform exploratory and statistical data analysis to uncover hidden trends, meaningful patterns, and actionable insights from complex datasets.",
      capabilities: [
        "Exploratory Data Analysis (EDA)",
        "Descriptive and inferential statistics",
        "Key metric and KPI tracking",
        "Pattern and trend identification",
        "Actionable business insights",
      ],
    },
    {
      title: "SQL QUERY WRITING",
      description:
        "I write efficient, optimized SQL queries to query, aggregate, filter, and extract critical business data from relational databases.",
      capabilities: [
        "Complex queries and multi-table JOINs",
        "Aggregations and GROUP BY operations",
        "Subqueries and Common Table Expressions (CTEs)",
        "Data filtering and indexing optimization",
        "MySQL database management",
      ],
    },
    {
      title: "DATA VISUALIZATION",
      description:
        "I design intuitive visual dashboards and charts using Power BI and Python libraries to communicate data stories clearly to stakeholders.",
      capabilities: [
        "Power BI interactive dashboards",
        "Matplotlib and Seaborn charts",
        "Visual storytelling and reporting",
        "KPI metric cards and drill-downs",
        "Executive-ready presentations",
      ],
    },
  ],
};

// Words wrapped in *asterisks* are shown as light italic serif in gray.
export const projectsContent = {
  headingMain: "Selected",
  headingAccent: "work",
  description:
    "A showcase of analytical projects and machine learning systems focused on solving real-world challenges with clean data and intelligent models.",
  readMore: { label: "Read More", href: "#projects" },
  items: [
    {
      id: "project-1",
      number: "01",
      title: ["CARDIOVASCULAR *ai*", "HEALTH PREDICTION"],
      description:
        "An intelligent healthcare prediction system using machine learning algorithms, including Support Vector Machines (SVM), to analyze patient health indicators and predict cardiovascular risk with high diagnostic accuracy.",
      liveUrl: "https://github.com/pachipalasravanthi03/",
      githubUrl: "https://github.com/pachipalasravanthi03/",
    },
    {
      id: "project-2",
      number: "02",
      title: ["CROP ROTATION", "PLANNING SYSTEM"],
      description:
        "An agricultural planning and optimization project focused on crop rotation management to improve soil fertility, optimize resource usage, and support sustainable farming practices using Python and database management.",
      liveUrl: "https://github.com/pachipalasravanthi03/",
      githubUrl: "https://github.com/pachipalasravanthi03/",
    },
  ],
};

export const contactContent = {
  heading: "Get in touch",
  followLabel: "Follow us",
};

export const footerContent = {
  connectLabel: "Connect with me",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
  ],
  ctaHeading: "Let's build something",
  ctaText: "Open for Data Analyst roles, internships, and collaborations.",
  ctaLabel: "Get in touch",
};

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
