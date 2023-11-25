console.log("hhhh");

export default () => {
  const editorElement = document.createElement("div");
  editorElement.contentEditable = true;
  editorElement.className = "editor";
  editorElement.id = "editor";

  console.log("editor init completed");

  alert("123");

  return editorElement;
};
