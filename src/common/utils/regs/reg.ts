export const generalValidation = {
  matchesLetrasAndNumbers: /^[\sA-ZÁÉÍÓÚÜÑ0-9.]+$/i,
  matchesEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  matchesDNI: /^\d{8}$/,
  matchesPhones: /^[0-9]{9}$/,
  matchesDireccion: /^[\w\d\s.,()-]+$/,
  matchesRuc: /^\d{11}$/,
  matchesLetras: /^[.\sA-ZÁÉÍÓÚÜÑ?]+$/i,
  matchesRazonSocial: /^[\w\d\s.,()-]+$/,
  matchesNumeros: /^[0-9]+(\.[0-9]+)?$/,
};

export const messageValidation = {
  msgEmail: 'Email incorrecto',
  msgDNI: 'el DNI debe tener exactamente 8 dígitos',
  msgPassword: 'contraseña inválido',
  msgRuc: 'El RUC debe contener 11 dígitos',
  msgLetras: 'solo puede contener letras',
  msgDireccion: 'debe contener letras y números',
  msgPhones: 'debe tener 9 dígitos',
  msgNumeros: 'solo acepta números(decimal,entero)',
};
