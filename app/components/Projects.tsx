import Link from "next/link";
import { Project, projects } from "../data/projects";
import Carousel from "./Carousel";

function ProjectCard({ project }: { project: Project }) {
  return (
    /* h-full lets every card in a row match the tallest one; the track's
       align-items: stretch supplies that height. */
    <div className="project-card glass modern-card p-4 lg:p-6 flex flex-col h-full">
      <h3 className="text-base lg:text-2xl font-bold text-white mb-1.5 lg:mb-3">
        {project.title}
      </h3>

      <p className="text-gray-400 text-[11px] lg:text-sm leading-snug lg:leading-relaxed mb-2 lg:mb-4 grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-2 lg:mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 lg:px-3 lg:py-1 text-[9px] lg:text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-2 lg:gap-3 pt-2 lg:pt-4 border-t border-white/5">
        <Link
          href={`/projects/${project.slug}`}
          className={`flex-1 py-1.5 px-3 lg:py-3 lg:px-6 bg-linear-to-r ${project.gradient} text-[10px] lg:text-sm rounded-lg lg:rounded-xl text-white font-medium text-center`}
        >
          Preview
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 px-3 lg:py-3 lg:px-6 bg-white/5 border border-white/10 rounded-lg lg:rounded-xl text-[10px] lg:text-sm text-gray-300 font-medium flex items-center justify-center gap-2"
          >
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full py-32 px-6 md:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-[radial-gradient(circle,rgba(84,131,179,0.06),transparent_70%)]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(125,160,202,0.10),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-fluid font-black mb-4">
            Featured <span className="text-gradient ">Projects</span>
          </h2>
          <br />
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl">
            Building innovative solutions that make a difference
          </p>
        </div>

        {/* Carousel: a default horizontal scroller plus page dots. How many
            cards fit per view is decided purely by CSS, so the static HTML is
            already correct on every screen (the old JS chunking always
            shipped the desktop layout and re-chunked on hydration, flashing
            on mobile). 1 card per view below lg, 3 at lg and up; the basis
            subtracts its share of the gap so 3 cards + 2 gaps land at
            exactly 100%. */}
        <Carousel
          label="projects"
          trackClassName="flex gap-8 px-2 overflow-x-auto no-scrollbar overscroll-x-contain"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="shrink-0 basis-full lg:basis-[calc(33.333%-1.334rem)]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
