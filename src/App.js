import React, {useEffect, useState} from "react"
import './App.css';
import Header from "./Components/Header/Header";
import SearchBlock from "./Components/SearchBlock/SearchBlock";
import MainTable from "./Components/MainTable/MainTable";
import Paginator from "./Components/Paginator/Paginator";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo";
import {initialState} from "./Components/store";
import {getLastPage, getStatesList, getUsersOnCurrentPage} from "./Components/common";

const usersState = []

function App() {


    const baseURL = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'
    const [users, setUsers] = useState(usersState)

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await fetchUsers()
            setUsers(usersFromServer)
        }

        getUsers()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch(baseURL)
        const data = await response.json()
        // console.log('jsondata', data)
        for (let i = 0; i < data.length; i++) {
            data[i].uniqueId = i
        }
        return data
    }
    initialState.users = users
    initialState.findUsers = users
    initialState.lastPage = getLastPage(users.length, initialState.usersPerPage)
    console.log('initialState', initialState)

    const [state, setState] = useState(initialState)
    // console.log('State', state)
    // console.log('users', users)
    // debugger


    const usersOnCurrentPage = getUsersOnCurrentPage(state.currentUsersPage,
        state.users, //findUsers,
        state.usersPerPage,
        // state.searchState
    )
    // console.log('state.currentUsersPage', state.currentUsersPage)
    // console.log('usersOnCurrentPage', usersOnCurrentPage)
    let statesList = getStatesList(users)


    const onDecrement = () => {
        if (state.currentUsersPage !== 1) {
            setState({...state, currentUsersPage: state.currentUsersPage - 1})
        }
    }
    const onIncrement = () => {
        if (state.currentUsersPage !== state.lastPage) {
            setState({...state, currentUsersPage: state.currentUsersPage + 1})
        }
    }

    const selectCurrentPage = (p) => {
        setState({...state, currentUsersPage: p})
    }
    const sortByFieldASC = (field) => {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }
    const sortByFieldDESC = (field) => {
        return (a, b) => a[field] > b[field] ? -1 : 1;
    }

    const sortInState = (field) => {
        let sortedUsers = []
        if (state.sortBy !== field) {
            sortedUsers = state.users.sort(sortByFieldASC(field))
            setState({
                ...state, users: state.users = sortedUsers,
                sortASC: state.sortASC = false,
                sortBy: state.sortBy = field
            })
        } else {

            if (state.sortASC) {
                sortedUsers = state.users.sort(sortByFieldASC(field))
            } else {
                sortedUsers = state.users.sort(sortByFieldDESC(field))
            }
            setState({
                ...state, users: state.users = sortedUsers,
                sortASC: !state.sortASC,
                sortBy: state.sortBy = field
            })
        }


    }
    const sortTableBy = (sortby) => {
        switch (sortby) {
            case 'id' :
                sortInState('id')
                break
            case 'firstName' :
                sortInState('firstName')
                break
            case 'lastName' :
                sortInState('lastName')
                break
            case 'phone' :
                sortInState('phone')
                break
            case 'email' :
                sortInState('email')
                break
            case 'state' :
                sortInState('state')
                break
            default:
                return 1
        }
    }

    const filterByState = (field) => {
        if (field === 'SelectNone') {
            debugger
            setState({
                ...state, users: state.users = users,
                searchState: state.searchState = '',
                findUsers: state.findUsers=users
            })
        } else {
            let result = []
            users.forEach(el => {
                if (el.adress.state === field) result.push(el)
            })
            setState({
                ...state, users: state.users = result,
                searchState: state.searchState = field
            })
        }
    }

    const searchBy = (searchString, searchBy) => {
        console.log('search string = ', searchString)
        /*let result = []
        debugger

        if (searchString==='byState') {
            if (searchString === 'SelectNone') {
                result=users
                setState({
                    ...state, users: state.users = users,
                    searchState: state.searchState = searchString
                })
            } else {
                let result = []
                state.users.forEach(el => {
                    if (el.adress.state === searchString) result.push(el)
                })
                setState({...state, users: state.users = result})
            }
        }*/

        if (searchString !== '') {
            let result = []
            for (let i = 0; i < users.length; i++) {
                let el = users[i]

                if (el.id.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.firstName.includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.lastName.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.email.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.phone.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.adress.streetAddress.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.adress.city.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.adress.state.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.adress.zip.toString().includes(searchString)) {
                    result.push(el)
                    continue
                }
                if (el.description.toString().includes(searchString)) {
                    result.push(el)
                }
            }
            setState({...state, users: state.users = result})
        } else setState({...state, users: state.users = users})
    }

    const showProfile = (userId) => {
        console.log(userId)
        let newProfile = {}
        newProfile = state.users.find(UId => UId.uniqueId.toString() === userId)
        setState({...state, profileInfo: state.profileInfo = newProfile})
    }
    window.state = state
    return (
        <div className="App">
            <Header/>
            <div className={'MainContent'}>
                {/*<div>*/}
                {/*    <button onClick={onDecrement}>minus</button>*/}
                {/*    Current Page: <span id="counter">{state.currentUsersPage}</span>*/}
                {/*    <button onClick={onIncrement}>plus</button>*/}
                {/*</div>*/}

                <SearchBlock statesList={statesList}
                             filterByState={filterByState}
                             searchBy={searchBy}
                />

                <MainTable users={usersOnCurrentPage}
                           sortTableBy={sortTableBy}
                           state={state}
                           showProfile={showProfile}
                />
                <Paginator totalUsersCount={state.users.length}
                           pageSize={state.usersPerPage}
                           currentUsersPage={state.currentUsersPage}
                           selectCurrentPage={selectCurrentPage}
                           onDecrement={onDecrement}
                           onIncrement={onIncrement}
                />
                <ProfileInfo profileInfo={state.profileInfo}/>
            </div>
        </div>
    );
}

export default App;
