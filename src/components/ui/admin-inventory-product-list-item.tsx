import { ProductItemProps } from "./admin-inventory-product-list";
import { Button } from "./button";
import { TableCell } from "./table";
import Image from "next/image"

export function AdminInventoryProductListItem({ productItem }: {
    productItem: ProductItemProps
}) {

    const {
        name,
        description,
        price,
        quantity,
        category,
        image,
        seller
    } = productItem


    return (
        <>
            <TableCell>{name}</TableCell>
            <TableCell>
                <Image src={image} alt={`${name}'s image`} width={50} height={50} className="rounded-md" />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>
                {price}
            </TableCell >
            <TableCell>
                {quantity}
            </TableCell >
            <TableCell>
                {category}
            </TableCell >
            <TableCell>
                {seller.toString()}
            </TableCell >
            <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
            </TableCell>
        </>
    )
}