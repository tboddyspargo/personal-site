define(['scripts/app', 'utils/scroll'],
  (ngApp, Scroll) => {
    function aboutController($q, $timeout, DataService) {
      const ctrl = this;
      ctrl.title = "About";
      ctrl.sections = [
        { id: 'bio', name: 'Biography' },
        { id: 'education', name: 'Education' },
        { id: 'employment', name: 'Employment' }
      ];
      ctrl.resumeReady = false;
      ctrl.resume = [];
      ctrl.sectionReady = Scroll.resetSectionNavigatorBehavior;

      console.log(ctrl);
      ctrl.changeStatus = function () {
        console.log('button clicked');
        ctrl.resumeReady = !ctrl.resumeReady;
        ctrl.bioReady = !ctrl.bioReady;
        ctrl.title += '!';
        ctrl.sections.push({ id: 'new', name: 'NEW' });
      }

      $q.when(DataService.getBio())
        .then((data) => {
          ctrl.bio = data.split('\n');
          ctrl.bioReady = true;
        });

      $q.when(DataService.getFacts())
        .then((data) => {
          ctrl.facts = data
          ctrl.factsReady = true;
        });

      const eduPromise = $q.when(DataService.getEducation(), (data) => {
        ctrl.education = data;
        ctrl.resume.push(data);
        ctrl.educationReady = true;
      });

      const empPromise = $q.when(DataService.getEmployment())
        .then((data) => {
          ctrl.employment = data;
          ctrl.resume.push(data);
          ctrl.employmentReady = true;
        });

      $q.when(Promise.all([eduPromise, empPromise]), () => {
        ctrl.resumeReady = true;
        $timeout(() => {
          $timeout(Scroll.resetSectionNavigatorBehavior, 0, false);
        }, 0, false);
      });
    };

    ngApp.controller('AboutCtrl', ['$q', '$timeout', 'DataService', aboutController]);
  });
