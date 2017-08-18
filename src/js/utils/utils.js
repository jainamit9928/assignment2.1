
export const getVisibleTechies = (techies, param) => techies.filter((techie, index) => (techie.name.toLowerCase().includes(param)))