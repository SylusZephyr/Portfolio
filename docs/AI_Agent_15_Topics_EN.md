# University Student AI Innovation & Entrepreneurship Team — Guidance Group
## Topic Assignment Brief

Guidance Group [2026] No. 2

# AI Agent Topic Assignment Brief (15 Options)

*— Education category: 11 topics (T01–T09, T11–T12) · Non-education category: 4 topics (T10, T13–T15) · Each group claims 1 topic —*

## I. Instructions for Use

This brief is for use by 10 project groups. Each group should read this section in full before choosing a topic.

**(1)** This brief contains 15 topics in total: 11 educational (T01–T09, T11–T12) and 4 non-educational entrepreneurship scenarios (T10, T13–T15). Each group submits 3 preferred topics in priority order; the guidance group coordinates the allocation to ensure no two groups get the same topic.

**(2)** All topics were screened against three criteria: (i) students themselves will genuinely use it weekly or even daily, making it easy to collect the real usage data needed for the competition's "implementation significance" scoring; (ii) strong visual demo value, suitable for the final-round video; (iii) built mainly on an agent platform, so a runnable product can be produced within two weeks. Every topic is annotated with its high-frequency usage point and pilot source.

**(3)** The technical route is standardized on agent platforms (Coze, Wenxin Agent, etc.), combined with knowledge bases and automated workflows to build a runnable, demonstrable product without writing large amounts of code. All topics follow the same milestones: topic approval → solution design → development → testing & refinement → acceptance & submission. All process deliverables are submitted to the Gitee repository per the *Team Management Rules*; project version numbers start from V0.00.001.

## II. Topic Overview

The table below summarizes the category, difficulty, usage frequency and pilot source of all 15 topics for quick comparison.

| No. | Topic | Category | Difficulty | High-frequency usage point | Pilot source |
|---|---|---|---|---|---|
| T01 | AI Freshman Know-It-All | Education | ★☆☆ | Enrollment season — whole academic year | All first-year students |
| T02 | AI Class Schedule Companion | Education | ★★☆ | Daily | Team members themselves |
| T03 | AI CET-4/6 Exam Prep Coach | Education | ★★☆ | Daily check-in | Students preparing for the exam |
| T04 | AI Finals Emergency Kit | Education | ★★☆ | Spikes during exam week | Courses of the current year group |
| T05 | AI Lab Report & Literature Reading Assistant | Education | ★★☆ | Weekly | Science & engineering courses |
| T06 | AI Class Committee Assistant | Education | ★☆☆ | Weekly | The class committee itself |
| T07 | AI Club Event Planning Assistant | Education | ★☆☆ | Per event cycle | Clubs at our university |
| T08 | AI Academic Stress Relief "Tree Hollow" | Education | ★★☆ | Any time | Volunteer students |
| T09 | AI Résumé Polisher & Mock Interviewer | Education | ★★☆ | Job-hunting season + daily practice | 2nd/3rd-year students |
| T10 | AI Campus Three-Meals Nutrition Manager | Non-education | ★★☆ | Three meals a day | Canteen stalls + students |
| T11 | AI Pitch Rehearsal Coach | Education | ★☆☆ | Competition prep period | The team's own use |
| T12 | AI Classroom Learning-Status Assistant | Education | ★★☆ | Every class | Cooperating course instructor |
| T13 | AI Campus Second-hand Goods Assistant | Non-education | ★★☆ | Start of term / graduation season + daily | Campus second-hand groups |
| T14 | AI Campus Good-Products Selection Assistant | Non-education | ★★☆ | Weekly | Campus community micro-shops |
| T15 | AI Hometown Culture & Tourism Promotion Assistant | Non-education | ★☆☆ | Holidays + daily operation | Hometown attractions / merchants |

## III. Topic Briefs

Each topic is specified by six elements — background & scenario, project goal, feature list, implementation path, acceptance criteria, and OPC characteristics — so groups can assess workload and fit with their interests.

