import React from "react";
import st from './SearchBlock.module.css'


const SearchBlock = (props) => {
    return (

        <div className={st.SearchContainer}>

            <input className={st.NameSearch} placeholder='Search by Name:'
                   onChange={(e)=>{
                       props.searchBy(e.target.value, 'byString')
                   }}/>

            <div>
                <select className={st.StateFilter} name="State" size='1'
                        onChange={(e) => {
                    props.filterByState(e.target.value, 'byState')

                }}>
                    <option value="SelectNone">Select State</option>
                    {props.statesList.map(el => <option key={el.id} value={el.stateName}>{el.stateName}</option>)}
                </select>
                {/*<input type="text" placeholder='Add Task'*/}
                {/*       value={'some text'}*/}
                {/*       onClick={(e)=>{*/}
                {/*           console.log(e.target.value)*/}
                {/*       }}*/}
                {/*       // onChange={(e)=> setText(e.target.value) }*/}
                {/*/>*/}
            </div>
        </div>
    )
}
export default SearchBlock;