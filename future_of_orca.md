# ORCA is Changing — Here's Why and What It Means for You

**Vermont Research Open Source Program Office (VERSO) · University of Vermont**

---

## The honest version of why we're doing this

When I started ORCA in 2023, AI was just starting to get kicked off and was not possible of much, but in the years since is has shown to be caple of disruption in the spaces that we, as a programming and data intership, spend most of our time. For those who are graduating, it is clear that the entry-level software job market is getting worse. As someone who went to college for fine arts and spent years broke because it did not prepare me for the work, it is the last thing I want to happen with this program.

In reality there's not less software being built today but more because AI tools are compressing how much of that work requires a human at a keyboard. That's not a crisis for experienced engineers. It is a real problem for students trying to build a career on "I can write Python" or "I know React." Those skills still matter, but they're no longer sufficient to differentiate you.

ORCA's job is to make sure the time you spend here actually prepares you for what the market is going to look like when you graduate — not what it looked like five years ago. That means changing what we build, how we build it, and what we expect from you.

It is also true that in our conversation when I have asked the preference to not use AI is strong, that you would rather focus on core learning of code. This too has a place in the world, and we need to expand how we approach our program for what is happening

I created this document explains the potential change.

---

## What ORCA actually trains

The old framing: ORCA is an internship where students build software for Vermont partners.

The new framing: **ORCA trains people who can identify public-sector problems, lead in designing solutions, scope products, build them using AI-augmented workflows, ship them as open-source public goods, and support their adoption.**

The code or data is still the artifact. The capability is everything around it.

What that means in practice: a student who leaves ORCA should be able to walk into a room, figure out what's actually broken (not just what was requested), propose a scoped solution that fits the constraints of capacity and budget, build it in collaboration with AI tools while maintaining ownership of every decision, and hand it off in a form that survives their departure. That's a different profile than "junior developer who knows React." It's closer to a technical product manager who can also ship — someone who leads from problem to production, not someone who executes a ticket. We want you to know how to build enough trust to ask the uncomfortable questions, synthesizing messy stakeholder input into a coherent product direction, making architectural decisions with incomplete information. This is leadership work, it happens to involve code.

---

## The four things you'll do on every project

### 1. Problem discovery and stakeholder translation

