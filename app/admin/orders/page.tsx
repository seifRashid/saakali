import { getRecentOrders } from "../../../lib/db/queries";
export const dynamic = 'force-dynamic';
import OrderListClient from "../../components/Admin/OrderListClient";

export default async function AdminOrdersPage() {
    // We use getRecentOrders but with a larger limit for the orders page
    const orders = await getRecentOrders(100);

    return <OrderListClient orders={orders} />;
}
