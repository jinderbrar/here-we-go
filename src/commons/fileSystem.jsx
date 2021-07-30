export const FOLDER = "FOLDER";
export const FILE = "FILE";
export const ROOT = 0;

export const MK_DIR = "MK_DIR";

export const defaultFS = {
  0: {
    id: 0,
    name: "~",
    type: FOLDER,
    iconSrc: "",
    kids: [1, 3, 2],
    parentId: 0,
  },
  1: {
    id: 1,
    name: "src",
    type: FOLDER,
    iconSrc: "",
    kids: [],
    parentId: 0,
  },
  2: {
    id: 2,
    name: "index.js",
    type: FILE,
    iconSrc: "",
    kids: [],
    parentId: 0,
  },
  3: {
    id: 3,
    name: "app.js",
    type: FILE,
    iconSrc: "",
    kids: [],
    parentId: 0,
  },
};
