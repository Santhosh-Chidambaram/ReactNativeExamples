
# Install Babel plugin

```sh
npm i -D babel-plugin-module-resolver
```

# Adjust Babel config

```
module.exports = {
  // ... some other config
  plugins: [
   // ... some other plugins
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          '^@(.+)': './src/\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
}
```

# How to make VSCode alias autocomplete working?

### We have to enter jsconfig.json file (or create it if it’s not working)

```
{
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@*": ["src/*"]
      }
    },
    "exclude": ["node_modules"]
  }
```
