import { Button } from "./button";
import { TableCell } from "./table";

export default function MerchantSupplierListitem({ supplier, index }) {
    return (
        <>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{supplier.name}</TableCell>
            <TableCell>{supplier.location}</TableCell>
            <TableCell>{supplier.products.join(", ")}</TableCell>
            <TableCell>
                {supplier.phone}
            </TableCell>
            <TableCell>
                {supplier.email}
            </TableCell>
            <TableCell>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"

                    >
                        Delete
                    </Button>
                </div>
            </TableCell>
        </>
    )
}