import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Background = () => {
    const renderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!renderRef.current) return;

        let myP5 = new p5((p: p5) => {
            let particles: Particle[] = [];
            const numParticles = 200;
            const noiseScale = 0.005;

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight).parent(renderRef.current!);
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle(p));
                }
                p.background(10);
            };

            p.draw = () => {
                p.background(10, 20); // Trail effect

                // Update and draw particles
                for (let particle of particles) {
                    particle.update();
                    particle.show();
                    particle.edges();
                    particle.follow(noiseScale);
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };

            class Particle {
                p: p5;
                pos: p5.Vector;
                vel: p5.Vector;
                acc: p5.Vector;
                maxSpeed: number;
                prevPos: p5.Vector;

                constructor(p: p5) {
                    this.p = p;
                    this.pos = p.createVector(p.random(p.width), p.random(p.height));
                    this.vel = p.createVector(0, 0);
                    this.acc = p.createVector(0, 0);
                    this.maxSpeed = 2;
                    this.prevPos = this.pos.copy();
                }

                update() {
                    this.vel.add(this.acc);
                    this.vel.limit(this.maxSpeed);
                    this.prevPos = this.pos.copy();
                    this.pos.add(this.vel);
                    this.acc.mult(0);
                }

                follow(scale: number) {
                    let angle = this.p.noise(this.pos.x * scale, this.pos.y * scale, this.p.frameCount * 0.002) * this.p.TWO_PI * 2;
                    let force = p5.Vector.fromAngle(angle);
                    force.mult(0.5);
                    this.acc.add(force);

                    // Mouse interaction - Repel or Attract
                    let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
                    let dir = p5.Vector.sub(mouse, this.pos);
                    let dist = dir.mag();
                    if (dist < 200) {
                        dir.setMag(0.5);
                        // this.acc.add(dir); // Attract
                        this.acc.sub(dir); // Repel
                    }
                }

                show() {
                    this.p.stroke(255, 30);
                    this.p.strokeWeight(1);
                    this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    // this.p.point(this.pos.x, this.pos.y);
                }

                edges() {
                    if (this.pos.x > this.p.width) {
                        this.pos.x = 0;
                        this.prevPos.x = 0;
                    }
                    if (this.pos.x < 0) {
                        this.pos.x = this.p.width;
                        this.prevPos.x = this.p.width;
                    }
                    if (this.pos.y > this.p.height) {
                        this.pos.y = 0;
                        this.prevPos.y = 0;
                    }
                    if (this.pos.y < 0) {
                        this.pos.y = this.p.height;
                        this.prevPos.y = this.p.height;
                    }
                }
            }
        });

        return () => {
            myP5.remove();
        };
    }, []);

    return <div ref={renderRef} className="fixed top-0 left-0 -z-10 pointer-events-none" />;
};

export default Background;
