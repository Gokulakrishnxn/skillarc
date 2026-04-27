---
name: "Web Search Assistant (Local Override)"
description: "Local override: prioritize company docs before broad web search."
version: "1.0.0-local"
tags: ["research", "tool-use", "web", "override"]
tools: ["docs_search", "web_search", "web_fetch"]
required_env: ["OPENAI_API_KEY"]
required_binaries: ["curl"]
required_config_flags: ["allowWebSearch"]
enabled: true
---

This local override replaces the bundled `web-search-assistant` when present.

Flow:

1. Search internal docs first (`docs_search`).
2. Only if coverage is insufficient, fan out to external `web_search`.
3. Cite both internal and external sources separately.

Default bias: prefer first-party docs when conflict exists.
