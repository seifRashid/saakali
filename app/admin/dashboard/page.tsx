import { getDashboardStats, getRecentOrders, getRevenueAnalytics } from "../../../lib/db/queries";
export const dynamic = 'force-dynamic';
import {
    DollarSign,
    ShoppingCart,
    Package,
    AlertTriangle,
    ArrowUpRight,
    TrendingUp,
    Clock
} from "lucide-react";
import RevenueChart from "../../components/Admin/RevenueChart";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();
    const recentOrders = await getRecentOrders();
    const revenueData = await getRevenueAnalytics(7);

    const statCards = [
        { name: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: "+12.5%", color: "text-gold" },
        { name: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingCart, trend: "+8.2%", color: "text-blue-500" },
        { name: "Total Products", value: stats.totalProducts.toString(), icon: Package, trend: "+2.4%", color: "text-purple-500" },
        { name: "Low Stock Items", value: stats.lowStockCount.toString(), icon: AlertTriangle, trend: "-0.5%", color: "text-red-500" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Welcome Back, <span className="gold-gradient-text">Admin</span></h1>
                <p className="text-text-muted text-sm">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-bg-card border border-border-subtle p-6 rounded-2xl hover:border-gold/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-bg-primary border border-border-subtle group-hover:border-gold/50 transition-all ${card.color}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-bg-primary border border-border-subtle flex items-center gap-1 ${card.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                <TrendingUp className="w-3 h-3" />
                                {card.trend}
                            </span>
                        </div>
                        <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">{card.name}</p>
                        <h3 className="text-2xl font-bold tracking-tight">{card.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Analytics */}
                <div className="lg:col-span-2 bg-bg-card border border-border-subtle p-8 rounded-3xl shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gold/10 rounded-lg">
                                <DollarSign className="w-5 h-5 text-gold" />
                            </div>
                            <h2 className="text-xl font-bold">Revenue Analytics</h2>
                        </div>
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-bg-primary px-3 py-1.5 rounded-lg border border-border-subtle">
                            Last 7 Days
                        </div>
                    </div>
                    <RevenueChart data={revenueData} />
                </div>

                {/* Recent Activity / Status */}
                <div className="bg-bg-card border border-border-subtle p-8 rounded-3xl shadow-xl flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-blue-500/10 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-500" />
                        </div>
                        <h2 className="text-xl font-bold">Quick Overview</h2>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="flex items-center justify-between p-4 bg-bg-primary/50 border border-border-subtle rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <Package className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Live Inventory</p>
                                    <p className="text-[10px] text-text-muted uppercase">{stats.totalProducts} items online</p>
                                </div>
                            </div>
                            <Link href="/admin/products" className="p-2 hover:text-gold transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-bg-primary/50 border border-border-subtle rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Low Stock Alert</p>
                                    <p className="text-[10px] text-text-muted uppercase">{stats.lowStockCount} models critical</p>
                                </div>
                            </div>
                            <Link href="/admin/products" className="p-2 hover:text-gold transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-bg-primary/50 border border-border-subtle rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                                    <ShoppingCart className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Unprocessed Orders</p>
                                    <p className="text-[10px] text-text-muted uppercase">{stats.pendingOrdersCount} orders pending</p>
                                </div>
                            </div>
                            <Link href="/admin/orders" className="p-2 hover:text-gold transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <Link href="/admin/products" className="btn-secondary w-full justify-center">
                            Inventory Management
                        </Link>
                        <Link href="/admin/orders" className="flex items-center justify-center gap-2 p-3 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-gold transition-colors">
                            Manage Fulfillment <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-xl">
                <div className="p-8 border-b border-border-subtle flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-purple-500/10 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-purple-500" />
                        </div>
                        <h2 className="text-xl font-bold">Recent Orders</h2>
                    </div>
                    <Link href="/admin/orders" className="text-gold text-xs font-bold uppercase tracking-widest hover:underline">
                        View All Orders
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-bg-primary/50 text-[10px] text-text-muted uppercase tracking-[0.2em]">
                                <th className="px-8 py-4 font-bold">Order ID</th>
                                <th className="px-8 py-4 font-bold">Customer</th>
                                <th className="px-8 py-4 font-bold">Status</th>
                                <th className="px-8 py-4 font-bold">Total</th>
                                <th className="px-8 py-4 font-bold">Date</th>
                                <th className="px-8 py-4 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {recentOrders.map((order: any) => (
                                <tr key={order.id} className="text-sm hover:bg-bg-elevated transition-colors group">
                                    <td className="px-8 py-5 font-bold">#{order.id.slice(0, 8)}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-border-subtle flex items-center justify-center text-[10px] font-bold">
                                                {order.user?.name?.split(' ').map((n: string) => n[0]).join('') || 'CU'}
                                            </div>
                                            <div>
                                                <p className="font-bold">{order.user?.name || 'Customer'}</p>
                                                <p className="text-[10px] text-text-muted">{order.user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            order.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                'bg-gold/10 text-gold border-gold/20'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-bold">${Number(order.total).toLocaleString()}</td>
                                    <td className="px-8 py-5 text-text-muted text-xs">
                                        {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-8 py-5">
                                        <Link href={`/admin/orders`} className="p-2 hover:bg-bg-card rounded-lg transition-colors group-hover:text-gold block">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
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
