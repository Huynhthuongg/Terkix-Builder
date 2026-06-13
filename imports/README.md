# Imported Terkix/RKIX3 repositories

`imports/repositories.json` is the checked-in manifest for every repository the user asked to bring into the main project.

Run this command from the repository root to clone or update every repository into `imports/repositories/`:

```bash
npm run import:repos
```

If one private or unavailable repository fails but you want the script to keep going, run:

```bash
npm run import:repos -- --continue-on-error
```

The cloned repositories are intentionally ignored by git so the main project does not accidentally commit nested `.git` histories or huge vendor folders. The manifest and import script are committed so the full archive can be restored whenever GitHub access is available.
