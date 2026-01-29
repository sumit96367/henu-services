import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ImageTrailController - Manages animated image trail following mouse cursor
 */
export class ImageTrailController {
  private flairs: HTMLElement[];
  private flairInterval: number;
  private flairIndex: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private animationFrameId: number | null = null;

  constructor(flairElements: HTMLElement[], interval: number = 100) {
    this.flairs = flairElements;
    this.flairInterval = interval;
  }

  init() {
    this.animate();
  }

  setMousePos(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  private animate = () => {
    const flair = this.flairs[this.flairIndex];

    if (flair) {
      // Position the flair at mouse position
      flair.style.left = `${this.mouseX}px`;
      flair.style.top = `${this.mouseY}px`;

      // Reset any ongoing animations
      flair.style.animation = 'none';
      void flair.offsetHeight; // Trigger reflow
      flair.style.animation = '';

      // Add the rotation class to trigger animation
      flair.classList.add('flair-rotate');

      // Remove the class after animation completes
      setTimeout(() => {
        flair.classList.remove('flair-rotate');
      }, 1000);
    }

    // Move to next flair
    this.flairIndex = (this.flairIndex + 1) % this.flairs.length;

    // Continue animation
    setTimeout(() => {
      this.animationFrameId = requestAnimationFrame(this.animate);
    }, this.flairInterval);
  };

  destroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
