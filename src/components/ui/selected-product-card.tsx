import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { ProductItemProps } from './admin-inventory-product-list';

interface SelectedProductCardProps {
    product: any;
    onDeselect: (product: ProductItemProps) => void;
}

export function SelectedProductCard({ product, onDeselect }: SelectedProductCardProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                />
                <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-500">${Number(product.price).toFixed(2)}</p>
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeselect(product)}
                aria-label={`Remove ${product.name} from selection`}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}

