iris-cli
========

> The Iris command line interface.

Install this globally and you'll have access to the `iris` command anywhere on your system.

```shell
npm install -g iris-cli
```

## Usage

```bash
cd www
```

### Create New Project
```bash
iris init
```

### Reload iris.path
```bash
iris path
```

### Create Screen

```bash
iris screen <name>
```

Examples:
```
// The app ask the component name
iris screen

// Set component name
iris screen myscreen // "iris/screen/myscreen.js"

// Another component name
iris screen path.to.myscreen // "iris/screen/path/to/myscreen.js"
```


### Create UI

```bash
iris ui <name>
```

Examples:
```
// The app ask the component name
iris ui

// Set component name
iris ui myui // "iris/ui/myui.js"

// Another component name
iris ui path.to.myui // "iris/ui/path/to/myui.js"
```


### Create Resource


```bash
iris resource <name>
```

Examples:
```
// The app ask the component name
iris resource

// Set component name
iris resource myresource // "iris/resource/myresouce.js"

// Another component name
iris resource path.to.myresource // "iris/resource/path/to/myresouce.js"
```


### Build pack

All iris files (all files defined in iris.path) will be concatenated and compressed in a single JS file. In order to avoid override application files, all files will be copied to a new folder. By default this folder is `../dist`. You can set `destination` parameter to change it. Be careful with the destination folder because its content will be deleted.

```bash
iris pack <destination>
```

Examples:
```
// Default destination folder ../dist
iris pack

// Custom destination folder
iris pack ../../my-packed-app

// Another custom destination folder
iris pack C:\my-packed-app
```
