import React from "react";
import {useNavigate} from "react-router";
import {BackBtnId} from "../__test__/Fixtures";

export const BackButton = () => {
    const navigate = useNavigate();

    return (<button data-testid={BackBtnId} onClick={() => navigate(-1)}>Back</button>)
}