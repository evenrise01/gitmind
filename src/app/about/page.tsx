"use client";
import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  ArrowRight,
  Github,
  Twitter,
  Users,
  Mail,
  ChevronRight,
} from "lucide-react";
import MagicButton from "@/components/ui/magic-button";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("mission");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSectionClick = (section: React.SetStateAction<string>) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header with animation */}
        <div
          className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="mb-4 text-center text-4xl font-bold">About Gitmind</h1>
          <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">
            Revolutionizing collaborative mind mapping for developers
          </p>
        </div>

        {/* Main content section */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Navigation sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold">Explore</h2>
              <ul className="space-y-2">
                {[
                  { id: "mission", label: "Our Mission" },
                  { id: "team", label: "Our Team" },
                  { id: "story", label: "Our Story" },
                  { id: "values", label: "Our Values" },
                  { id: "contact", label: "Contact Us" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      className={`flex w-full items-center rounded-md px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                          : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <ArrowRight className="ml-auto h-4 w-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content area */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 md:p-8">
              {/* Mission Section */}
              <div
                className={`space-y-6 transition-opacity duration-500 ${activeSection === "mission" ? "opacity-100" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Our Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  At Gitmind, we're on a mission to transform how developers
                  collaborate on complex projects. We believe that visual
                  thinking is a powerful tool for innovation and
                  problem-solving. Our platform bridges the gap between
                  traditional mind mapping and modern development workflows.
                </p>
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700">
                  <h3 className="mb-2 font-semibold text-blue-700 dark:text-blue-300">
                    What Sets Us Apart
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>
                          Git-Based Version Control for Mind Maps:
                        </strong>{" "}
                        Track changes, branch ideas, and merge updates with a
                        familiar Git workflow tailored for mind mapping.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Seamless Dev Tool Integration:</strong> Connect
                        effortlessly with GitHub, GitLab, and other development
                        platforms to bridge code and concepts.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>AI-Enhanced Real-Time Collaboration:</strong>{" "}
                        Edit mind maps together instantly, with AI-powered
                        suggestions to boost team creativity and productivity.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Developer-Centric Workflow:</strong> Enjoy
                        keyboard shortcuts, code snippet support, and AI-driven
                        codebase insights designed for developers.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Team Section */}
              <div
                className={`space-y-6 transition-opacity duration-500 ${activeSection === "team" ? "opacity-100" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Our Team
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Gitmind is built by a passionate team of developers,
                  designers, and product thinkers who understand the unique
                  challenges of modern software development.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      name: "Daksh Singh",
                      role: "Founder & CEO/Developer",
                      avatar: "/api/placeholder/64/64",
                    },
                  ].map((person) => (
                    <div
                      key={person.name}
                      className="flex items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                    >
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="mr-4 h-12 w-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Section */}
              <div
                className={`space-y-6 transition-opacity duration-500 ${activeSection === "story" ? "opacity-100" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Our Story
                </h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <div className="ml-2 h-full w-0.5 bg-blue-300 dark:bg-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">2024: The Beginning</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Gitmind started as a side project when our founder
                        noticed the disconnect between planning tools and
                        development workflows.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4">
                      <div className="h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <div className="ml-2 h-full w-0.5 bg-blue-300 dark:bg-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">2025: First Deployement</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        After months of development, we launched our beta to a
                        small group of developers who helped shape our core
                        features.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4">
                      <div className="h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">2025: Growing Community</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Today, Gitmind is used by thousands of developers and
                        teams worldwide, with a thriving community contributing
                        to our open-source plugins.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Values Section */}
              <div
                className={`space-y-6 transition-opacity duration-500 ${activeSection === "values" ? "opacity-100" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Our Values
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Developer Experience",
                      description:
                        "We prioritize creating tools that developers love to use.",
                    },
                    {
                      title: "Open Collaboration",
                      description:
                        "We believe in the power of open-source and community-driven development.",
                    },
                    {
                      title: "Visual Thinking",
                      description:
                        "Complex problems become clearer when visualized effectively.",
                    },
                    {
                      title: "Continuous Improvement",
                      description:
                        "We're always iterating and refining based on user feedback.",
                    },
                  ].map((value) => (
                    <div
                      key={value.title}
                      className="rounded-lg bg-gray-50 p-4 transition-shadow duration-300 hover:shadow-md dark:bg-gray-700"
                    >
                      <h3 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div
                className={`space-y-6 transition-opacity duration-500 ${activeSection === "contact" ? "opacity-100" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We'd love to hear from you! Whether you have questions,
                  feedback, or just want to say hello, here's how to reach us.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <a
                    href="#"
                    className="flex items-center rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Mail className="mr-3 h-5 w-5 text-blue-500" />
                    <span>hello@gitmind.app</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Github className="mr-3 h-5 w-5 text-blue-500" />
                    <span>github.com/gitmind</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Twitter className="mr-3 h-5 w-5 text-blue-500" />
                    <span>@gitmindapp</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Users className="mr-3 h-5 w-5 text-blue-500" />
                    <span>Join our community</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div
          className={`mt-16 transform rounded-lg bg-blue-600 p-8 text-center text-white transition-all duration-1000 dark:bg-blue-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="mb-4 text-2xl font-bold">
            Ready to transform your development workflow?
          </h2>
          <p className="mb-6">
            Join thousands of developers who are already using Gitmind to
            collaborate more effectively.
          </p>
          <MagicButton title="Get started now" position="right" icon={<ChevronRight/>}/> 
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
