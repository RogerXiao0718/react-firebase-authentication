import React, { useState, useEffect, useContext } from "react";
import * as ROUTES from "../../constants/routes";


const useAuthorization = ( payloads, condition) => {
    useEffect(() => {
        if (!condition(payloads.authUser)){
            payloads.history.push(ROUTES.LANDING)
        }
    }, [condition, payloads.authUser, payloads.history])
}

export default useAuthorization;
