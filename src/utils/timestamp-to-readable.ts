
export function timestampToReadable(timestamp) {
    // Convert nanoseconds to milliseconds
    const milliseconds = BigInt(timestamp) / BigInt(1_000_000);

    // Create a Date object
    const date = new Date(Number(milliseconds));

    // Format the date
    return date.toLocaleString();
}