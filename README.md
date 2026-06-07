# Composure

Composure is a React Native app focused on thought compartmentalization and intentional deferral.

The goal is to help users capture intrusive or distracting thoughts, assign them to the correct mental space, schedule a future review time, and return to the present without losing the thought.

Core philosophy:

Capture fast. Decide later. Return now.

## Development

Install dependencies:

```sh
npm install
```

Create a local environment file:

```sh
cp .env.example .env
```

Set the Supabase values in `.env`:

```sh
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Start the Expo app:

```sh
npm run start
```

Run TypeScript checks:

```sh
npm run typecheck
```
