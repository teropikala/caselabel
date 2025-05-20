# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Building and Deploying to AWS S3

### Prerequisites

1. Node.js and npm installed
2. AWS CLI installed and configured with appropriate credentials
3. An S3 bucket created for hosting the website

### Building the Application

To build the application for production:

```bash
npm run build
```

This will:
1. Create a production build in the `build` directory
2. Copy the `tools.json` file to the build directory to ensure it's available in the deployed application

### Deploying to AWS S3

Before deploying, update the S3 bucket name in the `deploy` script in `package.json`:

```
"deploy": "npm run build && aws s3 sync build/ s3://YOUR_S3_BUCKET_NAME --delete"
```

Replace `YOUR_S3_BUCKET_NAME` with your actual S3 bucket name.

Then run:

```bash
npm run deploy
```

This will build the application and sync the build directory with your S3 bucket.

### S3 Bucket Configuration

Ensure your S3 bucket is configured for static website hosting:

1. In the AWS Management Console, navigate to your S3 bucket
2. Go to the "Properties" tab
3. Enable "Static website hosting"
4. Set "Index document" to `index.html`
5. Set appropriate bucket permissions to allow public access if needed

For more information, see [Hosting a Static Website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html).
