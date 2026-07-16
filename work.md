---
layout: default
tags: work
permalink: /work/
---

<style>
  :root {
    --terminal-bg: #101510;
    --terminal-panel: #151d15;
    --terminal-text: #c7e8c7;
    --terminal-bright: #efffef;
    --terminal-muted: #8faf8f;
    --terminal-accent: #73d973;
    --terminal-line: #385238;
    --terminal-link: #a7e8a7;
  }

  body {
    background: var(--terminal-bg);
  }

  .resume {
    box-sizing: border-box;
    width: min(900px, calc(100% - 2rem));
    margin: 2rem auto;
    padding: 2rem 2.25rem;
    color: var(--terminal-text);
    background: var(--terminal-panel);
    border: 1px solid var(--terminal-line);
    font-family:
      "Courier New",
      Courier,
      "Lucida Console",
      Monaco,
      monospace;
    font-size: 15px;
    line-height: 1.55;
  }

  .resume *,
  .resume *::before,
  .resume *::after {
    box-sizing: inherit;
  }

  .resume a {
    color: var(--terminal-link);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .resume-header {
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px dashed var(--terminal-line);
  }

  .resume-header::before {
    display: block;
    margin-bottom: 0.75rem;
    color: var(--terminal-muted);
    content: "$ cat resume.txt";
  }

  .resume-header h1 {
    margin: 0;
    color: var(--terminal-bright);
    font-size: clamp(1.9rem, 6vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .headline {
    margin: 0.75rem 0 0;
    color: var(--terminal-accent);
    font-weight: 700;
  }

  .resume-section {
    margin-bottom: 2.5rem;
  }

  .resume-section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    margin: 0 0 1rem;
    color: var(--terminal-bright);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .section-title::before {
    color: var(--terminal-accent);
    content: "## ";
  }

  .summary {
    margin: 0;
  }

  .job {
    margin-bottom: 2rem;
  }

  .job:last-child {
    margin-bottom: 0;
  }

  .job-header {
    margin-bottom: 0.65rem;
  }

  .company-line,
  .role-line {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .company {
    margin: 0;
    color: var(--terminal-bright);
    font-size: 1rem;
    font-weight: 700;
  }

  .company::before {
    color: var(--terminal-accent);
    content: "> ";
  }

  .dates {
    color: var(--terminal-muted);
    white-space: nowrap;
  }

  .role {
    margin-top: 0.35rem;
    color: var(--terminal-accent);
    font-weight: 700;
  }

  .role-date {
    color: var(--terminal-muted);
    font-weight: 400;
    white-space: nowrap;
  }

  .accomplishments {
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
  }

  .accomplishments li {
    position: relative;
    margin: 0.45rem 0;
    padding-left: 1.5rem;
  }

  .accomplishments li::before {
    position: absolute;
    left: 0;
    color: var(--terminal-accent);
    content: "*";
  }

  .metric {
    color: var(--terminal-bright);
    font-weight: 700;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: 12rem 1fr;
    gap: 0.65rem 1.25rem;
  }

  .skills-grid dt {
    color: var(--terminal-accent);
    font-weight: 700;
  }

  .skills-grid dd {
    margin: 0;
  }

  .plain-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .plain-list li {
    margin-bottom: 0.8rem;
  }

  .plain-list li:last-child {
    margin-bottom: 0;
  }

  .plain-list strong {
    color: var(--terminal-bright);
  }

  .plain-list span {
    color: var(--terminal-muted);
  }

  .resume-footer {
    margin-top: 2.5rem;
    padding-top: 1rem;
    color: var(--terminal-muted);
    border-top: 1px dashed var(--terminal-line);
  }

  .resume-footer::after {
    color: var(--terminal-accent);
    content: " _";
    animation: terminal-cursor 1s steps(1) infinite;
  }

  @keyframes terminal-cursor {
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .resume-footer::after {
      animation: none;
    }
  }

  @media (max-width: 650px) {
    .resume {
      width: 100%;
      margin: 0;
      padding: 1.4rem 1rem;
      border-right: 0;
      border-left: 0;
      font-size: 14px;
    }

    .company-line,
    .role-line {
      display: block;
    }

    .dates,
    .role-date {
      display: block;
      margin-top: 0.15rem;
      white-space: normal;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 0.15rem;
    }

    .skills-grid dd {
      margin-bottom: 0.8rem;
    }
  }

  @media print {
    @page {
      margin: 0.5in;
    }

    body {
      background: #ffffff !important;
    }

    .site-header,
    .site-footer,
    .page-header,
    nav {
      display: none !important;
    }

    .resume {
      width: auto;
      margin: 0;
      padding: 0;
      color: #000000;
      background: #ffffff;
      border: 0;
      font-size: 6pt;
    }

    .resume-header h1,
    .section-title,
    .company,
    .plain-list strong,
    .metric {
      color: #000000;
    }

    .resume-header::before,
    .headline,
    .section-title::before,
    .company::before,
    .role,
    .accomplishments li::before,
    .skills-grid dt,
    .resume-footer::after {
      color: #000000;
    }

    .dates,
    .role-date,
    .plain-list span,
    .resume-footer {
      color: #444444;
    }

    .resume-header,
    .resume-footer {
      border-color: #777777;
    }

    .job {
      break-inside: avoid;
    }

    .resume-footer::after {
      animation: none;
    }
  }
</style>

<article class="resume">
  <header class="resume-header">
    <h1>Sean Jain Ellis</h1>
    <p class="headline">
      Engineering Leadership |
      SRE |
      Development |
      Infrastructure
    </p>
  </header>

  <section class="resume-section" aria-labelledby="summary-heading">
    <h2 class="section-title" id="summary-heading">Summary</h2>
    <p class="summary">
      Thirty years of experience architecting resilient systems, scaling and
      optimizing infrastructure and leading engineering teams. Proven track
      record of reducing operational costs, modernizing platforms and driving
      critical software transformations. Equally effective as an engineering
      individual contributor and leader.
    </p>
  </section>

  <section class="resume-section" aria-labelledby="experience-heading">
    <h2 class="section-title" id="experience-heading">Experience</h2>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">Upstart</h3>
          <span class="dates">2023-2025</span>
        </div>
        <div class="role-line">
          <span class="role">Principal Site Reliability Engineer</span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Reduced time-to-detect by <span class="metric">25%</span> by
          automating golden-signals alerting based on historical trends.
        </li>
        <li>
          Founded a postmortem bar raisers guild to perform retrospectives and
          enforce accountability.
        </li>
        <li>
          Standardized MADR and Conventional Commits to enhance change
          documentation.
        </li>
        <li>
          Standardized weekly operations reporting by developing Go and Python
          libraries and GitHub Actions that summarized incidents and presented
          performance metrics.
        </li>
      </ul>
    </article>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">Twitter</h3>
          <span class="dates">2018-2023</span>
        </div>

        <div class="role-line">
          <span class="role">
            Staff Site Reliability Engineer / Storage Tech Lead
          </span>
          <span class="role-date">2020-2023</span>
        </div>

        <div class="role-line">
          <span class="role">
            Engineering Manager / Real-Time Storage SRE Teams
          </span>
          <span class="role-date">2018-2020</span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Led a system-resource-management initiative with
          <span class="metric">$200M+</span> in projected five-year CapEx
          savings.
        </li>
        <li>
          Unified C and C++ caching products into a single Rust service with
          integrated SRE tooling.
        </li>
        <li>
          Drove hardware homogenization that avoided system procurement during
          <span class="metric">15% data growth</span>.
        </li>
        <li>
          Directed a Python 3 migration ahead of Python 2 end-of-life and moved
          <span class="metric">300 MB</span> of legacy code into a monorepo.
        </li>
        <li>
          Achieved <span class="metric">85%</span> at-rest and
          <span class="metric">100%</span> in-transit encryption adoption,
          including a <span class="metric">25%</span> mTLS implementation.
        </li>
        <li>
          Managed multiple distributed and remote SRE teams and migrated
          platforms from Mesos to Kubernetes.
        </li>
      </ul>
    </article>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">Box</h3>
          <span class="dates">2017-2018</span>
        </div>
        <div class="role-line">
          <span class="role">
            Staff Site Reliability Engineer / Edge Performance
          </span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Designed Voltron, a distributed firewall for Linux hosts,
          Kubernetes, OpenStack and network equipment.
        </li>
        <li>
          Migrated edge proxies from Apache Traffic Server and HAProxy to
          NGINX, using ExaBGP and anycast for service discovery, traffic
          steering and resiliency.
        </li>
      </ul>
    </article>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">DreamWorks Animation</h3>
          <span class="dates">2007-2017</span>
        </div>

        <div class="role-line">
          <span class="role">
            Engineering Manager / Nova Rendering SaaS Platform
          </span>
          <span class="role-date">2015-2017</span>
        </div>

        <div class="role-line">
          <span class="role">Principal Engineer</span>
          <span class="role-date">2011-2015</span>
        </div>

        <div class="role-line">
          <span class="role">
            Engineering Manager / Bengaluru Dedicated Unit
          </span>
          <span class="role-date">2008-2011</span>
        </div>

        <div class="role-line">
          <span class="role">Senior Network Engineer</span>
          <span class="role-date">2007-2008</span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Managed an eight-engineer platform group for Nova, a cloud-based,
          live 3D-rendering SaaS platform.
        </li>
        <li>
          Designed the Managed Tiered Proxy Architecture for a rendering
          pipeline migration from NFS to HTTP.
        </li>
        <li>
          Used Go and TCL to synchronize software deployments and
          infrastructure configuration updates.
        </li>
        <li>
          Developed Python programs to automate load-balancer and downstream
          service observability.
        </li>
        <li>
          Relocated to India to oversee a datacenter build and hire systems,
          networking and tooling teams.
        </li>
        <li>
          Conceived a cross-studio proxy architecture first implemented in
          India and later adopted globally.
        </li>
        <li>
          Implemented a BGP/OpenVPN solution for
          <span class="metric">6,000 hosts</span> and designed a TRILL
          datacenter for STP-free operations.
        </li>
      </ul>
    </article>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">MobiTV</h3>
          <span class="dates">2005-2007</span>
        </div>
        <div class="role-line">
          <span class="role">Engineering Manager</span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Expanded systems and networking teams from
          <span class="metric">3 to 20</span> and established a global NOC.
        </li>
        <li>
          Scaled platforms supporting Sprint TV and IPTV launches during
          extreme channel and client growth.
        </li>
        <li>
          Migrated operations from Rackspace to distributed colocation and
          secured content ingestion.
        </li>
      </ul>
    </article>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">First Victoria National Bank</h3>
          <span class="dates">2000-2005</span>
        </div>
        <div class="role-line">
          <span class="role">System Architect</span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Established Ethernet-based IP and IPX networking standards for
          systems and telecommunications.
        </li>
        <li>
          Developed custom applications and retired legacy UNIX systems,
          saving more than <span class="metric">$400K annually</span>.
        </li>
        <li>
          Implemented Tarantella and telecommunications enhancements to
          improve remote application access.
        </li>
      </ul>
    </article>

    <article class="job">
      <header class="job-header">
        <div class="company-line">
          <h3 class="company">Information Alliance</h3>
          <span class="dates">1992-2000</span>
        </div>

        <div class="role-line">
          <span class="role">Software Engineering Manager</span>
          <span class="role-date">1995-2000</span>
        </div>

        <div class="role-line">
          <span class="role">Software Developer</span>
          <span class="role-date">1992-1995</span>
        </div>
      </header>

      <ul class="accomplishments">
        <li>
          Built a team providing Internet connectivity and web-based
          application development services.
        </li>
        <li>
          Served as a key contributor to FirstPage, a UNIX-based distributed
          document-processing system.
        </li>
        <li>
          Developed UNIX software for the Criminal Law Attorney Support System,
          used by <span class="metric">25 Texas counties</span>.
        </li>
      </ul>
    </article>
  </section>

  <section class="resume-section" aria-labelledby="skills-heading">
    <h2 class="section-title" id="skills-heading">Relevant Skills</h2>

    <dl class="skills-grid">
      <dt>Development</dt>
      <dd>C, Go, Python, Rust, TCL, CI/CD, Git, GitHub Actions</dd>

      <dt>Systems</dt>
      <dd>
        Linux, UNIX, Kubernetes, Mesos, OpenStack, Project Calico, Puppet,
        Chef, Terraform
      </dd>

      <dt>Networking</dt>
      <dd>
        L2-L7, TRILL, STP, BGP, IS-IS, OSPF, TCP/IP, IPsec, HTTP
      </dd>

      <dt>Education</dt>
      <dd>Texas A&amp;M University, Physics</dd>
    </dl>
  </section>

  <section class="resume-section" aria-labelledby="certifications-heading">
    <h2 class="section-title" id="certifications-heading">
      Past Certifications
    </h2>

    <ul class="plain-list">
      <li>
        <strong>Novell:</strong>
        NetWare Administrator v3; NetWare Engineer v3, v4 and v5;
        Compaq Intel/NetWare Specialist (ASE)
      </li>
      <li>
        <strong>Red Hat:</strong>
        Linux 7.2 Engineer; Enterprise Linux Engineer
      </li>
      <li>
        <strong>Cisco:</strong>
        Cisco Certified Network Associate (CCNA);
        Cisco Certified Network Professional (CCNP)
      </li>
    </ul>
  </section>

  <section class="resume-section" aria-labelledby="other-heading">
    <h2 class="section-title" id="other-heading">
      Leadership, Service and Recognition
    </h2>

    <ul class="plain-list">
      <li>
        <strong>Kona House of Palms and Sunrise Hale</strong><br>
        <span>Owner, short-term vacation rentals | 2018-Present</span>
      </li>

      <li>
        <strong>Puu Lani Ranch HOA</strong><br>
        <span>Board Member and Website Administrator | 2021-2023</span>
      </li>

      <li>
        <strong>Twitter University</strong><br>
        <span>Instructor, Go | 2019-2022</span>
      </li>

      <li>
        <strong>Twitter University</strong><br>
        <span>
          Instructor, Python and the Twitter Build System | 2018-2022
        </span>
      </li>

      <li>
        <strong>San Francisco Site Reliability Engineering Meetup</strong><br>
        <span>Coordinator | 2018-2020</span>
      </li>

      <li>
        <strong>DreamWorks</strong><br>
        <span>
          Technical Achievement Award, Managed Tiered Proxy Architecture |
          2014
        </span>
      </li>

      <li>
        <strong>DreamWorks</strong><br>
        <span>
          Technical Achievement Award, Production Asset Manager | 2014
        </span>
      </li>

      <li>
        <strong>Home of Hope</strong><br>
        <span>Technology Coordinator | 2012-2018</span>
      </li>

      <li>
        <strong>Large Scale Production Engineers</strong><br>
        <span>
          Presenter, "Anycast Service Redundancy and Traffic Balancing" |
          2012
        </span>
      </li>

      <li>
        <strong>Aloe Software Group</strong><br>
        <span>
          Co-Founder, Texas public-school student-management SaaS | 2000
        </span>
      </li>

      <li>
        <strong>VALUE</strong><br>
        <span>Presenter, "The Slackware RPM" | 1998</span>
      </li>
    </ul>
  </section>

  <footer class="resume-footer">
    END OF LINE
  </footer>
</article>
