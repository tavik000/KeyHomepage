# CLAUDE.md

Project-specific instructions for working in this repo. These apply regardless of session.

## Running the dev server

- **Never start a new `next dev` / `npm run dev` process without checking for an existing one first.** Check with:
  ```powershell
  Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Select-Object ProcessId,CreationDate,CommandLine
  ```
  If a `next dev` process tree already exists for `D:\Development\Webapp\KeyHomepage`, reuse it (check `Get-NetTCPConnection -State Listen` to find which port it's actually bound to) instead of starting another.
- **Only one dev server should run against this project at a time.** Multiple concurrent `next dev` processes fight over the same `.next` build cache and CPU, and reliably cause the symptom below.
- **If a page hangs at `✓ Starting...` indefinitely, or returns a bare `500 Internal Server Error` with no stack trace, suspect duplicate dev-server processes first** — before assuming a code regression. Fix: identify every `node.exe` tied to this project via `CommandLine`, kill all but the one you intend to keep (ask for confirmation before force-killing — it's gated by the environment's permission classifier regardless), then clear `.next`:
  ```powershell
  Remove-Item -Recurse -Force "D:\Development\Webapp\KeyHomepage\.next" -ErrorAction SilentlyContinue
  ```
- If clearing the cache alone doesn't resolve a 500, the *surviving* process may hold stale in-memory module state from a broken hot-reload — it needs a full restart (kill + relaunch), not just a cache wipe.
- On Windows, `npm` may be blocked by PowerShell's execution policy (`npm.ps1` disabled). Use `npm.cmd` instead of `npm` to bypass the blocked wrapper — don't change the execution policy.

## Browser automation

- **Use the Playwright MCP tools for browser verification/automation in this repo, not the built-in Claude Browser tools (`mcp__Claude_Browser__*`).** Load Playwright's tools via `ToolSearch` if they aren't already available.
