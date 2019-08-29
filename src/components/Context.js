import React from "react";
import Family from '../models/Family';
import defaultConfig from './../config';

const reducer = (state, action) => {
    const [type, value] = [...action];
    switch (type) {
        case "setConfig":
            return { ...state, config: { ...state.config, ...value } };
        case "importSettings":
            const family = state.family.load(value.members);
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
    family: new Family().load(defaultConfig.members || defaultConfig.membersCsv),
    config: defaultConfig,
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