import {
    Settings,
    Image as ImageIcon,
    Type,
    Search,
    Globe,
    Plus,
    ArrowRight
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AdminContentPage() {
    const sections = [
        { title: "Hero Section", description: "Manage main titles, descriptions and call-to-actions.", icon: ImageIcon },
        { title: "Best Sellers", description: "Select which items appear in the trending collection.", icon: Type },
        { title: "SEO Settings", description: "Update meta titles, descriptions and social sharing cards.", icon: Search },
        { title: "Footer & Social", description: "Manage contact information and social media links.", icon: Globe },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Content Management</h1>
                <p className="text-text-muted text-sm">Fine-tune the brand narrative and website content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, i) => (
                    <div key={i} className="bg-bg-card border border-border-subtle p-8 rounded-[2.5rem] hover:border-gold/30 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-bg-primary border border-border-subtle rounded-2xl group-hover:border-gold/50 transition-all">
                                <section.icon className="w-8 h-8 text-gold" />
                            </div>
                            <button className="p-2.5 bg-bg-primary border border-border-subtle rounded-xl hover:text-gold transition-all">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">{section.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {section.description}
                            </p>
                        </div>

                        <div className="mt-8">
                            <button className="text-xs font-bold uppercase tracking-widest text-gold hover:underline flex items-center gap-2">
                                Configure Section
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Decor */}
                        <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all" />
                    </div>
                ))}
            </div>

            <div className="bg-bg-card border border-border-subtle p-12 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-bg-primary border border-border-subtle rounded-[2rem] flex items-center justify-center text-gold mb-4">
                    <Settings className="w-10 h-10 animate-spin-slow" />
                </div>
                <h2 className="text-2xl font-bold">More Modules Coming Soon</h2>
                <p className="text-text-muted text-sm max-w-md mx-auto">
                    We are constantly evolving the Saakali admin experience. Predictive analytics, marketing automation and blog management are in development.
                </p>
            </div>
        </div>
    );
}
