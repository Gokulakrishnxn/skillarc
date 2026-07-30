---
name: "Hermes Tweet"
description: "Guide Hermes Agent through catalog-first X/Twitter research and approval-gated actions with Hermes Tweet."
version: "0.1.11"
tags: ["hermes-agent", "xquik", "x", "twitter", "social-media", "automation"]
tools: ["tweet_explore", "tweet_read", "tweet_action"]
required_env: []
required_binaries: ["hermes"]
required_config_flags: []
enabled: true
---

Use Hermes Tweet for Hermes Agent workflows that need X/Twitter research. It
also supports social listening, account context, and explicitly approved
account actions through Xquik.

Install and enable the plugin:

```bash
hermes plugins install Xquik-dev/hermes-tweet --enable
```

Follow this workflow:

1. Call `tweet_explore` first. It searches the bundled catalog without an API
   request or API key.
2. Set `XQUIK_API_KEY` before using `tweet_read`.
3. Pass only catalog-listed `/api/v1/...` paths to live tools.
4. Keep `HERMES_TWEET_ENABLE_ACTIONS=false` for read-only sessions.
5. Use `tweet_action` only after explicit approval. It covers private reads and
   mutations.
6. Never place secrets in prompts, issue bodies, comments, or tool arguments.
   Secrets include API keys, cookies, credentials, and private tokens.
7. Restart Hermes after changing environment variables.

Verify the installation with `hermes plugins list`. In an active session,
confirm that `tweet_explore` is available. Without an API key, the plugin
should expose only `tweet_explore`.

Source: https://github.com/Xquik-dev/hermes-tweet

Xquik is an independent third-party service. Not affiliated with X Corp.
"Twitter" and "X" are trademarks of X Corp.
