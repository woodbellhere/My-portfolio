import "./main.css";
import nat from "./nat-2.jpg";
import createHeading from "./heading.js";
import createEditor from "./editor.js";
import { button } from "./components.js";

const heading = createHeading();
document.body.append(heading);

const editor = createEditor();
document.body.appendChild(editor);

const img = new Image();
img.src = nat;
document.body.appendChild(img);

document.body.appendChild(button());

module.hot.accept("./editor.js", () => {
  // console.log("editor就得这么手动设置更新");
  const value = lastEditor.innerHTML;
  document.body.removeChild(editor);
  newEditor.innerHTML = value;
  const newEditor = createEditor();
  document.body.appendChild(newEditor);
  lastEditor = newEditor;
});

module.hot.accept("./nat-2.jpg", () => {
  img.src = background;
});
