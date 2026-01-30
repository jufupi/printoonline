# Guía de Importación de CSV

## Estado Actual

✅ La tabla `productos_imprentas` ha sido creada en Supabase
✅ El script de importación está configurado y funcionando
✅ Se importaron 3 filas de prueba correctamente

## Cómo Importar el CSV Completo

### Opción 1: Reemplazar el archivo CSV y ejecutar el script

1. **Reemplaza el archivo CSV actual:**
   - Localiza tu archivo CSV completo `tabla_comparador_imprentas_printoonline_bolt_ready.csv`
   - Cópialo a: `data/productos_imprentas.csv` en el proyecto
   - Asegúrate de que el formato sea el mismo (delimitador `;`)

2. **Ejecuta el script de importación:**
   ```bash
   npm run import-csv
   ```

3. **Verifica la importación:**
   El script mostrará:
   - Número de filas leídas
   - Progreso de inserción por lotes
   - Total de filas importadas

### Opción 2: Importación Manual desde la Consola de Supabase

1. Ve a tu proyecto en Supabase: https://uvkunvuxtszvphyazdcp.supabase.co
2. Ve a **Table Editor** > `productos_imprentas`
3. Usa la opción **Import data from CSV**
4. Sube tu archivo CSV completo

## Estructura de la Tabla

La tabla `productos_imprentas` tiene las siguientes columnas:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | text | ID único del producto (PK) |
| categoria | text | Categoría (Tarjetas, Hojas, etc.) |
| producto | text | Nombre del producto |
| formato_mm | text | Formato en mm |
| papel | text | Tipo de papel |
| gramaje_g | text | Gramaje |
| acabado | text | Tipo de acabado |
| cantidad | integer | Cantidad de unidades |
| imprenta | text | Nombre de la imprenta |
| gama | text | Gama (básico/premium) |
| precio_producto | numeric | Precio sin envío |
| precio_envio | numeric | Costo de envío |
| precio_total_sin_iva | numeric | Total sin IVA |
| precio_total_con_iva | numeric | Total con IVA |
| precio_principal | numeric | Precio de referencia |
| plazo_min_dias | integer | Plazo mínimo (días) |
| plazo_max_dias | integer | Plazo máximo (días) |
| disponible | boolean | Disponibilidad |
| observaciones | text | Notas adicionales |

## Formato del CSV

Asegúrate de que tu CSV:
- Usa punto y coma (`;`) como delimitador
- La primera línea contenga los encabezados
- Los números decimales usen coma (`,`) como separador
- Los valores booleanos sean `VERDADERO` o `FALSO`

## Verificar los Datos

Después de importar, verifica con:

```bash
npx supabase db execute "SELECT categoria, COUNT(*) FROM productos_imprentas GROUP BY categoria"
```

O desde el código:
```typescript
const { data } = await supabase
  .from('productos_imprentas')
  .select('*', { count: 'exact' });
```

## Solución de Problemas

### Error: "File not found"
- Verifica que el archivo esté en `data/productos_imprentas.csv`
- Usa rutas absolutas si es necesario

### Error: "Row violates RLS policy"
- Las políticas ya están configuradas correctamente
- Si persiste, verifica que el archivo `.env` tenga las credenciales correctas

### Caracteres especiales no se ven bien
- Asegúrate de que el CSV esté codificado en UTF-8
- Usa un editor que soporte UTF-8 al guardar el archivo

## Próximos Pasos

Una vez importados todos los datos:
1. La aplicación podrá comparar precios de todas las imprentas
2. Los usuarios podrán buscar por categoría, producto, cantidad, etc.
3. Se mostrarán las mejores ofertas automáticamente
