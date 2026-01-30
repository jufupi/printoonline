export const categoryMapping: Record<string, string> = {
  'tarjetas': 'Tarjetas',
  'papel-carta': 'Hojas',
  'sobres': 'Sobres',
  'flyers': 'Flyers',
  'dipticos': 'Dipticos',
  'carteles': 'Carteles',
  'carpetas': 'Carpetas',
  'roll-up': 'Roll Up',
};

export function getFormatoLabel(formato: string, categoria: string): string {
  const formatMap: Record<string, Record<string, string>> = {
    'Tarjetas': {
      '85x55': '85×55 mm',
    },
    'Hojas': {
      '210x297': 'A4 (210×297 mm)',
    },
    'Sobres': {
      '210x105': 'DL (210×105 mm)',
      '330x229': 'C4 (330×229 mm)',
    },
    'Flyers': {
      '210x148': 'A5 (210×148 mm)',
      '210x297': 'A4 (210×297 mm)',
      '210x105': 'DL (210×105 mm)',
    },
    'Dipticos': {
      '210x148': 'A5 (210×148 mm)',
      '210x297': 'A4 (210×297 mm)',
      '210x105': 'DL (210×105 mm)',
    },
    'Carteles': {
      '297x420': 'A3 (297×420 mm)',
      '700x1000': 'B1 (700×1000 mm)',
    },
    'Carpetas': {
      '210x297': 'A4 (210×297 mm)',
    },
    'Roll Up': {
      '850x2000': '850×2000 mm',
      '1000x2000': '1000×2000 mm',
    },
  };

  return formatMap[categoria]?.[formato] || formato;
}

export function getAcabadoLabel(acabado: string): string {
  const acabadoMap: Record<string, string> = {
    'Sin plastificar': 'Sin plastificar',
    'Plastificado mate': 'Plastificado mate',
    'Plastificado brillo': 'Plastificado brillo',
    'con ventana': 'Con ventana',
    'sin ventana': 'Sin ventana',
    'estructura incluida': 'Estructura incluida',
  };

  return acabadoMap[acabado] || acabado;
}
