# Setup Guide for AI-Powered Accounting Agent

## Prerequisites

Before running this application, you need to install Node.js and npm.

### Installing Node.js

1. **Download Node.js**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - Choose the Windows installer (.msi file)

2. **Install Node.js**
   - Run the downloaded installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation
   - Complete the installation

3. **Verify Installation**
   Open a new terminal/command prompt and run:
   ```bash
   node --version
   npm --version
   ```

## Running the Application

Once Node.js is installed, follow these steps:

1. **Navigate to the project directory**
   ```bash
   cd "C:\Users\Amsayaw\Music\project\Ai powered accounting app"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to the URL

## Alternative Installation Methods

### Using Chocolatey (Windows Package Manager)
If you have Chocolatey installed:
```bash
choco install nodejs
```

### Using Scoop (Windows Package Manager)
If you have Scoop installed:
```bash
scoop install nodejs
```

## Troubleshooting

### If npm is not recognized:
1. Restart your terminal/command prompt
2. Make sure Node.js was added to PATH during installation
3. Try running the commands from a new terminal window

### If the application doesn't start:
1. Make sure you're in the correct directory
2. Check that all dependencies are installed
3. Look for any error messages in the terminal

### Port 3000 already in use:
If you see an error about port 3000 being in use:
1. The application will automatically try to use a different port
2. Or you can manually kill the process using the port

## Development Tools (Optional)

For the best development experience, consider installing:

1. **Visual Studio Code**
   - Download from [https://code.visualstudio.com/](https://code.visualstudio.com/)
   - Install recommended extensions for React/TypeScript

2. **Git**
   - Download from [https://git-scm.com/](https://git-scm.com/)
   - Useful for version control

## Project Structure

After installation, your project should look like this:
```
Ai powered accounting app/
├── node_modules/          # Dependencies (created after npm install)
├── public/               # Static files
├── src/                  # Source code
│   ├── components/       # React components
│   ├── App.tsx          # Main app component
│   ├── index.tsx        # Entry point
│   └── index.css        # Global styles
├── package.json          # Project configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── README.md            # Project documentation
└── SETUP.md             # This setup guide
```

## Next Steps

Once the application is running:

1. **Explore the Features**
   - Navigate through the different sections using the sidebar
   - Try the interactive elements
   - Test the responsive design on different screen sizes

2. **Customize the Application**
   - Modify colors in `tailwind.config.js`
   - Add new features in the components
   - Update the data in the components

3. **Deploy the Application**
   - Build for production: `npm run build`
   - Deploy to platforms like Vercel, Netlify, or GitHub Pages

## Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are properly installed
3. Try deleting `node_modules` and running `npm install` again
4. Check that you're using a compatible Node.js version (16.x or higher)

---

**Happy coding! 🚀** 