Strappy
=======

*The* Lotpath AngularJS/Bootstrap/FontAwesome bootstrapper.

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
* In Nuget Package Manager, install AngularJS, AngularJS UI Bootstrap, and FontAwesome.  As of this writing, versions are at 1.2.2, 0.9.0, and 4.0.3.1 respectively. Or, from the Package Manager Console, run:

    ```
    PM> Install-Package angularjs
    PM> Install-Package Angular.UI.Bootstrap
    PM> Install-Package FontAwesome
    ```

* Or, rather than installing the entire AngularJS project, you can use John Papa's [modular nuget packages](http://www.johnpapa.net/modular-angularjs-nuget-packages/).  You'll need core, route, and sanitize to start with.
* Edit index.html, uncomment the "nuget" sections and remove the "cdn" and "bower" sections.
* View index.html in your browser and see the scaffolding for your Angular-based SPA with Bootstrap CSS!

###Bower
* Set up bower
* Clone this repository
* Run these commands:

    ```
    cd /path/to/site
    cp -R /path/to/Strappy/src/* .
    bower install angular
    bower install angular-route
    bower install angular-sanitize
    bower install angular-bootstrap
    bower install font-awesome
    ```

* Edit index.html, uncomment the "bower" sections and remove the "cdn" and "nuget" sections.
* View index.html in your browser and see the scaffolding for your Angular-based SPA with Bootstrap CSS!

##The Files

###The Bootstrap css files
Angular UI Bootstrap (0.9.0 or higher) uses the Bootstrap 3.x classes but does not need the JavaScript components.  Bootstrap's nuget package has a dependency on jQuery and will give you a bigger CSS file.  If you stick to Angular's jqLite, you won't even need jQuery.  Therefore, we prefer a customized build, which is what is included in the Content folder (v3.0.3).  To create the files yourself:

* Go to [Bootstrap's Customize Page](http://getbootstrap.com/customize/)
* In the jQuery plugins section, click Toggle All to uncheck the entire section.
* Scroll down to the Download sections and select Compile and Download.
* The zip file contains bootstrap.css and bootstrap.min.css.
* If any of Bootstrap's CSS classes have changed since the included version, you may need to change the html.

Note that Angular UI Bootstrap's directives use Bootstrap's Glyphicons and their classes rather than FontAwesome.  This is why we include the fonts folder.

###The index.html page
This is based on the [Bootstrap 3.x starter template](http://getbootstrap.com/examples/starter-template/).  Bootstrap has other starter pages [here](http://getbootstrap.com/getting-started/#examples) if you want to roll your own.

###The NgApp folder
This folder houses the Angular files.  app.js is the main application setup file.  The remaining files are broken out by type -- Controllers, Views, and Partials.  Partials are reusable html markup that can be used across views.  If you create an Angular service, you could put it in the Services folder.  You could also organize your views and controllers by feature.  This is just a starting point.

##Browser Support
Older browsers may be partially unsupported, at least without some tweaking.
* See Bootstrap 3.x documentation on [Browser support](http://getbootstrap.com/getting-started/#browsers).
* The current version of FontAwesome does not support IE 7.  An [older version](http://fontawesome.io/3.2.1/get-started) does, though.
* Angular UI does not officially support IE 8.  See their documentation [here](https://github.com/angular-ui/bootstrap#supported-browsers)
