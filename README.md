# Trail Tales

Trail Tales is an application built with React for an engaging adventure experience.  
This project utilizes [React](https://react.dev/), [React Router](https://reactrouter.com/), [Tailwind CSS](https://tailwindcss.com/), and [DaisyUI](https://daisyui.com/) to deliver a modern, responsive UI.

## Features

- React SPA architecture
- Routing with React Router
- Beautiful, customizable UI via Tailwind CSS and DaisyUI

## Getting Started

1. **Install dependencies:**

   ```
   yarn install
   # or
   npm install
   ```

2. **Start the development server:**

   ```
   yarn dev
   # or
   npm run dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- Update styles using Tailwind utility classes.
- Theme and component styling powered by DaisyUI.

## Project Scripts

- `yarn dev` – Start local development server
- `yarn build` – Production build
- `yarn start` – Start production server

---

Happy adventuring in Trail Tales!


## Build Docker Image

```
docker build -t trail-tales-web .
```

## Run Docker Container

```
docker run -d --name trail-tales-web --restart=always --env-file .env -p 3000:3000 trail-tales-web
```