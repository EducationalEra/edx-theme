# edera-theme

## About
EdEra specific theme for OpenEdX

## Installation
Do in `source/` folder, do
```
npm i
```

## Development
In system file `/etc/hosts`
add line
```
127.0.0.1 dev.ed-era.com
```

In order to start development environment perform
```
npm start
```

Open browser with url https://dev.ed-era.com.

## Deployment
Build produces final `.css` file under `source/app/css/lms-main-v1.css` and
copies over to `lms/static/sass/lms-main-v1.scss`.

In order to do all of this, you need to perform following command
```
npm run build
```
