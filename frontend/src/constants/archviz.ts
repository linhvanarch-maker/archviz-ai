// ── ArchViz AI Constants ────────────────────────────────────────────────────
// Domain-specific data cho kiến trúc Việt Nam: vật liệu, phong cách, transform tools

export interface TransformItem {
  label: string;
  icon: string;
  intent: string;
}

export interface TransformCategory {
  category: string;
  items: TransformItem[];
}

export const TRANSFORM_TOOLS: TransformCategory[] = [
  {
    category: "RENDERING & REALISM",
    items: [
      {
        label: "Photoreal",
        icon: "photo_camera",
        intent: "High-quality Vietnamese street-style photography aesthetic. Professional street photography, natural daylight, realistic textures. STRICTLY PRESERVE original geometry, camera angle, and architectural structure. DO NOT add new buildings, houses or additional architecture. Use authentic and clean Vietnamese materials: smooth plaster, well-maintained wood, clean ceramic tiles. No moss, no cracks, no dirt, no breakage. The building must look well-preserved and in active use. Photorealistic, 8k, sharp focus, natural color grading.",
      },
      {
        label: "Enhance",
        icon: "auto_awesome",
        intent: "Make this render photorealistic, add shadows, contrast light, enhance textures",
      },
      {
        label: "Dev Finish",
        icon: "check_circle",
        intent: "Transform this image into a clean developer-finish architectural visualization. Keep original geometry, layout and camera unchanged. Apply smooth painted white walls, finished floors, clean ceilings, installed windows and doors, neutral modern materials. Empty unfurnished space prepared for handover.",
      },
    ],
  },
  {
    category: "LIGHTING & ATMOS",
    items: [
      {
        label: "Moody Night",
        icon: "dark_mode",
        intent: "Convert the daytime scene into a moody nighttime shot. bright moon as the primary light source from window unvisible in the scene, soft rim light outlining objects. Warm interior lights contrasting with cool moonlight tones. Add slight atmospheric haze or moisture for a cinematic feel. Realistic shadows, natural night white balance, high quality, dramatic cinematic look.",
      },
      {
        label: "Night Vibe",
        icon: "lightbulb",
        intent: "Change day to night, add LED strips, turn artificial lights on, make cozy vibe",
      },
      {
        label: "Night to Day",
        icon: "wb_sunny",
        intent: "Change night to day",
      },
      {
        label: "Golden Hour",
        icon: "wb_twilight",
        intent: "Change the mood to golden hour, add low, magical sun rays gently piercing through the shadows",
      },
      {
        label: "Brighter",
        icon: "light_mode",
        intent: "Make a little bit brighter",
      },
      {
        label: "Foggy",
        icon: "blur_on",
        intent: "Add fog",
      },
      {
        label: "Volumetric",
        icon: "waves",
        intent: "Add volumetric rays coming behind trees shadow, enhance atmosphere",
      },
    ],
  },
  {
    category: "WEATHER & SEASON",
    items: [
      {
        label: "Rainy Day",
        icon: "water_drop",
        intent: "Change the scene to a rainy day. Overcast sky, soft diffused light, wet surfaces, realistic rain outside the windows, subtle reflections on the ground, moody atmosphere, natural lighting, photorealistic render",
      },
      {
        label: "Autumn",
        icon: "eco",
        intent: "Ultra-realistic autumn scene with a moody atmosphere, overcast sky, soft diffused light, light mist in the air, wet ground reflecting subtle light, deep warm browns and muted orange tones mixed with cool grey shadows, fallen leaves scattered naturally, damp textures, cinematic mood, realistic fog depth, high detail, natural color grading, professional photography, shallow depth of field, sharp focus, 8k, photorealistic",
      },
      {
        label: "Winter",
        icon: "ac_unit",
        intent: "Transfer this image to winter, add snow",
      },
    ],
  },
  {
    category: "DETAIL & FOCUS",
    items: [
      {
        label: "Macro Texture",
        icon: "center_focus_strong",
        intent: "Extreme macro close-up of a material surface from the scene, revealing fine texture and realistic imperfections, with surrounding objects softly visible in the background, cinematic macro photography with shallow depth of field.",
      },
      {
        label: "Life Closeup",
        icon: "person_pin_circle",
        intent: "Close-up of everyday activity within the environment, natural interaction and cinematic depth of field.",
      },
      {
        label: "Detail Focus",
        icon: "filter_center_focus",
        intent: "Create a beautiful closeup shot showing one of the detail of this image, use depth of field to blur, add bokeh, show details on focus, add some detailed, small objects",
      },
      {
        label: "Animal",
        icon: "pets",
        intent: "Cinematic close-up of an animal naturally behaving within the environment",
      },
    ],
  },
  {
    category: "EDITORIAL & DRAWING",
    items: [
      {
        label: "Moodboard",
        icon: "grid_view",
        intent: "Create a high-end interior design material moodboard using only the materials present in the 3D scene. Arrange the samples in an artistic, layered composition similar to luxury architectural boards, with realistic textures, shadows, and soft studio lighting. Include stone, wood, fabric, metal, and color swatches exactly as they appear in the scene, presented as physical material tiles and samples. Use a refined neutral background, elegant styling, and balanced layout to achieve a premium, photorealistic moodboard aesthetic",
      },
      {
        label: "Portfolio",
        icon: "view_quilt",
        intent: "Create a high-end editorial design presentation board based on the provided project. Do not redesign the project - only present it in a premium portfolio style. The board should include: one large dominant isometric cut-away axonometric view as the focal point, a front elevation of the main wall with subtle dimensions, a secondary elevation highlighting materials and finishes, curated material swatches arranged aesthetically, minimal but elegant annotations. Layout: asymmetrical but balanced, strong focal point, generous white space, refined alignment, soft drop shadows, subtle paper texture background. Style: modern editorial, Behance premium, minimal Scandinavian.",
      },
      {
        label: "Blueprints",
        icon: "architecture",
        intent: "Create technical drawings of this object",
      },
      {
        label: "3D Section",
        icon: "layers",
        intent: "Create a 3D cross-section in axonometric ortographic projection, visible from top 3/4",
      },
      {
        label: "Mockup",
        icon: "model_training",
        intent: "Close-up of an architectural mockup model, axonometry view, depth of field, closeup, bokeh, highly detailed scale model of this space, clean materials like white foam board, wood, acrylic, precise miniature windows and structures, placed on a presentation table, soft studio lighting",
      },
      {
        label: "Sketch",
        icon: "brush",
        intent: "Convert the photo into a pencil sketch",
      },
      {
        label: "Logo",
        icon: "category",
        intent: "Create a 2d logo of this object",
      },
    ],
  },
  {
    category: "STATE & CAMERA",
    items: [
      {
        label: "Construction",
        icon: "construction",
        intent: "Transform the scene into a realistic unfinished construction state, exposing raw concrete, structural surfaces and unpainted materials, with visible construction details such as rough textures, installation elements, exposed edges, dust and natural building imperfections while maintaining original architecture.",
      },
      {
        label: "Abandoned",
        icon: "history",
        intent: "Introduce heavy realistic degradation across the entire scene, including strong dirt accumulation, stains, cracks, peeling surfaces, worn edges, material damage, weathering, discoloration, dust and visible aging effects, creating a neglected and deteriorated environment while maintaining the original structure.",
      },
      {
        label: "Drone View",
        icon: "flight",
        intent: "Move the camera to a high drone viewpoint above the scene, revealing a large surrounding environment around the project. Keep the main object clearly visible while preserving original frame proportions and composition.",
      },
      {
        label: "Right View",
        icon: "view_sidebar",
        intent: "Move the camera all the way to the right; show objects from a right-side perspective.",
      },
      {
        label: "Top View",
        icon: "grid_view",
        intent: "Show this space from top",
      },
    ],
  },
  {
    category: "PEOPLE & ASSETS",
    items: [
      { label: "People", icon: "group", intent: "Add people to the image" },
      { label: "Motion People", icon: "motion_photos_on", intent: "Add blurred people in motion" },
      { label: "Add Cars", icon: "directions_car", intent: "Add cars" },
      { label: "Motion Cars", icon: "speed", intent: "Add blurred cars in motion" },
      { label: "Birds", icon: "flutter_dash", intent: "Add small birds in the sky" },
      { label: "Flowers", icon: "local_florist", intent: "Add flowers" },
      { label: "Grass", icon: "grass", intent: "Add grass" },
      { label: "Trees", icon: "forest", intent: "Add trees" },
    ],
  },
];

