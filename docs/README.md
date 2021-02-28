this app uses GitHub Pages package as a dev-dependency.

`npm install gh-pages --save-dev`

which uses the following properties in the `package.json`

"homepage": "http://yuribenjamin.github.io/my-app"

"scripts": {
//...
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
}

and using the above you can deploy to github pages:

`npm run deploy`