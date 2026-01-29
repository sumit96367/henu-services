'use client';

import React, { useEffect, useRef } from 'react';
import { ImageTrailController } from '@/lib/utils';

const flairImages = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
];

export function MouseTrailComponent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ImageTrailController | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const flairElements = Array.from(
      contentRef.current.querySelectorAll('.flair')
    ) as HTMLElement[];

    const controller = new ImageTrailController(flairElements, 100);
    controllerRef.current = controller;
    controller.init();

    const handleMouseMove = (e: MouseEvent) => {
      controller.setMousePos(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      controller.destroy();
    };
  }, []);

  return (
    <>
      <div className="mouse-trail-container fixed inset-0 pointer-events-none z-[15]" style={{ mixBlendMode: 'screen' }}>
        <div className="content" ref={contentRef}>
          {flairImages.map((src, index) => (
            <img
              key={index}
              className="flair fixed opacity-0 pointer-events-none"
              src={src}
              alt=""
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
                @keyframes flair-rotate {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5) rotate(360deg);
                    }
                }
                
                .flair.flair-rotate {
                    animation: flair-rotate 1s ease-out forwards;
                }
            `}</style>
    </>
  );
}
