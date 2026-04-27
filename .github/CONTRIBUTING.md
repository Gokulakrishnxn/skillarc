# Contributing

Thanks for contributing to SkillArc.

## What contributors can add

- New skills in `content/skills/`
- New prompts in `content/tools/` (or the agreed prompt content folder)
- New AI agent/workflow content in `content/workflows/`
- Agent skill packs in `agent-skills/`

## Protected areas

Core pages and layout files are protected through `CODEOWNERS`. Changes to those files require owner review before merge.

## How to contribute

1. Fork the repository
2. Create a feature branch
3. Add or update content in allowed folders
4. Open a pull request

## Maintainer setup required

To enforce protection:

1. Go to repo `Settings` -> `Branches` -> `Add rule`
2. Target branch: `main`
3. Enable:
   - `Require a pull request before merging`
   - `Require approvals`
   - `Require review from Code Owners`
   - (Recommended) `Restrict who can push to matching branches`
