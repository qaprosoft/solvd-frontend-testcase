# Solvd test case

The project divided into two parts. Frontend layout stored at `/layout` and  Craft CMS related stuff at `cms`.

# CMS setup

Go to `/cms` directory and apply
```
docker-compose up
```

Load database dump using cmd at `/cms`
```
/bin/bash db-utils.sh --load-backup
```
The site should be served at `http://localhost`. Admin panel `http://localhost/admin` username: `admin`, password: `1234qwer!`

# Frontend dev environment

Go to `/layout` and install dependencies
```
npm i
```

Run dev server
```
npm run dev
```

The layout should be served at `http://localhost:3000`  
The style guide should be served at `http://localhost:3000/styleguide.html`

# Transition of components/styles/script from `layout` to `cms` environment

Each component at `layout/src/components/*` has corresponding template at `cms/templates/components/_*.twig`  
Each pug mixin element at `layout/src/elements/*` has corresponding twig `macro` at `cms/templates/_elements.twig`  
  
The `npm run build` cmd generates new css/js files with unique hash at `layout/dist`, one should copy those files to `cms/web/css` for `css` or `cms/web/js` for js and correct links at `cms/templates/_layout.twig`  
  
If project goes on we recommend to get rid of `layout` and configure `css` from `sass` compilation at `cms` level, same thing for scripts build
