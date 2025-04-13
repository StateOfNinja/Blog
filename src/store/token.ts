const userData = localStorage.getItem('user');
export const token: string | null = userData ? JSON.parse(userData).token : null;
