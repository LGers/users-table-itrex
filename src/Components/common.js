export const getLastPage =(usersQtty, usersPerPage)=>{
    let lastPage=1
    if (usersQtty % usersPerPage === 0) {
        lastPage=usersQtty / usersPerPage
        return lastPage
    } else {
        lastPage =  Math.floor(usersQtty / usersPerPage) + 1
        return lastPage
    }
}

export const getUsersOnCurrentPage = (pageNumber, users, usersPerPage, searchState) => {

    if (searchState !== 'SelectNone') {
        users = users.filter(el => el.adress.state === searchState)
    }
    if (users.length <= usersPerPage) return users

    let usersOnCurrentPage = []
    let lastPage = getLastPage(users.length, usersPerPage)

    if (pageNumber !== lastPage) {
        for (let i = (pageNumber - 1) * usersPerPage; i < (pageNumber) * usersPerPage; i++) {
            usersOnCurrentPage.push(users[i])
        }
        return usersOnCurrentPage
    } else {
        for (let i = (pageNumber - 1) * usersPerPage; i < users.length; i++) {
            usersOnCurrentPage.push(users[i])
        }
        return usersOnCurrentPage
    }
}

export const getStatesList =(users)=>{
    let statesListArray=[]
    let statesList=[]
    let idState = 0
    users.forEach(el => {
        if (!statesListArray.includes(el.adress.state)) {
            statesListArray.push(el.adress.state)
            statesList.push({id: idState, stateName: el.adress.state})
            idState = idState + 1
        }
    })
    return statesList
}

export const sortByFieldASC = (field) => {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}
export const sortByFieldDESC = (field) => {
    return (a, b) => a[field] > b[field] ? -1 : 1;
}