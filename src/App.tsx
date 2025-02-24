import { useState, useEffect } from "react";
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
} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Building elegant solutions to complex problems.";
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
      const sections = ["home", "projects", "experience", "about"];
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

  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with React and Node.js",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Project 2",
      description: "Mobile-first responsive design implementation",
      tags: ["React Native", "TypeScript"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Project 3",
      description: "Algorithm visualization platform",
      tags: ["JavaScript", "Data Structures"],
      link: "#",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-sm border-b border-purple-900/30 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              John Doe
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
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-[80vh] flex flex-col justify-center"
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
                onClick={() => scrollToSection("projects")}
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
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors transform hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors transform hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="hover:text-blue-400 transition-colors transform hover:scale-110"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Code2 className="text-purple-400" /> Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-[#12121a] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-purple-500/10"
              >
                <div className="relative h-48 overflow-hidden">
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
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <BookOpen className="text-pink-400" /> Experience
          </h3>
          <div className="space-y-8">
            <div className="bg-[#12121a] rounded-lg p-6 border border-purple-900/30 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    Software Development Intern
                  </h4>
                  <p className="text-gray-400">Tech Company Inc.</p>
                </div>
                <span className="text-gray-400">Summer 2023</span>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  Developed and maintained web applications using React and
                  Node.js
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Collaborated with senior developers on large-scale projects
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  Implemented responsive designs and improved user experience
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <User className="text-blue-400" /> About Me
          </h3>
          <div className="bg-[#12121a] rounded-lg p-8 border border-purple-900/30 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="max-w-3xl">
              <p className="text-gray-300 leading-relaxed mb-6 hover:text-gray-100 transition-colors">
                I'm a Computer Science student passionate about software
                development and problem-solving. My journey in tech started with
                simple Python scripts, and now I'm building full-stack
                applications and exploring the fascinating world of artificial
                intelligence.
              </p>
              <p className="text-gray-300 leading-relaxed hover:text-gray-100 transition-colors">
                When I'm not coding, you can find me contributing to open-source
                projects, participating in hackathons, or learning about new
                technologies. I believe in writing clean, maintainable code and
                creating intuitive user experiences.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0f] border-t border-purple-900/30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-400">
            © 2024 John Doe. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-blue-500 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

export default App;
