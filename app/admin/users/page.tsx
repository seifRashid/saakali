import { getUsers } from "../../../lib/db/queries";
export const dynamic = 'force-dynamic';
import {
    Users,
    Search,
    Filter,
    Mail,
    Calendar,
    Shield,
    MoreVertical,
    UserCheck
} from "lucide-react";

export default async function AdminUsersPage() {
    const usersList = await getUsers();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">User Management</h1>
                    <p className="text-text-muted text-sm">Monitor and manage access for customers and administrators.</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-bg-card border border-border-subtle p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search users by name, email or role..."
                        className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-primary border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-widest hover:border-gold transition-all">
                    <Filter className="w-4 h-4 text-gold" />
                    More Filters
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-bg-primary/50 text-[10px] text-text-muted uppercase tracking-[0.2em]">
                                <th className="px-8 py-4 font-bold">Identity</th>
                                <th className="px-8 py-4 font-bold">System Role</th>
                                <th className="px-8 py-4 font-bold">Email Status</th>
                                <th className="px-8 py-4 font-bold">Joined Date</th>
                                <th className="px-8 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {usersList.map((user) => (
                                <tr key={user.id} className="text-sm hover:bg-bg-elevated transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-subtle flex items-center justify-center font-bold text-gold">
                                                {user.name?.split(' ').map(n => n[0]).join('') || 'CU'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-text-primary">{user.name}</p>
                                                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${user.role === 'ADMIN' ? 'bg-gold/10 text-gold border-gold/20' : 'bg-bg-primary text-text-muted border-border-subtle'
                                            }`}>
                                            <Shield className="w-3 h-3" />
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-green-500 font-medium">
                                            <UserCheck className="w-4 h-4" />
                                            <span className="text-xs">Verified</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-text-muted">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-xs">
                                                {new Date(user.createdAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 hover:bg-bg-card rounded-lg transition-all text-text-muted hover:text-text-primary">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
