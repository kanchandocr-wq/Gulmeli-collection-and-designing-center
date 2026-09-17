import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  variant?: 'light' | 'dark' | 'onDark';
  showTagline?: boolean;
  className?: string;
  customLogoUrl?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  showTagline = true,
  className = '',
  customLogoUrl,
}) => {
  // If store manager uploaded an explicit logo image file
  if (customLogoUrl) {
    const imgHeights = {
      sm: 'h-9',
      md: 'h-12',
      lg: 'h-16',
      hero: 'h-24',
    };
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="गुल्मेली कलेक्सन & डिजाइनिङ सेन्टर"
          className={`${imgHeights[size]} w-auto object-contain`}
        />
      </div>
    );
  }

  const iconSizes = {
    sm: 34,
    md: 44,
    lg: 58,
    hero: 76,
  };

  const currentIconSize = iconSizes[size];

  const isDarkBg = variant === 'onDark';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Authentic Purple/Magenta Insignia */}
      <div className="relative flex-shrink-0">
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Royal Magenta to Deep Purple Gradient */}
            <linearGradient id="gulmeliPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B1D7C" />
              <stop offset="50%" stopColor="#7B1865" />
              <stop offset="100%" stopColor="#4A0E4E" />
            </linearGradient>

            {/* Subtle Champagne Gold Gradient for needle/flourish */}
            <linearGradient id="gulmeliGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E4B7" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B38B22" />
            </linearGradient>

            {/* Ambient Purple Glow */}
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7B1865" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Outer Royal Seal Ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#gulmeliGoldGrad)"
            strokeWidth="1.5"
            strokeDasharray="90 3 4 3"
            opacity={isDarkBg ? '0.9' : '0.8'}
          />

          {/* Solid Royal Magenta Emblem Backdrop */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="url(#gulmeliPurpleGrad)"
            filter="url(#softGlow)"
          />

          {/* Inner Accent Ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Distinctive Stylized 'G' & Boutique Flowing Fabric Silhouette */}
          <path
            d="M66 34C61.5 28.5 53.5 26 44.5 28C33.5 30.5 25 40 25 51.5C25 64 35.5 74 48.5 74C60 74 69.5 66 71 54.5H50V46.5H78.5C78.8 49 79 51.5 79 54C79 70.5 66 82 48.5 82C30.5 82 17 68 17 50.5C17 33.5 30 19.5 46.5 19.5C56 19.5 64.5 23.5 70 30L66 34Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />

          {/* Stylized Golden Tailor's Needle & Thread Motif inside the G */}
          <path
            d="M50 25L54 21L56 23L52 27Z"
            fill="url(#gulmeliGoldGrad)"
          />
          <path
            d="M55 22L72 39"
            stroke="url(#gulmeliGoldGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Center Boutique Diamond Accent */}
          <polygon
            points="50,42 53,46 50,50 47,46"
            fill="url(#gulmeliGoldGrad)"
          />
        </svg>
      </div>

      {/* Typography: Authentic Nepali + English Branding */}
      <div className="flex flex-col justify-center">
        {/* Nepali Script Name */}
        <span
          className={`font-semibold tracking-tight transition-colors leading-tight ${
            size === 'sm'
              ? 'text-xs'
              : size === 'md'
              ? 'text-sm sm:text-base'
              : size === 'lg'
              ? 'text-lg sm:text-xl'
              : 'text-2xl sm:text-3xl'
          } ${isDarkBg ? 'text-white' : 'text-[#4A0E4E]'}`}
        >
          गुल्मेली कलेक्सन
          <span className="text-[#C59B27] mx-1">&</span>
          डिजाइनिङ सेन्टर
        </span>

        {/* English Brand Label */}
        <span
          className={`tracking-[0.18em] uppercase font-bold transition-colors ${
            size === 'sm'
              ? 'text-[8.5px]'
              : size === 'md'
              ? 'text-[10px] sm:text-[11px]'
              : size === 'lg'
              ? 'text-xs tracking-[0.2em]'
              : 'text-sm tracking-[0.25em]'
          } ${isDarkBg ? 'text-[#F3DFEA]' : 'text-[#7B1865]'}`}
        >
          GULMELI COLLECTION
        </span>

        {/* Location & Studio indicator */}
        {showTagline && size !== 'sm' && (
          <span
            className={`text-[8.5px] sm:text-[9.5px] tracking-wider uppercase font-medium flex items-center gap-1 ${
              isDarkBg ? 'text-[#D5B7DB]' : 'text-[#756A85]'
            }`}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            Ranibagiya, Sainamaina-1, Rupandehi
          </span>
        )}
      </div>
    </div>
  );
};