Before anyone writes a line of code, you will spend at least two weeks doing intake work with the partner. That means interviewing agency staff about their actual workflows. Observing how people use (or don't use) existing tools. Mapping the gap between what someone asks for and what they actually need — those are almost never the same thing.

This is the work AI cannot do. An LLM can generate code from a spec. It cannot sit across from a VCGI analyst and figure out that the real problem isn't the dashboard they're requesting — it's that three departments are maintaining duplicate datasets and nobody owns the reconciliation process. That diagnostic work requires you to be present, curious, and willing to ask questions that feel obvious.

This is operationally hard, our partners have very limited capabilities for us to take their time, and it puts additional strain on how many projects we can take on. I am not sure how to solve this best and I am open to suggestions

**You will produce:** stakeholder interview notes, workflow maps, a problem framing document, and a requirements summary that the partner reviews and signs off on before you move forward.

### 2. Architecture and design decisions

Once the problem is defined, you'll make the structural choices about how to solve it. Not write the code yet — decide what the data model is, where the integration points are, what the constraints are (licensing, security, staff capacity, existing infrastructure), and what the simplest viable approach looks like versus what would scale.

AI tools are good at generating code inside a well-defined architecture. They're not good at deciding what the architecture should be. A student who can look at a Vermont agency's existing ESRI environment and design an integration approach that respects their licensing constraints and data governance policies is doing judgment work that doesn't automate.

This is also an opportunity to learn the technical, never used API's, figure it out. Set up a SQL database locally. Understand how it works.

**You will produce:** a technical design document, at least one architecture decision record (ADR), and a written tradeoff analysis before implementation starts. You will defend your choices in a team review.

### 3. AI-augmented implementation

This is where the coding happens — but it's repositioned. The activity isn't "write code." It's **use AI tools to build software while maintaining quality, security, and maintainability.**

You are expected to use AI coding tools. Claude Code, Copilot, Cursor — you should be proficient with at least two of these and know when each is appropriate. The goal is not writing a bunch of prompts but evaluating what comes back and getting better at knowing how a solution needs to be changed to meet the projects need. Debugging AI-generated code that fails in ways you didn't write. Understanding why a particular piece of AI output shouldn't go into production even if it runs.

There are also contexts where you should not use AI-generated code: sensitive data handling, security-critical paths, anything where explainability is a legal or ethical requirement. 

This is new, and likely not something you are taught in classes. What I want the AI tools to do is to make it possible to tackle anything you imagine, to not be limited by only what you know but use the process of exploration to learn. 

This is also a great time to build tools we can reuse. Create an AI QA model, add a framework for how to hardcode away common mistakes, and rapidly test what you make.

**You will be expected to:** explain every significant piece of code in review — whether you wrote it or AI did. If you can't explain it, it doesn't ship.

### 4. Shipping, adoption, and iteration

Most student projects die at the demo. They build something, present it, and it rots on a GitHub repo nobody visits.

ORCA projects are expected to reach actual users. That means deployment to real environments (not just your laptop), documentation written for non-technical users, user training if the partner needs it, and an iteration cycle based on real feedback.

The gap between "working on my laptop" and "adopted by an agency" is where almost all the hard engineering problems actually live. Deployment, error handling in production, onboarding someone who doesn't know what a terminal is, triaging feedback from people who can't describe what broke — this is the work that separates a project from a product. You need to have done it.

**You will own** the full project lifecycle, not just the build phase. Projects are not complete until they're in use.

---

## What changes operationally

**Project kickoffs take longer.** Two weeks of discovery before any implementation is a real change. It will feel slow. It is not slow — skipping it is what makes projects fail.

**Documentation is not optional.** Every project will maintain a living design document, ADRs for significant decisions, and user-facing documentation. These are not deliverables you produce at the end. They are part of the work.

**Code review is different.** Reviews will focus on decisions, not just correctness. Expect to explain why you made the architectural choices you did, why you did or didn't use AI-generated code for a given piece, and what the tradeoffs were.

**Projects run longer.** A project that reaches adoption in a semester is worth more than a project that produces a polished demo in six weeks. We will structure project timelines accordingly, including multi-semester continuity for projects that need it.

**You will present to partners, not just to us.** Partners are stakeholders in the work. You will present problem framing, design decisions, and progress directly to them — not just in a final showcase.

---

## Why open source matters here

Open source is the right model for ORCA for specific strategic reasons.

**Your portfolio can't be faked.** When you say you can architect systems and work with stakeholders, an employer can look at the git history and see it. They can read your design documents, see your PR reviews, trace your decision-making. A closed-source internship produces a resume bullet. An open-source internship with real users produces evidence — and in a market where AI can generate impressive-looking portfolio projects in minutes, verifiable contribution history to real projects matters.

**It forces the skills that resist automation.** Open-source development requires writing code other people can read, extend, and maintain. It requires documentation. It requires thinking about licensing, governance, and public accountability. It requires working in public where your decisions are visible. These are exactly the skills that are hard to automate.

**The work has public value.** When VERSO builds tools for Vermont agencies as open source, those tools become public goods. They don't disappear behind a vendor's paywall if funding changes. Other states can adopt them. This matters for how we justify the program — every dollar invested produces infrastructure that belongs to the public — and it matters for how you can describe the work you did.


---

## What this means for you

If you came to do work that matters and build skills that hold up in a market that's changing fast, this is a better program than it was before.

The students who will get the most out of this are the ones who engage seriously with the discovery work, who can explain their decisions, who care whether the thing they built actually gets used. Those are the people the market is going to want — not because they're the best at writing code, but because they can do the work around the code that AI can't.

That's what we're building toward.

