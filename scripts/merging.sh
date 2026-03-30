#!/bin/bash

echo "🚀 Starting merge process: dev → master..."

if [[ -n $(git status --porcelain) ]]; then
  echo "❌ You have uncommitted changes. Please commit or stash first."
  exit 1
fi

echo "➡️ Switching to master..."
git checkout master

echo "⬇️ Pulling latest master..."
git pull origin master

echo "🔀 Merging dev into master..."
git merge dev

if [ $? -ne 0 ]; then
  echo "❌ Merge conflict detected! Please resolve manually."
  exit 1
fi

echo "📤 Pushing to origin master..."
git push origin master

echo "✅ Merge completed successfully!"