import { Eye } from "lucide-react";
import { Button } from "./button";
import { TableCell } from "./table";

export function MerchantOrderListItem({ order }) {

    return (
        <>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>${Number(order.totalAmount).toFixed(2)}</TableCell>
            <TableCell>{order.paymentMethod}</TableCell>
            <TableCell>{order.timestamp}</TableCell>
            <TableCell>
                <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" /> View Order
                </Button>

            </TableCell>
        </>
    )
}