# Welcome to Emilie's Coming Soon Page!

## Project Website

**URL**: sltherapy.ch

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploying to GitHub Pages with Custom Domain (sltherapy.ch)

This project is configured to deploy to your custom domain **sltherapy.ch**. Follow these steps:

### Initial Setup

1. **Push your code to GitHub** (if not already done):
   ```sh
   git add .
   git commit -m "Configure for custom domain deployment"
   git push origin main
   ```

2. **Configure DNS settings at your domain registrar**:
   - Add an **A record** pointing to GitHub's IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - OR add a **CNAME record** for `www` subdomain pointing to: `yourusername.github.io`
   
3. **Enable GitHub Pages in repository settings**:
   - Go to your repository on GitHub
   - Click on "Settings" → "Pages" (in the left sidebar)
   - Under "Build and deployment" → "Source", select **"GitHub Actions"**
   - Under "Custom domain", enter: `sltherapy.ch`
   - Click "Save" - GitHub will verify your domain
   - Check "Enforce HTTPS" once DNS propagates (may take 24-48 hours)

### Automatic Deployment

Every time you push to the `main` branch, GitHub Actions will automatically:
- Build your project
- Deploy it to GitHub Pages
- Serve it from your custom domain: `https://sltherapy.ch`

### Manual Deployment (Alternative)

If you prefer manual deployment:
```sh
npm run deploy
```

### DNS Configuration Details

**Option 1: Apex Domain (sltherapy.ch)**
Add these A records:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**Option 2: WWW Subdomain (www.sltherapy.ch)**
Add this CNAME record:
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### Important Notes

- **CNAME file**: Already created in `public/CNAME` with your domain
- **Base path**: Set to `"/"` in `vite.config.ts` for custom domain
- **HTTPS**: Will be available after DNS propagation (24-48 hours)
- **DNS Propagation**: May take up to 48 hours for changes to take effect worldwide
- **Verify Domain**: GitHub will add a TXT record for verification - follow instructions in GitHub Pages settings
- The project uses HashRouter for client-side routing compatibility

### Troubleshooting

- **DNS not working?** Use [DNS Checker](https://dnschecker.org) to verify propagation
- **Certificate errors?** Wait 24-48 hours for DNS to fully propagate
- **404 errors?** Ensure the CNAME file contains only your domain name
- **Need help?** Check GitHub's [custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)


