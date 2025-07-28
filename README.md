# Future Folklore Content Creator

An internal web app for Future Folklore creative studio that allows content creation and submission to n8n workflows.

## Features

- **Content Form**: Input title, core prompt, and platform-specific prompts
- **JSON Preview**: Optional preview of the data before submission
- **API Integration**: Ready for n8n webhook integration
- **Clean UI**: Modern, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/submit/route.ts    # API endpoint for form submission
│   ├── globals.css            # Global styles with Tailwind
│   ├── layout.tsx             # Root layout component
│   └── page.tsx               # Main page component
├── components/
│   └── ContentForm.tsx        # Form component with all fields
└── types/
    └── index.ts               # TypeScript type definitions
```

## API Endpoints

### POST `/api/submit`

Accepts JSON payload with the following structure:

```typescript
{
  title: string;
  corePrompt: string;
  subPrompts: {
    linkedin: string;
    instagram: string;
    threads: string;
    twitter: string;
    newsletter: string;
  };
}
```

## Deployment

This project is ready for deployment on Vercel. The API routes will work out of the box.

### Connecting to n8n

To connect to your n8n webhook:

1. Update the webhook URL in `src/app/api/submit/route.ts`
2. Uncomment the webhook call code
3. Test the integration

## Development

- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Next.js 14**: App Router with server components
- **ESLint**: Code quality and consistency

## License

Internal use for Future Folklore creative studio.