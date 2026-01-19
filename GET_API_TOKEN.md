# Get Sanity API Token

To create content via script, you need an API token:

1. Go to https://www.sanity.io/manage
2. Select your project (ik1g399m)
3. Go to "API" → "Tokens"
4. Click "Add API token"
5. Name it: "Content Seeder"
6. Select "Editor" permissions (needs write access)
7. Copy the token
8. Add to .env.local: `SANITY_API_TOKEN=your_token_here`

Then run: `npm run seed`


