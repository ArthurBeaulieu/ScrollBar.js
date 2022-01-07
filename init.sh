#! /bin/bash
vers="1.0.0"

# Script welcome message and explanation

echo
echo -e "  ## ---------------------------------- ##"
echo -e "  ##        FrontBase installer         ##"
echo -e "  ##          2021 -- GPL-3.0           ##"
echo -e "  ##              v$vers                ##"
echo -e "  ## ---------------------------------- ##"
echo
echo -e This installer will update the configuration files to match your newly created project.
echo -e It will also create for you the es6 JavaScript class and the scss file.
echo -e First, we need several information about it :
echo

username=''
component=''
description=''
version=''
license=''

# Ask user mandatory information

read -p 'What is your GitHub username ? ' username
read -p 'What is the name of this project ? ' component
read -p 'How would you describe it ? ' description
read -p 'What is its version number ? ' version
read -p 'Which distribution license do you want to use ? ' license

# Creating .scss and .js files (source and test)

basedir=$(dirname "$0")

echo
echo -e "Handling js and scss files in src/js, test file and src/scss subdirectories"
echo -e " -> Creating required subdirectories"
mkdir -p src/js
mkdir -p src/scss
echo -e " -> Creating source files"
touch "$basedir"/src/scss/"$component".scss
{
	echo "* { box-sizing: border-box }"
} >> "$basedir"/src/scss/"$component".scss
touch "$basedir"/src/js/"$component".js
{
	echo "import '../scss/${component}.scss';"
	echo ""
	echo "class ${component} {"
	echo "  constructor() {}"
	echo "}"
	echo ""
	echo "export default ${component};"
} >> "$basedir"/src/js/"$component".js
touch "$basedir"/test/"$component".spec.js
{
	echo "import '../src/js/${component}.js';"
	echo ""
	echo "describe('${component} test', () => {"
	echo "  it('Unit test', done => {"
	echo "    done();"
	echo "  });"
	echo "});"
} >> "$basedir"/test/"$component".spec.js
echo -e "Source files successfully created"

# Replacing strings in files to properly prepare the folder

echo
echo -e "Fill configuration files with the information you provided"
echo -e " -> Replacing in demo/example.html"
sed -i "s/COMPONENT/$component/" demo/example.html
sed -i "s/DESCRIPTION/$description/" demo/example.html
sed -i "s/VERSION/$version/" demo/example.html
echo -e " -> Replacing in doc/jsDoc.json"
sed -i "s/COMPONENT/$component/" doc/jsDoc.json
echo -e " -> Replacing in webpack/plugins.js"
sed -i "s/COMPONENT/$component/" webpack/plugins.js
echo -e " -> Replacing in webpack/webpack.common.js"
sed -i "s/COMPONENT/$component/g" webpack/webpack.common.js
echo -e " -> Replacing in package.json"
sed -i "s/USERNAME/$username/" package.json
sed -i "s/COMPONENT/$component/" package.json
sed -i "s/DESCRIPTION/$description/" package.json
sed -i "s/PROJECT_VERSION/$version/" package.json
sed -i "s/PROJECT_LICENSE/$license/" package.json
echo -e "Configuration files are up and ready"

# Clear README.md and prepare it with user information

echo
echo -e "Editing README.md to match project information"
> README.md
echo "# $component

![](https://badgen.net/badge/version/$license/blue)
![License](https://img.shields.io/github/license/$username/$component.svg)
![Doc](https://badgen.net/badge/documentation/TODO/orange)
![Test](https://badgen.net/badge/test/TODO/orange)

$description

[See it live](https://$username.github.io/$component/demo/example.html) or [Read the documentation](https://$username.github.io/$component/doc/index.html)

# Usage

If you need more information on those components methods and internals, you can read the online [documentation](https://$username.github.io/$component/doc/).

# Development

If you clone this repository, you can \`npm install\` to install development dependencies. This will allow you to build dist file, run the component tests or generate the documentation ;

- \`npm run build\` to generate the minified file ;
- \`npm run watch\` to watch for any change in source code ;
- \`npm run server\` to launch a local development server ;
- \`npm run test\` to perform tests ;
- \`npm run test-dev\` to debug tests ;
- \`npm run doc\` to generate documentation ;
- \`npm run beforecommit\` to perform tests, generate doc and bundle the source files.

To avoid CORS when locally loading the example HTML file, run the web server. Please do not use it on a production environment. Unit tests are performed on both Firefox and Chrome ; ensure you have both installed before running tests, otherwise they might fail.

$component $version - $license - $username" >> README.md
echo -e "README.md file now reflect the new project"

# Using npm install if any, display error otherwise

echo
if ! command -v node -v &> /dev/null
then
  echo "npm is not installed on the system. Please manually install it and run npm install to complete installation."
  exit
fi

echo -e "Running npm install to install component dependencies"
npm install
npm npm run build

# Clearing both .bat and .sh files

echo
echo -e "This script will now self-destruct to let you a properly use this dev environment"
echo -e "You can now start to develop. See package.json scripts commands for usage"
rm -f init.bat
rm -- "$0"
