import { ArrowUpDown } from "lucide-react";
import { AdminInventoryProductListItem } from "./admin-inventory-product-list-item";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "./table";

export interface ProductItemProps {
    id: number
    name: string
    sku: number;
    quantity: number
    status: string
}
export function AdminInventoryProductList({ products }: {
    products: ProductItemProps[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="cursor-pointer">
                        Product Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        SKU
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Quantity
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Status
                    </TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((item) => (
                    <TableRow key={item.id}>
                        <AdminInventoryProductListItem productItem={item} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}