15-09-2025:

- created a repository
- Initialized the repository
- node_modules, package.json, package-lock.json
- Installed express npm package into the repository
- Created a express server using express() function
- Listen to the incoming requests on port 3000
- written the request handlers for "/test", "/hello", "/" using app.use() function
- Installed nodemon and updated scripts inside package.json. nodemon helps in restarting the server after saving the new changes


Information gathered:

1. what are dependencies in package.json file? 

- In a package.json file, dependencies are external packages that a project requires to function. The package manager, such as npm or Yarn, uses this information to install the necessary packages and build a project consistently.

2. what is the use of "-g" while we install a npm package?

- The -g flag is used with the npm install command to install a package globally on your computer. A globally installed package is not tied to a single project but is instead installed in a central location on your system, allowing it to be used by any project or run directly from your command-line interface (CLI).

3. what is the difference between ^ and ~ while adding dependency in package.json?

- In a package.json file, the ^ (caret) and ~ (tilde) symbols specify version ranges for dependencies, controlling how a package manager like npm updates your installed packages. The key difference lies in how much flexibility they allow for updates to the version number, which is typically structured as MAJOR.MINOR.PATCH. 

Tilde (~):

The tilde operator restricts updates to the latest patch version within the specified minor version. This is used when maximum stability is desired, as patch updates are generally intended for bug fixes and security patches and are not supposed to introduce new features. 
Example: For ~1.2.3, npm will install a package with a version between 1.2.3 and <1.3.0. It will update to 1.2.4, 1.2.5, etc., but not to 1.3.0.

Caret (^):

The caret operator is the default for npm install --save and is more flexible. It allows updates to the latest minor or patch version within the specified major version. This is useful for getting new features and improvements that are meant to be backward-compatible. 
Example: For ^1.2.3, npm will install a package with a version between 1.2.3 and <2.0.0. It will update to 1.3.0, 1.4.0, or 1.2.5, but not to 2.0.0.

Major zero exception:

For versions below 1.0.0, which are considered unstable, the caret (^) behaves the same as the tilde (~). It only allows patch updates because any change in a 0.x.x version could potentially be a breaking change. 
Example: For ^0.2.3, npm will only install a version that is >=0.2.3 and <0.3.0. 