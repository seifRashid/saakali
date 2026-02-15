import { Watch } from "lucide-react";

const shopLinks = [
    { label: "Men", href: "#men" },
    { label: "Women", href: "#women" },
    { label: "Kids", href: "#kids" },
    { label: "Luxury", href: "#luxury" },
    { label: "Sports", href: "#sports" },
];

const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
];

const policyLinks = [
    { label: "Shipping Policy", href: "#" },
    { label: "Returns Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
];

function SocialIcon({ d, label }: { d: string; label: string }) {
    return (
        <a
            href="#"
            aria-label={label}
            className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 transition-all duration-300"
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={d} />
            </svg>
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="relative bg-bg-secondary border-t border-border-subtle">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
                        <a href="#" className="flex items-center gap-2 mb-4 group">
                            <Watch className="w-6 h-6 text-gold" />
                            <span className="text-xl font-bold tracking-widest font-[family-name:var(--font-heading)] gold-gradient-text">
                                SAAKALI
                            </span>
                        </a>
                        <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-xs">
                            Premium yet accessible. Modern yet timeless. Confident but not
                            loud. Time, perfected.
                        </p>
                        {/* Socials */}
                        <div className="flex gap-3">
                            <SocialIcon
                                label="Instagram"
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            />
                            <SocialIcon
                                label="X (Twitter)"
                                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                            />
                            <SocialIcon
                                label="Facebook"
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                            />
                            <SocialIcon
                                label="YouTube"
                                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                            />
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase">
                            Policies
                        </h4>
                        <ul className="space-y-3">
                            {policyLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-muted">
                        © {new Date().getFullYear()} Saakali. All rights reserved.
                    </p>
                    <p className="text-xs text-text-muted">
                        Crafted with precision. Delivered with care.
                    </p>
                </div>
            </div>
        </footer>
    );
}
