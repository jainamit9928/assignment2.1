import { createSelector } from 'reselect'
// selector
const getTechies = (state,props) => state.techies.techies
const getSearchTerm = (state,props) => {
console.log(props)
return props.match.params.id
} 
// reselect function
export const makeGetTechiesState = () => createSelector(
  [ getTechies ],
  (techies) => techies
)

export const makeGetVisibleTechies = () => createSelector(
  [getTechies, getSearchTerm],
  (techies, searchTerm) => {
    return techies.filter((techie, index) => (techie.name.toLowerCase().includes(searchTerm)))
  }
)
