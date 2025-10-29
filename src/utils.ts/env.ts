const getEnv = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue;
};

// Exportar la URL base del frontend
export const DB_HOST_FRONT = getEnv('API_BASE_URL', 'http://localhost:3000');
