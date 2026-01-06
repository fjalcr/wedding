export function generateGuestCode(length: number = 5): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Leaving out easily confused chars like I, O, 1, 0
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
