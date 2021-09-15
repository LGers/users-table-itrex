
let state= {
    users:[
        {
            "id": 1,
            "firstName": "Sue",
            "lastName": "Corson",
            "email": "mail@xxx.yy",
            "phone": "(612)211-6296",
            "adress": {
                "streetAddress": "2578 Amet St",
                "city": "Waterford",
                "state": "WI",
                "zip": "54060"
            },
            "description": "{lorem|32"
        },

        {
            "id": 655,
            "firstName": "Anteria",
            "lastName": "Slocum",
            "email": "SPaulsen@donec.org",
            "phone": "(967)760-0580",
            "adress": {
                "streetAddress": "6388 Lacus Ct",
                "city": "Kenora",
                "state": "IA",
                "zip": "49758"
            },
            "description": "{lorem|32"
        },

        {
            "id": 142,
            "firstName": "Carmerlina",
            "lastName": "User",
            "email": "CGuanzon@lacus.org",
            "phone": "(268)280-4603",
            "adress": {
                "streetAddress": "6057 Vitae Rd",
                "city": "Washington",
                "state": "AR",
                "zip": "32202"
            },
            "description": "{lorem|32"
        },

        {
            "id": 3,
            "firstName": "Nidal",
            "lastName": "Oxman",
            "email": "YLester@lacus.ly",
            "phone": "(657)915-4120",
            "adress": {
                "streetAddress": "2578 Amet St",
                "city": "Waterford",
                "state": "MN",
                "zip": "54060"
            },
            "description": "{lorem|32"
        },
    ],
    statesList:[
        {id:1,stateName:"WI"},
        {id:2,stateName:"TN"},
        {id:3,stateName:"FL"},
        {id:4,stateName:"WI"},
        {id:5,stateName:"NE"},
        {id:6,stateName:"NY"},
    ]

}

// export let updTextArea = (postMessage) => {
//     let currentTextArea=postMessage;
//     rerenderEntireTree(state);
//     alert(postMessage)
// }

export default state;