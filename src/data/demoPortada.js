// ARCHIVO GENERADO por scripts/gen-demo-portada.mjs — NO editar a mano.
//
// Muestra pública de la portada de paramédicos: DOS secciones de una lección
// real, su título y su resumen. Nada más. Existe para que la portada no tenga
// que importar el temario completo (4,3 MB) solo para enseñar un fragmento.
//
// Se regenera con: npm run gen:demo
export const demoPortada = {
  "id": "m2-afi-cardiovascular",
  "titulo": "Sistema cardiovascular.",
  "resumen": "Cómo está construido el corazón, por dónde circula la sangre y qué determina que llegue a los tejidos en cantidad suficiente.",
  "icono": "il-corazon-vascularizacion",
  "numero": "2.10",
  "moduloNumero": 2,
  "moduloColor": "#10b981",
  "secciones": [
    {
      "titulo": "El corazón por dentro",
      "bloques": [
        {
          "tipo": "p",
          "texto": "El corazón es una bomba doble alojada en el tórax, entre los pulmones y por detrás del esternón. Tiene cuatro cavidades: dos aurículas arriba, que reciben, y dos ventrículos abajo, que expulsan. Un tabique separa por completo el lado derecho del izquierdo, de modo que la sangre de uno no se mezcla con la del otro."
        },
        {
          "tipo": "tabla",
          "titulo": "Cavidades, válvulas y sentido del flujo",
          "headers": [
            "Cavidad",
            "Recibe de",
            "Expulsa hacia",
            "Válvula de salida"
          ],
          "filas": [
            [
              "Aurícula derecha",
              "Venas del organismo",
              "Ventrículo derecho",
              "Válvula auriculoventricular derecha"
            ],
            [
              "Ventrículo derecho",
              "Aurícula derecha",
              "Arterias pulmonares",
              "Válvula pulmonar"
            ],
            [
              "Aurícula izquierda",
              "Venas pulmonares",
              "Ventrículo izquierdo",
              "Válvula auriculoventricular izquierda"
            ],
            [
              "Ventrículo izquierdo",
              "Aurícula izquierda",
              "Arteria aorta",
              "Válvula aórtica"
            ]
          ]
        },
        {
          "tipo": "callout",
          "variante": "clave",
          "titulo": "Las válvulas solo dejan pasar en un sentido",
          "texto": "Se abren y se cierran de forma pasiva, por diferencia de presión: se abren cuando la presión detrás supera a la de delante y se cierran cuando ocurre lo contrario. Esa unidireccionalidad es la que convierte una contracción en un flujo con sentido, y no en un vaivén."
        },
        {
          "tipo": "p",
          "texto": "La pared del ventrículo izquierdo es notablemente más gruesa que la del derecho. La razón es funcional: el derecho envía sangre a los pulmones, que están cerca y oponen poca resistencia, mientras que el izquierdo la envía a todo el organismo. Estructura y función se explican mutuamente."
        }
      ]
    },
    {
      "titulo": "Dos circuitos, un mismo corazón",
      "bloques": [
        {
          "tipo": "p",
          "texto": "La sangre recorre dos circuitos en serie, cada uno impulsado por un lado del corazón. Entender que están en serie —uno después del otro y no en paralelo— es lo que explica por qué el fallo de un lado repercute en el otro."
        },
        {
          "tipo": "tabla",
          "titulo": "Los dos circuitos",
          "headers": [
            "Circuito",
            "Lo impulsa",
            "Va hacia",
            "Para qué"
          ],
          "filas": [
            [
              "Pulmonar",
              "Ventrículo derecho",
              "Los pulmones",
              "Que la sangre se cargue de oxígeno y libere dióxido de carbono"
            ],
            [
              "Sistémico",
              "Ventrículo izquierdo",
              "Todo el organismo",
              "Que los tejidos reciban oxígeno y nutrientes y entreguen desechos"
            ]
          ]
        },
        {
          "tipo": "callout",
          "variante": "clave",
          "titulo": "Arteria no significa «con oxígeno»",
          "texto": "Arteria es el vaso que sale del corazón y vena el que llega a él, con independencia del contenido de oxígeno. Por eso las arterias pulmonares llevan sangre pobre en oxígeno y las venas pulmonares la llevan rica: la definición es por la dirección respecto del corazón, no por el gas que transportan. Es el error más repetido de este tema."
        }
      ]
    }
  ],
  "seccionesRestantes": 3
}
