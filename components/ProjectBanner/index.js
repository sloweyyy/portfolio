import React, { useEffect, useRef } from "react";

const BANNERS = {
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
