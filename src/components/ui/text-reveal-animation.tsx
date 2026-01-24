'use client';

import { useState } from "react";

interface TextRevealProps {
    word?: string;
}

export function TextReveal({ word }: TextRevealProps) {
    const [reset, setReset] = useState(0);
    const WORD = word || "Animations";
    return (
        <div>
            <div key={reset}>
                <h1 className="h1">
                    {WORD.split("").map((char, i) => (
                        <span
                            style={{ "--index": i } as React.CSSProperties}
                            key={i}>
                            {char}
                        </span>
                    )
                    )}
                </h1>
            </div>
            {/* Use this button to replay your animation */}
            <button className="button" onClick={() => setReset(reset + 1)}>
                Replay animation
            </button>
            <style jsx>{`
.h1 {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.05em;
  animation: reveal 0.5s ease;
  overflow:hidden;
}
.h1 span {
  display: inline-block;
  opacity:0;
  color: var(--foreground);
  animation: reveal 0.5s ease-in-out forwards;
  animation-delay: calc(0.02s * var(--index))
}
.button {
  width: 100%;
  margin-top: 24px;
  position: relative;
  height: 32px;
  font-size: 14px;
  padding-inline: 12px;
  font-weight: 500;
  border-radius: 9999px;
  color: var(--foreground);
  background-color: var(--background);
  border: 1px solid var(--glass-border);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0px 2px 2px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s;
}
.button:hover {
  background-color: var(--glass-background);
}


@keyframes reveal {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

`}</style>
        </div>
    );
}
