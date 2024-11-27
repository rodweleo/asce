import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductItemProps } from './admin-inventory-product-list';

interface ProductCardProps {
    product: any;
    onSelect: (product: ProductItemProps) => void;
    isSelected: boolean;
}

export function MerchantProductCard({ product, onSelect, isSelected }: ProductCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardContent className="p-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold">${Number(product.price).toFixed(2)}</p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => onSelect(product)}
                    variant={isSelected ? "secondary" : "default"}
                    className="w-full"
                >
                    {isSelected ? "Selected" : "Select"}
                </Button>
            </CardFooter>
        </Card>
    )
}

