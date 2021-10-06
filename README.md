:warning: This project is not regularly maintained. As such the content, libraries and frameworks, and code style may not be reflective of my current state.

# Overview

This site has been a learning mechanism for me to explore best practices for web development. It serves the secondary purpose of showcasing some of my accomplishments.

# Usage

## Build

This project uses webpack to compile the Sass and TypeScript files and prepare other aspects of the project for distribution. You can run webpack directly or use the `build` (production) or `build:watch` (development) npm scripts to prepare the site.

## Serve locally

This project uses firebase local hosting server to serve up the `public` directory.

```bash
firebase server --only hosting
```

This is also the default action of the `npm start` script.
