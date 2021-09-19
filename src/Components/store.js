export let initialState = {
    profileInfo:
        {
            "id": '-',
            "firstName": "Nothing to Show",
            "lastName": "-",
            "email": "-",
            "phone": "-",
            "adress": {
                "streetAddress": "-",
                "city": "-",
                "state": "-",
                "zip": "-"
            },
            "description": "-",
            "uniqueId": '0'
        },
    findUsers:[],
    users: [
        {
            "id": 1,
            "firstName": "Nothing to Show",
            "lastName": "-",
            "email": "-",
            "phone": "-",
            "adress": {
                "streetAddress": "-",
                "city": "-",
                "state": "-",
                "zip": "-"
            },
            "description": "-",
           "uniqueId": '0'
        },
    ],

    usersPerPage: 20,
    lastPage: 1,
    currentUsersPage: 1,
    sortASC: true,
    searchString:'',
    searchState:'SelectNone'
}