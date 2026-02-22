import { getProducts, getCategories } from "../../../lib/db/queries";
export const dynamic = 'force-dynamic';
import ProductListClient from "../../components/Admin/ProductListClient";

export default async function AdminProductsPage() {
    const products = await getProducts();
    const categories = await getCategories();

    return <ProductListClient products={products} categories={categories} />;
}
