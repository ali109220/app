# Task 3 — Evidence-backed mapping table

All headings below are verbatim from the HTML saved in [raw/pages/](raw/pages/) at **2026-08-11 04:43:07 UTC**.
Nothing here is paraphrased. Nothing here is inferred from the proposal.

**Scope:** the six product pages that the live Solutions dropdown actually links to. There are six, not three —
confirmed three ways in [live-ia.md §1.2](live-ia.md).

---

## 3.1 The six live solution pages, verbatim

### 1. Core Banking
- **URL:** `https://www.tayseer.me/core-banking` (200, 0 redirects)
- **`<title>`:** `Core Banking – Tayseer Innovations`
- **`H1`:** `Core Banking`
- **`H2` (1):** `How May We Help You!`
- **`H3` (8):** `Payments` · `Remittance Solutions` · `Consumer Banking & the Evolution of Core Banking Systems` · `Security & Compliance` · `CRM & BI Systems` · `Audit & Legislation` · `Financial Management Tools` · `Funds & Treasury Tools`

> The page's only `H2` is the contact-form heading. All substantive structure sits at `H3`, so the `H3` list is
> the page's real content outline and is cited as such below.

### 2. Fahim AI
- **URL:** `https://www.tayseer.me/fahim-ai` (200, 0 redirects)
- **`<title>`:** `Fahim AI – Tayseer Innovations`
- **`H1`:** `Fahim AI`
- **`H2` (5):** `How Fahim Works` · `End-to-End Journey Management` · `Business Impact` · `Key Performance Areas` · `How May We Help You!`
- **`H3` (5):** `Customer Onboarding Capabilities` · `Voice and Chat Enabled Navigation & Task Execution` · `Intelligent Escalation with Full Context` · `The Old Way` · `The Fahim Way`

### 3. MBuke
- **URL:** `https://www.tayseer.me/mbuke` (200, 0 redirects)
- **`<title>`:** `MBuke – Tayseer Innovations`
- **`H1`:** `MBuke`
- **`H2` (5):** `Platform Overview` · **`Who Uses MBuke?`** · `The MBuke Advantage` · `Core Capabilities` · `Case Study`
- **`H3` (13):** **`Banks`** · **`Exchange Houses`** · **`Governments`** · **`Telecom`** · `Payment Gateways` · `Unified Platform` · `Modular & Scalable` · `Seamless Integration` · `Enterprise-Grade Security` · `White-Label Ready` · `User Features` · `Operator Features` · `Technical Features`

> The first five `H3`s are the children of the `Who Uses MBuke?` `H2`. **This is Tayseer's own buyer-segment
> taxonomy, already published on their own site**, and it matches the proposed segments almost exactly.

### 4. Managed Services
- **URL:** `https://www.tayseer.me/managed-services` (200, 0 redirects)
- **`<title>`:** `Managed Services – Tayseer Innovations`
- **`H1`:** `Managed Services`
- **`H2` (1):** `How May We Help You!`
- **`H3` (5):** `Managed T24 Temenos Service` · `Big Data Management` · `Managed Security Services` · `ATM & STM Management Service` · `IaaS & SaaS Systems`

### 5. Banking Systems
- **URL:** `https://www.tayseer.me/banking-systems` (200, 0 redirects)
- **`<title>`:** `Banking Systems – Tayseer Innovations`
- **`H1`:** `Banking Systems`
- **`H2` (2):** **`GRG Banking Systems for UAE Banks | Advanced Cash & ATM Solutions`** · `How May We Help You!`
- **`H3` (7):** `Banking Systems: ATMs & Cash Recyclers Explained` · `Smart Teller Machines (STMs)` · `Cash Sorting Machines` · `Self-Service Solutions` · `Bank Note & Coin Processing Modules` · `Card Processing Modules` · `Advanced Biometrics Modules`

### 6. Software Management Systems
- **URL:** `https://www.tayseer.me/software-management-systems` (200, 0 redirects)
- **`<title>`:** `Software Management Systems – Tayseer Innovations`
- **`H1`:** `Software Management Systems`
- **`H2` (1):** `How May We Help You!`
- **`H3` (7):** `Version Control Systems` · `Mobile & Software Development Tools` · `File Management` · `Integration API Management` · `Log Management` · `Authorization Tools` · `CI/CD Tools`

---

## 3.2 Current entry point → proposed buyer-first entry

Every "current" cell is a nav label and URL verified in this run. Every "proposed" cell is a recommendation and
is marked as such. Where the page's own headings do not support a segment, the row says so instead of
supplying a rationale.

