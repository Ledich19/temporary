export const Arrow = ({className = "arrow-svg", width='7', height='4'}) => (
    <svg
        className={`${className} arrow-svg`}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 7 4"
        fill="none"
    >
        <path
            d="M0.5 0.5L3.5 3.5L6.5 0.5"
            stroke="#363636"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
