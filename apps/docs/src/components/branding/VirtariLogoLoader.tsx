interface VirtariLogoLoaderProps {
  /** Accessible label announced to screen readers. */
  label?: string;
  /** Inline previews and loading regions use their parent's surface. */
  fullScreen?: boolean;
  animated?: boolean;
}

export function VirtariLogoLoader({ label = 'Loading', fullScreen = true, animated = true }: VirtariLogoLoaderProps) {
  return (
    <div className="virtari-splash" data-inline={!fullScreen || undefined} data-still={!animated || undefined} role="status" aria-label={label}>
      <svg
        className="virtari-splash__svg"
        viewBox="0 0 1798 1553"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          className="virtari-splash__shape virtari-splash__shape--left"
          d="M0 259.155L543.053 260.239L728.487 671.243C756.959 737.821 755.683 814.288 725.031 879.738L493.681 1379.22L0 259.155Z"
        />
        <path
          className="virtari-splash__shape virtari-splash__shape--right"
          d="M1797.93 0H1233.4L554.532 1552.76H917.46C1040.36 1552.76 1152.02 1477.38 1203.45 1359.75L1797.93 0Z"
        />
      </svg>
    </div>
  );
}

export default VirtariLogoLoader;
