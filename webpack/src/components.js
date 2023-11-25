export const button = () => {
  return document.createElement("button");

  console.log("dead-code");
};

export const link = () => {
  return document.createElement("a");
};

export const heading = (level) => {
  return document.createElement("h" + level);
};
