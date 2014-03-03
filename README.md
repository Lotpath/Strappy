Strappy
=======

*The* AngularJS/Bootstrap/FontAwesome bootstrapper, brought to you by the folks at <a href="http://www.lotpath.com" target="_blank">Lotpath</a>.

Strappy lets you get started quickly with a basic SPA website using Angular and Bootstrap.  There is no server-side code here.  You'll probably create your server-side API and make asynchronous calls to it.

##Getting Started with Strappy

###Project setup
The steps depend on whether you are using Visual Studio or some other environment.

####Visual Studio/Nuget
We have decided to use <a href="http://bower.io" target="_blank">bower</a> for package management.  Nuget is great for server-side packages, but bower is quickly becoming the package manager of choice for client-side libraries.  Some third-party Angular modules do not have a Nuget package, which drove our decision to standardize on bower.

* Create a new project (or add to an existing solution) and select "ASP.NET Empty Web Application".
* Go to the new project's Properties page and click the Web tab.
* Under Servers, select User Local IIS Web Server but uncheck Use IIS Express.  Click the Create Virtual Directory button.
* Under Start Action, select Start URL and copy-paste the URL from Project Url below.  Save and close the property page.
* Under References, delete them all.  Remember, there is no server-side code here.
* Clone the Strappy repository and copy its contents into the root folder of your web project.
* Back in Visual Studio, click the "Show All Files" icon in the Solution Explorer toolbar.  Ctrl-click to select index.html and NgApp, right-click, and select Include in Project.  Click the "Show All Files" icon again to hide any other hidden files or folders.
* From Package Manager Console, execute these two commands to install Bower and add its location to your path:

    ```
    Install-Package Bower
    $loc = Get-Location; $env:Path += ";" + $loc + "\packages\Bower.1.2.8"
    cd Name.Of.WebProject
    ```

####Other environments
* Set up bower
* Clone the Strappy repository
* Copy its contents into the root folder of your web project:

    ```
    cd /path/to/site
    cp -R /path/to/Strappy/src/* .
    ```

###Then...
* Execute these bower commands to install Strappy's dependencies:

    ```
    bower install bootstrap
    bower install angular
    bower install angular-route
    bower install angular-sanitize
    bower install angular-bootstrap
    bower install angular-base64
    bower install angular-local-storage
    bower install font-awesome
    ```

* Browse to the root of your web project and see the scaffolding for your Angular-based SPA with Bootstrap CSS!
* By default, Strappy uses the Fake Authentication Service (`Authentication/fakeAuthenticationSvc.js`) which allows you to log in with demo/demo as the username and password.

###Next Steps
* Provide company and project logos to be displayed on `login.html`.
* Find all instances of the string "Strappy" and replace with your project name.
* In `index.html`, reference either the Basic (`Authentication/basicAuthenticationSvc.js`) or Token (`Authentication/tokenAuthenticationSvc.js`) Authentication Service.
* In `Authentication/authentication.js`, specify the `authValidateUrl` and `authLoginUrl` settings.
* Use the Home and About modules as a template to create your own.

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
* The `NgApp` folder houses the files for your Angular app.  Each subfolder houses its own Angular module that represents a feature of the app.
* The `app.js` file defines the main app module and injects each feature module as a dependency.
* The `globals.js` file defines the globals module with a single constant called globals.  Inject the globals module into other modules to get access to this globals object.  One value is defined on this object: baseApiUrl.  You may want to set this.

##Browser Support
Older browsers may be partially unsupported, at least without some tweaking.
* See Bootstrap 3.x documentation on [Browser support](http://getbootstrap.com/getting-started/#browsers).
* The current version of FontAwesome does not support IE 7.  An [older version](http://fontawesome.io/3.2.1/get-started) does, though.
* Angular UI does not officially support IE 8.  See their documentation [here](https://github.com/angular-ui/bootstrap#supported-browsers)
