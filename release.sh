set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  npm run build

  # commit
  git add -A
  git commit -m "Build for $VERSION"
  npm version $VERSION -m "Upgrade to $VERSION"

  # push
  git push
  echo "Done!"
fi
