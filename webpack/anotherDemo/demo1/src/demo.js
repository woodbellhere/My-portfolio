import $ from "jquery";

export default {
  setH1() {
    document.body.insertAdjacentHTML("beforeend", "<h1>hi webpack</h1>");
    // $("body").append("<h1>hi webpack!</h1>");
  },
};
