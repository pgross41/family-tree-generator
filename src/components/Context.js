import React from "react";
import Family from '../models/Family';
import defaultConfig from './../config/config';

const reducer = (state, action) => {
    const [type, value] = [...action];
    switch (type) {
        case "setMemberEl":
            return { ...state, memberEls: {...state.memberEls, ...value}}
        case "setConfig":
            return { ...state, config: { ...state.config, ...value } };
        case "importSettings":
            const family = state.family.import(value.members);
            return { ...state, config: value, family: family };
        case "setSelectedMember":
            return { ...state, selectedMember: value };
        case "updateMember":
            return { ...state, family: state.family.updateMember(value.id, value.props) };
        case "addMember":
            return { ...state, family: state.family.addMember(value) };
        case "removeMember":
            return { ...state, family: state.family.removeMember(value) };
        case "moveMember":
            return { ...state, family: state.family.moveMember(value.id, value.positionOffset) };
        default:
            return;
    }
};

const initialState = {
    config: defaultConfig,
    family: new Family().import(defaultConfig.members),
    members: [],
    memberEls: {}, 
    selectedMember: {},
};

const Context = React.createContext(initialState);

const ContextProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }} >
            {props.children}
        </Context.Provider >
    );
}
export { Context, ContextProvider };