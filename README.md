# SendItFax

A web application for sending faxes online, built with Next.js and Firebase.

Note: We currently only support faxing to the US and Canada. To change this we need to:

- Remove or comment out `countryCodeEditable={false}`
- Remove or comment out `onlyNorthAmerica={true}`
- Update the helperText in the PhoneInput component to remove the "USA and Canada" only restriction text
- RingCentral is currently configured to disable faxing to other countries, so we need to update this in the dashboard if we want to lift this restriction.

## Developer Notes

- Internal Developer Testing Buttons only render on local development (Insert Data, Update All Faxes, Get Status)
- CORS origin "Localhost" was commented out in function/index.js as well as checking for allowedOrigins. This will need to be uncommented so that it can be tested on localhost development.

## Requirements

- Git
- Firebase CLI (`npm install -g firebase-tools`)
- Node.js (version 18 or higher recommended for Next.js)
- npm or yarn

## Installation and Setup

The following additional APIs are used in this project:

- RingCentral (for fax sending)
- Mailjet (for email sending)
- Stripe (for payments)
- Google Recaptcha (for spam protection)

## Installation and Setup

You can use either npm or yarn to install dependencies.
To clone the repository, install dependencies for both frontend and backend, and start the project, run the following commands:

### Clone and Install Dependencies

```bash
# Clone Repository
git clone senditfax.git

# Install Frontend Dependencies
npm install
# or
yarn

# Install Backend Dependencies
cd functions
npm install
cd ..
```

### Environment Setup

Create a `.env` file in the root directory. Don't forget to add your keys. Also DO NOT commit this file to the repository anymore.

```env
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_domain"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_STRIPE_PUBLIC_KEY="your_stripe_public_key"
VITE_GOOGLE_RECAPTCHA_SITE_KEY="your_google_site_key"
```

### Firebase Setup

```bash
# Install Firebase CLI Globally
npm install -g firebase-tools
# Or
yarn global add firebase-tools

#Firebase Login
firebase login
```

## Development


### Frontend Development

The project uses Next.js with App Router and Turbopack for faster development experience.

```bash
# Start development server with Turbopack
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:3000`

### Project Structure

The project follows Next.js 13+ App Router structure:

- `/src/app` - Main application routes and pages
- `/src/app/api` - Internal Next.js API routes for server-side requests
- `/src/components` - Reusable React components
- `/src/utils` - Utility functions
- `/src/store` - State management (Zustand)
- `/src/styles` - Global styles and Tailwind CSS
- `/src/config` - Configuration files
- `/src/images` - Static images and assets

### API Routes

The project uses Next.js API routes (`/src/app/api`) to handle internal server-side requests to external services. This provides better security and performance by:

- Keeping sensitive API keys on the server side
- Reducing client-side code
- Improving request handling with Next.js built-in optimizations
- Centralizing API request logic

### Component Changes from React to Next.js

During the migration from React to Next.js, several new components were added and existing ones were restructured:

#### New Components

- `MainInputs` - Core input component for fax form (client )
- `StatusInputs` - Component for handling fax status inputs
- `StatusErrorHandler` - Component for managing and displaying status errors
- `FullSEO.js` - Centralized SEO management component containing metadata for all pages

#### Restructured Components

- Stripe components were split into separate tip and fax versions:
  - `StripeRootTip` and `StripeSidebarTip` for handling tip payments
  - `StripeRootFax` and `StripeSidebarFax` for handling fax payments

### Backend Firebase Functions Development

The backend is built with Express.js and Firebase Functions. It is located in the `functions` sub directory. It has its own dependencies, which need to be installed separately as described in the [Installation and Setup](#installation-and-setup) section.

```bash
# Navigate to functions directory
cd functions

# Install dependencies in the functions sub directory
npm install

# Start Firebase emulators (optional)
firebase emulators:start
```

## Deployment

We deploy the frontend and backend separately:

### Frontend Only (Hosting)

```bash
npm run deploy:hosting
# or
yarn deploy:hosting
```

### Backend Only (Functions)

```bash
# Navigate to Folder
cd .\functions\

# Install Dependencies (Express JS)
# IMPORTANT: Use Only npm
npm i

# Deploy Firebase Functions
npm run deploy:functions
# or
yarn deploy:functions
```

## Documentation - Server API

The backend is built with Express.js and Firebase Functions. The server is written in Express JS.  
All routes are stored in the `routes` folder. The main `index.js` runtime file.
After each file change, you need to run the `yarn deploy` command to update Firebase Functions.

### Available Endpoints

1. **Ping** - `GET` `/ping`  
   _Description:_ Check Firebase server status.

2. **Send Fax (Free)** - `POST` `/sendFaxFree`  
   _Description:_ Save the data in the database, send a fax.

3. **Send Fax (Paid)** - `POST` `sendFaxFree`  
   _Description:_ Check the payment, save the data in the database, send a fax.

4. **Stripe Payment Fax** - `POST` `/stripePaymentFax`  
   _Description:_ Returns the ClientSecret for the Stripe component to the client (for Fax).

5. **Stripe Payment Tips** - `POST` `/stripePaymentTip`  
   _Description:_ Returns the ClientSecret for the Stripe component to the client (for Tips).

6. **Status** - `GET` `/status`  
   _Description:_ Returns all fax data from the database.

7. **Update Faxes** - `GET` `/status`  
   _Description:_ Returns all fax data from the database.

8. **[Test] Create PDF** - `GET` `/createPDF`  
   _Description:_ Test endpoint for testing the work of the createCoverPage function