// ── Material Chips — Vật liệu kiến trúc Việt Nam ─────────────────────────────
export interface ChipItem {
  label: string;
  prompt: string;
}

export interface ChipGroup {
  label: string;
  items: ChipItem[];
}

export const CHIPS: Record<string, ChipGroup> = {
  exterior: {
    label: "Ngói & Tường",
    items: [
      { label: "Ngói mũi hài cổ", prompt: "traditional Vietnamese antique pointed-tip roof tiles (ngói mũi hài), weathered terracotta red, rustic fired ceramic, aged patina with very subtle lichen, overlapping scale pattern" },
      { label: "Ngói hài nâu trầm", prompt: "dark chocolate brown pointed-tip roof tiles, unglazed rough stoneware texture, deep espresso tones, traditional Vietnamese craftsmanship" },
      { label: "Ngói vảy cá đỏ", prompt: "Vietnamese fish-scale roof tiles (ngói vảy cá), vibrant burnt orange ceramic, uniform overlapping pattern, classic Northern village style" },
      { label: "Ngói âm dương", prompt: "Hoi An style yin-yang roof tiles, alternating concave and convex ceramic tiles, weathered terracotta with light green moss patina in crevices" },
      { label: "Ngói lưu ly xanh", prompt: "royal glazed celadon green tiles (ngói lưu ly), high gloss vitreous finish, imperial Vietnamese palace style" },
      { label: "Gạch Bát Tràng", prompt: "exposed Bat Trang fired brick walls, warm terracotta tones, flush white mortar joints, clean rustic architectural finish" },
      { label: "Tường vàng cổ", prompt: "classic Hoi An yellow plaster walls, warm ochre-gold tone, smooth matte finish, authentic colonial-vietnamese aesthetic" },
      { label: "Đá ong xám", prompt: "grey laterite (đá ong) stone walls, characteristic honeycomb porous texture, weathered natural grey-brown tones, rustic monolithic feel" },
    ],
  },
  interior: {
    label: "Gỗ & Cấu trúc",
    items: [
      { label: "Gỗ Lim Nam Phi", prompt: "dark Ironwood (Gỗ Lim) structural columns and beams, deep reddish-brown grain, heavy dense texture, high natural oil sheen, sturdy traditional joinery" },
      { label: "Gỗ Gụ mật", prompt: "Vietnamese Sindora wood (Gỗ Gụ), dark honey-brown with black veins, fine tight grain, polished silk-like finish, elegant and formal" },
      { label: "Gỗ Mít vàng", prompt: "Jackfruit wood (Gỗ Mít) columns, warm amber-yellow turning to deep orange with age, matte natural finish, traditional spiritual architecture style" },
      { label: "Gỗ Xoan đào", prompt: "Vietnamese Mahogany (Gỗ Xoan), warm pinkish-brown tone, straight visible grain, smooth matte finish, rustic and light" },
      { label: "Xà gồ chạm khắc", prompt: "intricately hand-carved wooden roof trusses and purlins, traditional Vietnamese floral and dragon motifs, deep relief carving, dark wood patina" },
      { label: "Cửa bức bàn", prompt: "traditional Vietnamese 'Buc Ban' wooden folding doors, vertical panels with refined carved lower sections, dark aged wood, antique bronze hardware" },
    ],
  },
  planning: {
    label: "Sân vườn",
    items: [
      { label: "Sân lát gạch đỏ", prompt: "traditional village courtyard paved with square red ceramic bricks (gạch lá nem), 45-degree diagonal pattern, clean mortar joints, warm terracotta atmosphere" },
      { label: "Đá xanh Thanh Hóa", prompt: "Thanh Hoa blue-grey stone pavement, large rectangular slabs, honed matte finish, cool grey tones with natural mineral textures" },
      { label: "Đá băm nhám", prompt: "bush-hammered grey stone courtyard, rough non-slip surface, authentic outdoor stone texture, clean grey palette" },
      { label: "Gạch đồng tiền", prompt: "ceramic courtyard tiles with embossed 'dong tien' coin patterns, traditional prosperity symbol, burnt orange ceramic" },
    ],
  },
  tomb: {
    label: "Khu mộ",
    items: [
      { label: "Mộ đá xanh nguyên khối", prompt: "tomb crafted from monolithic Thanh Hoa blue stone, sophisticated relief carvings of lotus and clouds, polished edges, cool grey-blue tone" },
      { label: "Mộ đá ong vàng", prompt: "rustic laterite stone tomb, warm amber-orange honeycomb texture, traditional square stepped design, weathered natural character" },
      { label: "Mộ trát vôi truyền thống", prompt: "plastered brick tomb in traditional style, ivory-white or pale yellow lime wash, elegant classic curves, well-maintained" },
      { label: "Lan can đá chạm", prompt: "carved stone balustrades surrounding the tomb area, traditional Vietnamese motifs, blue-grey stone, refined craftsmanship" },
    ],
  },
};

export const NEGATIVE_PROMPT =
  "blurry, low resolution, bad anatomy, distorted architecture, messy, low quality, artifact, watermark, text";

export const IMAGE_MODELS = [
  "🍌 Nano Banana 2",
  "🍌 Nano Banana Pro",
  "Imagen 4",
];

export const VIDEO_MODELS = [
  "Omni Flash",
  "Veo 3.1 - Lite",
  "Veo 3.1 - Fast",
  "Veo 3.1 - Quality",
];
