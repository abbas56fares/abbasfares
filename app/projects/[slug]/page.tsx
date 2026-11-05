import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { getProject, projects } from "../../data/projects";

/* Static export (`output: "export"`): every project page is prerendered to
   HTML at build time from this list — no runtime data fetching, no client
   state, nothing that re-renders on viewport change. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project Not Found | Abbas Fares" };

  return {
    title: `${project.title} | Abbas Fares`,
    description: project.description,
    openGraph: {
      type: "article",
      title: `${project.title} | Abbas Fares`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="relative w-full min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Same radial accents as the Projects section so this page reads as
          part of the site rather than a separate document. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-[radial-gradient(circle,rgba(84,131,179,0.06),transparent_70%)]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(125,160,202,0.10),transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs md:text-sm text-gray-300 font-medium"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>Back to Projects</span>
        </Link>

        {/* Header */}
        <h1 className="heading-fluid font-black leading-tight mb-6">
          {project.title}
        </h1>

        {project.note && (
          <p className="text-red-400 font-bold text-xs md:text-sm mb-8">
            {project.note}
          </p>
        )}

        {/* Description */}
        <div className="modern-card glass p-6 md:p-10 mb-8">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-ice mb-4">
            Overview
          </h2>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech used */}
        <div className="modern-card glass p-6 md:p-10 mb-8">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-ice mb-4">
            Tech Used
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 md:px-4 md:py-1.5 text-[11px] md:text-sm bg-white/5 border border-white/10 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Images — rendered only when the project actually has some.
            Explicit width/height reserves the box at build time so there is
            zero layout shift when a screenshot loads. */}
        {project.images.length > 0 && (
          <div className="modern-card glass p-6 md:p-10 mb-8">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-ice mb-4">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.images.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={1280}
                  height={720}
                  className="w-full h-auto rounded-xl border border-white/10"
                />
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.demo || project.github) && (
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-6 bg-linear-to-r ${project.gradient} rounded-xl text-sm md:text-base text-white font-medium flex items-center justify-center gap-2`}
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5" />
                <span>View Live Project</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-sm md:text-base text-gray-300 font-medium flex items-center justify-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
