import React, { useEffect, useRef } from "react";

const BANNERS = {
    // 14 · Kally — Ambient AI Teammate (Slack mock + identity chain)
    "14": (
        <div className="pb-banner b8">
            <div className="pb8-chrome">
                <div className="pb8-logo">K</div>
                <div className="pb8-ws">
                    Acme <span className="sub">· #pr-reviews</span>
                </div>
                <div className="pb8-spacer" />
                <div className="pb8-live">
                    <span className="pb8-live-dot" />
                    AMBIENT · ACTING AS YOU
                </div>
            </div>

            <div className="pb8-body">
                <div className="pb8-left">
                    <span className="pb8-eyebrow">Summoned, Not Deployed</span>

                    <div className="pb8-hero">
                        <h2 className="pb8-h2">KAL<em>LY.</em></h2>
                        <div className="pb8-tagchip">v0.8 · prod · <b>9</b> Cloud Run services</div>
                    </div>

                    <p className="pb8-tagline">
                        An <b>ambient AI teammate</b> that lives in Slack and acts on GitHub, Jira, Confluence &amp; the agent browser <b>as the human who summoned it</b> — every action attributable, auditable, revocable.
                    </p>

                    <div className="pb8-slack">
                        <div className="pb8-slack-head">
                            <span className="pb8-hash">#</span>
                            <span className="pb8-channelname">pr-reviews</span>
                            <span className="pb8-members">12 members</span>
                        </div>

                        <div className="pb8-msg">
                            <div className="pb8-avatar">PT</div>
                            <div>
                                <div className="pb8-msg-head">
                                    <span className="pb8-name">Phuc Truong</span>
                                    <span className="pb8-time">3:20 PM</span>
                                </div>
                                <div className="pb8-msg-body">
                                    <span className="pb8-mention">@Kally</span> do impact analysis of <span className="pb8-code">acme/console#3024</span> &amp; verify the preview URL with agent browser — record video as evidence.
                                </div>
                            </div>
                        </div>

                        <div className="pb8-msg pb8-msg-tight">
                            <div className="pb8-avatar pb8-kally">K</div>
                            <div>
                                <div className="pb8-msg-head">
                                    <span className="pb8-name pb8-bot">Kally</span>
                                    <span className="pb8-bot-tag">APP</span>
                                    <span className="pb8-time">3:39 PM</span>
                                </div>
                                <div className="pb8-msg-body">
                                    Checked out the PR worktree, ran agent browser. Attached <b>findings.md</b> &amp; <b>pr-3024-preview.webm</b> — one caveat in the report. Ready to post the review:
                                </div>

                                <div className="pb8-approval">
                                    <div className="pb8-approval-head">
                                        <div className="pb8-pad-icon">!</div>
                                        <div className="pb8-approval-title">Approval required · post review to GitHub</div>
                                    </div>
                                    <div className="pb8-approval-meta">
                                        → <span className="pb8-act">POST REVIEW</span> on <span className="pb8-target">acme/console#3024</span> · verdict <span className="pb8-target">REQUEST_CHANGES</span>
                                        <br />
                                        → requester:&nbsp;<span className="pb8-requester">PT · @phuc.truong</span> · policy:&nbsp;<b>org-domain ✓</b>
                                    </div>
                                    <div className="pb8-approval-btns">
                                        <span className="pb8-btn pb8-btn-yes"><span className="pb8-mini-av" /> Approve as me</span>
                                        <span className="pb8-btn pb8-btn-no">✕ Reject</span>
                                    </div>
                                </div>

                                <div className="pb8-typing">
                                    <span className="pb8-tdot" />
                                    <span className="pb8-tdot" />
                                    <span className="pb8-tdot" />
                                    <span>Kally is watching CI on its own commit to #3024…</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb8-right">
                    <div className="pb8-panel">
                        <div className="pb8-panel-head">
                            <span className="pb8-ttl">{"// IDENTITY CHAIN · "}<b>writes authenticate as you</b></span>
                        </div>
                        <div className="pb8-chain">
                            <div className="pb8-chain-node">
                                <div className="pb8-chain-av pb8-chain-user">PT</div>
                                <div className="pb8-chain-lbl">@phuc.truong</div>
                                <div className="pb8-chain-sub">SLACK UID</div>
                            </div>
                            <div className="pb8-chain-arrow">→</div>
                            <div className="pb8-chain-node">
                                <div className="pb8-chain-av pb8-chain-kal">K</div>
                                <div className="pb8-chain-lbl">Kally</div>
                                <div className="pb8-chain-sub">PROXY · CREDS INJECT</div>
                            </div>
                            <div className="pb8-chain-arrow">→</div>
                            <div className="pb8-chain-node">
                                <div className="pb8-chain-av pb8-chain-tgt">GH</div>
                                <div className="pb8-chain-lbl">GitHub</div>
                                <div className="pb8-chain-sub">REVIEW · AUTHOR: PT</div>
                            </div>
                        </div>
                    </div>

                    <div className="pb8-panel">
                        <div className="pb8-panel-head">
                            <span className="pb8-ttl">{"// VAULT + "}<b>audit.jsonl</b></span>
                            <span className="pb8-ttl pb8-ttl-acc">APPEND-ONLY</span>
                        </div>
                        <div className="pb8-vault-row">
                            <div className="pb8-vault-icon">🔒</div>
                            <div className="pb8-vault-body">
                                <div className="pb8-vault-title">AES-256-GCM · per-record IV</div>
                                <div className="pb8-vault-desc">Internal-only, no host port. Auth tag detects tampering. Plaintext never logged.</div>
                            </div>
                        </div>
                        <div className="pb8-audit">
                            <div className="pb8-audit-row">
                                <span className="pb8-ats">15:32.04</span>
                                <span className="pb8-aglyph pb8-a-r">R</span>
                                <span className="pb8-abody"><b>worktree.add</b> · <em>acme/console/pr-3024</em> · as @phuc.truong</span>
                                <span className="pb8-asys">gh-app</span>
                            </div>
                            <div className="pb8-audit-row">
                                <span className="pb8-ats">15:38.21</span>
                                <span className="pb8-aglyph pb8-a-r">R</span>
                                <span className="pb8-abody"><b>browser.record</b> · preview-url · 7.2s webm</span>
                                <span className="pb8-asys">agent-browser</span>
                            </div>
                            <div className="pb8-audit-row">
                                <span className="pb8-ats">15:39.10</span>
                                <span className="pb8-aglyph pb8-a-w">W</span>
                                <span className="pb8-abody"><b>pr.review.post</b> · <em>#3024</em> · REQUEST_CHANGES · as @phuc.truong</span>
                                <span className="pb8-asys">gh-app</span>
                            </div>
                            <div className="pb8-audit-row">
                                <span className="pb8-ats">15:39.42</span>
                                <span className="pb8-aglyph pb8-a-x">X</span>
                                <span className="pb8-abody"><b>policy.deny</b> · @ext.user · domain check failed</span>
                                <span className="pb8-asys">gate</span>
                            </div>
                        </div>
                    </div>

                    <div className="pb8-stats">
                        <div className="pb8-stat"><div className="n">11</div><div className="l">Packages</div></div>
                        <div className="pb8-stat"><div className="n">733</div><div className="l">Tests</div></div>
                        <div className="pb8-stat"><div className="n">39k</div><div className="l">LOC · TS</div></div>
                        <div className="pb8-stat"><div className="n">64</div><div className="l">My Commits</div></div>
                    </div>

                    <div className="pb8-chips">
                        <span className="pb8-clabel">stack //</span>
                        <span className="pb8-chip acc">TypeScript</span>
                        <span className="pb8-chip acc">OpenCode</span>
                        <span className="pb8-chip">Cloud Run</span>
                        <span className="pb8-chip">MCP</span>
                        <span className="pb8-chip">AES-GCM</span>
                        <span className="pb8-chip">mitmproxy</span>
                        <span className="pb8-chip">Vouch SSO</span>
                        <span className="pb8-chip">LangSmith</span>
                    </div>

                    <div className="pb8-credit">
                        <span>downstream of <b>scoutqa-dot-ai/thor</b> · <span className="pb8-credit-handle">@daohoangson</span></span>
                        <span>my role: <b>co-maintainer</b></span>
                    </div>
                </div>
            </div>
        </div>
    ),
    // 13 · FiveD Pulse — Live Console
    "13": (
        <div className="pb-banner b7">
            <span className="pb7-crosshair tl" />
            <span className="pb7-crosshair tr" />
            <span className="pb7-crosshair bl" />
            <span className="pb7-crosshair br" />

            <svg className="pb7-bg-pulse" viewBox="0 0 1600 200" preserveAspectRatio="none">
                <path d="M0,100 L120,100 L130,80 L140,140 L150,40 L160,160 L170,100 L320,100 L330,90 L345,110 L360,100 L520,100 L530,75 L545,145 L560,50 L575,150 L590,100 L760,100 L770,95 L780,105 L790,100 L980,100 L990,70 L1005,150 L1020,30 L1035,170 L1050,100 L1240,100 L1255,90 L1270,110 L1285,100 L1450,100 L1465,85 L1480,140 L1495,50 L1510,140 L1525,100 L1600,100" />
            </svg>

            <div className="pb7-chrome">
                <span className="pb7-dot r" />
                <span className="pb7-dot y" />
                <span className="pb7-dot g" />
                <span className="pb7-path">~/fived-studio/pulse — bun dev</span>
                <span className="pb7-badge-live">
                    <span className="pb7-pulse-dot" />
                    LIVE · SSE
                </span>
            </div>

            <div className="pb7-body">
                <div className="pb7-left">
                    <div>
                        <span className="pb7-eyebrow">FiveD Studio · Infrastructure</span>
                        <h2 className="pb7-h1">
                            PULSE<em>.</em>
                            <span className="pb7-tag-ver">v1 · live</span>
                        </h2>
                        <div className="pb7-commands">
                            <div className="pb7-line">
                                <span className="pb7-prompt">$</span>
                                <span className="pb7-cmd">
                                    curl <span className="pb7-flag">-N</span>{" "}
                                    <span className="pb7-str">&quot;https://pulse.fived.dev/v1/stream/events&quot;</span>
                                </span>
                            </div>
                            <div className="pb7-line">
                                <span className="pb7-comment">// connected — sub-second cold start · ~50ms p50 reads</span>
                            </div>
                            <div className="pb7-line">
                                <span className="pb7-ok">
                                    ✓ stream open · receiving events from Redis fan-out
                                    <span className="pb7-cursor" />
                                </span>
                            </div>
                        </div>
                        <p className="pb7-tagline">
                            A <b>real-time engineering pulse</b> for FiveD Studio — Bun + Hono + Postgres ingests every GitHub event across the org and fans it out to the live dashboard in <b>seconds</b>.
                        </p>
                    </div>
                    <div className="pb7-stat-row">
                        <div className="pb7-stat"><div className="n">~50ms</div><div className="l">p50 Reads</div></div>
                        <div className="pb7-stat"><div className="n">8</div><div className="l">v1 Endpoints</div></div>
                        <div className="pb7-stat"><div className="n">SSE</div><div className="l">Fan-Out</div></div>
                        <div className="pb7-stat"><div className="n">6h</div><div className="l">LC Poll Cycle</div></div>
                    </div>
                </div>

                <div className="pb7-right">
                    <div className="pb7-ecg">
                        <div className="pb7-ecg-head">
                            <span className="pb7-ttl">// EVENT FREQUENCY · LAST 60s</span>
                            <span className="pb7-bpm">214<small>/MIN</small></span>
                        </div>
                        <svg className="pb7-ecg-svg" viewBox="0 0 520 90" preserveAspectRatio="none">
                            <line className="pb7-grid-h" x1="0" y1="22" x2="520" y2="22" />
                            <line className="pb7-grid-h" x1="0" y1="45" x2="520" y2="45" />
                            <line className="pb7-grid-h" x1="0" y1="68" x2="520" y2="68" />
                            <path d="M0,45 L40,45 L48,35 L56,55 L62,15 L68,75 L74,40 L120,45 L128,42 L136,48 L144,45 L200,45 L208,28 L216,62 L222,10 L228,80 L234,45 L290,45 L298,38 L306,52 L314,45 L370,45 L378,20 L386,70 L392,5 L398,85 L404,45 L460,45 L468,35 L476,55 L482,30 L490,60 L498,45 L520,45" />
                        </svg>
                    </div>

                    <div className="pb7-log">
                        <div className="pb7-log-head">
                            <span className="pb7-ttl">// GET /v1/events · STREAM</span>
                            <span className="pb7-stream-tag">SSE OPEN</span>
                        </div>
                        <div className="pb7-log-list">
                            <div className="pb7-log-row">
                                <span className="ts">00:00.04</span>
                                <span className="glyph g-push">▲</span>
                                <span className="body"><b>push</b> · <em>@sloweyyy</em> → <em>fived-studio/pulse</em></span>
                                <span className="repo">main</span>
                            </div>
                            <div className="pb7-log-row">
                                <span className="ts">00:00.12</span>
                                <span className="glyph g-pr">⌥</span>
                                <span className="body"><b>pr.opened</b> · #142 <em>add redis fan-out backpressure</em></span>
                                <span className="repo">+184/-12</span>
                            </div>
                            <div className="pb7-log-row">
                                <span className="ts">00:00.41</span>
                                <span className="glyph g-rev">✓</span>
                                <span className="body"><b>review</b> · <em>@hgbaooo</em> approved #138</span>
                                <span className="repo">approved</span>
                            </div>
                            <div className="pb7-log-row">
                                <span className="ts">00:01.08</span>
                                <span className="glyph g-push">▲</span>
                                <span className="body"><b>push</b> · <em>@thvnhtai</em> → <em>fived-studio.github.io</em></span>
                                <span className="repo">live</span>
                            </div>
                            <div className="pb7-log-row">
                                <span className="ts">00:01.32</span>
                                <span className="glyph g-rel">★</span>
                                <span className="body"><b>release</b> · <em>fived-studio/pulse</em> v1.7.0 cut</span>
                                <span className="repo">v1.7.0</span>
                            </div>
                            <div className="pb7-log-row dim">
                                <span className="ts">00:02.04</span>
                                <span className="glyph g-pr">⌥</span>
                                <span className="body"><b>pr.review_requested</b> · #143 <em>idempotent webhook</em></span>
                                <span className="repo">@TrTueTah</span>
                            </div>
                            <div className="pb7-log-row dim">
                                <span className="ts">00:02.27</span>
                                <span className="glyph g-push">▲</span>
                                <span className="body"><b>push</b> · <em>@nquynqthanq</em> → <em>@nquynqthanq/leetcode-grind</em></span>
                                <span className="repo">+1</span>
                            </div>
                            <div className="pb7-log-row dimmer">
                                <span className="ts">00:03.10</span>
                                <span className="glyph g-rev">✓</span>
                                <span className="body"><b>review.comment</b> · #142 <em>&quot;LGTM, ship it&quot;</em></span>
                                <span className="repo">@hgbaooo</span>
                            </div>
                        </div>
                    </div>

                    <div className="pb7-stack">
                        <span className="pb7-stack-label">stack //</span>
                        <span className="pb7-chip acc">Bun 1.3</span>
                        <span className="pb7-chip acc">Hono 4</span>
                        <span className="pb7-chip">Postgres 16</span>
                        <span className="pb7-chip">Drizzle</span>
                        <span className="pb7-chip">Redis</span>
                        <span className="pb7-chip">Cloud Run</span>
                        <span className="pb7-chip">SSE</span>
                        <span className="pb7-chip">GH App</span>
                    </div>
                </div>
            </div>
        </div>
    ),
    // 12 · llmfit — Terminal
    "12": (
        <div className="pb-banner b4">
            <div className="term-chrome">
                <span className="dot-r" />
                <span className="dot-y" />
                <span className="dot-g" />
                <div className="path">~/oss/llmfit-web — zsh</div>
            </div>
            <div className="term-body">
                <div className="line">
                    <span className="prompt">$</span>
                    <span className="cmd">
                        llmfit scan <span className="flag">--hardware</span>{" "}
                        <span className="flag">--verbose</span>
                    </span>
                </div>
                <div className="line">
                    <span className="comment">// detecting CPU / RAM / GPU / VRAM...</span>
                </div>
                <div className="line">
                    <span className="ok">✓</span>
                    <span className="cmd">
                        Ranked <span className="str">&quot;hundreds&quot;</span> of models across local runtimes
                    </span>
                </div>
                <h2>
                    LLM<em>FIT</em>.<span className="accent-y">WEB</span>
                </h2>
                <p className="tagline">
                    OSS contribution — refactored the llmfit web dashboard into a modular React architecture with advanced filtering, side-by-side comparison, and multi-theme support. 24.5k+ stars, 18 commits by sloweyyy.
                    <span className="cursor" />
                </p>
            </div>
        </div>
    ),
    // 7 · Katalon Support Assistant — Gradient Headline
    "7": (
        <div className="pb-banner b2">
            <div className="row-top">
                <div className="meta-list">
                    <span className="item">AI Product</span>
                    <span className="item">Apr 2025 — Present</span>
                    <span className="item">Product Owner · Eng Lead</span>
                </div>
                <div className="logo-round">KAT</div>
            </div>
            <h2>
                <span className="gradient-text">SUPPORT</span>
                <br />
                <span className="stroke">ASSISTANT</span>
            </h2>
            <div className="row-bot">
                <p className="tagline">
                    24/7 AI support chat for Katalon. Claude 4.5 Haiku + LangGraph + FastAPI on AWS ECS. Drove a <strong>30% reduction</strong> in support case volume.
                </p>
                <span className="url-pill">assistant.katalon.com</span>
            </div>
        </div>
    ),
    // 1 · Cloud-Native E-Commerce — Stats
    "1": (
        <div className="pb-banner b5">
            <div className="left">
                <div className="card main-card">
                    <div>
                        <div className="eyebrow">// Microservices Thesis · .NET 8 + AWS EKS</div>
                        <h2>
                            CLOUD-<br />NATIVE<br />COMMERCE
                        </h2>
                    </div>
                    <p className="tagline">
                        Enterprise-grade microfrontend + .NET 8 microservices reference implementation with Istio, Prometheus, Grafana, ELK, and three deployment profiles.
                    </p>
                </div>
                <div className="info-bar">
                    <span>
                        <span className="dot-live" />v0.11.1 · MIT
                    </span>
                    <span>Mar 2025 → Mar 2026</span>
                </div>
            </div>
            <div className="right">
                <div className="stat p">
                    <span className="big">577</span>
                    <span className="lbl">Commits</span>
                </div>
                <div className="stat y">
                    <span className="big">5 + 4</span>
                    <span className="lbl">MFEs + Microservices</span>
                </div>
                <div className="stat g">
                    <span className="big">4</span>
                    <span className="lbl">Database Engines</span>
                </div>
                <div className="stat v">
                    <span className="big">3</span>
                    <span className="lbl">Deploy Profiles</span>
                </div>
            </div>
        </div>
    ),
    // 2 · GreenLedger — Big Type (yellow)
    "2": (
        <div className="pb-banner b1 alt-yellow">
            <div className="top-bar">
                <span>Go Microservices · Carbon Credit Platform</span>
                <span className="tag-pill">MIT · 78 commits</span>
            </div>
            <div className="deco-star">♻</div>
            <div className="title-block">
                <span className="eyebrow">// Carbon footprint · Wallet · NFT Certificates</span>
                <h2>
                    GREEN<br />LEDGER
                </h2>
            </div>
            <div className="bottom-row">
                <p className="tagline">
                    Six Go microservices, Kafka event bus, Traefik v3 gateway, Prometheus + Grafana, blockchain-verified offset certificates.
                </p>
                <div className="chips">
                    <span className="chip-b">Go 1.23</span>
                    <span className="chip-b">Kafka</span>
                    <span className="chip-b">Postgres</span>
                    <span className="chip-b">Traefik</span>
                </div>
            </div>
        </div>
    ),
    // 3 · ExperimentHub — Terminal
    "3": (
        <div className="pb-banner b4">
            <div className="term-chrome">
                <span className="dot-r" />
                <span className="dot-y" />
                <span className="dot-g" />
                <div className="path">~/experiment-hub — train.py</div>
            </div>
            <div className="term-body">
                <div className="line">
                    <span className="prompt">$</span>
                    <span className="cmd">
                        python train.py <span className="flag">--arch</span>{" "}
                        <span className="str">&quot;cnn&quot;</span>{" "}
                        <span className="flag">--epochs</span> <span className="str">10</span>
                    </span>
                </div>
                <div className="line">
                    <span className="comment">// streaming loss + accuracy over WebSocket → UI</span>
                </div>
                <div className="line">
                    <span className="ok">✓</span>
                    <span className="cmd">
                        Epoch 10/10 · loss <span className="warn">0.031</span> · acc{" "}
                        <span className="warn">0.992</span>
                    </span>
                </div>
                <h2>
                    EXPER<em>IMENT</em>
                    <br />
                    <span className="accent-y">HUB</span>
                </h2>
                <p className="tagline">
                    Full-stack ML experiment platform — Next.js 15 + FastAPI + PyTorch with real-time progress, hyperparameter tuning, and CNN/MLP/RNN on MNIST. Contributor-friendly by design.
                    <span className="cursor" />
                </p>
            </div>
        </div>
    ),
    // 11 · Pray for T1 — Sticker Collage
    "11": (
        <div className="pb-banner b3">
            <div className="top-row">
                <div className="title-stack">
                    <span className="eyebrow">// Fan Engagement · Esports · Apr 2026</span>
                    <h2>
                        PRAY<br />FOR<br />T1
                    </h2>
                </div>
                <div className="cluster">
                    <div className="sticker-item s1">🕯 Light Incense</div>
                    <div className="sticker-item s2">15K Visitors</div>
                    <div className="sticker-item s3">30K Views</div>
                    <div className="sticker-item s4">Week One</div>
                    <div className="sticker-item s5">150 Concurrent</div>
                </div>
            </div>
            <div className="bot-row">
                <p className="tagline">
                    A fan-engagement web app where users light virtual incense and pray for T1&rsquo;s victory. Shipped fast, scaled through tournament spikes.
                </p>
                <div className="byline">
                    TypeScript · Next.js · Vercel
                    <br />
                    <span style={{ color: "rgba(255,255,255,0.6)", letterSpacing: ".08em" }}>
                        t1-pray.vercel.app
                    </span>
                </div>
            </div>
        </div>
    ),
    // 4 · Resort Management — Stats
    "4": (
        <div className="pb-banner b5">
            <div className="left">
                <div className="card main-card">
                    <div>
                        <div className="eyebrow">// UIT Team Project · FiveD-SE · Nov 2024 — Jan 2025</div>
                        <h2>
                            RESORT<br />OPS.
                        </h2>
                    </div>
                    <p className="tagline">
                        NestJS + React full-stack resort platform: reservations, self check-in, housekeeping, PayOS billing, analytics, GDPR/PCI-DSS posture.
                    </p>
                </div>
                <div className="info-bar">
                    <span>
                        <span className="dot-live" />schoolstay.netlify.app
                    </span>
                    <span>Railway + Netlify</span>
                </div>
            </div>
            <div className="right">
                <div className="stat p">
                    <span className="big">448</span>
                    <span className="lbl">Total Commits</span>
                </div>
                <div className="stat y">
                    <span className="big">187</span>
                    <span className="lbl">sloweyyy&rsquo;s Commits · Team Lead</span>
                </div>
                <div className="stat g">
                    <span className="big">9</span>
                    <span className="lbl">Core Feature Domains</span>
                </div>
                <div className="stat v">
                    <span className="big">5</span>
                    <span className="lbl">Team Members</span>
                </div>
            </div>
        </div>
    ),
    // 5 · Blockchain Notarization (Trustify) — Split / Evolution
    "5": (
        <div className="pb-banner b6">
            <div className="half before">
                <div>
                    <span className="tag-lbl">// 2024 · UIT Team</span>
                    <h2>
                        ETHEREUM<br />EDITION
                    </h2>
                    <p className="desc">
                        6-person UIT Advanced SE team project — 871 commits, Ethereum smart contracts, daily payment cron. Solid foundation, heavy chain fees.
                    </p>
                </div>
                <div className="stats-row">
                    <div className="stat-box"><div className="n">871</div><div className="l">Commits</div></div>
                    <div className="stat-box"><div className="n">6</div><div className="l">Contributors</div></div>
                    <div className="stat-box"><div className="n">Eth</div><div className="l">Blockchain</div></div>
                    <div className="stat-box"><div className="n">4mo</div><div className="l">Sep–Dec 2024</div></div>
                </div>
                <div className="arrow-mid">→</div>
            </div>
            <div className="half after">
                <div>
                    <span className="tag-lbl">// 2025 · Trustify v1.7.0</span>
                    <h2>
                        SOLANA<br />REFINED
                    </h2>
                    <p className="desc">
                        2-person refined fork. Migrated Ethereum → Solana (Metaplex, Anchor), Bundlr/Arweave storage, two-step notarization, Gemini AI verification.
                    </p>
                </div>
                <div className="stats-row">
                    <div className="stat-box"><div className="n">32</div><div className="l">Commits</div></div>
                    <div className="stat-box"><div className="n">2</div><div className="l">Contributors</div></div>
                    <div className="stat-box"><div className="n">SOL</div><div className="l">Blockchain</div></div>
                    <div className="stat-box"><div className="n">LIVE</div><div className="l">trustify.works</div></div>
                </div>
            </div>
        </div>
    ),
    // 6 · Coffee Shop Management — Big Type (pink)
    "6": (
        <div className="pb-banner b1">
            <div className="top-bar">
                <span>UIT SE104 · FiveD-SE · 2024</span>
                <span className="tag-pill">656 commits · 5 devs</span>
            </div>
            <div className="deco-star">☕</div>
            <div className="title-block">
                <span className="eyebrow">// React Native · Firebase · PayOS</span>
                <h2 className="sm">
                    COFFEE<br />SHOP OS
                </h2>
            </div>
            <div className="bottom-row">
                <p className="tagline">
                    Multi-interface management system — cashier, staff, and admin flows for orders, inventory, sales. Firebase app + Node/PayOS backend.
                </p>
                <div className="chips">
                    <span className="chip-b">RN App</span>
                    <span className="chip-b">Firebase</span>
                    <span className="chip-b">PayOS</span>
                    <span className="chip-b">Express</span>
                </div>
            </div>
        </div>
    ),
    // 8 · Online Contest Management — Gradient Headline
    "8": (
        <div className="pb-banner b2">
            <div className="row-top">
                <div className="meta-list">
                    <span className="item">ASP.NET Core 8</span>
                    <span className="item">React + MUI</span>
                    <span className="item">Oct — Dec 2024</span>
                </div>
                <div className="logo-round">OC</div>
            </div>
            <h2>
                <span className="stroke">CONTEST</span>
                <br />
                <span className="gradient-text">PLATFORM</span>
            </h2>
            <div className="row-bot">
                <p className="tagline">
                    Full-stack contest lifecycle — creation, publishing, registration, PayOS payments, Cloudinary media, SendGrid email, Firebase notifications. 3 user roles · 159 commits.
                </p>
                <span className="url-pill">MongoDB · JWT · Swagger</span>
            </div>
        </div>
    ),
    // 9 · Enigma Design Platform — Sticker Collage
    "9": (
        <div className="pb-banner b3">
            <div className="top-row">
                <div className="title-stack">
                    <span className="eyebrow">// UIT · FiveD-SE · May — Oct 2024</span>
                    <h2>
                        ENIGMA<br />DESIGN
                    </h2>
                </div>
                <div className="cluster">
                    <div className="sticker-item s1">👕 T-Shirts</div>
                    <div className="sticker-item s2">🎒 Tote Bags</div>
                    <div className="sticker-item s3">Mockup Gallery</div>
                    <div className="sticker-item s4">Marketplace</div>
                    <div className="sticker-item s5">Creator Earnings</div>
                </div>
            </div>
            <div className="bot-row">
                <p className="tagline">
                    A platform for designing and selling custom apparel — in-app design tool, mockup previews, marketplace listings, creator profit margins.
                </p>
                <div className="byline">
                    React Native · Express · PayOS
                    <br />
                    <span style={{ color: "rgba(255,255,255,0.6)", letterSpacing: ".08em" }}>
                        32 commits · 5 team
                    </span>
                </div>
            </div>
        </div>
    ),
    // 10 · Facial Expression Recognition (EmotionSense) — Split / Evolution
    "10": (
        <div className="pb-banner b6">
            <div className="half before">
                <div>
                    <span className="tag-lbl">// Research · Jun 2024</span>
                    <h2>
                        PORTRAIT<br />IN
                    </h2>
                    <p className="desc">
                        Portrait image → dlib face detection → HOG feature extraction. Classical computer-vision pipeline, no deep learning required.
                    </p>
                </div>
                <div className="stats-row">
                    <div className="stat-box"><div className="n">HOG</div><div className="l">Descriptor</div></div>
                    <div className="stat-box"><div className="n">dlib</div><div className="l">Face Detect</div></div>
                    <div className="stat-box"><div className="n">Py</div><div className="l">Flask 2.0</div></div>
                    <div className="stat-box"><div className="n">RN</div><div className="l">Expo + TS</div></div>
                </div>
                <div className="arrow-mid">→</div>
            </div>
            <div className="half after">
                <div>
                    <span className="tag-lbl">// Output · Emotion Label</span>
                    <h2>
                        SVM<br />+ RF OUT
                    </h2>
                    <p className="desc">
                        Scikit-learn SVM and Random Forest classify emotions from HOG features. Published on ResearchGate — traditional ML, reproducible, Dockerized.
                    </p>
                </div>
                <div className="stats-row">
                    <div className="stat-box"><div className="n">26</div><div className="l">Total Commits</div></div>
                    <div className="stat-box"><div className="n">2</div><div className="l">Classifiers</div></div>
                    <div className="stat-box"><div className="n">1</div><div className="l">Paper Published</div></div>
                    <div className="stat-box"><div className="n">Solo</div><div className="l">sloweyyy</div></div>
                </div>
            </div>
        </div>
    ),
};

export const hasBanner = (projectId) =>
    projectId != null && Object.prototype.hasOwnProperty.call(BANNERS, String(projectId));

const ProjectBanner = ({ projectId }) => {
    const rootRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const scaler = root.querySelector(".pb-scaler");
        if (!scaler) return;

        const applyScale = () => {
            const width = root.clientWidth;
            if (!width) return;
            const scale = width / 1600;
            scaler.style.transform = `scale(${scale})`;
        };

        applyScale();
        const ro = new ResizeObserver(applyScale);
        ro.observe(root);
        return () => ro.disconnect();
    }, [projectId]);

    const banner = BANNERS[String(projectId)];
    if (!banner) return null;

    return (
        <div className="project-banner-root" ref={rootRef}>
            <div className="pb-scaler">{banner}</div>
        </div>
    );
};

export default ProjectBanner;
