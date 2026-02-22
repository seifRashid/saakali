import { getCategories } from "../../../lib/db/queries";
export const dynamic = 'force-dynamic';
import CategoryListClient from "../../components/Admin/CategoryListClient";

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    return <CategoryListClient categories={categories} />;
}
