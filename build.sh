#!/bin/bash

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
bun install

# Generate Prisma Client
echo "Generating Prisma Client..."
bunx prisma generate

# Push database changes
echo "Pushing database changes..."
bunx prisma db push

# Build Next.js application
echo "Building Next.js application..."
bun run next build