import { module } from "angular";

import BannerComponent from "./banner";
import FooterComponent from "./footer";
import ImageCarouselComponent from "./image-carousel";
import NavbarComponent from "./navbar";
import SidebarComponent from "./sidebar";

export default module("tbs.layout", ["tbs.core"])
  .component(BannerComponent.selector, BannerComponent)
  .component(NavbarComponent.selector, NavbarComponent)
  .component(SidebarComponent.selector, SidebarComponent)
  .component(ImageCarouselComponent.selector, ImageCarouselComponent)
  .component(FooterComponent.selector, FooterComponent);
