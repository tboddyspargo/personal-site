/*
**TO DO:
**separate controllers
**separate data - 'contents' sidebar will be tab.sidebar.contents set equal to an array from each content page's scope.
**fetch data with .json and separate services for each page.
**angular-router handles url changes when tabs change
**ng-view
*/
(function() {
	var app = angular.module("application",['ngAnimate', 'angular-carousel', 'ngSanitize'])
		.run(['$anchorScroll', function($anchorScroll) {
		  $anchorScroll.yOffset = 70;   // always scroll by 50 extra pixels
		}])
		.config(function($locationProvider) {
			$locationProvider.html5Mode(true).hashPrefix('#')
		});
	
	app.service('dataService', function ($http) {
		var obj = {'projects':projects,
				'about':about,
				'sidebar': sidebar_sections,
				'active': 1,
				'short_desc':[],
				'main_facts':[],
				'facts': [],
				'links':links,
				'blogs': blogs,
				'blurb':blurb,
				'bio':bio};
	 	for (var x = 0; x < obj.projects.length; x++) {
	 		obj.short_desc.push({name:obj.projects[x].name, desc:obj.projects[x].goal, thumbnail:obj.projects[x].thumbnail, label:'Project', page:3, loc:'project'+x})
			obj.sidebar['3'].contents.push({'name':obj.projects[x].name,'loc':'project'+x});
		}
		for (var y = 0; y < obj.about.length; y++) {
			for (var x = 0; x < obj.about[y].entries.length; x++) {
		 		if (obj.about[y].heading == 'Education') {
		 			obj.short_desc.push({name: obj.about[y].entries[x].name, desc: obj.about[y].entries[x].description.slice(0,70)+"...", thumbnail: obj.about[y].entries[x].thumbnail, label: 'School', page:2, loc: obj.about[y].id});}
		 		if (obj.about[y].heading == 'Employment History') {
		 			obj.short_desc.push({name:obj.about[y].entries[x].name, desc:obj.about[y].entries[x].list[0]+"...", thumbnail:obj.about[y].entries[x].thumbnail, label:'Job', page:2, loc:obj.about[y].id});}
		 	}
		 	obj.sidebar['2'].contents.push({'name':obj.about[y].heading,'loc':obj.about[y].id});
	 	}
	 	var newFacts = all_facts.slice(0);
	 	for (var x = 0; x < 5; x ++) {
	 		var num = Math.floor(Math.random()*newFacts.length);
	 		obj.main_facts = obj.main_facts.concat(newFacts.splice(num,1));
	 	}
	 	for (var x = 0; x < 5; x ++) {
	 		var num = Math.floor(Math.random()*newFacts.length);
	 		obj.facts = obj.facts.concat(newFacts.splice(num,1));
	 	}


	 	return obj;
	});

	/*app.config(function config($stateProvider, $locationProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url:'/',
			templateUrl:'templates/home.html'
		});
		$stateProvider.state('about', {
			url:'/about',
			templateUrl:'templates/about.html'
		});
		$stateProvider.state('projects', {
			url:'/projects',
			templateUrl:'templates/projects.html'
		});
		$locationProvider.html5Mode(true);
	})*/

	app.controller('TabCtrl', ['$scope', 'dataService', '$location', '$anchorScroll', '$sce', function ($scope, dataService, $location, $anchorScroll, $sce) {
		$scope['right'] = 0;
		$scope.short_desc = dataService.short_desc;
		$scope.projects = dataService.projects;
		$scope.about = dataService.about;
		$scope.sidebar = dataService.sidebar;
		$scope.main_facts = dataService.main_facts;
		$scope.links = dataService.links;
		$scope.blogs = dataService.blogs;
		$scope.facts = dataService.facts;
		$scope.bio = dataService.bio;
		$scope.blurb = dataService.blurb;
		$scope.makeActive = function(index) {
			if (index == 1) {string = '/';}
			else if (index == 2) {string = '/';}
			else if (index == 3) {string = '/';}
			$location.path(string).hash('');
			$scope.active = index;
		}

		$scope.makeActive(1);
		$scope.isActive = function(index) {
			return $scope.active === index;
		}

		$scope.deliberatelyTrustDangerousSnippet = function(item) {
           return $sce.trustAsHtml(item);
         };

		$scope.toggleImages = function(index) {
			if (index) {
				$scope.projects[index].showImages = !$scope.projects[index].showImages;
			}
			else {
				$scope.education.showImages = !$scope.education.showImages;
			}
		}
		$scope.previousImage = function(thisObject) {
			if (!thisObject.activeImage) {
				thisObject.activeImage = thisObject.images.length-1;
			}
			else {thisObject.activeImage-=1;}
		}
		$scope.nextImage = function(thisObject) {
			thisObject.activeImage = (thisObject.activeImage+1)%thisObject.images.length;
		}
		$scope.goTo = function(loc) {
			$location.hash(loc);
			$anchorScroll();
		};

	}]);

	app.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/navbar.html'
		}
	});

	app.directive('tabContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/tabs.html'
		}
	});

	app.directive('homeContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/home.html'
		}
	});

	app.directive('aboutContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/about.html'
		}
	});

	app.directive('projectsContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/projects.html'
		}
	});

	var active = 'home';

	var sidebar_sections = {
		'1':{heading: 'Contents',
			text:'',
			contents:[]
			},
		'2':{heading: 'Contents',
			text:'',
			contents:[{name:'Bio', loc:'bio'}]
			},
		'3':{heading: 'Contents',
			text:'',
			contents:[]
			}
	};

	var links = {heading: 'Links',
			text:'',
			links:[{address:'http://tyler.boddyspargo.com/assets/cv.pdf', name: 'CV', icon:'http://tyler.boddyspargo.com/assets/round-icons/pdf-round.png', noNewPage: false},
				{address:'http://be.linkedin.com/in/tylerboddyspargo', name: 'LinkedIn', icon:'http://tyler.boddyspargo.com/assets/round-icons/Linkedin-round.png', noNewPage: false},
				{address:'http://google.com/+TylerBoddySpargo', name: 'Google+', icon:'http://tyler.boddyspargo.com/assets/round-icons/Google-plus-round.png', noNewPage: false},
				{address:'http://www.facebook.com/tboddyspargo', name: 'Facebook', icon:'http://tyler.boddyspargo.com/assets/round-icons/Facebook-round.png', noNewPage: false},
				{address:'http://about.me/tylerboddyspargo', name: 'About.me', icon:'http://tyler.boddyspargo.com/assets/round-icons/me-round.png', noNewPage: false},
				{address:'mailto:muyleche@gmail.com', name: 'Email', icon:'http://tyler.boddyspargo.com/assets/round-icons/email-2-icon.png', noNewPage: true}]
			};
	var blogs = {heading: 'Blogs',
			text:'',
			links:[{address:'http://tboddyspargo.wordpress.com', name: 'Pond Hopping', icon:'http://tyler.boddyspargo.com/assets/round-icons/pond-hopping-sm.png', noNewPage: false},
			{address:'http://tylerbod.wordpress.com', name: 'The Life of Ty', icon:'http://tyler.boddyspargo.com/assets/round-icons/life-of-ty-sm.png', noNewPage: false}]
			};
	var facts_me = {heading:'Fun Facts',
			text:'',
			links:[]
			};

	var projects = [
		{name:'This Website!',
		goal:'Create a showcase of my accomplishments using some of them in the process.',
		steps: [{show:true, heading:'Storyboard', detail:'Getting ones inspiration and basic outline is probably the hardest part of any project. I started with a sketch in my notebook of a basic layout that I liked - which was also inspired by the nature of the aspects of AngularJS that I planned to use.'},
			{show:false, heading:'Create the layout', detail:'I put together a working version that had no content, so as to know how to structure the data models I would use to fill it and also which additional specialty things I might have to research and implement (e.g. photo slider).'},
			{show:false, heading:'Fill in and Fill out', detail:'The final steps involved writing the actual content, gathering together the assets (photos, documents), and getting a little fancy with animations, responsive design, support for all popular browsers, and added functionality. To achieve the latter improvements I made use of CSS transitions, @media types, ngAnimate, a photo slider module called angular-carousel, and hover.css.'}],
		images:[{path:'http://tyler.boddyspargo.com/assets/home-page.jpg', caption:'Homepage'},
				{path:'http://tyler.boddyspargo.com/assets/sublime.jpg', caption:'Sublime showing app.js'},
				{path:'http://tyler.boddyspargo.com/assets/navbar template.jpg', caption:'Sublime showing navigation bar template'}
				],
		showImages:true,
		thumbnail: 'http://tyler.boddyspargo.com/assets/home-page sm.jpg',
		documents:[]
		},
		{name:'iOS Calculator App',
		goal:'Practive C, Obj-C, and Swift by creating a simple calculator app for iOS.',
		steps: [{show:true, heading:'The basic C program', detail:'This project started as a way for me to learn the C programming language and I used a CLI to perform calculations with fractions and mixed numbers. Once I felt comfortable with those skills, I moved on to Objective-C and began to reuse my C code in an Xcode setting!'},
			{show:false, heading:'Objective-C', detail:'Compared to C, objective-C was a whole other animal, so I had to play around quite a bit before I felt comfortable using the storyboard tool to create a UI and integrating it satisfactorily with my C functionality. This required quite a different approach to my code and a more global vision of how the different pieces fit together.'},
			{show:false, heading:'Issue tracking and refactoring', detail:'As with any programming endeavor, there were many bugs that I had to address and I spent a great amount of time letting others use my app so that I could see where the problems were and what potential cases I hadn\'t foreseen on my own. Most of these issues had to do with the interaction between the UI elements and the actual computations happening in the background. Although I didn\'t get around to completing all of the functionalities I intended, the resulting app is usable and I was quite proud of the rapid progress I had made (I went from nothing to a working app in a couple weeks).'},
			{show:false, heading:'Write in Swift', detail:'When Apple released their new Swift programming language, I was very intrigued by the possibilities of such an elegant and succinct language. I began to take my calculator and port it over into a completely Swift project that also used only a coded UI (no storyboard, all UI elements were written directly in the View Controller). Although I didn\'t have time to complete this project, it was a great learning experience and I\'m very impressed with Swift and its potential!'}],
		images:[{path:'http://tyler.boddyspargo.com/assets/storyboard.jpg', caption:'Storyboard of iPhone UI'},
				{path:'http://tyler.boddyspargo.com/assets/calculator class.jpg', caption:'Calculator class definition'},
				{path:'http://tyler.boddyspargo.com/assets/working calculator app.jpg', caption:'Calculator app simulation'},
				{path:'http://tyler.boddyspargo.com/assets/Swift version.jpg', caption:'Partial Swift calculator app'}
				],
		showImages:true,
		thumbnail: 'http://tyler.boddyspargo.com/assets/storyboard sm.jpg',
		documents:[]
		},
		{name:'FluentU Caption Files',
		goal:'Facilitate the creation, organization, and manipulation of caption files.',
		steps: [{show:true, heading:'Move to the cloud', detail:'Prior to my arrival at FluentU, the company had been using excel documents and a rather arbitrary and opaque structure for organizing captions. Working with them was unwieldy and require lots of extra time and effort, not to mention the fact that collaboration was virtually impossible. I quickly proposed moving to a cloud solution and designed Google Sheets documents and a more transparent format. Furthermore, the power of Google Apps Scripts was at our fingertips - something I did not fail to take advantage of!'},
				{show:false, heading: 'Improve functionality',detail:'Using Google Apps Scripts, I created tools to streamline processes such as entering time codes, hiding unnecessary rows, keeping track of and standardizing caption length, providing word count and rate of speech data, giving quick access to the corresponding YouTube content, checking for errors, and more. Suddenly, we no longer had to email files back and forth, manage multiple versions of files, require one person to delegate transcription or translation tasks, or perform bothersome tasks that a computer can do much better. As a result the work became much more efficient, effective, and enjoyable.'},
				{show:false, heading: 'Google Sheets Add-on', detail:'As the tools for caption files matured, I took advantage of the newest possibility with Google Sheets - the ability to use Add-ons. This opened up the door to other possibilities and removed some annoying aspects of using scripts that were associated with documents, rather than a separate mini-app. This Add-on (which I christened "CaptionControl") became a side-along companion to the entire process and allowed for: real-time spell checking, embedded YouTube player in the sidebar, and easier interaction with tools that require user input.'}],
		images:[{path:'http://tyler.boddyspargo.com/assets/old-caption-file2.jpg', caption:'Old caption file'},
				{path:'http://tyler.boddyspargo.com/assets/caption-file-new.jpg', caption:'New caption file'},
				{path:'http://tyler.boddyspargo.com/assets/caption-errors.jpg', caption:'Caption file showing errors'},
				{path:'http://tyler.boddyspargo.com/assets/caption-file-addon.jpg', caption:'Caption file with Add-on'},
				{path:'http://tyler.boddyspargo.com/assets/caption-upload.jpg', caption:'Import captions dialog box'}
				],
		showImages:true,
		thumbnail: 'http://tyler.boddyspargo.com/assets/caption-file-new.jpg',
		documents:[]
		},
		{name:'FluentU Dashboard',
		goal:'Improve workflow to increase independence and promote job satisfaction.',
		steps: [{show:true, heading:'Standardize', detail:'FluentU was growing quickly, moving from a site that offered Chinese, to offering Spanish, English, French, German, and Japanese as well. This rapid expansion meant that we needed to solidify and standardize our tracking systems and workflows to use "best practices" everywhere. I initiated new designs for all of the major Google documents that we work from and made sure that we could quickly and easily access the information we needed.'},
				{show:false, heading:'Automate repetitive tasks', detail:'Many of the things our workers spent time doing didn\'t have much to do with their actual "positions" at FluentU, so I created tools to automate the tasks that they would otherwise have taken much longer to do manually. Workers could focus on using their specific skill sets on the jobs that required their expertise, and not on menial, repetative tasks.'},
				{show:false, heading:'Improve reliability', detail:'Managing these tools for our rapidly expanding team, meant that I was constantly thinking about how to improve upon the reliability of the systems I had created. This involved lots of refactoring code, utilizing different strategies, and finding creative solutions to new problems.'}
				],
		images: [{path:'http://tyler.boddyspargo.com/assets/dash.jpg', caption:'Work Tracking (Dashboard) Document'},
				{path:'http://tyler.boddyspargo.com/assets/fcvl.jpg', caption:'Video Finding Document'},
				{path:'http://tyler.boddyspargo.com/assets/publishing-data.jpg', caption:'Publishing Data'},
				{path:'http://tyler.boddyspargo.com/assets/scripts.jpg', caption:'Google Apps Script document (5,000+ lines)'}
				],
		showImages:true,
		thumbnail: 'http://tyler.boddyspargo.com/assets/dash-sm.jpg',
		documents:[]
		},
		{name:'FluentU Analytics',
		goal:'Measure and assess productivity to improve efficiency.',
		steps: [{show:true, heading:'Gather information', detail:'In order to know what "best practices" were we needed to gather data about how we were working and compare strategies and results. Early on in the process, I began to record who performed which tasks and when they were completed. I also built a small application that used the Time Doctor API to get all of the time data for each employee (broken up into tasks), allowing us to see how much time we were spending at each stage.'},
				{show:false, heading:'Track progress', detail:'All of the informating we gather is recorded and retained regularly, allowing us to compile a significant amount of data and see trends and progress towards goals over time. It also allowed us to assess the effectiveness of new strategies.'},
				{show:false, heading:'Visualize useful information', detail:'Although the information was stored as large tables of numbers, certain data points were put into charts and tables to allow us to integrate the information more easily into our process. This allowed for more intentional curation of content and more structured decisions about priorities.'},
				{show:false, heading:'Implement meaningful change', detail:'Interpreting the data and examining it as a team allowed us to pinpoint successful strategies and share them with each other, both ensuring the use of "best practices" to improve productivity, and to have a standardized workflow across all 6 language teams. As a result, we saw consistent improvements to workflow and productivity.'}
				],
		images: [{path:'http://tyler.boddyspargo.com/assets/api-application.jpg', caption: 'Integration with Time Doctor API'},
				{path:'http://tyler.boddyspargo.com/assets/trends.jpg', caption: 'Graphs displaying library stats'},
				{path:'http://tyler.boddyspargo.com/assets/monthly.jpg', caption: 'Real-time company-wide progress report'},
				{path:'http://tyler.boddyspargo.com/assets/graphs.jpg', caption: 'Real-time team and individual graphs'}
				],
		showImages:true,
		thumbnail: 'http://tyler.boddyspargo.com/assets/graphs-sm.jpg',
		documents:[]
		},
		{name:'File Helper',
		goal:'Create a set of tools to perform file-system organization tasks using python.',
		steps:[{show:true, heading:'Learn to manipulate Tkinter and os python modules', detail:'This was my final project for a CS course I took at Carleton and I wanted it to solve a problem that I had in real life: organizing hundreds of ebooks organized in folder by author. My professor expressed his concern that it was a bit too ambitious, but I was adamant. I now had a substantial command of python, but in order to build a GUI, I needed to learn to implement Tkinter - a UI building module.'},
				{show:false, heading:'Create tools for perform actions in the file system', detail: 'Although building the UI for this application was the biggest challenge I encountered, I was more interested in the effect it would have on the file system. I established a wide array of actions that could be performed on files and folders, such as: merging folders, mass renaming, finding duplicates, and more. All of these tasks required learning how to use various parts of the os module and considering the user experience.'}],
		images:[{path:'http://tyler.boddyspargo.com/assets/file-helper.jpg', caption:'FileHelper applicaiton window'},
				{path:'http://tyler.boddyspargo.com/assets/filehelper-sm.png', caption:'FileHelper icon'}],
		showImages:true,
		thumbnail: 'http://tyler.boddyspargo.com/assets/filehelper-sm.png',
		documents:[{path:'http://tyler.boddyspargo.com/assets/FileHelper.zip', name:'FileHelper (MacOSX)'}]
		},
		{name:'Zombies Game',
		goal:'Use python to build a simple zombie apocalypse game.',
		steps:[{show:true, heading:'Learn python and pygame', detail:'Creating a game using python required learning the basics of the python language and object-oriented programming as well as integrating the pygame module for rendering visuals to the user. Up to this point my python experience had been limited to the command line, but I was glad for the opportunity to express my programming abilities through a GUI.'},
				{show:false, heading:'Improve upon the complexity of the game', detail:'Since this game started as an assignment for class, there were certain criteria that had to be met. However, I was highly unsatisfied with the simplicity of running around a black rectangle while another circle followed the player around. I added a lot more complexity to the game: custom graphics, sound effects and music, laser gun, a powerup, health meter, points, lives, and the ability to "lose" or "win" at the game. In short, the basic requirements for a game that is actually enjoyable (and, I might add, rather hard to beat)! Try it for yourself by downloading the zip file below!'}],
		images:[{path:'http://tyler.boddyspargo.com/assets/zombies-sm.png', caption:'Zombies icon'},
				{path:'http://tyler.boddyspargo.com/assets/zombies-shoot.jpg', caption:'Gameplay'},
				{path:'http://tyler.boddyspargo.com/assets/zombies-game-over.jpg', caption:'Zombies Game Over'}],
		showImages:true,
		thumbnail:'http://tyler.boddyspargo.com/assets/zombies-sm.png',
		documents:[{path:'http://tyler.boddyspargo.com/assets/Zombies.zip', name:'Zombies (MacOSX)'}]
		}
	];

	var about = [
		{heading:'Education',
			bottom:'Highest Degree: BA in Romance Languages',
			id:'education',
			images:[{path:'http://tyler.boddyspargo.com/assets/conservatoire-royal-de-bruxelles.jpg', caption:'Royal Conservatory'},
					{path:'http://tyler.boddyspargo.com/assets/niedermeyer-media.jpg', caption:'Niedermeyer Conservatory'},
					{path:'http://tyler.boddyspargo.com/assets/carleton1.jpg', caption:'Carleton College'},
					{path:'http://tyler.boddyspargo.com/assets/carleton2.jpg', caption:'Carleton College'},
					{path:'http://tyler.boddyspargo.com/assets/castle.jpg', caption:'Chambord Castle in France'},
					{path:'http://tyler.boddyspargo.com/assets/spain2.jpg', caption:'Castell building in Montserrat, Spain'}
					],
			showImages:true,
			activeImage:0,
			text:'',
			entries: [{name:'Royal Conservatory of Brussels',
			title:'Barroque/Classical Trumpet',
			logo:'http://tyler.boddyspargo.com/assets/crb-logo.jpg',
			website:'http://www.conservatoire.be',
			duration:'2014-2015',
			location:'Brussels, Belgium',
			description:'I enrolled in the Royal conservatory of Brussels as a prospective master student, hoping that this more challenging, immersive environment would finally remove any doubt I still had about my musical endeavors. I took a full load as a first-years student and tested into 2nd-year musical fundamentals class and harmony/composition. I continued to work for FluentU and teach English to pay for school.',
			docIntro: '',
			documents:[],
			thumbnail:'http://tyler.boddyspargo.com/assets/crb-logo-wide-sm.jpg'},
			{name:'Niedermeyer Conservatory',
			title:'Certificate of Advanced Musical Studies - Trumpet',
			logo:'http://tyler.boddyspargo.com/assets/grand-paris-issy.jpg',
			website:'http://www.agglo-gpso.fr/culture_et_loisirs_conservatoire_d_issy_les_moulineaux.html',
			duration:'2012-2014',
			location:'Issy-Les-Moulineaux (Paris), France',
			description:'Music is a peculiar pursuit and if one wants to become a great musician, one must start young. My youth was slipping away and I knew that if I wanted to try to become a musician, it had to be now, rather than later. I enrolled in a regional conservatory near Paris with Hervé Noël who took me under his wing and encouraged me to continue towards that goal. I also took general courses in preparation for enrolling in a more significant degree program in the future. All the while, I was working as a teacher and, eventually, for FluentU.com to pay off my undergraduate student loans.',
			docIntro: '',
			documents:[{address:'http://tyler.boddyspargo.com/assets/certificat-etudes.pdf', name: 'Transcript'}
					],
			thumbnail:'http://tyler.boddyspargo.com/assets/grand-paris-issy.jpg'},
			{name:'Carleton College',
			title:'Romance Languages (French and Spanish)',
			logo:'http://tyler.boddyspargo.com/assets/carleton-seal.png',
			website: 'http://www.carleton.edu',
			duration:'2008-2012',
			location:'Northfield, MN & Europe',
			description:'After high school I was accepted to Carleton College, a small liberal arts school in Northfield, MN. I quickly discovered many passions including acting, comedy, dance, gymnastics, figure skating, singing, and French, but it was the latter that allowed me to grow in the most formative ways, inspiring me to go on many adventures abroad, meet new people, experience new things, and delve into the unknown. I declared French as a major before finally convincing the Spanish department chair to accept my request for a romance languages major. I completed my degree in 2012 and knew that I wanted to use my language skills immediately - prompting me to move to Europe for the following three years.',
			docIntro: '',
			documents:[{address:'http://tyler.boddyspargo.com/assets/carleton-diploma.pdf', name: 'Diploma'},
					{address:'http://tyler.boddyspargo.com/assets/carleton-transcript.pdf', name: 'Official Transcript'}
					],
			thumbnail:'http://tyler.boddyspargo.com/assets/carleton-knights.jpg'},
			{name:'Madrid Study Abroad - Film and the City',
			title:'Immersion Program',
			logo:'http://tyler.boddyspargo.com/assets/carleton-seal.png',
			website:'https://apps.carleton.edu/curricular/ocs/madrid/archive/2011/courses/',
			duration:'Jun - Dec 2011',
			location:'Madrid & Valencia, Spain',
			description:'I was lucky enough to be able to go on a second study abroad trip to Spain in my senior year. I left in June for a program that started in September, which alowed me to live for 2 months with a friend of mine in Valencia, bike the Danube river in Germany, and walk across Spain on the Way of Saint James before the program actually began. My second program was just as good as the first and at the end, I spoke better Spanish than French, which was hard for most people to believe. After the program I visited 4 more countries, not being able to resist visiting my recently adopted family in Paris, before I finally returned to the States to finish up my degree.',
			docIntro: '',
			documents:[],
			thumbnail:'http://tyler.boddyspargo.com/assets/spain1.jpg'},
			{name:'Paris Study Abroad - European Identities',
			title:'Immersion Program',
			logo:'http://tyler.boddyspargo.com/assets/carleton-seal.png',
			website:'https://apps.carleton.edu/curricular/ocs/paris/archive/2010/',
			duration:'Mar - Aug 2010',
			location:'Paris, France & Thiaumont, Belgium',
			description:'In the spring of 2010 I went overseas for the first time. The Carleton study abroad program to Paris was an astoundingly positive experience and I excelled at French, visited 6 countries, helped clean the catacombs of Paris, and adopted my host family as my own (they subsequently came to my graduation and I lived with them from 2012-2014).',
			docIntro: '',
			documents:[],
			thumbnail:'http://tyler.boddyspargo.com/assets/castle.jpg'}
			]
		},
		{heading:'Employment History',
			bottom:'This is only a partial list of employment history. Please see my <a href="http://tyler.boddyspargo.com/assets/cv.pdf" target="_blank">CV</a> and/or <a href="mailto:muyleche@gmail.com" target="_blank">contact me</a> for more information.',
			images:[],
			id:'employment',
			text:'',
			showImages:false,
			activeImage:0,
			entries:[
			{name:'Head Content Editor - French',
			title:'FluentU.com',
			logo:'http://tyler.boddyspargo.com/assets/fluentu-blue-on-white.png',
			website:'http://fluentu.com/',
			duration: '2013 - Current',
			location:'Telecommute',
			list:['Co-lead a team whose goal is to curate, translate, and enrich video content in French.',
				'Translate videos (French to English) and create a language-learning dictionary.',
				'Develop tools to work more quickly and effectively in Google Sheets.',
				'Implemented and maintained analytical tools and functionality to improve overall efficiency.'
				],
			docIntro: 'Contacts:',
			documents:[{name:'Alan Park', address:'mailto:alan@fluentu.com'}, {name:'Jason Shumann', address:'mailto:jason@fluentu.com'}, {name:'Nicole Durham',address:'mailto:nicole@fluentu.com'}],
			thumbnail:'http://tyler.boddyspargo.com/assets/fluentu-blue-on-white.png'},
			{name:'Technology Assistant',
			title:'Media Technology Dept. - Carleton College',
			logo:'http://tyler.boddyspargo.com/assets/peps.jpg',
			website:'https://apps.carleton.edu/campus/peps/',
			duration: '2008 - 2012',
			location:'Carleton College; Northfield, Minnesota',
			list:['Helped customers with their technology needs.',
				'Troubleshot technical problems with students and faculty.',
				'Filmed, edited, and produced recordings of campus events.'
				],
			docIntro: 'Contacts:',
			documents:[{name:'Tucker MacNiel', address:'mailto:tmacniel@carleton.edu'}, {name:'Jim Pierret', address:'mailto:jpierret@carleton.edu'}],
			thumbnail:'http://tyler.boddyspargo.com/assets/peps.jpg'},
			{name: 'Lycée Les-Côtes-de-Villebon',
			title:'Language Assistant',
			logo:'http://tyler.boddyspargo.com/assets/villebon-logo.jpg',
			website:'http://www.lyc-cotesdevillebon-meudon.ac-versailles.fr',
			duration: '2013-2014',
			location:'Meudon-la-forêt, France',
			list:['Led and designed oral/written activities, presentations, and tests.',
				'Worked with students to improve their language and cultural knowledge.',
				'Provided support to the English department faculty.'
			],
			docIntro: 'Contacts:',
			documents:[{name:'Claudine Dumas', address:'mailto:tiny.d@orange.fr'}],
			thumbnail:'http://tyler.boddyspargo.com/assets/villebon-logo.jpg'},
			{name:'Counselor, Instructor',
			title:'Concordia Language Villages - Lac-du-bois',
			logo:'http://tyler.boddyspargo.com/assets/cord3.jpg',
			website:'http://www.concordialanguagevillages.org',
			duration: 'Jul - Aug 2013',
			location:'Bemidji, Minnesota',
			list:['Designed and taught four-week intermediate high-school-credit French course.',
				'Provided a space for an immersive exploration of French language and francophone culture.',
				'Developed projects designed to promote a complex awareness of culture and current events.',
				'Led adult conversation course exploring current political, economic, and civil topics.'
				],
			docIntro: 'Contacts:',
			documents:[{name:'Katherine Dutko' , address:'mailto:kdutko@cord.edu'}],
			thumbnail:'http://tyler.boddyspargo.com/assets/cord3.jpg'}
			]}
		];

	var all_facts = [{text:'I can play 6 instruments.',link:''},
				{text:'I have been to 14 countries.',link:''},
				{text:'I have lived in 3 countries.',link:''},
				{text:'I can juggle, beatbox, and do a standing backflip.',link:''},
				{text:'I have hitchhiker\'s thumb.',link:'http://en.wikipedia.org/wiki/Thumb#Variation'},
				{text:'I am an Independence Day baby.',link:'http://i1.kym-cdn.com/photos/images/original/000/451/395/2d2.jpg'},
				{text:'I build furniture as a hobby.',link:'http://tyler.boddyspargo.com/assets/bench.jpg'},
				{text:'Kiwi is my favorite fruit.',link:'https://www.google.com/search?q=kiwi&es_sm=119&source=lnms&tbm=isch&sa=X&ei=z1gpVdCpC6Kt7Aagz4GwBg&ved=0CAcQ_AUoAQ&biw=991&bih=726&dpr=2'},
				{text:'My favorite animal is the bush baby.',link:'https://www.google.us/search?q=bush+babies&source=lnms&tbm=isch&sa=X&ei=C64mVaTFNsTiaofNgYgF&ved=0CAcQ_AUoAQ&biw=800&bih=736&dpr=2'},
				{text:'My lucky number is 22.',link:''},
				{text:'At 16 I ran a fuel efficiency experiment on the effects of coasting and driving with the windows open.',link:''},
				{text:'I cook bacon like a boss.',link:''},
				{text:'I would want to be Green Lantern.',link:'http://en.wikipedia.org/wiki/Green_Lantern#Powers_and_abilities'},
				{text:'My favourite season is Spring.',link:''},
				{text:'Sometimes I spell favorite "favourite". I like to mix things up!',link:''},
				{text:'I like to read out loud.',link:''},
				{text:'Programming seems like a natural interest for someone whose last name is in CamelCase.',link:''},
				{text:'I am a podcast addict.',link:'http://www.npr.org/podcasts/'},
				{text:'I sometimes speak in movie quotes.',link:'http://www.nextmovie.com/wp-content/uploads/2013/06/airplane-jpg.jpg'},
				{text:'My milkshakes DO bring boys to the yard!',link:''},
				{text:'I have competed in ballroom dancing!', link:'https://www.youtube.com/watch?v=Q3MZT8Scl8c'}];
	var bio = "I was born in 1989 to two wonderful parents who, from the beginning, instilled in me a curiosity matched only by <a href=\"http:\/\/www.curiousgeorge.com\" target=\"_blank\">George</a>. I owe much of my precociousness to my older brother, whose example I was constantly emulating despite our 2-year age difference. At 8 months, seeing him running around, I thought it was high-time I did too; when he was transitioning away from bicycle training wheels, I decided to skip them entirely.\nThis drive to challenge myself and learn quickly has stayed with me. In middle school, I wasn't satisfied with learning the trumpet; I spent a couple months learning the flute, saxophone, and clarinet, so that I could play all four instruments in the spring concert. I even began giving trumpet lessons as a middle-school student. But my passion for learning went as wide as it went deep. As a high school student, I was co-valedictorian, 2-time top-ten national qualifier in DECA marketing and economics competitions, 4-time state finalist in Forensics, conference finalist on the Math team, all-conference Cross-Country runner, and I won numerous academic awards, all while participating in school and county plays and musicals, arranging full ensemble pieces for concert and jazz band, working for the after-school program, and building furniture when time allowed. To say the least, I rarely struggled to fill my time with activities!\nEven given all of this discovery, attending Carleton College opened my eyes to a wealth of new learning opportunities. I leapt into activities left and right: Experimental Theater Board, improvisation and sketch comedy, competitive ballroom dancing, a cappella and choir, classical guitar, gymnastics, figure skating, and much more. I also made one discovery that has molded the life I'm currently living: French, which would inspire my first study abroad experience in Paris. While there, I was given the opportunity to join a team of volunteers who descended into the restricted Parisian catacombs to clean up the filth left there by trespassers throughout the year. I stayed in Europe for six months with the help of the Newman Fellowship Award, which allowed me to work at the ProLingus language institute in Belgium and spend two weeks biking around Germany and Austria. But I hadn't had enough, so I went on a second study abroad adventure to Spain. Before starting the program, I lived with a friend in Valencia, went on another two-week bike trip along the Danube river, and walked the Camino de Santiago from St.-Jean-Pied-de-Port to Finisterra (1061 km) meeting fascinating people and making wonderful friends along the way. After the program, I hopped over to the Czech Republic, Poland, and France before returning to the US for Christmas.\nI graduated 'magna cum laude' with a BA in Romance Languages and was awarded the Jean Schmidt prize for 'enthusiasm for learning and love of people.' Soon after, I moved to a suburb of Paris and enrolled in a regional conservatory, using my language skills to win my bread. In 2014 I moved to Brussels, Belgium and enrolled in the Royal Conservatory whose more immersive environment helped me finally decide whether music and I were compatible. Much to my professors' dismay, I have found that music doesn't fulfill my intellectual curiosity enough, nor am I sufficiently motivated to adopt the extreme discipline that is required to be a great performer.\nThus, it has been my side projects and professional experience that have most informed my new professional orientation; Software and web development allow me to express my curiosity, creativity, and problem solving skills while building tools that help people. In 2013 I started working for Fluentu.com, an internet startup in language learning. My work with FluentU has helped develop my JavaScript, HTML, CSS and Jquery skills enormously. I've also spent time since then on codecademy.com and codeschool.com (as well as YouTube, blogs, and books) learning C, Ruby, Ruby on Rails, AngularJS, JavaScript, Express.js and iOS programming (Objective-C and Swift). I'm very excited about learning and using technology to create powerful and meaningful tools for people and businesses.";
	
	var blurb = "I'm a hard-working passionate traveler from Wisconsin who has spent his life learning. That all sounds well and good, but don't take my word for it - let my actions speak for themselves. On these few pages of the interwebs I've put together an overview of my professional and personal life. I'll tell you about how I'm fluent in 3 languages, how I've walked 1061 km across northern Spain in a month, how I spent a night in the restricted catacombs of Paris, how I spent 3 years studying musical performance at conservatories in France and Belgium, and more.\nMy life has been a virtually uninterrupted stream of learning and exploration. And while the above experiences have played a huge part in making me into the person I am today, my professional goals go beyond hiking and cave-dwelling, into the realm of software and web development. Yes, in addition to English, Spanish, and French, I'm also proficient in Ruby, JavaScript, Python, and C. I created this website in the hopes of summarizing my most pertinent achievements, but they are not deserving of such brevity. Hopefully you'll get the chance to meet me and ask me more about my undertakings in person!";

})();