import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  BookOpen,
  User,
  ChevronRight,
  ArrowUp,
  Menu,
  X,
  Backpack,
} from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Hi! Welcome to my personal portfolio website";
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((c) => c + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "featured-projects",
        "projects",
        "experience",
        "academics",
        "about",
      ];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
          }
        }
      });

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const featuredProjects = [
    {
      title: "PRDoctor",
      description:
        "A GitHub App built with Probot, ESLint, SonarQube, and OpenAI. PRDoctor containers (Docker) run in GitHub Actions, crunch static-analysis findings, micro-benchmarks, and a Green-Algorithms CO₂ estimate to issue a 0-100 Health Score on every pull request while GPT-4o writes reviewer-ready feedback. Scores and historical trends are stored in PostgreSQL.",
      tags: ["Probot", "Github Apps", "SQL", "And More!"],
      link: "https://github.com/DereckBelanger152/prdoctor",
      image: "probot.png",
    },
    {
      title: "AI Club Website",
      description:
        "Redesigned the entire web stack for the AI Club, delivering a fully multilingual, Open Source, SEO-first site with sub-1s Time to Interactive, 92+ Lighthouse scores, and 92% accessibility compliance. Built with React and deployed on Vercel with automated CI/CD pipelines, cutting deployment time by 90% and ensuring zero downtime.",
      tags: ["React", "TailwindCSS", "JavaScript"],
      link: "https://cia.ift.ulaval.ca",
      image: "cia_presentation.png",
    },
    {
      title: "Mind Controlled Video Game",
      description:
        "Recreated Flappy Bird as a neurocontrolled game using EEG signals, achieving real-time control with <200ms latency. Initially driven by eye-blink detection, with AI/ML-based thought recognition currently in development. Built in collaboration with the FlapEEG team to showcase accessible brain–computer interaction.",
      tags: ["Python", "Jupyter"],
      link: "https://github.com/cia-ulaval/FlapEEG_interface_v1",
      image: "flapeeg.gif",
      highlight: "Project nominated at Gala de la Vie Étudiante",
    },
  ];

  type Project = {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
    highlight?: string;
  };

  const projects: Project[] = [
    {
      title: "SwipePaw",
      description:
        "Prototyped a swipe-based mobile app connecting pet owners and shelters for playdates or adoptions. Built with React Native and Firebase, featuring real-time chat, persistent sessions, email/password authentication, and an SPCA-synced adoption workflow.",
      tags: ["Expo", "TypeScript", "Firebase", "And More!"],
      link: "https://github.com/DereckBelanger152/SwipePaw",
      image: "swipepaw.png",
    },
    {
      title: "EvoWeb",
      description:
        "Founder of my own web studio that ships ultra-fast static sites for local businesses; built a component-driven design system, automated CI/CD (98 + performance) and structured-data SEO. Business process creation and documentation: Designed structured packages, estimates, and workflows to streamline project delivery.",
      tags: ["TypeScript", "Google Analytics", "Figma", "Vercel"],
      link: "https://www.evoweb.ca",
      image: "/evoweb_logo.png",
    },
    {
      title: "RoastMyCode",
      description:
        "Launched a browser playground that ingests code snippets, runs silent static analysis, and has an LLM deliver razor-sharp yet actionable roasts;",
      tags: ["OpenAI API", "React", "TailwindCSS", "TypeScript"],
      link: "https://github.com/DereckBelanger152/RoastMyCode",
      image: "roastmycode.png",
    },
  ];

  const navItems = [
    { id: "home", label: "Home" },
    { id: "featured-projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "academics", label: "Academics" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <motion.header
        className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-sm border-b border-purple-900/30 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Dereck Bélanger
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`hover-underline py-2 ${
                    activeSection === item.id
                      ? "text-purple-400"
                      : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0f] border-b border-purple-900/30 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 ${
                    activeSection === item.id
                      ? "text-purple-400 bg-purple-900/20"
                      : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="pt-20 pb-12 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          id="home"
          className="min-h-[80vh] flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <h2 className="text-5xl font-bold">
              Computer Science Student
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                & Software Developer
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl h-[60px]">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection("featured-projects")}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 group"
              >
                View Projects
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/DereckBelanger152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors transform hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dereck-bélanger-437259338/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors transform hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:dereckblanger@gmail.com"
                  className="hover:text-blue-400 transition-colors transform hover:scale-110"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </motion.section>
        {/* Featured Projects Section */}
        <motion.section
          id="featured-projects"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3 pt-10">
            <Code2 className="text-yellow-400" /> Featured Projects
          </h3>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-yellow-600/30 hover:border-yellow-400/60 hover:shadow-yellow-400/20 transform hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-3 text-yellow-300">
                    {project.title}
                  </h4>
                  {project.highlight && (
                    <p className="text-sm font-bold text-yellow-400 mb-3 animate-pulse">
                      {project.highlight}
                    </p>
                  )}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-yellow-600/20 border border-yellow-600/30 rounded-full text-sm text-yellow-300 hover:bg-yellow-600/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2 group/link font-semibold"
                  >
                    View Project
                    <ExternalLink
                      size={18}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Code2 className="text-purple-400" /> More Projects
          </h3>
          <div className="mb-8 flex items-center gap-3 bg-purple-900/10 border border-purple-700/30 rounded-lg px-4 py-3">
            <span className="text-purple-400 font-bold text-lg">ℹ️</span>
            <span className="text-gray-200">
              Please note: Many of these projects are actively maintained and
              continuously improved. I am committed to delivering high-quality
              solutions and regularly update my work. I enjoy having many
              diverse projects to work on, none of them will be abandoned!
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              // Determine if the bubble should be shown
              const showBubble =
                project.title !== "Mind Controlled Video Game" &&
                project.title !== "EvoWeb" &&
                project.title !== "AI Club Website";
              return (
                <div
                  key={index}
                  className="group bg-[#12121a] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-purple-500/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* Work in Progress Bubble */}
                    {showBubble && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-[#232336] text-gray-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-900/50 shadow-sm opacity-80">
                          Work in Progress
                        </span>
                      </div>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3">
                      {project.title}
                    </h4>
                    {project.highlight && (
                      <p className="text-sm font-bold text-yellow-400 mb-2 animate-pulse">
                        {project.highlight}
                      </p>
                    )}
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-purple-900/20 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-2 group"
                    >
                      View Project
                      <ExternalLink
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <BookOpen className="text-pink-400" /> Experience
          </h3>
          <div className="space-y-8">
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    Laval University's AI Club
                  </h4>
                  <p className="text-gray-400">Official Webmaster </p>
                </div>
                <span className="text-gray-400">Winter 2025 - Current</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Developed and maintained the Club d'Intelligence Artificelle
                  de l'Université Laval's website using React, Tailwind CSS, JS
                  and more
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Collaborated with different project teams to coordinate
                  website updates and new features
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Implemented responsive designs and improved user experience
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-8 mt-8">
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Evoweb</h4>
                  <p className="text-gray-400">Owner and creator</p>
                </div>
                <span className="text-gray-400">2025 - Current</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Built my SASS company from scratch
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Client acquisition and retention strategies
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Full-cycle web project management: From client needs analysis
                  to live deployment: wireframing, development, SEO, hosting,
                  and client follow-up
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Branding and visual identity development Built the Evoweb
                  brand, including logo design, social media presence, and
                  business card creation.
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Business process creation and documentation Designed
                  structured packages, estimates, and workflows to streamline
                  project delivery.
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-8 mt-8">
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    Custom Personal Computer Building
                  </h4>
                  <p className="text-gray-400">Self Employed</p>
                </div>
                <span className="text-gray-400">2015 - 2020</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Built computers from scratch for clients with specific needs
                  and budgets
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Developed expertise in component selection and optimization,
                  creating systems that outperformed pre-built alternatives by
                  20-30% at comparable price points
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Academics Section */}
        <motion.section
          id="academics"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Backpack className="text-pink-400" /> Academics
          </h3>
          <div className="space-y-8">
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    Bachelor's degree in Computer Science
                  </h4>
                  <p className="text-gray-400">Laval University, Québec</p>
                </div>
                <span className="text-gray-400">Fall 2024 - Fall 2028</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Participated in FlappyEEG through the AI club. A mind
                  controlled game that utilizes EEG signals and machine learning
                  to control a character
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Member of the Artificial Intelligence Club
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Member of the Cybersecurity Club
                </li>
              </ul>
            </div>
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    CS50 (Computer Science course)
                  </h4>
                  <p className="text-gray-400">Harvard University</p>
                </div>
                <span className="text-gray-400">Fall 2025 - Fall 2026</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Project oriented course with a focus on problem solving and
                  algorithmic thinking
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  C, Python, HTML, CSS, JavaScript, SQL, and more
                </li>
              </ul>
            </div>
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    CS50S (Cybersecurity course)
                  </h4>
                  <p className="text-gray-400">Harvard University</p>
                </div>
                <span className="text-gray-400">Fall 2023 - Fall 2025</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Cybersecurity awareness and best practices
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Encription, network security, and more
                </li>
              </ul>
            </div>
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    Proficient in AI tools
                  </h4>
                  <p className="text-gray-400">
                    Cursor, Copilot, ChatGPT, Claude
                  </p>
                </div>
                <span className="text-gray-400"></span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Learnt optimal prompt engineering techniques to get the best
                  results
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Learnt to use AI tools to improve my productivity and
                  versatility
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <User className="text-blue-400" /> About Me
          </h3>
          <div className="bg-[#12121a] rounded-lg p-8 border border-purple-900/30 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="max-w-3xl">
              <p className="text-gray-300 leading-relaxed mb-6 hover:text-gray-100 transition-colors">
                I'm a Computer Science student that loves to learn. I recently
                discovered a passion for web development but I strive to become
                as proficient as possible as many areas of computer science as I
                can. I also have interests in machine learning, infrastructure,
                and security.
              </p>
              <p className="text-gray-300 leading-relaxed hover:text-gray-100 transition-colors">
                When I'm not coding, you can find me learning about the latest
                technologies (thanks Fireship!), playing video games, doing MMA
                (recently had a seminar with the one and only Muay Thai world
                champion, Jean-Charles Skarbowsky) or playing chess. I've always
                been a competitive person and I love to challenge myself in
                everything I do.
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-[#0a0a0f] border-t border-purple-900/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-400">
            © 2025 Dereck Bélanger - All rights reserved
          </p>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-blue-500 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={16} />
      </motion.button>
      <Analytics></Analytics>
    </div>
  );
}

export default App;
