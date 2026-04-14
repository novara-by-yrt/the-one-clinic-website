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
  description: string;
  benefits: TreatmentBenefit[];
  process: TreatmentStep[];
  faq?: TreatmentFAQ[];
}

// ── Treatment data ──────────────────────────────────────────────
export const treatments: Treatment[] = [
  {
    slug: 'anti-wrinkle',
    title: 'Anti-Wrinkle Treatment',
    category: 'Face',
    shortDescription:
      'Smooth expression lines and refresh your appearance with precise, clinician-administered muscle-relaxing injections.',
    description:
      'Anti-wrinkle injections use a purified protein to temporarily relax targeted facial muscles, reducing the appearance of dynamic lines, those caused by repeated expressions such as frowning, squinting, and smiling.\n\nAt The One Clinic, each treatment is performed by a qualified medical practitioner who takes time to understand your facial anatomy and aesthetic goals. We use micro-dosing techniques to deliver natural-looking results that soften lines without erasing expression.\n\nResults typically appear within 3 to 5 days, peak at two weeks, and last between 3 to 4 months depending on individual metabolism and lifestyle. Regular treatments can lead to longer-lasting results over time.',
    benefits: [
      {
        title: 'Natural-Looking Results',
        description: 'Subtle softening of lines while preserving natural facial movement and expression.',
      },
      {
        title: 'Quick & Comfortable',
        description: 'Treatment takes 15 to 30 minutes with minimal discomfort. No anaesthetic required.',
      },
      {
        title: 'No Downtime',
        description: 'Return to daily activities immediately. Mild redness or swelling resolves within hours.',
      },
      {
        title: 'Preventative Effect',
        description: 'Regular treatment can slow the formation of deeper static lines over time.',
      },
    ],
    process: [
      {
        number: '01',
        title: 'Free Consultation',
        description: 'Your practitioner assesses your facial anatomy, discusses your goals, and designs a bespoke treatment plan.',
      },
      {
        number: '02',
        title: 'Preparation',
        description: 'The target areas are cleansed. A topical numbing cream is available on request for added comfort.',
      },
      {
        number: '03',
        title: 'Injection',
        description: 'Precise micro-injections are administered to the targeted muscles using an ultra-fine needle.',
      },
      {
        number: '04',
        title: 'Aftercare & Review',
        description: 'Post-treatment guidance is provided. A follow-up review at 2 weeks ensures optimal results.',
      },
    ],
    faq: [
      {
        question: 'Does it hurt?',
        answer: 'Most patients describe the sensation as a very brief, mild sting. The needles used are ultra-fine and treatment is over quickly. Topical numbing cream is available on request.',
      },
      {
        question: 'When will I see results?',
        answer: 'Initial results are visible within 3 to 5 days. Full effect is seen at approximately 2 weeks, which is why we schedule a review appointment at this point.',
      },
      {
        question: 'How long do results last?',
        answer: 'Results typically last 3 to 4 months. This varies by individual and the area treated. Over time, with regular treatments, many patients find their results last longer.',
      },
      {
        question: 'Are there any side effects?',
        answer: 'Mild redness, swelling, or bruising at the injection site can occur but usually resolves within 24 to 48 hours. Serious side effects are rare when treatment is performed by a qualified practitioner.',
      },
    ],
  },
  {
    slug: 'dermal-fillers',
    title: 'Dermal Fillers',
    category: 'Face',
    shortDescription:
      'Restore lost volume, define contours, and rejuvenate facial features with expertly placed hyaluronic acid fillers.',
    description:
      'Dermal fillers use hyaluronic acid, a substance naturally produced by the body, to restore volume, smooth deep lines, and enhance facial contours. The gel-like filler is carefully placed beneath the skin to lift, plump, and define specific areas.\n\nOur practitioners are trained in advanced injection techniques including cannula-based delivery and layered placement, ensuring precise, symmetrical results. Particular attention is given to facial proportions to achieve outcomes that enhance your features without looking overdone.\n\nPopular treatment areas include lips, cheeks, nasolabial folds, jawline, and chin. Results are immediate, with final outcome visible within 2 weeks once any minor swelling has settled. Depending on the product used and the area treated, results can last 9 to 18 months.',
    benefits: [
      {
        title: 'Immediate Volume',
        description: 'Results are visible straight away, with the full outcome settling over 2 weeks.',
      },
      {
        title: 'Fully Reversible',
        description: 'Hyaluronic acid fillers can be dissolved with hyaluronidase, offering complete reversibility.',
      },
      {
        title: 'Long-Lasting',
        description: 'Depending on the product and area, results typically last between 9 and 18 months.',
      },
      {
        title: 'Minimal Downtime',
        description: 'Most patients resume normal activities the same day, with only minor potential for bruising.',
      },
    ],
    process: [
      {
        number: '01',
        title: 'Consultation & Planning',
        description: 'A detailed facial assessment is conducted. Your practitioner maps out target areas and discusses the amount of product needed.',
      },
      {
        number: '02',
        title: 'Preparation',
        description: 'The skin is cleansed and a topical anaesthetic cream is applied for 20 to 30 minutes prior to treatment for your comfort.',
      },
      {
        number: '03',
        title: 'Treatment',
        description: 'Filler is placed precisely using needle or cannula technique. Pressure and massage are applied to achieve a smooth, natural result.',
      },
      {
        number: '04',
        title: 'Review',
        description: 'A 2-week follow-up assessment ensures symmetry and allows for any fine-tuning if required.',
      },
    ],
    faq: [
      {
        question: 'Are dermal fillers safe?',
        answer: 'When administered by a qualified medical professional using licensed products, dermal fillers are very safe. We only use CE-marked, hyaluronic acid-based products from leading manufacturers.',
      },
      {
        question: 'Will I look overdone?',
        answer: 'Our philosophy is enhancement, not transformation. We use conservative, layered approaches and assess your facial proportions carefully to ensure results look natural and balanced.',
      },
      {
        question: 'What is the difference between fillers and anti-wrinkle injections?',
        answer: 'Anti-wrinkle injections relax muscles to reduce dynamic lines. Fillers add volume and structure. They are complementary treatments that address different concerns.',
      },
    ],
  },
  {
    slug: 'laser-resurfacing',
    title: 'Laser Resurfacing',
    category: 'Skin',
    shortDescription:
      'Transform skin texture, tone, and clarity with advanced laser technology targeting pigmentation, scarring, and signs of ageing.',
    description:
      'Laser resurfacing uses controlled light energy to target and remodel the skin at a cellular level. By stimulating collagen production and removing damaged surface layers, it effectively addresses a wide range of skin concerns including acne scarring, sun damage, uneven tone, and fine lines.\n\nWe offer both ablative and non-ablative laser options, selected based on your skin type, concerns, and desired downtime. Fractional technology enables targeted treatment while preserving surrounding tissue, accelerating healing and reducing recovery time.\n\nA series of treatments is typically recommended for optimal results, though some patients see significant improvement after a single session. Our clinical team will design a treatment programme tailored to your skin\'s specific needs.',
    benefits: [
      {
        title: 'Targets Multiple Concerns',
        description: 'Effective for acne scars, sun damage, hyperpigmentation, enlarged pores, and fine lines.',
      },
      {
        title: 'Stimulates Collagen',
        description: 'Triggers the skin\'s natural repair response, improving firmness and texture over time.',
      },
      {
        title: 'Clinically Proven',
        description: 'Backed by decades of clinical evidence and delivered using medical-grade laser technology.',
      },
      {
        title: 'Lasting Improvement',
        description: 'Results continue to improve for 3 to 6 months post-treatment as collagen remodelling occurs.',
      },
    ],
    process: [
      {
        number: '01',
        title: 'Skin Assessment',
        description: 'A detailed skin analysis is conducted to determine your Fitzpatrick skin type, identify concerns, and select the most appropriate laser protocol.',
      },
      {
        number: '02',
        title: 'Preparation',
        description: 'Depending on the treatment, a prescribed skincare programme may be required for 2 to 4 weeks prior to optimise results and minimise risk.',
      },
      {
        number: '03',
        title: 'Treatment',
        description: 'The laser is passed over the skin in a precise pattern. Cooling is applied throughout for comfort. Sessions typically last 30 to 60 minutes.',
      },
      {
        number: '04',
        title: 'Recovery & Review',
        description: 'A structured post-treatment skincare plan is provided. Results are reviewed at 4 to 6 weeks to assess progress and plan next steps.',
      },
    ],
    faq: [
      {
        question: 'How much downtime should I expect?',
        answer: 'This depends on the laser type and intensity. Non-ablative treatments may have no downtime. Ablative resurfacing may require 5 to 7 days of healing. Your practitioner will advise based on your selected protocol.',
      },
      {
        question: 'Is laser resurfacing safe for darker skin tones?',
        answer: 'Yes, with the right laser selection and parameters. Certain laser types are safer for darker skin tones. A thorough assessment determines the appropriate device and settings for your Fitzpatrick skin type.',
      },
      {
        question: 'How many sessions do I need?',
        answer: 'This varies by concern and laser type. Some patients achieve their goals in a single session; others benefit from a course of 3 to 6 treatments spaced 4 to 8 weeks apart.',
      },
    ],
  },
  {
    slug: 'hair-restoration',
    title: 'Hair Restoration PRP',
    category: 'Hair',
    shortDescription:
      'Stimulate natural hair regrowth and restore density using Platelet-Rich Plasma therapy, a proven, regenerative approach to hair loss.',
    description:
      'Platelet-Rich Plasma (PRP) therapy for hair restoration harnesses the growth factors found in your own blood to stimulate dormant follicles, slow hair loss, and encourage new growth. The treatment is entirely natural, using no synthetic substances.\n\nA small sample of your blood is processed to concentrate the platelets, which are then injected into targeted areas of the scalp. The growth factors within the PRP activate hair follicles, improving both the density and quality of existing hair.\n\nPRP is most effective in the early to mid stages of hair loss (Norwood scale 1 to 4) and works particularly well when combined with a medical-grade hair supplement programme. Most patients begin to see results after 3 sessions, with optimal outcome visible at 6 months.',
    benefits: [
      {
        title: '100% Natural',
        description: 'Uses your own blood\'s growth factors, no synthetic substances or chemicals involved.',
      },
      {
        title: 'Stimulates Dormant Follicles',
        description: 'Reactivates hair follicles that have slowed or stopped producing, improving density and thickness.',
      },
      {
        title: 'Minimal Discomfort',
        description: 'A topical numbing cream is applied beforehand, making the procedure highly tolerable.',
      },
      {
        title: 'No Systemic Side Effects',
        description: 'As the treatment uses your own plasma, the risk of allergic reaction or systemic side effects is negligible.',
      },
    ],
    process: [
      {
        number: '01',
        title: 'Assessment',
        description: 'A trichological assessment evaluates the pattern, degree, and potential cause of your hair loss to determine suitability for PRP.',
      },
      {
        number: '02',
        title: 'Blood Draw',
        description: 'A small blood sample (approx. 30ml) is taken from your arm and placed into a centrifuge to separate and concentrate the platelets.',
      },
      {
        number: '03',
        title: 'Scalp Treatment',
        description: 'After applying numbing cream, the prepared PRP is injected into areas of thinning or loss using a fine-needle technique.',
      },
      {
        number: '04',
        title: 'Programme & Review',
        description: 'A course of 3 sessions, 4 to 6 weeks apart, is recommended. Progress photos are taken at each visit to track improvement.',
      },
    ],
    faq: [
      {
        question: 'Who is a good candidate for PRP hair restoration?',
        answer: 'PRP is most effective for patients in the early to mid stages of androgenetic alopecia (pattern hair loss). It is less effective for advanced hair loss where follicles are completely dormant. A consultation assessment will determine your suitability.',
      },
      {
        question: 'How soon will I see results?',
        answer: 'Initial shedding reduction is often noticed after the first session. Visible regrowth and increased density are typically observed after the third session, with full results at 6 months.',
      },
      {
        question: 'How often do I need maintenance treatment?',
        answer: 'After the initial course of 3 sessions, most patients benefit from a maintenance session every 6 to 12 months to sustain results.',
      },
    ],
  },
  {
    slug: 'body-contouring',
    title: 'Body Contouring',
    category: 'Body',
    shortDescription:
      'Reduce stubborn fat deposits, tighten loose skin, and redefine your silhouette with non-surgical body contouring technology.',
    description:
      'Non-surgical body contouring uses advanced energy-based technologies, including radiofrequency, ultrasound, and cryolipolysis, to reduce localised fat, tighten skin, and improve body shape without surgery or anaesthesia.\n\nThese treatments work by selectively targeting fat cells or stimulating collagen and elastin production in the dermis. Over a series of sessions, treated areas show measurable reduction in circumference and visible improvement in skin laxity.\n\nCommon treatment areas include the abdomen, flanks, thighs, arms, and submental (under-chin) region. Treatment plans are customised based on your anatomy, the technology best suited to your concerns, and your lifestyle goals.',
    benefits: [
      {
        title: 'No Surgery, No Needles',
        description: 'Achieve measurable body improvements without incisions, anaesthesia, or injectable treatments.',
      },
      {
        title: 'Multiple Technologies',
        description: 'We select the optimal device for your specific concern, fat reduction, skin tightening, or both.',
      },
      {
        title: 'Comfortable Treatment',
        description: 'Most patients describe a warm or cooling sensation. Sessions are comfortable enough to relax during.',
      },
      {
        title: 'Progressive Results',
        description: 'Results develop over 6 to 12 weeks as the body naturally eliminates treated fat cells and rebuilds collagen.',
      },
    ],
    process: [
      {
        number: '01',
        title: 'Body Assessment',
        description: 'Measurements, photographs, and a physical assessment identify the most appropriate technology and target areas for your goals.',
      },
      {
        number: '02',
        title: 'Treatment Planning',
        description: 'A bespoke treatment programme is designed, specifying the device, settings, number of sessions, and target areas.',
      },
      {
        number: '03',
        title: 'Sessions',
        description: 'Treatment sessions are typically 45 to 90 minutes. Most programmes involve 4 to 8 sessions spaced 1 to 2 weeks apart.',
      },
      {
        number: '04',
        title: 'Progress Review',
        description: 'Measurements and photographs are taken mid-programme and at completion to document and assess results.',
      },
    ],
  },
  {
    slug: 'iv-wellness',
    title: 'IV Wellness Therapy',
    category: 'Wellness',
    shortDescription:
      'Replenish essential nutrients, boost energy, and support overall wellbeing with intravenous vitamin and mineral infusions.',
    description:
      'IV Wellness Therapy delivers vitamins, minerals, and amino acids directly into the bloodstream, bypassing the digestive system for 100% bioavailability. This allows far higher therapeutic concentrations to be achieved than is possible through oral supplementation.\n\nOur infusions are formulated by medical professionals and tailored to your individual health goals, whether that is energy enhancement, immune support, skin radiance, hangover recovery, or athletic performance optimisation. Each session is administered by a qualified nurse or doctor.\n\nA pre-treatment blood screen and health questionnaire ensures the formulation is safe and appropriate for you. Sessions last 30 to 60 minutes in our relaxing clinical environment.',
    benefits: [
      {
        title: '100% Bioavailability',
        description: 'Bypasses the digestive system, delivering nutrients directly to cells at therapeutic levels.',
      },
      {
        title: 'Rapid Effect',
        description: 'Many patients notice improvements in energy, clarity, and wellbeing within hours of treatment.',
      },
      {
        title: 'Fully Personalised',
        description: 'Formulations are tailored to your individual health goals, blood markers, and lifestyle.',
      },
      {
        title: 'Medically Supervised',
        description: 'Every infusion is prescribed and administered by a qualified medical professional.',
      },
    ],
    process: [
      {
        number: '01',
        title: 'Health Screening',
        description: 'A health questionnaire and optional blood test identifies deficiencies and ensures your infusion is safe and targeted.',
      },
      {
        number: '02',
        title: 'Formulation',
        description: 'Your bespoke infusion is prepared by our clinical team based on your health profile and goals.',
      },
      {
        number: '03',
        title: 'Infusion',
        description: 'A small cannula is placed in a vein and the infusion is delivered over 30 to 60 minutes while you relax.',
      },
      {
        number: '04',
        title: 'Ongoing Plan',
        description: 'Depending on your goals, a schedule of regular infusions or one-off sessions is recommended.',
      },
    ],
    faq: [
      {
        question: 'Is IV therapy safe?',
        answer: 'Yes, when administered by qualified medical professionals. We conduct a health screen before every treatment and use only pharmaceutical-grade vitamins and minerals.',
      },
      {
        question: 'How often should I have IV therapy?',
        answer: 'This depends on your goals. Some patients benefit from a monthly maintenance infusion; others come weekly during periods of high stress or physical training. Your practitioner will advise.',
      },
      {
        question: 'Can I have IV therapy if I take medication?',
        answer: 'Some medications may interact with certain nutrients. Your full medication list is reviewed as part of the pre-treatment health screening to ensure your safety.',
      },
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────
export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return treatments.map((t) => t.slug);
}
