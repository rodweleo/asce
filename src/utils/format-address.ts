

export function formatAddress(address: string, startLength: number = 6, endLength: number = 6): string {
    if (address.length <= startLength + endLength) {
        return address; // Return full address if it's shorter than the total truncation length
    }
    const start = address.slice(0, startLength); // First set of characters
    const end = address.slice(-endLength); // Last set of characters
    return `${start}...${end}`; // Combine with ellipsis in the middle
}

