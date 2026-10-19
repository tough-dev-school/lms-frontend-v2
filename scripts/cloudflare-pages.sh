#!/usr/bin/env bash
# Cloudflare Pages reads only .node-version/.nvmrc and PNPM_VERSION, not mise.toml,
# so we install the toolchain with mise ourselves and run the given command with it.
# The Pages project must set SKIP_DEPENDENCY_INSTALL=1, otherwise Pages runs its own
# pnpm install with the preinstalled pnpm first.
#
# Usage: bash scripts/cloudflare-pages.sh pnpm --filter frontend run build
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# The build image keeps its own .tool-versions above the repo (in $HOME), with tools
# mise can't install. Stop mise from reading configs outside the repo.
export MISE_CEILING_PATHS="$(dirname "$PWD")"

curl -fsSL https://mise.run | sh
export PATH="$HOME/.local/bin:$HOME/.local/share/mise/shims:$PATH"

mise trust --yes
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- "$@"