| Current entry point (live) | Proposed buyer-first entry | Source |
|---|---|---|
| `Solutions` → `Core Banking`<br>`https://www.tayseer.me/core-banking` | **Banks** — `RECOMMENDED — not built`<br>**Exchange & MTO** — `RECOMMENDED — not built` · `JUDGMENT CALL — confirm with Tayseer` | Banks: `H3` `Consumer Banking & the Evolution of Core Banking Systems`, plus `H3` `Funds & Treasury Tools` and `H3` `Audit & Legislation` — bank-operations vocabulary throughout.<br>Exchange & MTO: the only support is `H3` `Remittance Solutions`, whose body reads "Offer a reliable and affordable money transfer service to cater to your global customers." That is a **bank offering remittance to its own customers**, not an exchange house or MTO as the buyer. The page names no such buyer. |
| `Solutions` → `Fahim AI`<br>`https://www.tayseer.me/fahim-ai` | **All four segments** — `RECOMMENDED — not built` · `JUDGMENT CALL — confirm with Tayseer` | **No sector appears anywhere on this page.** All five `H2`s (`How Fahim Works`, `End-to-End Journey Management`, `Business Impact`, `Key Performance Areas`, `How May We Help You!`) and all five `H3`s are capability-only. A word-count of the page body finds no instance of "telecom", "exchange", "government", "remittance" or "money transfer". Any segment assignment for Fahim AI is a decision, not a reading. |
| `Solutions` → `MBuke`<br>`https://www.tayseer.me/mbuke` | **Banks · Telecom · Exchange & MTO · Government** — `RECOMMENDED — not built` | **Strongest row in the table — the page states the taxonomy itself.** `H2` `Who Uses MBuke?` with `H3` children `Banks`, `Exchange Houses`, `Governments`, `Telecom`, `Payment Gateways`. Three of the four proposed segments appear verbatim; "Exchange & MTO" is a rename of the page's own `Exchange Houses`. **The proposal's segment names are Tayseer's own words, not ours.** Note: `Payment Gateways` is a fifth published segment the proposal does not carry — see the flag below. |
| `Solutions` → `Managed Services`<br>`https://www.tayseer.me/managed-services` | **Banks** — `RECOMMENDED — not built`<br>Telecom / Exchange & MTO / Government — `JUDGMENT CALL — confirm with Tayseer` | Banks: `H3` `Managed T24 Temenos Service` (T24 is a core banking platform) and `H3` `ATM & STM Management Service` — both name bank-specific systems. The other three `H3`s (`Big Data Management`, `Managed Security Services`, `IaaS & SaaS Systems`) are sector-neutral IT services and support no segment on their own. |
| `Solutions` → `Banking Systems`<br>`https://www.tayseer.me/banking-systems` | **Banks** — `RECOMMENDED — not built` | `H2` `GRG Banking Systems for UAE Banks \| Advanced Cash & ATM Solutions` — the buyer is named in the heading. Reinforced by every `H3`: `Smart Teller Machines (STMs)`, `Cash Sorting Machines`, `Bank Note & Coin Processing Modules`, `Card Processing Modules`. This row needs no judgment call. |
| `Solutions` → `Software Management Systems`<br>`https://www.tayseer.me/software-management-systems` | **No segment** — `JUDGMENT CALL — confirm with Tayseer` | All seven `H3`s are generic developer tooling: `Version Control Systems`, `CI/CD Tools`, `Log Management`, `Integration API Management`, `Authorization Tools`. **The page contains no sector reference of any kind.** Its buyer is an internal IT or engineering function, which is a *role*, not one of the four proposed segments. Forcing it into Banks/Telecom/Exchange/Government would be inventing a rationale; recommend it stays a product page reachable from Solutions and is not surfaced under a segment. |

---

## 3.3 Two things this table surfaces that the proposal does not

**1. `Payment Gateways` is a fifth published segment.** MBuke's own `Who Uses MBuke?` block lists five buyer
types; the proposed IA carries four and drops `Payment Gateways` without saying so. Either add it or state why
it is out of scope — a reader who opens `/mbuke` will see the mismatch.

**2. Four of the six rows are weak, and only two are strong.** Banking Systems and MBuke are grounded in the
pages' own headings. Core Banking and Managed Services are half-grounded (Banks only). **Fahim AI and Software
Management Systems have no sector signal on the page at all.** The honest framing of the proposed IA is
therefore *"two products already sell by segment on their own pages; the remaining four would need segment
positioning written for them"* — which is a stronger, more credible pitch than a table implying all six map
cleanly.
