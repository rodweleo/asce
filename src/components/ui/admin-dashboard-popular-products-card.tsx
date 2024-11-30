"use client"

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./table";

export default function AdminDashboardPopularProductsCard() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Popular Products</CardTitle>
                    <Link href="/account/admin/inventory" className="font-bold text-blue-500">View All</Link>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                #
                            </TableHead>
                            <TableHead>
                                Product
                            </TableHead>
                            <TableHead>
                                Units Sold
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}