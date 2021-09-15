export const getLastPage =(usersQtty,usersPerPage)=>{
    let lastPage=1
    if (usersQtty % usersPerPage === 0) {
        lastPage=usersQtty / usersPerPage
        return lastPage
    } else {
        lastPage =  Math.floor(usersQtty / usersPerPage) + 1
        return lastPage
    }
}

export const getUsersOnCurrentPage = (pageNumber, users, usersPerPage, userState) => {

    // if (users.length <= usersPerPage && userState === '') return users
    if (users.length <= usersPerPage) return users

    let usersOnCurrentPage = []
    // let usersSelectByState = users
    /*if (userState !== '') {
        users.forEach(user => {
            if (user.adress.state === userState){
                usersSelectByState.push(user)
            }
        })
    }*/

    // let lastPage = getLastPage(users.length, usersPerPage)
    let lastPage = getLastPage(users.length, usersPerPage)

    // debugger
    //Make users by users per page
    if (pageNumber !== lastPage) {
        for (let i = (pageNumber - 1) * usersPerPage; i < (pageNumber) * usersPerPage; i++) {
            // usersOnCurrentPage.push(users[i])
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
    let idState=0
    users.forEach(el=>{
        if (!statesListArray.includes(el.adress.state)) {
            statesListArray.push(el.adress.state)
            statesList.push({id:idState, stateName: el.adress.state})
            idState=idState+1
        }
    })
    // console.log('statesList',statesList)
    return statesList
}