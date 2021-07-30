import {
  defaultApps,
  OPEN_APP,
  CLOSE_APP,
  HIDE_APP,
  SHOW_APP,
} from "../commons/app";

const _changeAppStatus = (apps, appid, status, value) => {
  // console.log(apps);
  if (apps.hasOwnProperty(appid)) {
    apps[appid][status] = value;
    // console.log(status, value);
  }
  return apps;
};

const taskbar = (state = { ...defaultApps }, action) => {
  console.log(`state : `, state);
  switch (action.type) {
    case OPEN_APP:
      return { ..._changeAppStatus(state, action.appid, "isOpen", true) };
    case CLOSE_APP:
      return { ..._changeAppStatus(state, action.appid, "isOpen", false) };
    case SHOW_APP:
      return { ..._changeAppStatus(state, action.appid, "isHidden", false) };
    case HIDE_APP:
      return { ..._changeAppStatus(state, action.appid, "isHidden", true) };
    default:
      return state;
  }
};

export default taskbar;
