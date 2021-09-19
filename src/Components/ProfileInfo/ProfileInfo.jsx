import React from "react";

const ProfileInfo = (props) => {

    return (
        <div className="ProfileInfo">
            <p>Profile info</p>
            <p>Selected profile: <span>{props.profileInfo.firstName} {props.profileInfo.lastName}</span></p>
            <p>Description: <span>{props.profileInfo.description}</span></p>
            <p>Address: <span>{props.profileInfo.adress.streetAddress}</span></p>
            <p>City: <span>{props.profileInfo.adress.city}</span></p>
            <p>State: <span>{props.profileInfo.adress.state}</span></p>
            <p>Index: <span>{props.profileInfo.adress.zip}</span></p>
        </div>
    )
}

export default ProfileInfo;