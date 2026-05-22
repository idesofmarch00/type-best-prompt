FROM node:20-alpine AS builder
WORKDIR /app

# Install turbo globally for building
RUN npm install -g turbo

# Copy monorepo project files
COPY . .
RUN npm ci
RUN turbo build --filter=server

FROM node:20-alpine AS runner
WORKDIR /app

# Copy built app
COPY --from=builder /app /app

ENV PORT=3001
ENV NODE_ENV=production
EXPOSE 3001

# Run express server using NPM workspaces
CMD ["npm", "run", "start", "--workspace=server"]
