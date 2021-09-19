import React from "react";
import st from './SearchBlock.module.css'

const selectState = (selectedState, currentState) => {
    return selectedState === currentState
        ? `selected`
        : '';
}

const SearchBlock = (props) => {

    return (

        <div className={st.SearchContainer}>

            <input className={st.NameSearch} placeholder='Search by Name:'
                   onChange={(e)=>{
                       props.search(e.target.value, 'byString')
                   }}/>

            <div>
                <select className={st.StateFilter} name="State" size='1'
                        onChange={(e) => {
                            props.search(e.target.value, 'byState')
                        }}>
                    <option value="SelectNone">Select State</option>
                    {props.statesList.map(el =>
                        <option key={el.id} value={el.stateName}
                                selected={selectState(props.searchState, el.stateName)}>
                            {el.stateName}
                        </option>)}
                </select>

            </div>
        </div>
    )
}
export default SearchBlock;