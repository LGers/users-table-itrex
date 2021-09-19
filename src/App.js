import React, {useEffect, useState} from "react"
import './App.css';
import Header from "./Components/Header/Header";
import SearchBlock from "./Components/SearchBlock/SearchBlock";
import MainTable from "./Components/MainTable/MainTable";
import Paginator from "./Components/Paginator/Paginator";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo";
import {initialState} from "./Components/store";
import {getLastPage, getStatesList, getUsersOnCurrentPage, sortByFieldASC, sortByFieldDESC} from "./Components/common";

const usersState = []

function App() {


    const baseURL = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json'
    const [users, setUsers] = useState(usersState)
    const [state, setState] = useState(initialState)

    const usersOnCurrentPage = (p) => getUsersOnCurrentPage(p,
        state.findUsers,
        state.usersPerPage,
        state.searchState
    )

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await fetchUsers()
            setUsers(usersFromServer)
            let lastPage = getLastPage(usersFromServer.length, state.usersPerPage)
            let usersOnCurrentPage = getUsersOnCurrentPage(state.currentUsersPage, usersFromServer, state.usersPerPage , state.searchState)
            setState({
                ...state,
                users: state.users = usersOnCurrentPage,
                findUsers: state.findUsers = usersFromServer,
                lastPage: state.lastPage = lastPage
            })
        }
        getUsers()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch(baseURL)
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
            data[i].uniqueId = i
        }
        return data
    }

    let statesList = getStatesList(state.findUsers)
    const selectCurrentPage = (p) => {
        setState({...state, currentUsersPage: p, users: state.users = usersOnCurrentPage(p)})
    }

    const onDecrement = () => {
        if (state.currentUsersPage !== 1) {
            setState({
                ...state,
                currentUsersPage: state.currentUsersPage - 1,
                users: state.users = usersOnCurrentPage(state.currentUsersPage - 1)
            })
        }
    }
    const onIncrement = () => {
        if (state.currentUsersPage !== state.lastPage) {
            setState({
                ...state,
                currentUsersPage: state.currentUsersPage + 1,
                users: state.users = usersOnCurrentPage(state.currentUsersPage + 1)
            })
        }
    }

    const sortTableBy = (field) => {
        if (state.sortBy !== field) {
            state.findUsers.sort(sortByFieldASC(field))
        } else {
            if (state.sortASC) {
                state.findUsers.sort(sortByFieldASC(field))
            } else {
                state.findUsers.sort(sortByFieldDESC(field))
            }
        }
        setState({
            ...state, users: state.findUsers = usersOnCurrentPage(state.currentUsersPage),
            sortASC: !state.sortASC,
            sortBy: state.sortBy = field
        })
    }


    const searchByString = (searchString) => {

        const objectToArray = (objArray) => {
            let result = []
            let tempArrayOfObj = []

            result = Object.values(objArray).filter(val => typeof (val) !== 'object')
            tempArrayOfObj = Object.values(objArray).filter(val => typeof (val) === 'object')

            while (Object.values(tempArrayOfObj).some(val => typeof (val) === 'object')) {
                tempArrayOfObj.forEach(el => {

                    Object.values(el).forEach(el => {

                        if (typeof (el) === 'object') {
                            tempArrayOfObj.push(el)
                        } else {
                            result.push(el)
                        }
                    })
                    tempArrayOfObj.splice(0, 1)
                })
            }

            return result
        }

        let resultUsers = []
        let lastPage = 1
        if (searchString !== '') {

            for (let i = 0; i < users.length; i++) {
                let user = {...users[i]}
                delete user.uniqueId
                let isStringInclude =
                    objectToArray(user).some(el => el.toString().toLowerCase().includes(searchString.toLowerCase()))

                if (isStringInclude) {
                    resultUsers.push(users[i])
                }
            }
        } else {
            resultUsers = users
        }

        if (state.searchState === 'SelectNone') {
            lastPage = getLastPage(resultUsers.length, state.usersPerPage)
        } else {
            lastPage = getLastPage(resultUsers.filter((el)=>el.adress.state === state.searchState).length, state.usersPerPage)
        }

        return [resultUsers, lastPage]
    }

    const filterByState = (stateName) => {

        let resultUsers = []
        let searchState = 'SelectNone'
        let lastPage = getLastPage(state.findUsers.length, state.usersPerPage)

        if (stateName === 'SelectNone') {
            resultUsers = getUsersOnCurrentPage(state.currentUsersPage, state.findUsers, state.usersPerPage, stateName)
        } else {
            let result = []
            state.findUsers.forEach(el => {
                if (el.adress.state === stateName) result.push(el)
            })

            resultUsers = getUsersOnCurrentPage(state.currentUsersPage, result, state.usersPerPage, stateName)
            searchState = stateName
            lastPage = getLastPage(result.length, state.usersPerPage)
        }

        return [resultUsers, lastPage, searchState]
    }

    const search = (searchValue, searchBy) => {

        let findUsers = state.findUsers
        let usersOnCurrentPage = []
        let lastPage = state.lastPage
        let searchString = state.searchString
        let searchState = state.searchState

        if (searchBy === 'byString') {
            [findUsers, lastPage] = searchByString(searchValue)
            usersOnCurrentPage = getUsersOnCurrentPage(1, findUsers, state.usersPerPage, searchState)
            searchString = searchValue
        }

        if (searchBy === 'byState') {
            [usersOnCurrentPage, lastPage, searchState] = filterByState(searchValue)
        }

        setState({
            ...state,
            users: state.users = usersOnCurrentPage,
            findUsers: state.findUsers = findUsers,
            lastPage: state.lastPage = lastPage,
            searchString: state.searchString = searchString,
            searchState: state.searchState = searchState
        })
    }

    const showProfile = (userId) => {

        let newProfile = {}
        newProfile = state.users.find(UId => UId.uniqueId.toString() === userId)
        setState({...state, profileInfo: state.profileInfo = newProfile})
    }

    return (
        <div className="App">
            <Header/>
            <div className={'MainContent'}>

                <SearchBlock statesList={statesList}
                             filterByState={filterByState}
                             searchBy={searchByString}
                             search={search}
                             searchState={state.searchState}
                />

                <MainTable
                    users={state.users}
                    sortTableBy={sortTableBy}
                    state={state}
                    showProfile={showProfile}
                />
                <Paginator
                    currentUsersPage={state.currentUsersPage}
                    pagesCount={state.lastPage}
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
