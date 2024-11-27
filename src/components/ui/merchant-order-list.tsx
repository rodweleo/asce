import { MerchantOrderListItem } from "./merchant-order-list-item"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./table"

export function MerchantOrderList({ orders }) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <MerchantOrderListItem order={order} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}