export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  // In a real application, this would be an API call
  return [
    { id: "1", name: "Elegant Watch", price: 199.99, description: "A stylish and functional timepiece", image: "/placeholder.svg?height=200&width=200" },
    { id: "2", name: "Leather Wallet", price: 49.99, description: "Durable and spacious wallet", image: "/placeholder.svg?height=200&width=200" },
    { id: "3", name: "Wireless Earbuds", price: 129.99, description: "High-quality sound with long battery life", image: "/placeholder.svg?height=200&width=200" },
    { id: "4", name: "Sunglasses", price: 79.99, description: "UV protection with a modern design", image: "/placeholder.svg?height=200&width=200" },
    { id: "5", name: "Backpack", price: 89.99, description: "Comfortable and spacious for daily use", image: "/placeholder.svg?height=200&width=200" },
  ];
};

