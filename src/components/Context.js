import React from "react";
import Family from '../models/Family';
import config from './../config/config';
import views from './../util/views';

const defaultConfig = JSON.parse(localStorage.getItem('config')) || config;

const reducer = (state, action) => {
    const [type, value] = [...action];
    // Auto-save current state if on the settings page
    if (state.selectedView === views.SETTINGS) {
        localStorage.setItem('config', JSON.stringify(state.config));
    }
    switch (type) {
        case "setMemberEl":
            return { ...state, memberEls: { ...state.memberEls, ...value } }
        case "setConfig":
            return { ...state, config: { ...state.config, ...value } };
        case "importSettings":
            const family = state.family.load(value.members);
            return { ...state, config: value, family: family };
        case "setSelectedMember":
            return { ...state, selectedMember: value };
        case "setSelectedView":
            return { ...state, selectedView: value };
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
    family: new Family().load(defaultConfig.members),
    members: [],
    memberEls: {},
    selectedMember: {},
    selectedView: undefined,
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