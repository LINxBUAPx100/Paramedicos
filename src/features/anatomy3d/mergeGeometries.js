/**
 * Une geometrías con position, normal, partIndex e índice. El visor conserva
 * geometrías individuales para selección y dibuja copias agrupadas por sistema.
 */
export function mergeAtlasGeometries(THREE, geometries) {
  if (!geometries.length) return null

  let vertexCount = 0
  let indexCount = 0
  geometries.forEach((geometry) => {
    vertexCount += geometry.getAttribute('position').count
    indexCount += geometry.getIndex().count
  })

  const positions = new Float32Array(vertexCount * 3)
  const normals = new Int16Array(vertexCount * 3)
  const partIndices = new Float32Array(vertexCount)
  const indices = new Uint32Array(indexCount)

  let vertexOffset = 0
  let indexOffset = 0
  geometries.forEach((geometry) => {
    const position = geometry.getAttribute('position')
    const normal = geometry.getAttribute('normal')
    const partIndex = geometry.getAttribute('partIndex')
    const sourceIndices = geometry.getIndex().array

    positions.set(position.array, vertexOffset * 3)
    normals.set(normal.array, vertexOffset * 3)
    partIndices.set(partIndex.array, vertexOffset)

    for (let i = 0; i < sourceIndices.length; i += 1) {
      indices[indexOffset + i] = sourceIndices[i] + vertexOffset
    }

    vertexOffset += position.count
    indexOffset += sourceIndices.length
  })

  const merged = new THREE.BufferGeometry()
  merged.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  merged.setAttribute('normal', new THREE.BufferAttribute(normals, 3, true))
  merged.setAttribute('partIndex', new THREE.BufferAttribute(partIndices, 1))
  merged.setIndex(new THREE.BufferAttribute(indices, 1))
  merged.computeBoundingSphere()
  return merged
}
