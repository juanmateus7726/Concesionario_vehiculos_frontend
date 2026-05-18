export const saveTokens = (data: { access: string; refresh: string; user: object }) => {
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  localStorage.setItem('user', JSON.stringify(data.user));

  // Guardar en cookie para que el middleware de Next.js pueda leerlo
  document.cookie = `access_token=${data.access}; path=/; max-age=3600; SameSite=Strict`;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('access_token');
};

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  // Limpiar también la cookie
  document.cookie = 'access_token=; path=/; max-age=0';
};