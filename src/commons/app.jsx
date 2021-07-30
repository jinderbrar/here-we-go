import terminalIcon from "../images/terminalIcon.svg";
import stopwatchIcon from "../images/stopwatchIcon.svg";
import folderIcon1 from "../images/folder1.svg";
import folderIcon2 from "../images/folder2.svg";
import folderIcon3 from "../images/folder3.svg";

export const OPEN_APP = "OPEN_APP";
export const CLOSE_APP = "CLOSE_APP";
export const SHOW_APP = "SHOW_APP";
export const HIDE_APP = "HIDE_APP";

export const appType = {
  TERMINAL: "TERMINAL",
  STOPWATCH: "STOPWATCH",
};

export const defaultApps = {
  TERMINAL: {
    id: "TERMINAL",
    title: "Console",
    defaultPosition: { x: 200, y: 200 },
    iconSrc: terminalIcon,
    isOpen: false,
    isHidden: false,
  },
  STOPWATCH: {
    id: "STOPWATCH",
    title: "Stopwatch",
    defaultPosition: { x: 450, y: 0 },
    iconSrc: stopwatchIcon,
    isOpen: false,
    isHidden: false,
  },
  EXPLORER: {
    id: "EXPLORER",
    title: "File Explorer",
    defaultPosition: { x: 450, y: 400 },
    iconSrc: folderIcon3,
    isOpen: true,
    isHidden: false,
  },
};
