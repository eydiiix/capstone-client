#!/bin/bash

# Staging changes
echo "Staging changes..."
git add .

# Committing changes
echo "Committing changes..."
git commit -m "updated"

# Pushing changes from the remote repository
echo "Pushing changes from the remote repository..."
git push origin main

# Pulling changes from the remote repository
echo "Pulling changes from the remote repository..."
git pull origin main

# Display a message indicating the process is complete
echo "Done! Changes staged, committed, and pulled."
