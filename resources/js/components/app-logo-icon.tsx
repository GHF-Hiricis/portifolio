import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <defs>
                {/* Background gradient */}
                <linearGradient id="ghf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>

                {/* Text gradient */}
                <linearGradient id="ghf-text" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>

                {/* Soft shadow */}
                <filter
                    id="ghf-shadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                >
                    <feDropShadow
                        dx="0"
                        dy="8"
                        stdDeviation="8"
                        floodColor="#000000"
                        floodOpacity="0.25"
                    />
                </filter>
            </defs>

            {/* Rounded background */}
            <rect width="512" height="512" rx="96" fill="url(#ghf-bg)" />

            {/* Thin border */}
            <rect
                x="24"
                y="24"
                width="464"
                height="464"
                rx="72"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
            />

            {/* Initials */}
            <text
                x="256"
                y="290"
                textAnchor="middle"
                fontFamily="Inter, Arial, sans-serif"
                fontSize="150"
                fontWeight="800"
                letterSpacing="8"
                fill="url(#ghf-text)"
                filter="url(#ghf-shadow)"
            >
                GHF
            </text>
        </svg>
    );
}
