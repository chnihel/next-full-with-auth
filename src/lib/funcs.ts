export const reloadSession = ()=>{
  const event = new Event ("visibilitychangee")
  document.dispatchEvent(event)
}