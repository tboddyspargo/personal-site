import { module } from "angular";
export default class FooterComponent {
  templateUrl = require("./footer.html");
}
module("tyler-site").component("tbsFooter", new FooterComponent());
