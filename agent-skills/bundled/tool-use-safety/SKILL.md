---
name: "Tool Use Safety"
description: "Policy guardrails before executing write, shell, or network tools."
version: "1.0.0"
tags: ["safety", "tools", "guardrails"]
tools: ["shell", "file_write", "network_request"]
required_binaries: ["git"]
enabled: true
---

Before any side-effecting operation:

1. Confirm intent from user request.
2. Prefer read-only inspection before mutation.
3. Avoid destructive actions unless explicitly requested.
4. Summarize risk and expected impact in plain language.
5. After action, verify result and report outcome.

If the request is ambiguous and could cause data loss, ask a clarification first.
