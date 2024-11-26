import { ProductItemProps } from "./admin-inventory-product-list";
import { Button } from "./button";
import { TableCell } from "./table";


export function AdminInventoryProductListItem({ productItem }: {
    productItem: ProductItemProps
}) {

    const { name, sku, quantity, status } = productItem;

    return (
        <>
            <TableCell>{name}</TableCell>
            <TableCell>{sku}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {status}
                </span>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
            </TableCell>
        </>
    )
}