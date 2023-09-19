export const shortenUsername = (address, n) => `${(address.length > n) ? `${address.slice(0, n - 1)}...` : address}`;
