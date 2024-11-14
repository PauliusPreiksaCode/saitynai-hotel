import React, { useContext } from "react";
import { UserContext } from "../../services/authProvider";
import UserNavBar from "./UserNavBar";
import GuestNavbar from "./GuestNavBar";
import HotelNavBar from "./HotelNavBar";

const Navbar = () => {
    const userContext = useContext(UserContext);
    const userAccessLevel = userContext?.user?.decodedJwt?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return (<>
        {(userAccessLevel === undefined || userAccessLevel === null) && (
        <GuestNavbar />
      )}
      {userAccessLevel !== undefined && userAccessLevel === "Client" && (
        <UserNavBar />
      )}
      {userAccessLevel !== undefined && userAccessLevel === "HotelPersonnel" && (
        <HotelNavBar />
      )}

    </>
    );
}

export default Navbar;