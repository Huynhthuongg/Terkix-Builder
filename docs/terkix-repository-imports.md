# Terkix / RKIX repository imports

This project can import the related repositories requested for the Terkix Builder workspace without committing their full source into this repository.

## Repositories

The import manifest is stored in [`integrations/terkix-repositories.json`](../integrations/terkix-repositories.json) and includes:

| Repository                                                | Local path                     | Purpose                                 |
| --------------------------------------------------------- | ------------------------------ | --------------------------------------- |
| `https://github.com/Huynhthuongg/Terkix-RKix-Storage.git` | `external/Terkix-RKix-Storage` | Storage layer and RKix storage assets.  |
| `https://github.com/Huynhthuongg/TerKix-MCP.git`          | `external/TerKix-MCP`          | MCP tooling and server integrations.    |
| `https://github.com/Huynhthuongg/Terkix.git`              | `external/Terkix`              | Core Terkix source reference.           |
| `https://github.com/Huynhthuongg/AGENTS.RKIX3.git`        | `external/AGENTS.RKIX3`        | Agent instructions and RKIX3 workflows. |
| `https://github.com/RKIX3/RKIX3.git`                      | `external/RKIX3`               | RKIX3 upstream source reference.        |

> Note: the original request had `AGENTS.RKIX3https://github.com/RKIX3/RKIX3` joined together. This setup treats that as two separate repositories.

## Import or update locally

```bash
npm run import:terkix-repos
```

The command clones missing repositories and runs `git pull --ff-only` for repositories that already exist.

Preview the commands without cloning:

```bash
npm run import:terkix-repos -- --dry-run
```

Update only existing checkouts:

```bash
npm run import:terkix-repos -- --update-only
```

## Why `external/` is ignored

The `external/` directory is intentionally ignored by Git so large or independently-versioned repositories do not get vendored into Terkix Builder by accident. If a specific file from an imported repository should become part of Terkix Builder, copy that file into a first-class project directory and document its source.
