/**
 * Algunos hosts entregan .gz ya descomprimido mediante Content-Encoding y otros
 * lo entregan como archivo gzip. La firma evita descomprimir dos veces.
 */
export async function decodeModelResponse(response, expectedBytes, compressed) {
  if (!response.ok) throw new Error('No se pudo descargar una parte del modelo anatómico.')

  const payload = await response.arrayBuffer()
  const signature = new Uint8Array(payload, 0, Math.min(2, payload.byteLength))
  const isGzip = compressed && signature[0] === 0x1f && signature[1] === 0x8b
  const buffer = isGzip
    ? await new Response(
      new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip')),
    ).arrayBuffer()
    : payload

  if (buffer.byteLength !== expectedBytes) {
    throw new Error('Una parte del modelo anatómico llegó incompleta. Recarga el visor.')
  }
  return buffer
}
