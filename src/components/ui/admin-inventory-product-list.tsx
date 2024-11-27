import { AdminInventoryProductListItem } from "./admin-inventory-product-list-item";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "./table";
import type { Principal } from "@dfinity/principal";

export interface ProductItemProps {
    id: string
    name: string
    description: string
    price: number;
    quantity: number
    category: string
    image: string
    seller: Principal
}
export function AdminInventoryProductList({ products }: {
    products: ProductItemProps[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="cursor-pointer">
                        Id
                    </TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="cursor-pointer">
                        Name
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Description
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Price
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Quantity
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Category
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Seller
                    </TableHead>
                    <TableHead className="cursor-pointer">
                        Actions
                    </TableHead>
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