# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# How to deploy : 

npm run build
npm run deploy

=> 

https://DoDLooki.github.io/DeitiesOfDeath/

# How to index :

✅ Steps to Get Your GitHub Pages Site on Google
1. Make Sure Your Repo is Public

Google can’t index private repositories or their Pages.
2. Add a robots.txt File

In your public/ folder (or create it if needed), add a file named robots.txt with this content:

User-agent: *
Allow: /
Sitemap: https://<your-username>.github.io/<your-repo-name>/sitemap.xml

    Replace with your actual URL.

3. Create a sitemap.xml (optional but recommended)

You can generate this using free online tools like https://www.xml-sitemaps.com or write a simple one manually.

Put the sitemap.xml in the public/ folder too.
4. Use <title> and <meta> Tags

Make sure your app’s index.html (or React <Helmet>) includes:

<title>Your Site Title</title>
<meta name="description" content="A professional website for XYZ services.">

    These help Google understand your content.

5. Submit Your Site to Google Search Console

    Go to https://search.google.com/search-console

    Click "Add Property"

    Enter your full site URL (https://your-username.github.io/your-repo-name/)

    Verify using DNS, or upload a verification HTML file to the public/ folder

    Once verified, go to "Sitemaps" and submit your sitemap.xml

6. Be Patient

It may take a few days to weeks for Google to index your site — faster if you submit a sitemap.

Would you like help generating a robots.txt + sitemap.xml example you can copy?