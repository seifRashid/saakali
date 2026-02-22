"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Package,
    ChevronRight,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    AlertCircle
} from "lucide-react";
import { updateOrderStatusAction } from "../../actions/orders";

export default function OrderListClient({ orders }: { orders: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleStatusUpdate(id: string, status: string) {
        setUpdatingId(id);
        const result = await updateOrderStatusAction(id, status);
        if (result.error) alert(result.error);
        setUpdatingId(null);
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock className="w-4 h-4" />;
            case 'PROCESSING': return <AlertCircle className="w-4 h-4" />;
            case 'SHIPPED': return <Truck className="w-4 h-4" />;
            case 'DELIVERED': return <CheckCircle2 className="w-4 h-4" />;
            case 'CANCELLED': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'SHIPPED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'PROCESSING': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'CANCELLED': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gold/10 text-gold border-gold/20';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Orders</h1>
                <p className="text-text-muted text-sm">Track customer purchases and manage fulfillment.</p>
            </div>

            {/* Toolbar */}
            <div className="bg-bg-card border border-border-subtle p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by order ID or customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-primary border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-widest hover:border-gold transition-all">
                    <Filter className="w-4 h-4 text-gold" />
                    More Filters
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-bg-primary/50 text-[10px] text-text-muted uppercase tracking-[0.2em]">
                                <th className="px-8 py-4 font-bold">Order Details</th>
                                <th className="px-8 py-4 font-bold">Status</th>
                                <th className="px-8 py-4 font-bold">Total Amount</th>
                                <th className="px-8 py-4 font-bold">Date</th>
                                <th className="px-8 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="text-sm hover:bg-bg-elevated transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-bg-primary border border-border-subtle rounded-xl flex items-center justify-center">
                                                <Package className="w-6 h-6 text-text-muted" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-text-primary">#{order.id.slice(0, 8)}</p>
                                                <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">{order.user?.name || 'Customer'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <select
                                            disabled={updatingId === order.id}
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border focus:outline-none cursor-pointer transition-all ${getStatusColor(order.status)}`}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PROCESSING">Processing</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-bold">${Number(order.total).toLocaleString()}</p>
                                        <p className="text-[10px] text-text-muted">{order.items?.length || 0} items</p>
                                    </td>
                                    <td className="px-8 py-6 text-text-muted text-xs">
                                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                        <p className="text-[10px] opacity-60">
                                            {new Date(order.createdAt).toLocaleTimeString(undefined, {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2.5 hover:bg-gold/10 hover:text-gold border border-transparent hover:border-gold/20 rounded-xl transition-all">
                                            <Eye className="w-5 h-5" />
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
