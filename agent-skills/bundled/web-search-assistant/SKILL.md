---
name: "Web Search Assistant"
description: "Teach the agent to use web search tools for fresh, verifiable answers."
version: "1.0.0"
tags: ["research", "tool-use", "web"]
tools: ["web_search", "web_fetch"]
required_env: ["OPENAI_API_KEY"]
required_binaries: ["curl"]
required_config_flags: ["allowWebSearch"]
enabled: true
---

When a user asks for current events, release notes, pricing, or anything likely
to be newer than model training data:

1. Call `web_search` with 2-3 focused query variants.
2. Fetch top sources with `web_fetch` or equivalent.
3. Synthesize answer with inline citations.
4. State uncertainty when sources conflict.

Never fabricate URLs or quote text that was not observed in a fetched source.
