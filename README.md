Strappy
=======

*The* AngularJS/Bootstrap/FontAwesome bootstrapper, brought to you by the folks at <a href="http://www.lotpath.com" target="_blank">Lotpath</a>.

Strappy lets you get started quickly with a basic SPA website using Angular and Bootstrap.  There is no server-side code here.  You'll probably create your server-side API and make asynchronous calls to it.

##Getting Started with Strappy
Strappy points to CDN-provided files by default, so it's easy to get up and running quickly.  If you want to use local copies of these files, see the instructions pertaining to your environment below.

###Visual Studio/Nuget
* Add a new project and select "ASP.NET Empty Web Application".
* Go to the new project's Properties page and click the Web tab.
* Under Servers, select User Local IIS Web Server but uncheck Use IIS Express.  Click the Create Virtual Directory button.
* Under Start Action, select Start URL and copy-paste the URL from Project Url below.  Save and close the property page.
* Under References, delete them all.  Remember, there is no server-side code here.
* Clone this project and copy its contents into the web application root folder via Windows Explorer.
* Back in Visual Studio, click the "Show All Files" icon in the Solution Explorer toolbar.  Ctrl-click to select the folders and files you want to include, right-click, and select Include in Project.  Click the "Show All Files" icon again to hide them.
* In Nuget Package Manager, install AngularJS, AngularJS UI Bootstrap, and FontAwesome.  Or, from the Package Manager Console, run:

    ```
	PM> Install-Package bootstrap
    PM> Install-Package angularjs
    PM> Install-Package Angular.UI.Bootstrap
    PM> Install-Package FontAwesome
    ```

* Note: rather than installing the entire AngularJS project, you could use John Papa's [modular nuget packages](http://www.johnpapa.net/modular-angularjs-nuget-packages/).  You'll need core, route, and sanitize to start with.
* Edit index.html, uncomment the "nuget" sections and remove the "cdn" and "bower" sections.  You may also need to change one or more paths due to new version numbers.
* View index.html in your browser and see the scaffolding for your Angular-based SPA with Bootstrap CSS!

###Bower
* Set up bower
* Clone this repository
* Run these commands:

    ```
    cd /path/to/site
    cp -R /path/to/Strappy/src/* .
    bower install bootstrap
    bower install angular
    bower install angular-route
    bower install angular-sanitize
    bower install angular-bootstrap
    bower install font-awesome
    ```

* Edit index.html, uncomment the "bower" sections and remove the "cdn" and "nuget" sections.  You may also need to change one or more paths due to new version numbers.
* View index.html in your browser and see the scaffolding for your Angular-based SPA with Bootstrap CSS!

##The Files

###A note about Bootstrap
Bootstrap's default distribution packages (via nuget or bower) have a dependency on jQuery.  Angular UI Bootstrap (0.9.0 or higher) uses the Bootstrap 3.x classes, but replaces the JavaScript components (bootstrap.min.js), removing the dependency.  If you stick to Angular's jqLite for DOM manipulation, you won't even need jQuery.  Therefore, you may want to keep your dependency tree clean by creating a customized Bootstrap build:

* Go to [Bootstrap's Customize Page](http://getbootstrap.com/customize/)
* In the jQuery plugins section, click Toggle All to uncheck the entire section.
* Scroll down to the Download sections and select Compile and Download.
* The zip file contains bootstrap.css and bootstrap.min.css.  Replace the package-provided files with these files.

Note that Angular UI Bootstrap's directives use Bootstrap's Glyphicons and their classes rather than FontAwesome.  If you're looking for consistency, one way would be to build from the LESS or SASS source and map the Glyphicon classes to FontAwesome classes.

###The index.html page
This is based on the [Bootstrap 3.x starter template](http://getbootstrap.com/examples/starter-template/).  Bootstrap has other starter pages [here](http://getbootstrap.com/getting-started/#examples) if you want to roll your own.

###The NgApp folder
This folder houses the Angular files.  Each subfolder houses its own Angular module.  The app.js file adds each module to the main application as a dependency.

##Browser Support
Older browsers may be partially unsupported, at least without some tweaking.
* See Bootstrap 3.x documentation on [Browser support](http://getbootstrap.com/getting-started/#browsers).
* The current version of FontAwesome does not support IE 7.  An [older version](http://fontawesome.io/3.2.1/get-started) does, though.
* Angular UI does not officially support IE 8.  See their documentation [here](https://github.com/angular-ui/bootstrap#supported-browsers)
