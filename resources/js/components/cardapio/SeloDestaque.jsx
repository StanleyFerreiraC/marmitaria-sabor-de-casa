export default function SeloDestaque({ className = '' }) {
    return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-destaque px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-sobre-destaque ${className}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3" fill="currentColor">
                <path d="M12 2c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3.5 1-6 1-8.5Z" />
            </svg>
            Destaque
        </span>
    );
}
