define(['scripts/app'], (ngApp) => {
  function resumeSectionCtrl($scope, $element, $attrs) {
    const ctrl = this;

    // image viewer management.
    ctrl.activeImage = 0;
    ctrl._showImages = true;
    ctrl.showImages = () => ctrl._showImages;
    ctrl.toggleImages = () => ctrl._showImages = !ctrl._showImages;
    ctrl.hasImages = () => ctrl.images && Array.isArray(ctrl.images) && !!ctrl.images.length;



  };

  ngApp.component('tbsResumeSection', {
    bindings: {
      title: '@',
      intro: '@',
      entries: '<',
      images: '<',
      footer: '<'
    },
    templateUrl: '/components/about/resume-section.html',
    controller: ['$scope', '$element', '$attrs', resumeSectionCtrl]
  });
});
