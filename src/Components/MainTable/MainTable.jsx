import React from "react";
import st from "./MainTable.module.css"

const UserRow = (props) => {
    return (
        <div  onClick={(e)=>{
            props.showProfile(e.target.parentElement.id)
        }}>
            <div id = {props.uniqueId} className={st.MainTable} >
                <div className={st.userId}>{props.id}</div>
                <div>{props.uniqueId} - {props.firstName}</div>
                <div>{props.lastName}</div>
                <div>{props.email}</div>
                <div>{props.phone}</div>
                <div>{props.state}</div>
            </div>
        </div>
    )
}

const MainTable = (props) => {
    const usersList = props.users.map((u, index) => (
        <UserRow key={index}
                 id={u.id}
                 firstName={u.firstName}
                 lastName={u.lastName}
                 email={u.email}
                 phone={u.phone}
                 state={u.adress.state}
                 pos={u.index}
                 showProfile={props.showProfile}
                 uniqueId={u.uniqueId}
        />)
    )

    const sortDirection = (field) => {
        if (props.state.sortBy !== field)
        {return <span>-</span>}

        if (props.state.sortASC) {
            return <span>↓</span>
        } else return <span>↑</span>
    }
    return (
        <div>
            <div className={st.MainTable}>
                <div className={st.userId} onClick={(e) => {
                    props.sortTableBy('id')
                }}><p>id {sortDirection('id')}</p></div>
                <div onClick={(e) => {
                    props.sortTableBy('firstName')
                }}>
                    <p>First name{sortDirection('firstName')}</p>
                </div>
                <div onClick={(e) => {
                    props.sortTableBy('lastName')
                }}>
                    <p>Last Name {sortDirection('lastName')}</p>
                </div>
                <div onClick={(e) => {
                    props.sortTableBy('email')
                }}>
                    <p>Email{sortDirection('email')}</p>
                </div>
                <div onClick={(e) => {
                    props.sortTableBy('phone')
                }}>
                    <p>Phone{sortDirection('phone')}</p>
                </div>
                <div onClick={(e) => {
                    props.sortTableBy('state')
                }}>
                    <p>State{sortDirection('state')}</p>
                </div>
            </div>
            {usersList}
        </div>
    )
}
export default MainTable;