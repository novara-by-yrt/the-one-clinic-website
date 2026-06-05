export interface TreatmentBenefit {
  title: string;
  description: string;
}

export interface TreatmentStep {
  number: string;
  title: string;
  description: string;
}

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  /** Paragraph text, use \n\n to separate paragraphs */
  description?: string;
  benefits?: TreatmentBenefit[];
  process?: TreatmentStep[];
  faq?: TreatmentFAQ[];
}

// ── Treatment data ──────────────────────────────────────────────
export const treatments: Treatment[] = [

  // ── Health & Wellbeing ──────────────────────────────────────

  {
    slug: 'health-screening-leicester',
    title: 'Health Screening',
    category: 'Health & Wellbeing',
    shortDescription:
      'Comprehensive health assessments to detect risks early and give you a clear picture of your overall health.',
  },
  {
    slug: 'private-gp-leicester',
    title: 'Private GP Leicester',
    category: 'Health & Wellbeing',
    shortDescription:
      'Same-day private GP appointments with experienced doctors for diagnosis, referrals, and personalised care.',
  },
  {
    slug: 'joint-injections-leicester',
    title: 'Joint Injections',
    category: 'Health & Wellbeing',
    shortDescription:
      'Targeted steroid or hyaluronic acid injections to relieve joint pain, stiffness, and inflammation.',
  },
  {
    slug: 'hay-fever-injections-leicester',
    title: 'Hay Fever Injections',
    category: 'Health & Wellbeing',
    shortDescription:
      'Expert hay fever injections to relieve severe allergic rhinitis and enjoy a symptom-free summer.',
  },
  {
    slug: 'minor-surgery-leicester',
    title: 'Minor Surgery',
    category: 'Health & Wellbeing',
    shortDescription:
      'Expert in-clinic minor surgical procedures for skin lesions, cysts, and other conditions under local anaesthetic.',
  },
  {
    slug: 'ingrown-toenail-removal-leicester',
    title: 'Ingrown Toenail Removal',
    category: 'Health & Wellbeing',
    shortDescription:
      'Permanent relief from painful ingrown toenails using Partial Nail Avulsion (PNA) with phenol treatment.',
  },
  {
    slug: 'haemorrhoid-treatment-leicester',
    title: 'Haemorrhoid Removal',
    category: 'Health & Wellbeing',
    shortDescription:
      'Expert surgical haemorrhoid removal under local anaesthetic for grades I,III , no hospital stay, same-day procedure.',
  },
  {
    slug: 'gp-home-visits-leicester',
    title: 'GP Home Visits Leicester',
    category: 'Health & Wellbeing',
    shortDescription:
      'Private GP home visits for patients who are unable to travel to the clinic or prefer to be seen at home.',
  },
  {
    slug: 'travel-vaccine-leicester',
    title: 'Travel Vaccine & Immunisations',
    category: 'Health & Wellbeing',
    shortDescription:
      'Travel health consultations and vaccinations to keep you protected wherever in the world you are heading.',
  },
  {
    slug: 'weight-management-leicester',
    title: 'Weight Management',
    category: 'Health & Wellbeing',
    shortDescription:
      'Medically supervised weight loss programmes combining clinical assessment, lifestyle support, and medication where appropriate.',
  },
  {
    slug: 'medical-insurance-leicester',
    title: 'Medical Insurance Examination',
    category: 'Health & Wellbeing',
    shortDescription:
      'Independent medical examinations and reports for insurance providers, employers, and legal purposes.',
  },
  {
    slug: 'dermatologist-leicester',
    title: 'Dermatologist Leicester',
    category: 'Health & Wellbeing',
    shortDescription:
      'Expert skin consultations for a wide range of dermatological conditions including acne, eczema, psoriasis, and more.',
  },
  {
    slug: 'mens-health-leicester',
    title: "Men's Health",
    category: 'Health & Wellbeing',
    shortDescription:
      "Confidential men's health services covering testosterone, sexual health, prostate health, and general wellbeing.",
  },
  {
    slug: 'womens-health-leicester',
    title: "Women's Health Clinic",
    category: 'Health & Wellbeing',
    shortDescription:
      "Comprehensive women's health services from contraception and cervical screening to general GP care.",
  },
  {
    slug: 'menopause-hrt-leicester',
    title: "Women's Health, Menopause / HRT / Contraception",
    category: 'Health & Wellbeing',
    shortDescription:
      'Specialist support for menopause, HRT prescribing, and contraception management from experienced doctors.',
  },
  {
    slug: 'mental-health-consultation-leicester',
    title: 'Mental Health Consultation',
    category: 'Health & Wellbeing',
    shortDescription:
      'Confidential mental health consultations to assess, support, and guide treatment for anxiety, depression, and more.',
  },

  // ── Medical Aesthetics ──────────────────────────────────────

  {
    slug: 'dermal-filler-leicester',
    title: 'Dermal Fillers',
    category: 'Medical Aesthetics',
    shortDescription:
      'Restore lost volume, define contours, and rejuvenate facial features with expertly placed hyaluronic acid fillers.',
    description:
      'Dermal fillers use hyaluronic acid, a substance naturally produced by the body, to restore volume, smooth deep lines, and enhance facial contours. The gel-like filler is carefully placed beneath the skin to lift, plump, and define specific areas.\n\nOur practitioners are trained in advanced injection techniques including cannula-based delivery and layered placement, ensuring precise, symmetrical results. Particular attention is given to facial proportions to achieve outcomes that enhance your features without looking overdone.\n\nPopular treatment areas include lips, cheeks, nasolabial folds, jawline, and chin. Results are immediate, with final outcome visible within 2 weeks once any minor swelling has settled.',
    benefits: [
      { title: 'Immediate Volume', description: 'Results are visible straight away, with the full outcome settling over 2 weeks.' },
      { title: 'Fully Reversible', description: 'Hyaluronic acid fillers can be dissolved with hyaluronidase, offering complete reversibility.' },
      { title: 'Long-Lasting', description: 'Depending on the product and area, results typically last between 9 and 18 months.' },
      { title: 'Minimal Downtime', description: 'Most patients resume normal activities the same day, with only minor potential for bruising.' },
    ],
    process: [
      { number: '01', title: 'Consultation & Planning', description: 'A detailed facial assessment is conducted. Your practitioner maps out target areas and discusses the amount of product needed.' },
      { number: '02', title: 'Preparation', description: 'The skin is cleansed and a topical anaesthetic cream is applied for 20 to 30 minutes prior to treatment for your comfort.' },
      { number: '03', title: 'Treatment', description: 'Filler is placed precisely using needle or cannula technique. Pressure and massage are applied to achieve a smooth, natural result.' },
      { number: '04', title: 'Review', description: 'A 2-week follow-up assessment ensures symmetry and allows for any fine-tuning if required.' },
    ],
    faq: [
      { question: 'Are dermal fillers safe?', answer: 'When administered by a qualified medical professional using licensed products, dermal fillers are very safe.' },
      { question: 'Will I look overdone?', answer: 'Our philosophy is enhancement, not transformation. We use conservative, layered approaches to ensure results look natural.' },
    ],
  },
  {
    slug: 'ipl-leicester',
    title: 'Lumecca IPL',
    category: 'Medical Aesthetics',
    shortDescription:
      'The most powerful IPL device available, treating pigmentation, sun damage, redness, and vascular lesions in fewer sessions.',
  },
  {
    slug: 'hydrafacial-keravive-leicester',
    title: 'HydraFacial Keravive',
    category: 'Medical Aesthetics',
    shortDescription:
      'A three-step scalp treatment that cleanses, stimulates, and nourishes hair follicles to promote a healthy scalp and fuller-looking hair.',
  },
  {
    slug: 'morpheus8-leicester',
    title: 'Morpheus8',
    category: 'Medical Aesthetics',
    shortDescription:
      'Fractional radiofrequency microneedling that remodels skin and subdermal tissue for tighter, smoother skin on face and body.',
  },
  {
    slug: 'wrinkle-relaxing-injections-leicester',
    title: 'Wrinkle Relaxing Injections',
    category: 'Medical Aesthetics',
    shortDescription:
      'Smooth expression lines and refresh your appearance with precise, clinician-administered muscle-relaxing injections.',
    description:
      'Anti-wrinkle injections use a purified protein to temporarily relax targeted facial muscles, reducing the appearance of dynamic lines caused by repeated expressions such as frowning, squinting, and smiling.\n\nAt The One Clinic, each treatment is performed by a qualified medical practitioner who takes time to understand your facial anatomy and aesthetic goals. Results typically appear within 3 to 5 days, peak at two weeks, and last between 3 to 4 months.',
    benefits: [
      { title: 'Natural-Looking Results', description: 'Subtle softening of lines while preserving natural facial movement and expression.' },
      { title: 'Quick & Comfortable', description: 'Treatment takes 15 to 30 minutes with minimal discomfort. No anaesthetic required.' },
      { title: 'No Downtime', description: 'Return to daily activities immediately. Mild redness or swelling resolves within hours.' },
      { title: 'Preventative Effect', description: 'Regular treatment can slow the formation of deeper static lines over time.' },
    ],
    process: [
      { number: '01', title: 'Free Consultation', description: 'Your practitioner assesses your facial anatomy, discusses your goals, and designs a bespoke treatment plan.' },
      { number: '02', title: 'Preparation', description: 'The target areas are cleansed. A topical numbing cream is available on request for added comfort.' },
      { number: '03', title: 'Injection', description: 'Precise micro-injections are administered to the targeted muscles using an ultra-fine needle.' },
      { number: '04', title: 'Aftercare & Review', description: 'Post-treatment guidance is provided. A follow-up review at 2 weeks ensures optimal results.' },
    ],
  },
  {
    slug: 'hydrafacial-leicester',
    title: 'Hydrafacial Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'A multi-step facial treatment that cleanses, exfoliates, extracts, and hydrates to deliver instantly glowing, refreshed skin.',
  },
  {
    slug: 'vampire-facial-leicester',
    title: 'Vampire Facial',
    category: 'Medical Aesthetics',
    shortDescription:
      'PRP microneedling combining platelet-rich plasma with skin needling to stimulate collagen and renew skin texture.',
  },
  {
    slug: 'chemical-peels-leicester',
    title: 'Chemical Peels',
    category: 'Medical Aesthetics',
    shortDescription:
      'Medical-grade chemical peels to resurface the skin, treat pigmentation, acne, and improve overall skin tone and texture.',
  },
  {
    slug: 'skin-analysis-leicester',
    title: 'Skin Analysis, Life Viz 3D Camera',
    category: 'Medical Aesthetics',
    shortDescription:
      'Advanced 3D skin imaging to assess texture, pigmentation, pores, and wrinkles and guide your personalised skincare plan.',
  },
  {
    slug: 'body-contouring-leicester',
    title: 'Body Contouring',
    category: 'Medical Aesthetics',
    shortDescription:
      'Reduce stubborn fat deposits, tighten loose skin, and redefine your silhouette with non-surgical body contouring technology.',
    benefits: [
      { title: 'No Surgery, No Needles', description: 'Achieve measurable body improvements without incisions, anaesthesia, or injectable treatments.' },
      { title: 'Multiple Technologies', description: 'We select the optimal device for your specific concern, fat reduction, skin tightening, or both.' },
      { title: 'Comfortable Treatment', description: 'Most patients describe a warm or cooling sensation. Sessions are comfortable enough to relax during.' },
      { title: 'Progressive Results', description: 'Results develop over 6 to 12 weeks as the body naturally eliminates treated fat cells and rebuilds collagen.' },
    ],
    process: [
      { number: '01', title: 'Body Assessment', description: 'Measurements, photographs, and a physical assessment identify the most appropriate technology and target areas for your goals.' },
      { number: '02', title: 'Treatment Planning', description: 'A bespoke treatment programme is designed, specifying the device, settings, number of sessions, and target areas.' },
      { number: '03', title: 'Sessions', description: 'Treatment sessions are typically 45 to 90 minutes. Most programmes involve 4 to 8 sessions spaced 1 to 2 weeks apart.' },
      { number: '04', title: 'Progress Review', description: 'Measurements and photographs are taken mid-programme and at completion to document and assess results.' },
    ],
  },
  {
    slug: 'endolift-laser-leicester',
    title: 'Endolift Laser',
    category: 'Medical Aesthetics',
    shortDescription:
      'Minimally invasive laser skin tightening for face, neck, and body that lifts, contours, and stimulates collagen without surgery.',
  },
  {
    slug: 'skincare-alumier-md-leicester',
    title: 'Skincare, Alumier MD',
    category: 'Medical Aesthetics',
    shortDescription:
      'Medical-grade Alumier MD skincare products prescribed and tailored to your skin type, concerns, and goals.',
  },
  {
    slug: 'skin-lesions-leicester',
    title: 'Skin Lesion Removal Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Safe, precise removal of benign and suspicious skin lesions under local anaesthetic with histology available.',
  },
  {
    slug: 'basal-cell-carcinoma-leicester',
    title: 'BCC Removal Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Expert diagnosis and surgical removal of basal cell carcinoma (BCC) with histological analysis to confirm clear margins.',
  },
  {
    slug: 'skin-tag-removal-leicester',
    title: 'Skin Tag Removal Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Fast, effective removal of skin tags with minimal discomfort using surgical or cautery techniques.',
  },
  {
    slug: 'wart-removal-leicester',
    title: 'Wart Removal Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Clinically proven wart removal treatments including cryotherapy, curettage, and cauterisation for lasting results.',
  },
  {
    slug: 'laser-acne-scar-treatment-leicester',
    title: 'Acne Scar Removal Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Advanced treatments targeting acne scarring to smooth skin texture, reduce discolouration, and restore confidence.',
  },
  {
    slug: 'regenerative-medicine-exosome-therapy-leicester',
    title: 'Regenerative Medicine, Exosome Therapy',
    category: 'Medical Aesthetics',
    shortDescription:
      'Cutting-edge exosome therapy to accelerate healing, enhance skin regeneration, and restore cellular health.',
  },
  {
    slug: 'polynucleotides-leicester',
    title: 'Regenerative Medicine, Polynucleotides',
    category: 'Medical Aesthetics',
    shortDescription:
      'Polynucleotide (PDRN) injections to deeply hydrate, repair, and regenerate skin for long-lasting rejuvenation.',
  },
  {
    slug: 'cool-bleph-leicester',
    title: 'Cool Bleph',
    category: 'Medical Aesthetics',
    shortDescription:
      'Non-surgical eyelid treatment using targeted cooling and radiofrequency to tighten and refresh the eye area.',
  },
  {
    slug: 'cool-glow-full-face-leicester',
    title: 'COOL Glow Peel (Full Face)',
    category: 'Medical Aesthetics',
    shortDescription:
      'A rejuvenating full-face peel treatment combining cooling technology to brighten, smooth, and revitalise skin.',
  },
  {
    slug: 'cool-scar-lift-leicester',
    title: 'Cool Scar Lift',
    category: 'Medical Aesthetics',
    shortDescription:
      'Targeted treatment to improve the appearance of scars using innovative cooling and skin-lifting technology.',
  },
  {
    slug: 'mole-removal-leicester',
    title: 'Mole Removal',
    category: 'Medical Aesthetics',
    shortDescription:
      'Safe, precise mole removal under local anaesthetic with optional histology. Minimal scarring, fast healing.',
  },
  {
    slug: 'laser-mole-removal-leicester',
    title: 'Laser Mole Removal',
    category: 'Medical Aesthetics',
    shortDescription:
      'Non-surgical laser removal of flat, benign moles for a clean, scar-free finish with minimal downtime.',
  },
  {
    slug: 'laser-snoring-treatment-leicester',
    title: 'Laser Snoring Treatment',
    category: 'Medical Aesthetics',
    shortDescription:
      'NightLase laser therapy to reduce snoring by tightening soft palate tissue, improving sleep quality for you and your partner.',
  },
  {
    slug: 'laser-vaginal-leicester',
    title: 'Laser Vaginal Rejuvenation',
    category: 'Medical Aesthetics',
    shortDescription:
      'Non-surgical laser treatment to tighten vaginal tissue, improve dryness, and address urinary stress incontinence.',
  },
  {
    slug: 'iv-drip-therapy-leicester',
    title: 'IV Drip Therapy',
    category: 'Medical Aesthetics',
    shortDescription:
      'Replenish essential nutrients, boost energy, and support overall wellbeing with intravenous vitamin and mineral infusions.',
    description:
      'IV Wellness Therapy delivers vitamins, minerals, and amino acids directly into the bloodstream, bypassing the digestive system for 100% bioavailability. This allows far higher therapeutic concentrations to be achieved than is possible through oral supplementation.\n\nOur infusions are formulated by medical professionals and tailored to your individual health goals, whether that is energy enhancement, immune support, skin radiance, hangover recovery, or athletic performance optimisation.',
    benefits: [
      { title: '100% Bioavailability', description: 'Bypasses the digestive system, delivering nutrients directly to cells at therapeutic levels.' },
      { title: 'Rapid Effect', description: 'Many patients notice improvements in energy, clarity, and wellbeing within hours of treatment.' },
      { title: 'Fully Personalised', description: 'Formulations are tailored to your individual health goals, blood markers, and lifestyle.' },
      { title: 'Medically Supervised', description: 'Every infusion is prescribed and administered by a qualified medical professional.' },
    ],
    process: [
      { number: '01', title: 'Health Screening', description: 'A health questionnaire and optional blood test identifies deficiencies and ensures your infusion is safe and targeted.' },
      { number: '02', title: 'Formulation', description: 'Your bespoke infusion is prepared by our clinical team based on your health profile and goals.' },
      { number: '03', title: 'Infusion', description: 'A small cannula is placed in a vein and the infusion is delivered over 30 to 60 minutes while you relax.' },
      { number: '04', title: 'Ongoing Plan', description: 'Depending on your goals, a schedule of regular infusions or one-off sessions is recommended.' },
    ],
  },
  {
    slug: 'deep-laser-resurfacing-leicester',
    title: 'Deep Laser Resurfacing',
    category: 'Medical Aesthetics',
    shortDescription:
      'Transform skin texture, tone, and clarity with advanced laser technology targeting pigmentation, scarring, and signs of ageing.',
    description:
      'Laser resurfacing uses controlled light energy to target and remodel the skin at a cellular level. By stimulating collagen production and removing damaged surface layers, it effectively addresses acne scarring, sun damage, uneven tone, and fine lines.\n\nWe offer both ablative and non-ablative laser options, selected based on your skin type, concerns, and desired downtime.',
    benefits: [
      { title: 'Targets Multiple Concerns', description: 'Effective for acne scars, sun damage, hyperpigmentation, enlarged pores, and fine lines.' },
      { title: 'Stimulates Collagen', description: "Triggers the skin's natural repair response, improving firmness and texture over time." },
      { title: 'Clinically Proven', description: 'Backed by decades of clinical evidence and delivered using medical-grade laser technology.' },
      { title: 'Lasting Improvement', description: 'Results continue to improve for 3 to 6 months post-treatment as collagen remodelling occurs.' },
    ],
    process: [
      { number: '01', title: 'Skin Assessment', description: 'A detailed skin analysis determines your skin type, identifies concerns, and selects the appropriate laser protocol.' },
      { number: '02', title: 'Preparation', description: 'Depending on the treatment, a prescribed skincare programme may be required for 2 to 4 weeks prior.' },
      { number: '03', title: 'Treatment', description: 'The laser is passed over the skin in a precise pattern. Sessions typically last 30 to 60 minutes.' },
      { number: '04', title: 'Recovery & Review', description: 'A structured post-treatment skincare plan is provided. Results are reviewed at 4 to 6 weeks.' },
    ],
  },
  {
    slug: 'the-body-confidence-package',
    title: 'The Body Confidence Package',
    category: 'Medical Aesthetics',
    shortDescription:
      'A comprehensive body treatment package combining multiple modalities to sculpt, tighten, and transform your confidence.',
  },
  {
    slug: 'lipoma-removal-leicester',
    title: 'Lipoma Removal Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Surgical removal of benign fatty lipoma lumps under local anaesthetic for a clean, smooth result.',
  },
  {
    slug: 'liposuction-leicester',
    title: 'Liposuction Leicester',
    category: 'Medical Aesthetics',
    shortDescription:
      'Precision liposuction to permanently remove stubborn fat deposits and sculpt targeted areas of the body.',
  },
  {
    slug: 'non-surgical-blepharoplasty-leicester',
    title: 'Non Surgical Blepharoplasty',
    category: 'Medical Aesthetics',
    shortDescription:
      'Rejuvenate the eye area and reduce hooded lids without surgery using plasma or radiofrequency technology.',
  },
];

// ── Helpers ─────────────────────────────────────────────────────
export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return treatments.map((t) => t.slug);
}
