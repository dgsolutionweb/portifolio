import React from 'react';

const stacks = [
  "Node.js", "React", "Next.js", "PostgreSQL", "AI Integration",
  "JavaScript", "TypeScript", "TailwindCSS", "Docker", "Git",
  "Node.js", "React", "Next.js", "PostgreSQL", "AI Integration",
  "JavaScript", "TypeScript", "TailwindCSS", "Docker", "Git"
];

const Stacks = () => {
  return (
    <div className="py-8 bg-primary/2 border-y border-primary/5 overflow-hidden">
      <div className="m-auto relative w-full grid place-items-center">
        <div className="flex w-[calc(200px*20)] animate-scroll">
          {stacks.map((tech, index) => (
            <div className="slide w-[200px] flex items-center justify-center" key={index}>
              <span className="text-xl text-secondary opacity-70 transition-all duration-300 cursor-default hover:opacity-100 hover:text-accent hover:animate-pulse font-mono">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Stacks;
