# cloudophile2.0-g8

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_PiK6dmNeLAPXAv3NxQo50HV2ElAY)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Content Database (Azure Cosmos DB)

Page content is served from Azure Cosmos DB (NoSQL API, Serverless). Documents live in a single container partitioned by `/type`. Data access is server-only (`lib/cosmos.ts`, `lib/site-content.ts`).

### Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Description |
| --- | --- |
| `COSMOS_CONNECTION_STRING` | Full connection string. Use this **or** the endpoint/key pair below. |
| `COSMOS_ENDPOINT` / `COSMOS_KEY` | Account endpoint and key (alternative to the connection string). |
| `COSMOS_DATABASE` | Database name (default `cloudophile`). |
| `COSMOS_CONTAINER` | Container name (default `content`, partition key `/type`). |

On Azure Static Web Apps, add the same values as application settings.

### Seeding

```bash
npm run seed:cosmos
```

Creates the database and container if missing and upserts the initial documents (idempotent).

### Fallback behavior

If Cosmos is not configured, unreachable, or a document is missing/unpublished, pages render built-in fallback content from `lib/fallback-content.ts`, so the site never returns a 500 because of the database. Content is cached for 5 minutes.

## Deployment (Azure Static Web Apps)

- Live site: https://delightful-cliff-0c0527e00.5.azurestaticapps.net
- Static Web App `cloudophile-swa` (Standard plan, required for hybrid Next.js SSR) in the `cloudophile` resource group.
- App settings on the SWA: `COSMOS_CONNECTION_STRING`, `COSMOS_DATABASE`, `COSMOS_CONTAINER`.
- Deployment: `.github/workflows/azure-static-web-apps.yml` runs on every push to `main`, using the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- Content is cached for 5 minutes, so Cosmos edits appear on the site within that window.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
