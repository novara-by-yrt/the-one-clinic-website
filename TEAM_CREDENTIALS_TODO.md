# Team Credentials & E-E-A-T Data Collection

This document tracks which team members need credentials data collected for YMYL (Your Money Your Life) compliance and Google medical content guidelines. The schema has been extended in `data/team.ts` with optional fields:

- **gmcNumber** — UK General Medical Council registration number
- **yearQualified** — Year began medical practice
- **specialtyMemberships** — Professional society memberships (e.g., BAAPS, BACD)
- **publications** — Published papers/research (optional)
- **linkedinUrl** — LinkedIn profile URL

## Doctors & Clinicians (GMC Registration Required)

### ✅ Dr Sumit Virmani
- **Role:** Co-Founder & GP
- **Status:** Credentials present (MBBS, MRCGP), GMC number pending
- **Needed:**
  - [ ] gmcNumber (ask client for UK Medical Register listing)
  - [ ] yearQualified (mentioned "15+ years" in bio — extract from CV)
  - [ ] specialtyMemberships (any BAAPS, BACD, other affiliations?)
  - [ ] linkedinUrl (optional)

### ✅ Dr Gunjan Bedi
- **Role:** General Practitioner & Psychiatrist
- **Status:** Credentials present (MBBS, MRCpsych, MRCGP, BCAM)
- **Needed:**
  - [ ] gmcNumber
  - [ ] yearQualified
  - [ ] specialtyMemberships (BCAM already listed in credentials — parse into array)
  - [ ] linkedinUrl (optional)

### ✅ Mr Thangasamy Sankar
- **Role:** Consultant Plastic Surgeon & Laser Specialist
- **Status:** Credentials present (FRCS)
- **Needed:**
  - [ ] gmcNumber
  - [ ] yearQualified
  - [ ] specialtyMemberships (likely BAAPS, BACD, or specialty aesthetics bodies)
  - [ ] publications (likely — check for publications on PubMed/Google Scholar)

### ⚠️ Dr Mahesh Kodivalasa
- **Role:** Doctor
- **Status:** Credentials empty — needs full review
- **Needed:**
  - [ ] credentials (ask client for full list)
  - [ ] gmcNumber
  - [ ] yearQualified
  - [ ] specialtyMemberships

### ✅ Dr Hari Subramaniam
- **Role:** Consultant Psychiatrist
- **Status:** Credentials present (MSc, MD, DPM, DNB, FRCPsych)
- **Needed:**
  - [ ] gmcNumber
  - [ ] yearQualified
  - [ ] specialtyMemberships
  - [ ] publications (psychiatry research expected)

### ⚠️ Dr Amol Vaze
- **Role:** Doctor
- **Status:** Credentials empty — needs full review
- **Needed:**
  - [ ] credentials
  - [ ] gmcNumber
  - [ ] yearQualified
  - [ ] specialtyMemberships

### ⚠️ Dr Ralph Mitchell
- **Role:** Doctor
- **Status:** Credentials empty — needs full review
- **Needed:**
  - [ ] credentials
  - [ ] gmcNumber
  - [ ] yearQualified
  - [ ] specialtyMemberships

## Nurses & Support Staff

### ✅ Nurse Sanj
- **Role:** Clinical Nurse
- **Status:** Not a doctor, GMC not required
- **Optional:**
  - [ ] Nursing registration number (NMC if UK registered)
  - [ ] specialtyMemberships (wound care, aesthetics cert?)
  - [ ] linkedinUrl

### ○ Chloe
- **Role:** Patient Care Team
- **Status:** Non-clinical, no medical registration needed

### ○ Hollie
- **Role:** Patient Care Team
- **Status:** Non-clinical, no medical registration needed

### ○ Charley
- **Role:** Patient Care Team
- **Status:** Non-clinical, no medical registration needed

---

## Implementation Notes

### Where Data Appears

1. **Team Grid Card** (`/our-team`) — Shows small GMC checkmark indicator if gmcNumber present
2. **Individual Profile** (`/our-team/[slug]`) — Full credentials display:
   - GMC badge with link to verification (https://www.gmc-uk.org/registration-and-licensing/the-medical-register?query={gmcNumber})
   - "Practising since {yearQualified}"
   - Membership badges (e.g., BAAPS, BACD)
   - LinkedIn link
3. **JSON-LD Physician Schema** — Added:
   - `identifier` (GMC number)
   - `hasCredential` (memberships as EducationalOccupationalCredential)
   - `sameAs` (LinkedIn URL)
   - `publishedCredential` (publications as CreativeWork)

### ASA Compliance

UK Advertising Standards Authority (ASA) requires:
- GMC number displayed for all clinicians (prevents misleading credentials)
- Verifiable professional memberships
- Clear disclosure of qualifications

### Google Medical Content Guidelines

Medical sites weigh E-E-A-T heavily:
- **Expertise:** Educational credentials, memberships
- **Authoritativeness:** GMC registration, publications, LinkedIn
- **Trustworthiness:** Professional oversight, public verification links

---

## Checklist: Before Production

- [ ] All doctors have gmcNumber collected
- [ ] All doctors have yearQualified filled
- [ ] specialtyMemberships parsed for at least the 3 lead clinicians (Virmani, Bedi, Sankar)
- [ ] At least one doctor has linkedinUrl (social proof)
- [ ] Build runs without errors (`npm run build`)
- [ ] Team pages render without missing fields
- [ ] GMC verification links tested (links resolve to Medical Register)
- [ ] JSON-LD output validated (use https://schema.org/Physician)

---

## Client Conversation Template

> **To collect credentials:** 
> - Ask for each clinician's GMC registration number (found at https://www.gmc-uk.org/registration-and-licensing/the-medical-register)
> - Confirm year they began medical practice
> - List any professional memberships (BAAPS = British Association of Aesthetic Plastic Surgeons, BACD = British Association of Cosmetic Dentists, etc.)
> - Optional: LinkedIn profile URLs for social credibility
