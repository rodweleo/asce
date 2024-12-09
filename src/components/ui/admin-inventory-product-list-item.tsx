import { Product } from "@/declarations/bizpro-backend/bizpro-backend.did";
import { Button } from "./button";
import { TableCell } from "./table";
import Image from "next/image"

export function AdminInventoryProductListItem({ productItem }: {
    productItem: Product
}) {

    const {
        id,
        name,
        description,
        price,
        quantity,
        category,
        image,
        businessId
    } = productItem


    return (
        <>
            <TableCell>{id}</TableCell>
            <TableCell>
                <Image src={image} alt={`${name}'s image`} width={50} height={50} className="rounded-md" />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>
                {Number(price)}
            </TableCell >
            <TableCell>
                {Number(quantity)}
            </TableCell >
            <TableCell>
                {category}
            </TableCell >
            <TableCell>
                {businessId.toString()}
            </TableCell >
            <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
            </TableCell>
        </>
    )
}