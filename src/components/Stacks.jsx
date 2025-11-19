import React from 'react';

const stacks = [
    "Node.js", "React", "Next.js", "PostgreSQL", "AI Integration",
    "JavaScript", "TypeScript", "TailwindCSS", "Docker", "Git",
    "Node.js", "React", "Next.js", "PostgreSQL", "AI Integration",
    "JavaScript", "TypeScript", "TailwindCSS", "Docker", "Git"
];

const Stacks = () => {
    return (
        <div className="stacks-container">
            <div className="slider">
                <div className="slide-track">
                    {stacks.map((tech, index) => (
                        <div className="slide" key={index}>
                            <span className="tech-item mono">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .stacks-container {
          padding: var(--spacing-md) 0;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .slider {
          margin: auto;
          position: relative;
          width: 100%;
          display: grid;
          place-items: center;
        }

        .slide-track {
          display: flex;
          width: calc(200px * ${stacks.length});
          animation: scroll 40s linear infinite;
        }

        .slide {
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-item {
          font-size: 1.2rem;
          color: var(--secondary-text);
          opacity: 0.7;
          transition: opacity 0.3s, color 0.3s;
          cursor: default;
        }

        .tech-item:hover {
          opacity: 1;
          color: var(--accent-color);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${stacks.length / 2})); }
        }
      `}</style>
        </div>
    );
};

export default Stacks;