### T01 AI Freshman Know-It-All

**Background & scenario:** Administrative information about enrollment, course selection, scholarship/grant applications, club registration etc. is scattered across many different notices; asking senior students is inefficient and the answers are fragmentary. This product is a "campus know-it-all" Q&A agent — an essential tool for all freshmen at the start of term.

**Project goal:** Target users are all enrolled students (first-years especially). Core problem: give an accurate answer and processing guidance for common campus administrative questions within 30 seconds.

**Feature list:**
1. Campus-affairs knowledge base Q&A (categorized: academic affairs, logistics, finance, clubs, etc.);
2. Procedure guidance (steps, required materials, location/entry point);
3. Hand-off-to-human prompt and question logging when it cannot answer;
4. Frequent-question statistics (so admins can extend the knowledge base).

**Implementation path:** Systematically organize the university's public notice documents into a structured knowledge base (uploaded in category folders); create a Q&A Bot and configure answer standards (cite source and validity date); configure fallback scripts and a question-logging form; publish to a web page / mini-program for trial operation.

**Acceptance criteria:**
1. Knowledge base covers at least 5 categories of campus affairs and 50+ entries;
2. 30 real preset test questions, answer accuracy above 80%;
3. Every answer cites its source; correct hand-off to a human when unanswerable;
4. At least 30 students complete a trial, with real Q&A records logged.

