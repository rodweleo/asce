import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Supplier } from "@/pages/account/admin/suppliers/index"
import MerchantSupplierListItem from "./merchant-supplier-list-item"

type SupplierTableProps = {
    suppliers: Supplier[]

}

export function MerchantSupplierList({ suppliers }: SupplierTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Products Supplied</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suppliers.map((supplier, index: number) => (
                        <TableRow key={supplier.id}>
                            <MerchantSupplierListItem supplier={supplier} index={index} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

