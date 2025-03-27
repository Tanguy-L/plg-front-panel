const PLAYERS_CHANGED = "players-changed";
const TEAMS_CHANGED = "teams-changed";

const createArrayProxy = (array) => {
  return new Proxy(array, {
    set(target, prop, value) {
      const oldValue = [...target];
      target[prop] = value;

      // Only dispatch for actual array modifications, not length changes
      if (prop !== "length") {
        window.dispatchEvent(
          new CustomEvent(PLAYERS_CHANGED, {
            detail: {
              type: "modify",
              oldValue,
              newValue: [...target],
              index: prop,
            },
          }),
        );
      }
      return true;
    },
  });
};

const target = {
  players: createArrayProxy([]),
  teams: createArrayProxy([]),
  modal: {
    isOpen: false,
    infos: {},
    type: "",
  },
};

const handler = {
  set(obj, prop, value) {
    if (prop === "players") {
      // If entirely replacing the users array, wrap the new one in a proxy
      obj[prop] = createArrayProxy(Array.isArray(value) ? value : [value]);

      window.dispatchEvent(
        new CustomEvent(PLAYERS_CHANGED, {
          detail: {
            type: "replace",
            newValue: [...obj[prop]],
          },
        }),
      );
    } else if (prop === "modal") {
      window.dispatchEvent(
        new CustomEvent("event-modal-changed", {
          detail: value,
        }),
      );
    } else if (prop === "teams") {
      obj[prop] = createArrayProxy(Array.isArray(value) ? value : [value]);
      window.dispatchEvent(
        new CustomEvent(TEAMS_CHANGED, {
          detail: {
            type: "replace",
            newValue: [...obj[prop]],
          },
        }),
      );
    } else {
      obj[prop] = value;
    }

    return true;
  },
};

const proxy = new Proxy(target, handler);

export default proxy;