**OPC characteristics:** The knowledge base can be sustainably operated and updated; the product has standardized replication capability for roll-out across the whole university (matching the competition's "promotability" criterion).

### T02 AI Class Schedule Companion

**Background & scenario:** First-year students switch constantly between their timetable, assignment deadlines and course-selection changes; relying on memory means things get missed. This product is a daily-use study-schedule agent — the highest usage frequency of all topics.

**Project goal:** Target users are 1st/2nd-year students. Core problem: one daily open tells you "what classes today, what assignments are due, what's coming up".

**Feature list:**
1. Timetable import and daily class-reminder Q&A;
2. Assignment and deadline logging, with approaching-deadline alerts;
3. Course-selection advice dialogue (combined with the curriculum-plan knowledge base);
4. Daily one-line study-tip push copy generation.

**Implementation path:** Create a scheduling Bot; upload the university calendar, course-selection rules and curriculum-plan key points to the knowledge base; use a workflow to implement the chain "timetable import → daily digest generation → deadline alert"; publish to web/mini-program; all team members use it for real.

**Acceptance criteria:**
1. Import of the real timetables of all 7 team members plus daily digest generation;
2. Deadline alerts correctly triggered within 48 hours before the due time;
3. Continuous trial use for at least 4 weeks, with daily usage records retained (core "implementation significance" data);
4. Course-selection Q&A accurately covers 8 of 10 preset questions on the curriculum plan.

**OPC characteristics:** Pilot inside the group, results the same day; low data-accumulation cost — a textbook sample of "fast validation, continuous iteration".

### T03 AI CET-4/6 Exam Prep Coach

**Background & scenario:** CET-4/6 is the exam with the highest participation among 1st/2nd-year students; memorizing vocabulary, drilling past papers and listening practice run through the whole semester. This product is an exam-prep coaching agent; check-ins and score improvement are naturally quantifiable.

**Project goal:** Target users are CET-4/6 candidates. Core problem: get a personalized 20-minute daily check-in task, wrong-answer explanations and mock-exam feedback.

**Feature list:**
1. Daily vocabulary task generation and check-in logging;
2. Explanation of wrong answers after photographing/pasting them;
3. Writing and translation correction (suggestions by scoring dimension);
4. Stage mock-exam report (weakness analysis, next-stage plan).

**Implementation path:** Create an exam-prep Bot; load the CET-4/6 syllabus vocabulary list, high-frequency sentence patterns and writing templates into the knowledge base; implement the chain "task dispatch → check-in logging → correction & explanation → weekly report" via workflow; publish to web/mini-program and organize a candidate check-in group for trial operation.

**Acceptance criteria:**
1. Supports a full 4-week check-in cycle, with real check-in data from 10+ students outside the group retained;
2. Wrong-answer explanations cover 5 cases each for vocabulary, reading and listening question types;
3. Writing correction outputs concrete revision suggestions along at least 3 dimensions;
4. Each trial user has a before/after comparison record from two mock exams.

**OPC characteristics:** Check-in data is an immediately quantified result, directly usable in the application materials; the vocabulary base rolls over by exam session.

### T04 AI Finals Emergency Kit

**Background & scenario:** During exam week the biggest pain is "dozens of slide decks, can't find the key points". This product is a revision-material generation agent — explosive usage during exam week, with a visually intuitive demo.

**Project goal:** Target users are students preparing for finals. Core problem: upload lecture slides and quickly get a key-point outline, exam-point prediction and practice questions.

**Feature list:**
1. Slide/PDF content extraction and key-point outline generation;
2. Predicted exam-point checklist (categorized by question type);
3. Practice question generation (5 multiple-choice and 5 short-answer, with answers);
4. Memorization card generation (concepts, mnemonic suggestions).

**Implementation path:** Create a revision Bot and configure a "long-document key-point extraction" prompt template; upload sample exam-scope descriptions for the university's courses to the knowledge base; implement the chain "upload → outline → exam points → questions → cards" via workflow; publish for trial operation and push it intensively during exam week.

**Acceptance criteria:**
1. Revision-kit demos covering 3 or more real courses;
2. Each revision kit contains the full set of four: outline, exam points, practice questions, cards;
3. All generated content is human-reviewed with review records retained;
4. At least 15 students use it for real during exam week, with satisfaction-rating data collected.

**OPC characteristics:** Immediately reusable by extending to more courses; word-of-mouth spreads naturally in exam season, demonstrating low-cost customer acquisition and continuous iteration.

### T05 AI Lab Report & Literature Reading Assistant

**Background & scenario:** Science and engineering students write lab reports every week, and the barrier to reading foreign-language literature is high. This product is a research-support writing and reading assistant agent.

**Project goal:** Target users are 1st/2nd-year science & engineering students. Core problem: quickly grasp the structure and conclusions of a paper, and turn experimental data into well-formed report paragraphs.

**Feature list:**
1. Structured guided reading of literature (background / method / conclusion / limitations — four-part form);
2. Dialogue explaining terminology and long difficult sentences;
3. Lab report paragraph generation (data description, results analysis templates);
4. Format-compliance check prompts (figure/table numbering, reference format).

**Implementation path:** Create a research-support Bot; upload lab-report standard templates and common lab handouts to the knowledge base; implement the chain "literature import → guided reading → follow-up questions → report generation" via workflow; publish for trial operation.

**Acceptance criteria:**
1. Structured guided-reading demos for 3 real papers;
2. Paragraph generation covers the 3 core sections of a lab-type report;
3. Generated content is human-reviewed, with no fabricated data (compliance red line);
4. At least 10 students trial it, with improvement feedback collected.

**OPC characteristics:** Extensible by expanding the knowledge base discipline by discipline; maintainable by one person, low-cost continuous delivery.

### T06 AI Class Committee Assistant

**Background & scenario:** Class committees write notices, compile statistics and draw up duty rosters every week — highly repetitive labour. This product is a class-affairs agent; the pilot is the group's own class, so it lands fastest.

**Project goal:** Target users are class committee members, League branch secretaries and other student officers. Core problem: write one class notice, compile one set of statistics or produce one duty roster within 10 minutes.

**Feature list:**
1. Class notice generation (formal / lively tone options);
2. Automatic aggregation and interpretation of survey and sign-up statistics;
3. Intelligent scheduling of duty rosters (accounting for conflict constraints);
4. Material checklist reminders for scholarships, evaluations and similar matters.

**Implementation path:** Create a class-committee Bot with prompt templates per affair type; upload the university's common procedural requirements to the knowledge base; implement "select affair → fill in elements → generate → self-check" via workflow; first run a real pilot in the group's own class, then roll it out laterally to other classes.

**Acceptance criteria:**
1. The class committee uses it for real for at least 4 weeks, with 10+ real usage records retained;
2. At least 8 generated notices actually published after minor human edits;
3. The scheduling function runs in real class scenarios with no conflict complaints;
4. Rolled out laterally to 2 or more other classes for trial.

**OPC characteristics:** Clear replication path from one class pilot to year-group roll-out; usage data directly supports the implementation-significance application.

### T07 AI Club Event Planning Assistant

**Background & scenario:** Event planning is a heavy burden for club newcomers: proposal, budget, task allocation and publicity all at once. This product provides intelligent assistance across the whole event-planning process.

**Project goal:** Target users are club core members and class committees. Core problem: produce, within 30 minutes, a complete first-draft event plan that can be submitted for approval directly.

**Feature list:**
1. Event plan generation (theme, programme, timeline, venue requirements);
2. Budget table generation (itemized, with notes);
3. Staff task-allocation table generation;
4. Safety and compliance self-check list (venue, electricity use, crowd flow).

**Implementation path:** Create a planning Bot with plan templates per event type (sports/cultural, academic, charity); upload the university's event approval process and venue information to the knowledge base; implement "requirements → plan → budget → allocation → self-check" via workflow; publish for trial operation.

**Acceptance criteria:**
1. One complete plan demo for each of the three event types;
2. Plans contain all required elements and the budget breakdown is reasonable;
3. At least 1 plan passes real club approval and is actually executed;
4. The self-check list covers 5+ safety/compliance points.

**OPC characteristics:** Templated output lowers the planning barrier; the product can serve multiple clubs, forming a lightweight operating loop.

### T08 AI Academic Stress Relief "Tree Hollow"

**Background & scenario:** Academic anxiety during the freshman adjustment period is widespread, but most students are reluctant to approach a teacher first. This product is a listening and stress-relief dialogue agent with a built-in safe referral mechanism to the university counselling centre — a warm-hearted topic that stands out with reviewers.

**Project goal:** Target users are students who need to talk about academic stress (voluntary, anonymous use). Core problem: obtain an empathetic, non-judgmental conversation at any time, and be correctly guided to professional channels in risk situations.

**Feature list:**
1. Empathetic listening dialogue (non-judgmental, no directive advice);
2. Mapping sources of stress plus small self-regulation suggestions (time management, revision methods);
3. Risk identification and referral (on detecting serious emotional signals, clearly direct to the university counselling centre hotline);
4. Anonymization design statement (no personal identity information stored).

**Implementation path:** Create a counselling Bot with empathy principles and referral rules built into the prompt (referral mandatory in red-line situations; no responses on dangerous content); load the counselling centre's opening hours, booking methods and other resource information into the knowledge base; show a resource card at the end of the conversation; publish for trial operation.

**Acceptance criteria:**
1. Internal testing of 20+ rounds of real anonymous dialogue, with consistent tone and no preaching;
2. All 5 risk-referral test cases correctly trigger the referral script;
3. A disclaimer and the counselling centre's contact details are shown prominently on the page;
4. Complete privacy-design statement (no identity information stored; dialogues used only to optimize prompts).

**OPC characteristics:** A pure-dialogue lightweight app with zero deployment cost; compliance and ethical design are this topic's technical highlight.

### T09 AI Résumé Polisher & Mock Interviewer

**Background & scenario:** First-years doing career planning and second-years looking for internships both need résumé and interview skills, but lack real guidance. This product is a "résumé diagnosis + conversational mock interview" training assistant; the interactive demo is one of the most striking formats for the final-round video.

**Project goal:** Target users are 2nd/3rd-year students preparing for internships or employment. Core problem: complete a targeted résumé optimization and multiple rounds of mock interview without human guidance.

**Feature list:**
1. Job-requirement parsing (input a job title, output a competency checklist and assessment points);
2. Résumé diagnosis (point-by-point revision suggestions against the job requirements);
3. Mock interview dialogue (questions generated per job role, instant feedback after each answer);
4. Training report (summary of strengths / areas to improve).

**Implementation path:** Create a Bot configured with multi-role prompts for "job analyst / résumé coach / interviewer"; load sample JDs for target industry roles and résumé standards into the knowledge base; implement the four-stage flow "parse → diagnose → interview → report" via workflow; publish for trial operation.

**Acceptance criteria:**
1. Supports parsing demos for 3+ target job roles;
2. Résumé diagnosis outputs at least 5 concrete, actionable revision suggestions;
3. Each mock interview round has 5+ questions, with feedback covering both content and delivery;
4. 10+ students trial it with real résumés, and 3 before/after comparison cases are retained.

**OPC characteristics:** Operable by just two people; the job knowledge base expands modularly by industry, with low marginal cost.

### T10 AI Campus Three-Meals Nutrition Manager

**Background & scenario:** University students eat three meals a day, but takeaway-heavy diets, irregular eating, unbalanced nutrition and weight anxiety are common; with a dozen canteen stalls, students don't know what to eat today or how to combine dishes. Eating is the highest-frequency life scenario on campus (2–3 times a day). This product makes "3 seconds of photographing" yield nutritional analysis and pairing advice — the highest daily-active ceiling of all 15 topics.

**Project goal:** Target users are enrolled students at the university (extensible to faculty and staff). Core problem: solve the two daily decisions "what to eat each meal" and "how well am I eating", helping students build visualized healthy eating habits.

**Feature list:**
1. Photo dish recognition: photograph canteen dishes; the AI identifies the dish name and estimates calories and the three macronutrients;
2. Today's recommendations: recommend meal combinations based on stall menus, user taste preferences and nutritional gaps;
3. Food diary: automatically aggregate daily intake and generate a weekly report (calorie trends, nutritional weak points, improvement advice);
4. Goal modes: personalized constraints and reminders for goals such as fat loss, muscle gain, regular meals;
5. Health red-line prompts: frequency reminders for high-oil, high-salt dishes; no medical diagnostic advice provided.

**Implementation path:** Build the "photograph → recognize → advise" main flow on the agent platform's multimodal image-recognition capability; build a knowledge base of the university's canteen stalls and dishes (collected on-site by students — which is itself the pilot activity); chain "meal recognition → logging → weekly report generation" via workflow; roll out the trial first in the group members' own class and run a campus eating check-in group.

**Acceptance criteria:**
1. Dish recognition covers common dishes from at least 20 canteen stalls, with sampled recognition accuracy above 80%;
2. At least 30 real students register and trial it, with photo-recognition records retained;
3. Continuous operation for 2+ weeks, at least 2 weekly reports produced, at least 20 pieces of user feedback collected;
4. At least 5 users use it continuously for 7+ days (measured by diary check-in data).

**OPC characteristics:** Zero-cost launch (agent platform + student-collected dish data); daily high-frequency use naturally generates real operating data; can later connect to canteen stalls for dish promotion, giving a lightweight monetization path.

### T11 AI Pitch Rehearsal Coach

**Background & scenario:** The "Challenge Cup"/"Internet+"-type competitions and this competition all require pitch presentations and Q&A; students commonly suffer stage fright, disorganized structure, and inability to answer judges' questions. This product provides pitch-script structure diagnosis and mock Q&A coaching — the team uses it to train for its own competition entry, forming a "self-proving loop".

**Project goal:** Target users are students preparing for competitions. Core problem: complete multiple rounds of mock Q&A before the competition, exposing weak points and producing an improvement checklist.

**Feature list:**
1. Pitch script structure diagnosis (four-dimension scoring: pain point / solution / highlights / commercial viability);
2. Judge-perspective follow-up question generation (5–8 sharp questions per round);
3. Answer critique and deeper follow-ups;
4. Training summary report (frequent point-losing areas).

**Implementation path:** Configure a "judge Bot" prompt (scoring criteria + follow-up strategy); upload competition judging rules (including this competition's scoring framework) and excellent pitch cases to the knowledge base; chain "diagnose → follow-up → critique → report" via workflow; publish for trial operation.

**Acceptance criteria:**
1. For any pitch script, output four-dimension scores and at least 5 structural improvement suggestions;
2. Each round generates 5+ follow-up questions aligned with the judging rules;
3. Supports 3+ consecutive rounds of mock Q&A dialogue;
4. Each sub-team of this team completes 3 full simulations before the competition and retains the reports (self-use as pilot).

**OPC characteristics:** Uses AI to replace the scarce resource of "rehearsal judges", with zero marginal cost for repeated training; self-use data can go straight into the application materials.

### T12 AI Classroom Learning-Status Assistant

**Background & scenario:** In large classes, teachers struggle to gauge student comprehension in time, and marking and tallying in-class quizzes takes time. This product is a teaching-support learning-status agent — the only "teacher-side" topic among the 15; the pilot requires the cooperation of a course instructor.

**Project goal:** Target users are course instructors and teaching assistants. Core problem: within 10 minutes after class, generate a quiz, collect the statistics and produce a learning-status digest.

**Feature list:**
1. Generate in-class quizzes based on the lesson content (mainly objective questions, 5–10 items);
2. Answer-collection link and result statistics;
3. Learning-status digest generation (accuracy distribution, common errors, review suggestions);
4. Simple ledger recording attendance and classroom interaction.

**Implementation path:** Create a learning-status Bot; upload the course syllabus and lecture key points to the knowledge base; implement the chain "set questions → collect → tally → digest" via workflow; publish for trial operation and agree the pilot class and frequency with 1 course instructor.

**Acceptance criteria:**
1. At least 4 complete quiz cycles conducted in a real classroom;
2. Agreement rate between the learning-status digest and manual statistics above 95%;
3. 1 written usage feedback from the cooperating teacher;
4. Voluntary participation observed throughout; score data presented only in aggregated class form.

**OPC characteristics:** A teacher-side pilot is, in reviewers' eyes, the format closest to "real educational scenario implementation", and carries the highest data authority.

### T13 AI Campus Second-hand Goods Assistant

**Background & scenario:** Every graduation season and start of term there is strong demand for turning over books, bikes and small appliances on campus, but the information is scattered across assorted chat groups: sellers can't write listings, buyers ask the same questions repeatedly, and there is no price reference. This product is a campus second-hand circulation agent — an unavoidable high-frequency scenario across the whole campus.

**Project goal:** Target users are enrolled students (both sellers and buyers). Core problem: turn an unused item into a well-formed, trustworthy listing within 30 seconds, and automatically answer buyers' common questions.

**Feature list:**
1. Item valuation dialogue (category, condition, original price → suggested price range with reasoning);
2. Automatic listing copy generation (title, description, condition statement, suggested photo checklist);
3. Automatic buyer-enquiry responses (condition, price, transaction method, pickup point);
4. Transaction safety prompts (meet in person, public on-campus locations, don't pay deposits).

**Implementation path:** Create a second-hand assistant Bot; load market price references for common item categories (graduation-season books, bicycles, appliances etc.) and campus transaction safety rules into the knowledge base; implement the chain "item description → valuation → copy → customer-service responses" via workflow; publish to web and run the pilot together with real campus second-hand groups.

**Acceptance criteria:**
1. Valuation and listing-copy demos for 10+ real second-hand items;
2. Valuation output must include a price range and at least 2 supporting reasons, with no obvious deviation from market prices;
3. 2-week pilot in 1 real campus group of at least 100 people, generating real enquiry records;
4. Customer-service responses cover 6+ categories of common questions; a safety prompt is delivered on every listing.

**OPC characteristics:** Members can build their own group and list their own items, generating real data the same day; the scenario recurs naturally with the academic calendar, enabling sustained operation.

### T14 AI Campus Good-Products Selection Assistant

**Background & scenario:** Campus community group-buying and small-item reselling are the lightest way for students to get into e-commerce entrepreneurship, but what to stock, how to price and how to reply to customers are all guesswork. This product provides intelligent assistance for product selection and customer service.

**Project goal:** Target users are student teams trying small-scale e-commerce practice. Core problem: use data organization + AI analysis to support product-selection decisions, and use a script library to cut customer-service response time to within 1 minute.

**Feature list:**
1. Product-selection factor analysis dialogue (cost, pricing, competitors, target audience);
2. Product selling-point copy and listing description generation;
3. Customer-service script generation (pre-sale enquiries, price negotiation, after-sales, returns/exchanges);
4. Negative-review response templates and escalation-handling prompts.

**Implementation path:** Create an e-commerce assistant Bot configured with separate "selection analyst" and "customer-service coach" prompts; load product-selection methodology documents and exemplary product pages into the knowledge base; implement the chain "analysis → copy → scripts" via workflow; publish for trial operation.

**Acceptance criteria:**
1. Product-selection analysis demos for 3 real candidate products;
2. At least 2 product descriptions actually listed after human revision;
3. Customer-service scripts cover 6+ common scenarios;
4. 2-week trial in 1 real micro-shop scenario, recording improvement data on customer-service response time.

**OPC characteristics:** Directly serves "low-cost-launch small-team e-commerce practice", using AI to compensate for the shortage of operational manpower.

### T15 AI Hometown Culture & Tourism Promotion Assistant

**Background & scenario:** Local cultural tourism, rural specialties and lesser-known attractions need low-cost content promotion, and students know their own hometowns best. This product targets the culture-and-tourism promotion scenario, generating travel guides, short-video scripts and promotional copy — visually rich and the best fit for the final-round video.

**Project goal:** Target users are student teams doing culture-and-tourism promotion practice (working with hometown attractions, agricultural produce, small merchants). Core problem: mass-produce multi-platform-adapted promotional content around a single promotion subject.

**Feature list:**
1. Promotion-subject profile mapping (highlights, audience, story line);
2. Travel guide generation (itinerary, food, pitfalls to avoid);
3. Short-video storyboard script generation (15s / 60s versions);
4. Multi-platform adaptation rewriting (WeChat official account, Xiaohongshu, Moments styles).

**Implementation path:** Create a culture-and-tourism Bot; load the subject's basic materials and an image-asset checklist into the knowledge base; implement "profile → content → multi-platform rewrite" via workflow; gather material when going home over the holidays, and operate/publish online day to day.

**Acceptance criteria:**
1. One complete content pack for 1 real promotion subject (1 travel guide + 2 scripts + 3 platform-specific copy versions);
2. At least 3 pieces actually published after human review, with data recorded;
3. Clearly distinct styles across platform versions, with all elements complete;
4. Basic distribution data (reads/likes) collected to form an effectiveness record.

**OPC characteristics:** One person with one Bot can take on one promotion project, demonstrating individual lightweight entrepreneurial delivery capability.

## IV. Universal Acceptance Baseline

The following baseline requirements apply to all topics; failing any one means acceptance is refused:

1. The product must be genuinely built on an agent platform and runnable for demonstration — it must not remain a proposal or a slide deck;
2. All process materials must be submitted to the Gitee repository per the *Team Management Rules*, and the project version number must reach V1.00.000 before acceptance can be applied for;
3. AI-generated content must be human-reviewed before use, with review records retained;
4. Where real users trial the product, the principle of voluntary participation must be observed, and no personal information unrelated to the purpose may be collected;
5. Application materials must state the platform, model and material sources used; the work must be original.

University Student AI Innovation & Entrepreneurship Team Guidance Group
13 October 2026

*Copy to: group leaders and deputy group leaders of each group.*
