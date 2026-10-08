"use client";

import { useEffect, useRef, useState } from "react";

// Your CV Data
export const CV_DATA = {
  name: "Abbas Fares",
  email: "faresabbas1997@gmail.com",
  phone: "+961 71 232 811",
  address: "Beirut, Lebanon",
  nationality: "Lebanese",
  linkedin: "https://www.linkedin.com/in/abbas-fares-934781304",
  github: "https://github.com/abbas56fares/",

  profile:
    "Laravel-focused Full-Stack Developer with hands-on experience building secure, API-driven web applications, AI-powered systems, and backend services for real business needs. Skilled in PHP, Laravel, Vue.js, JavaScript, Python, React, and Next.js, with practical experience in MySQL, REST APIs, Docker, AI agents, and cloud hosting. Focused on building reliable, user-friendly applications that solve real problems and deliver clear, consistent value to users, clients, and teams. Strong object-oriented foundations (Java, C++, PHP/Laravel) and hands-on experience building AI features with RAG and AI agents.",

  coreCompetencies: [
    "Laravel Development",
    "PHP",
    "RESTful API Development",
    "Third-Party API Integration",
    "Web Development",
    "Backend Architecture",
    "Frontend Development",
    "Database Design",
    "System Optimization",
    "Code Review",
    "Debugging and Code Maintenance",
    "Object-Oriented Programming",
    "Artificial Intelligence",
    "Cloud Hosting",
    "Version Control",
  ],

  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "Lebanese International University (LIU)",
    duration: "February 2026",
  },

  certifications: [
    "CCNAv7: Introduction to Networks — Cisco Networking Academy (March 2024)",
    "CCNAv7: Switching, Routing, and Wireless Essentials — Cisco Networking Academy (August 2024)",
  ],

  languages: {
    Arabic: "Native",
    English: "Professional working proficiency",
    French: "Basic",
  },

  experience: {
    title: "Full-Stack Web Developer Intern",
    company: "VioletPro",
    duration: "September 2025 – November 2025",
    responsibilities: [
      "Developed Laravel backends and MySQL databases for digital menu systems with a Vue.js frontend, delivering fully functional applications that consistently met client requirements and specific business needs",
      "Deployed custom content management solutions and responsive web applications from scratch, ensuring smooth performance across different devices, browsers, and screen sizes",
      "Enhanced backend logic and overall system performance through careful code review, resulting in faster response times and significantly improved user experience",
      "Managed version control and codebase structuring using Git and GitHub, maintaining well-organized repositories, and enabling smoother collaboration within the development team",
      "Fixed defects and maintained existing code through code review",
    ],
  },

  skills: {
    programming: ["PHP", "Java", "C++", "Python", "JavaScript"],
    frontend: [
      "Vue.js",
      "React.js",
      "Next.js",
      "Angular.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "SCSS",
    ],
    backend: ["Laravel", "PHP", "Node.js", "Express.js", "FastAPI", "RESTful APIs"],
    database: ["MySQL", "PostgreSQL", "ChromaDB", "MongoDB", "PgVector"],
    ai: ["AI Agents", "Retrieval-Augmented Generation (RAG)", "Ollama", "NLTK"],
    tools: ["Git", "GitHub", "Docker"],
  },

  softSkills: [
    "Critical Thinking",
    "Problem Solving",
    "Teamwork",
    "Adaptability",
    "Attention to Detail",
    "Fast Learner",
    "Team Communication",
    "Time Management",
    "Analytical Thinking",
    "Creativity",
  ],

  projects: [
    {
      name: "Full-Stack Delivery Management System",
      description:
        "Senior project: architected a multi-role delivery platform with role-based access, featuring global admin oversight and branch-specific controls. Integrated real-time tracking through Maps API and implemented secure delivery validation using QR codes and one-time passwords for reliable and accurate order confirmation",
      tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Maps API", "REST APIs"],
      date: "January 2026",
    },
    {
      name: "AI-Powered Task Management System",
      description:
        "Built a full-stack task management platform combining cloud-based AI agents with Retrieval-Augmented Generation (RAG) to support smarter daily planning and decision-making through intelligent task assistance and automated recommendations",
      tech: ["Next.js", "Laravel", "FastAPI", "Python", "PostgreSQL", "ChromaDB", "Ollama", "RAG", "AI Agents"],
      date: "May 2026",
    },
    {
      name: "HabitFlow",
      description:
        "Built a comprehensive habit-tracking tool to track and support users' daily habits consistency, with a relational database schema in MySQL to manage user data and track progress logs over an extended time",
      tech: ["React", "Node.js", "Express", "MySQL"],
      date: "November 2025",
      demo: "https://ezhabitflow.netlify.app/",
    },
    {
      name: "Interactive Digital Menu System",
      description:
        "A full-featured digital menu system with a complete admin dashboard, built on the VILT stack",
      tech: ["Laravel", "Vue", "Inertia", "Tailwind CSS", "MySQL"],
      date: "2025",
      demo: "https://menu-static.laravel.cloud/",
    },
    {
      name: "Café Website with Online Ordering & Offline POS",
      description:
        "A full-stack café website combining online ordering with an offline Point-of-Sale system",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "POS System"],
      date: "2024",
      demo: "https://issacaffee.netlify.app/",
    },
    {
      name: "AI Chatbot",
      description:
        "Developed a functional chatbot using Python and the NLTK library for natural language processing, focused on accurately interpreting user input, generating relevant contextual responses, and applying core techniques for conversational logic and text handling",
      tech: ["Python", "NLTK"],
      date: "May 2024",
    },
  ],
};

