import React, { useEffect, useRef } from "react";

const CLAUDE_CODE_INSIGHTS = (
    <div className="cci-banner">
        <section className="hero">
            <span className="eyebrow">
                <span className="bars">
                    <span />
                    <span />
                    <span />
                </span>
                CLAUDE CODE INSIGHTS
            </span>
            <h1>
                620 SESSIONS ·<br />
                ONE <span className="pink">AI-AUGMENTED</span>
                <br />
                ENGINEERING <span className="stroke">SYSTEM.</span>
            </h1>
            <p className="sub">
                A data-driven look at how Claude Code powers an elite full-spectrum engineering workflow — end to end.
            </p>

            <div className="icon-cluster">
                <div className="cc-cube">CC</div>
                <div className="ico-box aws"><span className="dot-ic">☁</span>AWS</div>
                <div className="ico-box code"><span className="dot-ic">{"</>"}</span>Code</div>
                <div className="ico-box sec"><span className="dot-ic">🛡</span>Security</div>
                <div className="ico-box deploy"><span className="dot-ic">🚀</span>Deploy</div>
                <div className="ico-box docs"><span className="dot-ic">📄</span>Docs</div>
            </div>
        </section>

        <section className="impact">
            <h3><span className="trophy">🏆</span> IMPRESSIVE IMPACT</h3>
            <div className="item">
                <div className="check">✓</div>
                <div className="txt">
                    <div className="t">END-TO-END <span className="accent">AI PLATFORM</span></div>
                    <div className="d">
                        Architected and shipped a LangGraph multi-agent platform with Next.js 15, AWS, Salesforce, RAG chatbot, analytics, and CSAI.
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="check">✓</div>
                <div className="txt">
                    <div className="t">AI-AUGMENTED <span className="accent">ENGINEERING SYSTEM</span></div>
                    <div className="d">
                        Hooks, MCP integrations, gstack skills, custom workflows, and an LLM Wiki that compounds knowledge across every project.
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="check">✓</div>
                <div className="txt">
                    <div className="t">POLYGLOT <span className="accent">MASTERY · 50+ AREAS</span></div>
                    <div className="d">
                        .NET, Go, Java, Node.js, Python, TypeScript, Solidity, YAML, Kubernetes, ML, blockchain, security audits, and more.
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="check">✓</div>
                <div className="txt">
                    <div className="t">ELITE <span className="accent">OUTPUT AT SCALE</span></div>
                    <div className="d">
                        130 commits across 620 sessions, 220 successful multi-file changes, thousands of orchestrated agent tasks.
                    </div>
                </div>
            </div>
        </section>

        <section className="metrics">
            <div className="metric">
                <div className="mlbl"><span className="ic p" />MESSAGES</div>
                <div className="big">5,940</div>
                <div className="sm">Across 620 sessions</div>
            </div>
            <div className="metric">
                <div className="mlbl"><span className="ic g" />LINES OF CODE</div>
                <div className="big two-line">
                    <span className="pl">+84,150</span> <span className="mn">−12,050</span>
                </div>
                <div className="sm">Added / Removed</div>
            </div>
            <div className="metric">
                <div className="mlbl"><span className="ic y" />FILES</div>
                <div className="big">1,880</div>
                <div className="sm">Modified</div>
            </div>
            <div className="metric">
                <div className="mlbl"><span className="ic v" />DAYS</div>
                <div className="big">30</div>
                <div className="sm">2026-03-09 → 04-08</div>
            </div>
            <div className="metric">
                <div className="mlbl"><span className="ic r" />MSGS / DAY</div>
                <div className="big">198</div>
                <div className="sm">Average</div>
            </div>
        </section>

        <section className="lower-left">
            <div className="usage">
                <h4><span className="h-ic" />HOW YOU USE CLAUDE CODE</h4>
                <div className="row">
                    <div className="u-ic" style={{ background: "var(--bb-pink)", fontSize: "14px" }}>🪝</div>
                    <div>
                        <div className="rt">POST-EDIT HOOKS</div>
                        <div className="rd">Automatic quality gates after every edit.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="u-ic" style={{ background: "var(--bb-green)", fontSize: "14px" }}>🔌</div>
                    <div>
                        <div className="rt">MCP INTEGRATIONS</div>
                        <div className="rd">Connected to Jira, Confluence, Allida &amp; more.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="u-ic" style={{ background: "var(--bb-yellow)", fontSize: "14px" }}>🧰</div>
                    <div>
                        <div className="rt">GSTACK SKILLS</div>
                        <div className="rd">Structured workflows for QA, security, shipping.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="u-ic" style={{ background: "var(--bb-purple)", fontSize: "14px" }}>📚</div>
                    <div>
                        <div className="rt">LLM WIKI · KARPATHY-INSPIRED</div>
                        <div className="rd">Persistent knowledge base across projects.</div>
                    </div>
                </div>
            </div>
            <div className="chart">
                <h4><span className="h-ic" />USER RESPONSE TIME</h4>
                <div className="bars-list">
                    <div className="bar-row"><span className="bl">2–10s</span><span className="btrack"><span className="bfill" style={{ width: "28%" }} /></span><span className="bn">41</span></div>
                    <div className="bar-row"><span className="bl">10–30s</span><span className="btrack"><span className="bfill" style={{ width: "64%" }} /></span><span className="bn">93</span></div>
                    <div className="bar-row"><span className="bl">30s–1m</span><span className="btrack"><span className="bfill" style={{ width: "59%" }} /></span><span className="bn">86</span></div>
                    <div className="bar-row"><span className="bl">1–2m</span><span className="btrack"><span className="bfill" style={{ width: "43%" }} /></span><span className="bn">62</span></div>
                    <div className="bar-row"><span className="bl">2–5m</span><span className="btrack"><span className="bfill" style={{ width: "32%" }} /></span><span className="bn">46</span></div>
                    <div className="bar-row"><span className="bl">5–15m</span><span className="btrack"><span className="bfill" style={{ width: "18%" }} /></span><span className="bn">26</span></div>
                    <div className="bar-row"><span className="bl">&gt;15m</span><span className="btrack"><span className="bfill" style={{ width: "10%" }} /></span><span className="bn">15</span></div>
                </div>
            </div>
        </section>

        <section className="lower-right" style={{ height: "276px" }}>
            <div className="header-row">
                <h4><span className="warn-ic">⚠</span>WHERE THINGS GO WRONG</h4>
            </div>
            <div className="twocol">
                <div className="friction">
                    <h5>PRIMARY FRICTION TYPES</h5>
                    <div className="f-row"><span className="fl">Wrong Approach</span><span className="fn">37</span></div>
                    <div className="f-row"><span className="fl">Buggy Code</span><span className="fn">28</span></div>
                    <div className="f-row"><span className="fl">Misunderstood Requests</span><span className="fn">19</span></div>
                    <div className="f-row"><span className="fl">Excessive Changes</span><span className="fn">6</span></div>
                    <div className="f-row"><span className="fl">User Rejected Actions</span><span className="fn">3</span></div>
                    <div className="f-row"><span className="fl">Environment Issues</span><span className="fn">2</span></div>
                </div>
                <div className="sat">
                    <h5>INFERRED SATISFACTION · MODEL-ESTIMATED</h5>
                    <div className="f-row low"><span className="fl">Frustrated</span><span className="fn">8</span></div>
                    <div className="f-row low"><span className="fl">Dissatisfied</span><span className="fn">32</span></div>
                    <div className="f-row"><span className="fl">Likely Satisfied</span><span className="fn">400</span></div>
                    <div className="f-row"><span className="fl">Satisfied</span><span className="fn">640</span></div>
                </div>
            </div>
            <div className="insight-pill">
                <span className="bulb">💡</span>
                <span>
                    <strong>Context is clear</strong> = Claude excels. Time sinks: <strong>wrong initial approach</strong> &amp; <strong>scope drift</strong>.
                </span>
            </div>
        </section>

        <section className="mid-callout" style={{ height: "84px" }}>
            <div className="cell">
                <div className="star">★</div>
                <div>
                    <div className="lbl">BOTTOM LINE</div>
                    <div className="body">
                        You operate Claude Code as a <span className="hl">force multiplier</span> — not an assistant.
                    </div>
                </div>
            </div>
            <div className="cell">
                <div className="star" style={{ background: "var(--bb-pink)", borderColor: "var(--bb-pink)" }}>→</div>
                <div>
                    <div className="lbl">NEXT HORIZON</div>
                    <div className="body">
                        Autonomous test-driven workflows, self-healing bug loops, end-to-end pipeline orchestration.
                    </div>
                </div>
            </div>
            <div className="cell final">
                <div className="body">
                    Elite Engineer. <em>Elite System.</em>
                    <br />
                    Elite Results. <em>Built different.</em>
                </div>
            </div>
        </section>
    </div>
);

const BANNERS = {
    "9c25e36f-0811-4d6d-803c-0fb3818d75f0": CLAUDE_CODE_INSIGHTS,
};

export const hasBlogBanner = (slug) =>
    slug != null && Object.prototype.hasOwnProperty.call(BANNERS, String(slug));

const BlogBanner = ({ slug }) => {
    const rootRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const scaler = root.querySelector(".bb-scaler");
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
    }, [slug]);

    const banner = BANNERS[String(slug)];
    if (!banner) return null;

    return (
        <div className="blog-banner-root" ref={rootRef}>
            <div className="bb-scaler">{banner}</div>
        </div>
    );
};

export default BlogBanner;
