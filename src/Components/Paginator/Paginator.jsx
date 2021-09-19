import React from "react";
import st from "./Paginator.module.css";

const Paginator = ({
                       totalUsersCount, pageSize, currentUsersPage,
                       selectCurrentPage, onDecrement, onIncrement
                   }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const onPageChanged = (p) => {
        selectCurrentPage(p)
    }

    return (
        <div className={st.Paginator}>
            <div className={st.prevBtn}
                 onClick={(e) => {
                     onDecrement()
                 }}>Previous
            </div>

            {pages.map(p => {
                return <div key={p.dateTime}
                            className={(currentUsersPage === p) && st.PaginatorActive}
                            onClick={(e) => {
                                onPageChanged(p);
                            }}>{p}
                </div>
            })}

            <div className={st.nextBtn}
                 onClick = {(e) => {
                onIncrement()
            }}>Next
            </div>
        </div>
    )
}
export default Paginator;