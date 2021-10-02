
import { module } from 'angular';
import gsap from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default class ScrollService {
  ScrollTrigger = ScrollTrigger;
  gsap = gsap;
  constructor() {
    this.gsap.registerPlugin(this.ScrollTrigger);
  }
};

module('tyler-site').service('ScrollService', ScrollService);