interface Message {
  text: string;
  sender: "user" | "bot";
}

// Pattern matching function
function getResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  const tokens = message
    .split(/\W+/)
    .filter((word) => word.length > 2)
    .map((w) => w.toLowerCase());

  // Greetings
  const greetings = ["hello", "hi", "hey", "greetings"];
  if (greetings.some((greet) => message.includes(greet))) {
    return "Hello! I'm Abbas Fares' AI assistant. I can help you learn about Abbas's skills, experience, projects, education, and contact information. What would you like to know?";
  }

  // Name
  if (tokens.some((w) => ["name", "called", "who"].includes(w))) {
    return `My creator is ${CV_DATA.name}, a Laravel Full-Stack Developer with experience building AI-powered systems.`;
  }

  // Contact
  if (tokens.some((w) => ["email", "mail", "contact"].includes(w))) {
    return `You can reach Abbas at:\n📧 Email: ${CV_DATA.email}\n📱 Phone: ${CV_DATA.phone}\n📍 Location: ${CV_DATA.address}\n💼 LinkedIn: ${CV_DATA.linkedin}\n🐙 GitHub: ${CV_DATA.github}`;
  }

  if (tokens.some((w) => ["phone", "number", "call"].includes(w))) {
    return `Abbas's phone number is: ${CV_DATA.phone}`;
  }

  if (
    tokens.some((w) => ["address", "location", "live", "where"].includes(w))
  ) {
    return `Abbas is based in ${CV_DATA.address} (Nationality: ${CV_DATA.nationality})`;
  }

  if (tokens.includes("linkedin")) {
    return `Connect with Abbas on LinkedIn: ${CV_DATA.linkedin}`;
  }

  if (tokens.includes("github")) {
    return `Check out Abbas's GitHub profile: ${CV_DATA.github}`;
  }

  if (tokens.some((w) => ["profile", "about", "summary"].includes(w))) {
    return `📝 About Abbas:\n\n${CV_DATA.profile}`;
  }

  // Education
  if (
    tokens.some((w) =>
      ["education", "degree", "studied", "university", "college"].includes(w),
    )
  ) {
    const edu = CV_DATA.education;
    return `🎓 Education:\n\n${edu.degree}\n${edu.institution}\n${edu.duration}`;
  }

  // Certifications
  if (
    tokens.some((w) =>
      [
        "certification",
        "certifications",
        "certificate",
        "cisco",
        "ccna",
      ].includes(w),
    )
  ) {
    let response = "🏆 Certifications:\n\n";
    CV_DATA.certifications.forEach((cert) => {
      response += `• ${cert}\n`;
    });
    return response;
  }

  // Languages
  if (
    tokens.some((w) =>
      [
        "language",
        "languages",
        "speak",
        "arabic",
        "english",
        "french",
      ].includes(w),
    )
  ) {
    let response = "🌍 Languages:\n\n";
    Object.entries(CV_DATA.languages).forEach(([lang, level]) => {
      response += `• ${lang}: ${level}\n`;
    });
    return response;
  }

  // Experience
  if (
    tokens.some((w) =>
      [
        "experience",
        "work",
        "job",
        "internship",
        "worked",
        "violetpro",
      ].includes(w),
    )
  ) {
    const exp = CV_DATA.experience;
    let response = `💼 Work Experience:\n\n${exp.title} at ${exp.company}\n${exp.duration}\n\nKey responsibilities:\n`;
    exp.responsibilities.forEach((resp) => {
      response += `• ${resp}\n`;
    });
    return response;
  }

  // Skills
  if (
    tokens.some((w) =>
      ["skill", "skills", "technology", "technologies", "know"].includes(w),
    )
  ) {
    const skills = CV_DATA.skills;
    let response = "🛠️ Technical Skills:\n\n";
    response += `Programming: ${skills.programming.join(", ")}\n\n`;
    response += `Frontend: ${skills.frontend.join(", ")}\n\n`;
    response += `Backend: ${skills.backend.join(", ")}\n\n`;
    response += `Databases: ${skills.database.join(", ")}\n\n`;
    response += `AI & ML: ${skills.ai.join(", ")}\n\n`;
    response += `Tools: ${skills.tools.join(", ")}`;
    return response;
  }

  // Core competencies
  if (
    tokens.some((w) =>
      ["competency", "competencies", "competence", "strengths", "expertise", "core"].includes(w),
    )
  ) {
    let response = "🎯 Core Competencies:\n\n";
    CV_DATA.coreCompetencies.forEach((item) => {
      response += `• ${item}\n`;
    });
    return response;
  }

  // Soft skills
  if (
    tokens.some((w) =>
      ["soft", "personal", "teamwork", "management"].includes(w),
    )
  ) {
    let response = "💡 Soft Skills:\n\n";
    CV_DATA.softSkills.forEach((skill) => {
      response += `• ${skill}\n`;
    });
    return response;
  }

  // Specific skill buckets
  if (tokens.includes("programming")) {
    return `Programming Languages: ${CV_DATA.skills.programming.join(", ")}`;
  }

  if (tokens.some((w) => ["ai", "rag", "agent", "agents", "ollama", "ml"].includes(w))) {
    return `AI & Machine Learning: ${CV_DATA.skills.ai.join(", ")}`;
  }

  if (
    tokens.some((w) =>
      ["frontend", "react", "vue", "angular", "tailwind"].includes(w),
    )
  ) {
    return `Frontend: ${CV_DATA.skills.frontend.join(", ")}`;
  }

  if (
    tokens.some((w) =>
      ["backend", "laravel", "nodejs", "fastapi", "express"].includes(w),
    )
  ) {
    return `Backend: ${CV_DATA.skills.backend.join(", ")}`;
  }

  if (tokens.some((w) => ["database", "mysql", "postgresql", "mongodb", "sql"].includes(w))) {
    return `Databases: ${CV_DATA.skills.database.join(", ")}`;
  }

  // Projects
  if (
    tokens.some((w) =>
      ["project", "projects", "built", "developed", "portfolio"].includes(w),
    )
  ) {
    let response = "🚀 Featured Projects:\n\n";
    CV_DATA.projects.forEach((project, i) => {
      response += `${i + 1}. ${project.name} (${project.date})\n`;
      response += `   ${project.description}\n`;
      response += `   Tech: ${project.tech.join(", ")}\n`;
      if (project.demo) {
        response += `   Demo: ${project.demo}\n`;
      }
      response += "\n";
    });
    return response;
  }

  // Specific projects
  if (message.includes("delivery") || message.includes("senior")) {
    const project = CV_DATA.projects[0];
    return `📦 ${project.name}\n${project.description}\nTechnologies: ${project.tech.join(", ")}\nDate: ${project.date}`;
  }

  if (message.includes("task") || message.includes("rag") || message.includes("agent")) {
    const project = CV_DATA.projects[1];
    return `🤖 ${project.name}\n${project.description}\nTechnologies: ${project.tech.join(", ")}\nDate: ${project.date}`;
  }

  if (message.includes("habitflow") || message.includes("habit")) {
    const project = CV_DATA.projects[2];
    return `📈 ${project.name}\n${project.description}\nTechnologies: ${project.tech.join(", ")}\nDate: ${project.date}\nLive Demo: ${project.demo}`;
  }

  if (message.includes("menu") || message.includes("digital")) {
    const project = CV_DATA.projects[3];
    return `📱 ${project.name}\n${project.description}\nTechnologies: ${project.tech.join(", ")}\nDate: ${project.date}\nLive Demo: ${project.demo}`;
  }

  // Resume
  if (tokens.some((w) => ["resume", "cv", "download"].includes(w))) {
    return "You can download Abbas's full resume using the \"Download CV\" button in the top navigation or hero section of this site.";
  }

  // Help
  if (tokens.some((w) => ["help", "can", "what"].includes(w))) {
    return "I can provide information about Abbas Fares including:\n• Contact details (email, phone, location, LinkedIn, GitHub)\n• Profile summary\n• Core competencies\n• Education background\n• Certifications (Cisco CCNA)\n• Work experience & internships\n• Technical & soft skills\n• Programming languages (PHP, Java, Python, C++, JavaScript)\n• Projects portfolio\n• Spoken languages\n\nJust ask me anything!";
  }

  // Default
  return "I'm not sure about that. You can ask me about Abbas's skills, experience, projects, education, or contact information. Type 'help' to see what I can do!";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hi! I'm Abbas Fares' AI assistant. I can help you learn about Abbas's skills, experience, projects, education, and contact information. What would you like to know?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getResponse(input);
      const botMessage: Message = { text: botResponse, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-12 h-12 sm:bottom-6 sm:right-6 sm:w-16 sm:h-16 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-2xl z-50 flex items-center justify-center"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-4 left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6 sm:w-96 h-80 sm:h-150 max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold">Abbas Fares AI Assistant</h3>
              <p className="text-xs sm:text-sm opacity-90">Ask me anything about Abbas!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="shrink-0 text-white p-1.5 sm:p-2 rounded-lg"
              aria-label="Close chat"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 shadow-md rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-steel text-gray-800"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 bg-white text-steel border border-steel/30 rounded-full flex items-center justify-center transition-transform disabled:opacity-50 disabled:cursor-not-allowed rotate-90"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
