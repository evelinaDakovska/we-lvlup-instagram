export const loadState = () => {
  try {
    const serializeState: any = localStorage.getItem("state");
    if (!serializeState) {
      return undefined;
    }
    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem("state", serializeState);
  } catch (err) {
    /*     console.log(err); */
  }
};
