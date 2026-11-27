// GSAP solo se usa en la portada. Se carga aparte para que la página de la obra,
// la que abre el sello en un celular con datos, no lo descargue.
export async function cargarGsap() {
  const [nucleo, st] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  nucleo.gsap.registerPlugin(st.ScrollTrigger)
  return nucleo.gsap
}
