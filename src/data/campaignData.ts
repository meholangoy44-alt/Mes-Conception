export interface ScriptScene {
  sceneNumber: number;
  timeCode: string;
  shotType: string;
  visualAction: string;
  soundEffects: string;
  dialogueLingala: string;
  dialogueFrench: string;
  directorNote: string;
}

export interface CampaignScript {
  id: string;
  title: string;
  subtitle: string;
  targetCategory: 'moto' | 'camion' | 'taxi' | 'general';
  slogan: string;
  sloganTranslation: string;
  durationSeconds: number;
  format: 'vertical_tiktok' | 'horizontal_tv' | 'social_square';
  location: string;
  tone: string;
  summary: string;
  keyAdvice: string[];
  imageKey: 'hero' | 'moto' | 'camion' | 'studio';
  scenes: ScriptScene[];
}

export interface StepGuide {
  id: number;
  title: string;
  subtitle: string;
  timeframe: string;
  summary: string;
  steps: {
    label: string;
    description: string;
    kinshasaTip: string;
  }[];
  checklist: string[];
}

export const PRESET_SCRIPTS: CampaignScript[] = [
  {
    id: 'script-wewa-casque',
    title: 'Casque Ezali Bomoi (Le Casque, c\'est la Vie)',
    subtitle: 'Campagne de sensibilisation pour motards Wewa et passagers',
    targetCategory: 'moto',
    slogan: 'Lata casque, batela bomoi na yo mpe ya libota !',
    sloganTranslation: 'Porte ton casque, protège ta vie et l\'avenir de ta famille !',
    durationSeconds: 45,
    format: 'vertical_tiktok',
    location: 'Rond-point Victoire & Avenue Université, Kinshasa',
    tone: 'Émotionnel et Responsabilisant',
    summary: 'Un jeune motard Wewa pressé par un client refuse de démarrer sans que son passager ne mette le casque de sécurité fourni, rappelant que chaque vie compte.',
    imageKey: 'moto',
    keyAdvice: [
      'Exiger le port du casque pour le conducteur ET le passager sans exception.',
      'Refuser la surcharge (interdire 3 ou 4 personnes sur une moto 125cc).',
      'Respecter les feux de circulation au carrefour même quand la voie semble libre.'
    ],
    scenes: [
      {
        sceneNumber: 1,
        timeCode: '00:00 - 00:10',
        shotType: 'Plan moyen dynamique en travelling',
        visualAction: 'À l\'arrêt au Rond-Point Victoire sous le soleil chaud. Un client en costume crie au motard : "Wewa, ngonga ekei, kende mbangu !". Le motard ajuste son rétroviseur.',
        soundEffects: 'Klaxons stridents, clameur des vendeurs de recharge, vrombissement rauque d\'une moto Bajaj 125.',
        dialogueLingala: 'Masta, ngonga ekei na mosala ! Sala noki tokatisa demi-terrain !',
        dialogueFrench: 'Mon frère, je suis en retard au boulot ! Fais vite, traverse vite en contresens !',
        directorNote: 'Caméra à l\'épaule pour capter la nervosité du client et le calme posé du motard.'
      },
      {
        sceneNumber: 2,
        timeCode: '00:10 - 00:25',
        shotType: 'Gros plan sur le visage et le casque',
        visualAction: 'Le motard coupe le moteur. Il sort un second casque propre de son coffre et le tend avec fermeté au client.',
        soundEffects: 'Coupure nette du moteur, silence soudain dans le cadre.',
        dialogueLingala: 'Kaka soki olati casque oyo nde tokokende. Mbongo ya course ekofuta liwa te. Bana na yo bazali kozela yo na ndako.',
        dialogueFrench: 'C\'est seulement si tu mets ce casque qu\'on partira. L\'argent d\'une course ne payera jamais un deuil. Tes enfants t\'attendent à la maison.',
        directorNote: 'Cadrer le regard dans les yeux. Éclairage valorisant le conducteur comme un héros responsable.'
      },
      {
        sceneNumber: 3,
        timeCode: '00:25 - 00:45',
        shotType: 'Plan large élégant au ralenti (Slow motion)',
        visualAction: 'Le client hésite, puis sourit et clipse la jugulaire du casque. Ils s\'élancent calmement en respectant le robot roulant au feu vert.',
        soundEffects: 'Sifflet bienveillant de l\'agent de la PCR qui salue le motard du pouce, beat musical d\'afrobeats chaleureux.',
        dialogueLingala: 'Mokonzi ya nzela, ye moto akitisaka mbangu mpe alataka casque !',
        dialogueFrench: 'Le vrai patron de la route, c\'est celui qui ralentit et porte son casque !',
        directorNote: 'Bandeau final avec le logo de la campagne et numéro d\'urgence SAMU Kinshasa.'
      }
    ]
  },
  {
    id: 'script-camion-angle-mort',
    title: 'Keba na Kalo (Attention à l\'Angle Mort du Camion)',
    subtitle: 'Campagne de sécurité pour les poids lourds et véhicules légers',
    targetCategory: 'camion',
    slogan: 'Soki omoni chauffeur te na miroir, ye mpe azali komona yo te !',
    sloganTranslation: 'Si tu ne vois pas le chauffeur dans son rétroviseur, lui non plus ne te voit pas !',
    durationSeconds: 50,
    format: 'horizontal_tv',
    location: 'Avenue Poids Lourds & Boulevard Lumumba (Pont Matete)',
    tone: 'Démonstratif et Choc pédagogique',
    summary: 'Démonstration visuelle saisissante sur l\'Avenue Poids Lourds : un chauffeur de semi-remorque montre aux motards et piétons la zone invisible où ils risquent d\'être écrasés.',
    imageKey: 'camion',
    keyAdvice: [
      'Garder au moins 5 mètres de distance derrière un camion et ne jamais le dépasser par la droite.',
      'Savoir que la cabine haute empêche le conducteur de voir les obstacles sous son pare-brise.',
      'Vérifier régulièrement l\'état des freins à air comprimé avant d\'emprunter les descentes de By-Pass.'
    ],
    scenes: [
      {
        sceneNumber: 1,
        timeCode: '00:00 - 00:15',
        shotType: 'Vue aérienne plongeante (Plan zénithal)',
        visualAction: 'Avenue Poids Lourds. Un camion-citerne de 30 tonnes tourne lentement à droite. Une moto avec deux passagers tente de se faufiler par la droite dans l\'angle mort.',
        soundEffects: 'Souffle puissant des freins à air comprimé, ronronnement lourd du moteur diesel.',
        dialogueLingala: 'Kalo ya droite ezali lilita ya kimya kimya ! Moto azali komona te !',
        dialogueFrench: 'L\'angle mort à droite est un piège invisible ! Le motard ne se rend pas compte du danger !',
        directorNote: 'Graphisme en surimpression rouge au sol montrant la zone invisible de 3 mètres.'
      },
      {
        sceneNumber: 2,
        timeCode: '00:15 - 00:35',
        shotType: 'Caméra subjective depuis le siège du chauffeur',
        visualAction: 'Le chauffeur chevronné regarde son rétroviseur droit : il ne voit rien ! Au dernier moment, un klaxon d\'alerte retentit. Il freine d\'urgence.',
        soundEffects: 'Grincement puissant des essieux, pneu qui crisse, arrêt à 10 centimètres de la roue avant de la moto.',
        dialogueLingala: 'Ndeko motard, olingi kokufa na kalo ya camion ? Bima kuna, zalá pembeni !',
        dialogueFrench: 'Mon frère motard, tu veux mourir dans l\'angle mort ? Dégage de là, reste visible !',
        directorNote: 'Le visage du motard passe de l\'insouciance à la prise de conscience totale.'
      },
      {
        sceneNumber: 3,
        timeCode: '00:35 - 00:50',
        shotType: 'Plan moyen solidaire au bord de la route',
        visualAction: 'Le chauffeur de camion descend et explique calmement au jeune motard avec la main sur son épaule : "Tokabola nzela na mayele".',
        soundEffects: 'Klaxon grave et rassurant du camion, voix-off solennelle en Lingala et Français.',
        dialogueLingala: 'Nzela ezali ya biso banso. Totosana mpo na bomoi !',
        dialogueFrench: 'La route appartient à tous. Respectons nos distances pour sauver nos vies !',
        directorNote: 'Texte d\'avertissement officiel du CNPR et de la PCR avec infographie des 4 angles morts.'
      }
    ]
  },
  {
    id: 'script-taxi207-vitesse',
    title: 'Demi-Terrain ya Liwa (Le Demi-Tour Meurtrier du 207)',
    subtitle: 'Campagne pour chauffeurs de taxi-bus 207, Ketch et transports urbains',
    targetCategory: 'taxi',
    slogan: 'Versements ekoki kozongisa bomoi te ! Toleka malamu.',
    sloganTranslation: 'Le versement journalier ne ressuscitera personne ! Roulons prudemment.',
    durationSeconds: 45,
    format: 'vertical_tiktok',
    location: 'Boulevard Lumumba vers Échangeur de Limete',
    tone: 'Dramatique puis Pragmatique',
    summary: 'Un chauffeur de minibus 207 pressé d\'encaisser des courses freine au milieu de l\'avenue sans clignotant pour ramasser un client, provoquant un carambolage évité de justesse.',
    imageKey: 'hero',
    keyAdvice: [
      'Ne jamais s\'arrêter brusquement en plein milieu de la chaussée pour charger un client.',
      'Toujours utiliser les arrêts de bus officiels et actionner les clignotants.',
      'Ne pas céder à la panique du versement journalier au détriment de la sécurité.'
    ],
    scenes: [
      {
        sceneNumber: 1,
        timeCode: '00:00 - 00:12',
        shotType: 'Gros plan sur le tableau de bord et les mains du chauffeur',
        visualAction: 'Minibus 207 jaune et bleu. Le receveur crie par la portière : "Gare Centrale ! 1000 Francs !". Le chauffeur voit un client agiter la main et braque sèchement.',
        soundEffects: 'Cri du receveur "Bikela !", grincement de freins métalliques, musique kando forte.',
        dialogueLingala: 'Receveur : "Tuta ye ! Yango wana client ! Mata noki !" Chauffeur : "Télémá demi-terrain !"',
        dialogueFrench: 'Receveur : "Freine sec ! Voilà le client ! Monte vite !" Chauffeur : "Arrêt en plein milieu !"',
        directorNote: 'Plan mouvementé traduisant l\'anarchie et le danger de l\'arrêt imprévu.'
      },
      {
        sceneNumber: 2,
        timeCode: '00:12 - 00:28',
        shotType: 'Plan extérieur avec travelling latéral rapide',
        visualAction: 'Derrière le 207, une voiture Ketch jaune et deux motos pilent pour éviter l\'impact. Les passagers à l\'intérieur du bus sont violemment secoués.',
        soundEffects: 'Klaxons furieux, cris d\'effroi d\'une maman portant un bébé dans le bus.',
        dialogueLingala: 'Maman passager : "Chauffeur, olingi koboma biso mpo na 1000 FC ? Biso tozali mabota !"',
        dialogueFrench: 'Maman passagère : "Chauffeur, tu veux nous tuer pour 1000 Francs ? Nous sommes des pères et mères de famille !"',
        directorNote: 'Zoom sur le visage du chauffeur qui prend conscience de la frayeur du nourrisson.'
      },
      {
        sceneNumber: 3,
        timeCode: '00:28 - 00:45',
        shotType: 'Plan fixe posé et rassurant',
        visualAction: 'Le chauffeur fait son mea culpa, se range proprement à l\'arrêt autorisé sur le bas-côté et s\'excuse auprès de ses passagers.',
        soundEffects: 'Moteur au ralenti, sonnerie douce de fin de spot.',
        dialogueLingala: 'Chauffeur : "Bolimbisa nga. Mbongo ya lelo ekoboma lobi te. Totambola na pete."',
        dialogueFrench: 'Chauffeur : "Pardonnez-moi. L\'argent d\'aujourd\'hui ne détruira pas demain. Roulons sereinement."',
        directorNote: 'Slogan écrit en lettres grasses jaunes et blanches : "Chauffeur ya lokumu, azali chauffeur ya mayele".'
      }
    ]
  },
  {
    id: 'script-alcool-nuit',
    title: 'Mokili ya Suka Te (L\'Alcool et la Nuit à Bandal)',
    subtitle: 'Campagne de nuit contre la conduite sous l\'effet de l\'alcool et des stupéfiants',
    targetCategory: 'general',
    slogan: 'Soki omeli masanga, sala appel na taxi to tika camarade akumba !',
    sloganTranslation: 'Si tu as bu, commande un taxi ou laisse conduire un ami sobre !',
    durationSeconds: 40,
    format: 'vertical_tiktok',
    location: 'Avenue Kasa-Vubu (Bandalungwa) & Boulevard du 30 Juin à 23h',
    tone: 'Choc et Prévention nocturne',
    summary: 'Après une fête arrosée à Bandal, un jeune veut reprendre sa moto. Ses amis lui confisquent ses clés et lui évitent un accident mortel.',
    imageKey: 'studio',
    keyAdvice: [
      'Désigner un conducteur sobre ("chauffeur désigné") avant toute sortie festive.',
      'Sensibiliser à l\'illusion du contrôle procurée par la bière et le lotoko.',
      'Rappeler que les réverbères éteints et la vitesse nocturne multiplient par 5 le risque mortel.'
    ],
    scenes: [
      {
        sceneNumber: 1,
        timeCode: '00:00 - 00:12',
        shotType: 'Plan moyen ambiance nocturne néon',
        visualAction: 'Terrasse animée à Bandal. Un jeune vacille avec ses clés de moto en main, riant fort avec ses amis.',
        soundEffects: 'Bruits de fête, verres qui trinquent, musique rumba entraînante en fond.',
        dialogueLingala: 'Jeune : "Naza bien ! Nakokumba sans problème ti na Pompage !"',
        dialogueFrench: 'Jeune : "Je suis bien ! Je peux rouler sans problème jusqu\'à Pompage !"',
        directorNote: 'Éclairage d\'ambiance nocturne avec reflets néon colorés sur le visage.'
      },
      {
        sceneNumber: 2,
        timeCode: '00:12 - 00:26',
        shotType: 'Gros plan sur les mains',
        visualAction: 'Son ami pose fermement la main sur les clés et les prend avec un regard sérieux et fraternel.',
        soundEffects: 'Musique qui s\'atténue pour laisser place à la voix de la raison.',
        dialogueLingala: 'Ami : "Te mon frangin ! Olingi kotika biso lelo ? Fungola etikali awa. Tokobenga taxi."',
        dialogueFrench: 'Ami : "Non mon frère ! Tu veux nous quitter ce soir ? Les clés restent ici. On commande un taxi."',
        directorNote: 'Insister sur l\'acte d\'amitié : sauver son ami n\'est pas une honte mais un devoir.'
      },
      {
        sceneNumber: 3,
        timeCode: '00:26 - 00:40',
        shotType: 'Plan de travelling nocturne dans le taxi',
        visualAction: 'Le jeune est assis sur la banquette arrière d\'un taxi sécurisé. Par la vitre, il voit un carambolage plus loin sur l\'avenue et soupire de soulagement.',
        soundEffects: 'Gyrophare de secours silencieux, respiration lourde de reconnaissance.',
        dialogueLingala: 'Moninga ya solo nde ye oyo akopekisa yo kokumba na kolangwa !',
        dialogueFrench: 'Le vrai ami est celui qui t\'empêche de prendre le volant quand tu as bu !',
        directorNote: 'Clôture avec message institutionnel de la sécurité routière congolaise.'
      }
    ]
  }
];

export const METHODOLOGY_STEPS: StepGuide[] = [
  {
    id: 1,
    title: 'Diagnostic & Ciblage Précis',
    subtitle: 'Comprendre les facteurs de risque spécifiques aux routes de Kinshasa',
    timeframe: 'Semaine 1',
    summary: 'Une campagne à Kinshasa échoue si elle utilise un ton moralisateur occidental déconnecté de la débrouille urbaine et de la sociologie des transports locaux.',
    steps: [
      {
        label: 'Segmenter vos cibles prioritaires',
        description: 'Les Wewa (mototaxis 18-35 ans), les chauffeurs de taxi-bus 207 et Ketch (pression financière du versement quotidien), les chauffeurs de poids lourds (fatigue, routes dégradées) et les piétons.',
        kinshasaTip: 'Ne stigmatisez jamais les conducteurs comme des délinquants : valorisez-les en "chefs de famille" et "protecteurs de leurs passagers".'
      },
      {
        label: 'Identifier les axes à haute accidentologie',
        description: 'Boulevard Lumumba (Échangeur Limete - Kingasani), Avenue By-Pass (Mont-Ngafula), Avenue Poids Lourds (Gombe), Route de Matadi (Kinsuka - Delvaux).',
        kinshasaTip: 'Mentionnez explicitement ces carrefours connus dans vos vidéos pour susciter une identification instantanée du public.'
      },
      {
        label: 'Choisir le bon angle narratif',
        description: 'Les vidéos qui fonctionnent le mieux à Kinshasa combinent l\'humour populaire (dérision sur les mauvaises habitudes) et l\'émotion sincère (l\'amour des enfants et de la famille restée à la maison).',
        kinshasaTip: 'Les sketchs avec des comédiens kinois reconnus ont un taux de rétention 4x supérieur aux spots purement institutionnels.'
      }
    ],
    checklist: [
      'Choix d\'une cible prioritaire unique par capsule (1 vidéo = 1 message)',
      'Identification d\'un comportement précis (ex: casque, vitesse, téléphone)',
      'Définition du persona du conducteur kinois'
    ]
  },
  {
    id: 2,
    title: 'Écriture du Scénario & Slogans en Lingala',
    subtitle: 'Créer un script percutant et des expressions mémorables',
    timeframe: 'Semaine 2',
    summary: 'Le Lingala est la langue véhiculaire de la rue kinoise. Les slogans doivent rimer ou utiliser des métaphores fortes ancrées dans le quotidien kinois.',
    steps: [
      {
        label: 'Découpage technique minuté (Hook - Conflit - Résolution)',
        description: 'Format idéal de 30 à 45 secondes. Les 3 premières secondes doivent capter l\'attention immédiatement sur TikTok ou WhatsApp.',
        kinshasaTip: 'Commencer par un son familier : le bruit d\'un moteur de Wewa ou le cri d\'un chargeur de bus "Victoire ! Deux places !".'
      },
      {
        label: 'Création du slogan signature bilingue',
        description: 'Associer une formule courte en Lingala rythmée avec un sous-titrage clair en Français.',
        kinshasaTip: 'Exemples efficaces : "Casque ezali bomoi", "Mbongo ya versement ekofuta lilita te", "Tokabola nzela na mayele".'
      },
      {
        label: 'Validation auprès de vrais conducteurs',
        description: 'Faites relire les répliques par un chauffeur de parking ou un motard pour vérifier que le vocabulaire "n\'est pas trop soutenu ni artificiel".',
        kinshasaTip: 'Le jargon kinois évolue vite. Utilisez les expressions actuelles respectueuses.'
      }
    ],
    checklist: [
      'Scénario découpé en 3 à 4 plans maximum',
      'Dialogue en Lingala naturel avec traduction française',
      'Slogan final facile à répéter'
    ]
  },
  {
    id: 3,
    title: 'Autorisations & Sécurisation du Tournage',
    subtitle: 'Naviguer dans les démarches administratives et policières à Kinshasa',
    timeframe: 'Semaine 3',
    summary: 'Tourner dans les rues de Kinshasa sans encadrement expose l\'équipe à des interruptions par la foule ou des contrôles de police inopinés.',
    steps: [
      {
        label: 'Informer la Police de Circulation Routière (PCR)',
        description: 'Déposer une lettre d\'information auprès du commandement provincial de la PCR et du Commissariat de secteur.',
        kinshasaTip: 'Inviter un agent de la PCR en uniforme à participer au tournage pour valider le message et sécuriser le plateau.'
      },
      {
        label: 'Contacter les chefs de parking et syndicats (ACCO & Wewa)',
        description: 'Prévenir le chef de ligne ou président du parking de taxis où vous souhaitez filmer. Présentez la démarche comme un hommage à leur métier.',
        kinshasaTip: 'Prévoyez des indemnités symboliques et des rafraîchissements (eau minérale, sodas) pour l\'équipe du parking.'
      },
      {
        label: 'Sécurité physique de l\'équipe et du matériel',
        description: 'Toujours porter des gilets haute visibilité jaunes ou oranges sur la chaussée. Délimiter un périmètre de sécurité avec des cônes de signalisation.',
        kinshasaTip: 'Ne jamais bloquer complètement une artère majeure sans déviation policière officielle.'
      }
    ],
    checklist: [
      'Lettre d\'autorisation PCR signée ou accusé de réception',
      'Accord préalable avec le président de parking / syndicat',
      'Gilets fluorescents pour tous les techniciens',
      'Assurance responsabilité civile de tournage'
    ]
  },
  {
    id: 4,
    title: 'Tournage & Spécificités Techniques',
    subtitle: 'Gérer la lumière équatoriale, la poussière et le vacarme urbain',
    timeframe: 'Semaine 4',
    summary: 'La rue de Kinshasa est vivante et bruyante : le défi numéro 1 d\'une vidéo percutante est la qualité du son.',
    steps: [
      {
        label: 'Le défi du son : Micros-cravates HF et bonnettes anti-vent',
        description: 'Le bruit des klaxons et des générateurs noie les micros intégrés aux caméras ou téléphones. Utilisez des micros sans fil (DJI Mic ou Rode Wireless) protégés par des bonnettes en fausse fourrure (deadcat).',
        kinshasaTip: 'Enregistrez toujours 60 secondes d\'ambiance sonore pure du carrefour pour le mixage final.'
      },
      {
        label: 'Maîtriser la lumière équatoriale vive',
        description: 'Entre 11h et 15h, le soleil vertical crée des ombres dures sous les yeux et les casques. Privilégiez les tournages tôt le matin (6h30 - 9h00) ou en fin d\'après-midi (16h00 - 18h00, Golden Hour).',
        kinshasaTip: 'Utilisez un réflecteur blanc ou diffuseur souple pour déboucher le visage du motard sous la visière du casque.'
      },
      {
        label: 'Tourner en format vertical 9:16 en priorité',
        description: '90% des Kinois regardent les vidéos sur smartphone via WhatsApp et TikTok. Cadrez d\'abord en vertical haute définition.',
        kinshasaTip: 'Laissez de l\'espace libre en haut et en bas de l\'écran pour les futurs boutons TikTok et sous-titres.'
      }
    ],
    checklist: [
      'Micros sans fil avec bonnettes anti-bruit testés',
      'Batteries portables de secours (powerbanks)',
      'Chiffons microfibres contre la poussière des routes',
      'Caméra ou smartphone configuré en 4K 60fps'
    ]
  },
  {
    id: 5,
    title: 'Post-Production & Sous-titrage Dynamique',
    subtitle: 'Montage dynamique, étalonnage chaleureux et sous-titres animés',
    timeframe: 'Semaine 5',
    summary: 'Beaucoup d\'utilisateurs regardent les statuts WhatsApp sans le son : les sous-titres bilingues animés sont indispensables.',
    steps: [
      {
        label: 'Rythme de montage dynamique (Cuts toutes les 2-3 secondes)',
        description: 'Évitez les plans fixes trop longs. Alternez vues larges du décor kinois, gros plans émotionnels et inserts sur les gestes de sécurité.',
        kinshasaTip: 'Insérez des transitions sonores bien dosées (bruit d\'avertisseur, son de freinage).'
      },
      {
        label: 'Sous-titres animés en bilingue Français & Lingala',
        description: 'Utilisez des polices grasses et bien contrastées (jaune et blanc avec contour noir) pour que les textes ressortent sur tous les écrans.',
        kinshasaTip: 'Mettez en surbrillance les mots-clés : BOMOI (Vie), CASQUE, TALO (Prix), KEBÁ (Attention).'
      },
      {
        label: 'Mixage audio calibré pour haut-parleurs de smartphone',
        description: 'Les enceintes de téléphones d\'entrée de gamme saturent facilement dans les basses. Égalisez la voix pour qu\'elle soit claire et intelligible.',
        kinshasaTip: 'Ajoutez une musique de fond rythmée locale sans étouffer la voix-off.'
      }
    ],
    checklist: [
      'Sous-titres bilingues vérifiés sans fautes d\'orthographe',
      'Export vidéo au format MP4 compressé optimisé pour WhatsApp (< 15 Mo)',
      'Étalonnage des couleurs mettant en valeur Kinshasa'
    ]
  },
  {
    id: 6,
    title: 'Stratégie de Diffusion Virale & Terrain',
    subtitle: 'Toucher les conducteurs là où ils sont : parkings, WhatsApp et carrefours',
    timeframe: 'Semaine 6',
    summary: 'Une belle vidéo non diffusée ne sauve aucune vie. Il faut investir les canaux informels et officiels de la capitale.',
    steps: [
      {
        label: 'La boucle WhatsApp des chauffeurs (Le canal n°1 à Kinshasa)',
        description: 'Partagez directement la vidéo avec les administrateurs de groupes WhatsApp de motards et de chauffeurs de taxis.',
        kinshasaTip: 'Un fichier vidéo de moins de 10 Mo se transfère instantanément sans consommer trop de mégabytes internet.'
      },
      {
        label: 'Partenariats avec les influenceurs et comédiens kinois',
        description: 'Faites relayer la capsule par des créateurs de contenu respectés de Kinshasa sur TikTok, Facebook Reels et Instagram.',
        kinshasaTip: 'Un message porté par un comédien adoré est perçu comme un conseil fraternel et non une punition.'
      },
      {
        label: 'Écrans LED des grands carrefours et gares routières',
        description: 'Négocier des diffusions en boucle sur les écrans publicitaires aux carrefours Huileries, Rond-point Victoire, Boulevard du 30 Juin et Gare Centrale.',
        kinshasaTip: 'Proposer ces spots aux chaînes de télévision locales (RTNC, B-One, Top Congo TV) dans le cadre de leurs obligations de diffusion d\'intérêt général.'
      }
    ],
    checklist: [
      'Diffusion dans au moins 20 groupes WhatsApp de chauffeurs',
      'Publication sponsorisée TikTok géolocalisée sur Kinshasa',
      'Copie transmise à la Division provinciale des Transports et à la CNPR'
    ]
  }
];

export const KINSHASA_SLOGANS = [
  {
    lingala: "Casque ezali bomoi, libateli ya moto na yo !",
    french: "Le casque est une vie, le bouclier de ta tête !",
    category: "Motos Wewa",
    usage: "À afficher sur les réservoirs de moto et en fin de spot vidéo"
  },
  {
    lingala: "Mbongo ya versement ekofuta lilita te !",
    french: "L'argent du versement quotidien ne paiera pas une tombe !",
    category: "Chauffeurs Taxi 207 & Ketch",
    usage: "Pour désamorcer la course effrénée à la recette du soir"
  },
  {
    lingala: "Soki omoni chauffeur te na miroir, ye mpe azali komona yo te !",
    french: "Si tu ne vois pas le chauffeur dans son rétroviseur, il ne te voit pas non plus !",
    category: "Camions & Angles Morts",
    usage: "Indispensable pour l'Avenue Poids Lourds et By-Pass"
  },
  {
    lingala: "Kobima na ndako malamu, kozonga na libota malamu !",
    french: "Quitter la maison en paix, revenir auprès de sa famille sain et sauf !",
    category: "Tous conducteurs",
    usage: "Slogan transversal familial très émouvant pour les Kinois"
  },
  {
    lingala: "Mokili ya suka te ! Masanga na guidon ekaboli bomoi na liwa.",
    french: "Le monde n'a pas de fin ! L'alcool au guidon sépare la vie de la mort.",
    category: "Alcool au volant",
    usage: "Pour les sorties de boîtes et terrasses nocturnes"
  },
  {
    lingala: "Totosana na PCR mpe Robot Roulant : civisme ezali lokumu !",
    french: "Respectons la Police de Circulation et le Robot Roulant : le civisme est notre dignité !",
    category: "Respect du Code",
    usage: "Pour la valorisation des agents régulateurs et feux tricolores"
  }
];

export interface DriverTestimony {
  id: string;
  name: string;
  age: number;
  role: string;
  experienceYears: number;
  location: string;
  category: 'moto' | 'camion' | 'taxi' | 'voiture';
  title: string;
  accidentContext: string;
  quoteLingala: string;
  quoteFrench: string;
  fullStory: string;
  lessonLearned: string;
  recommendedVideoHook: string;
  imageKey: 'moto' | 'camion' | 'testimony_moto' | 'testimony_truck' | 'hero';
}

export interface ExpertInsight {
  id: string;
  name: string;
  title: string;
  institution: string;
  focusArea: string;
  mainRecommendation: string;
  videoStrategyAdvice: string[];
  keyStatistic: string;
  quote: string;
  imageKey: 'expert_safety' | 'studio';
}

export const DRIVER_TESTIMONIES: DriverTestimony[] = [
  {
    id: 'testimony-mbuyi-moto',
    name: 'Papa Mbuyi Kalonji',
    age: 52,
    role: 'Motard Wewa (Président de ligne carrefour Ngaba)',
    experienceYears: 16,
    location: 'Rond-Point Ngaba & Avenue By-Pass, Kinshasa',
    category: 'moto',
    title: 'La course de trop sous la pluie du By-Pass : 3 mois de coma sans casque',
    accidentContext: 'Novembre 2022, grosse pluie torrentielle. Un client lui propose le double du tarif pour foncer vers Mont-Ngafula sans casque.',
    quoteLingala: 'Nayokaki client mpo na 5000 Francs, nakendeki kosala 3 mois na hôpital. Mbongo wana ekofuta loboko ebukanaki te !',
    quoteFrench: 'J\'ai écouté un client pour gagner 5000 Francs de plus, je me suis retrouvé 3 mois dans le coma. Cet argent ne réparera jamais mon bras fracturé !',
    fullStory: 'Je conduisais des Wewa depuis 10 ans sans jamais mettre de casque, je disais que le casque me donnait chaud et m\'empêchait d\'entendre les klaxons. Ce soir-là, la chaussée était glissante sur By-Pass. Une voiture a freiné brusquement devant moi pour éviter un nid-de-poule d\'eau. Ma roue avant a dérapé. Ma tête a heurté directement le bitume. Sans casque, mon crâne s\'est fendu. Si un passant n\'avait pas appelé les secours, mes 4 enfants seraient aujourd\'hui orphelins. Aujourd\'hui, je ne démarre jamais ma moto sans mon casque et sans exiger que mon passager enfile le sien. Le client qui refuse descend immédiatement.',
    lessonLearned: 'Le casque n\'est pas une contrainte de la police : c\'est le bouclier qui vous ramène vivant le soir auprès de vos enfants.',
    recommendedVideoHook: 'Ouvrir sur le bruit réel de la pluie équatoriale sur la tôle, puis le visage balafré de Papa Mbuyi qui regarde droit dans la caméra en tenant son casque fêlé.',
    imageKey: 'testimony_moto'
  },
  {
    id: 'testimony-kabeya-camion',
    name: 'Chauffeur André Kabeya',
    age: 49,
    role: 'Conducteur de Semi-remorque citerne 38 Tonnes',
    experienceYears: 22,
    location: 'Avenue Poids Lourds & Boulevard du 30 Juin',
    category: 'camion',
    title: 'L\'angle mort au carrefour Kingabwa : la terreur invisible sous les roues',
    accidentContext: 'Manoeuvre délicate d\'un camion de 18 mètres dans le goulot d\'étranglement de Kingabwa.',
    quoteLingala: 'Camion ezali na miso ya kokanisa te. Soki ozali na kalo na ngá ya droite, ata nakangi miso na miroir nakoki komona yo te !',
    quoteFrench: 'Un camion n\'a pas d\'yeux magiques. Si tu te faufiles dans mon angle mort droit, même en fixant le rétro je ne peux absolument pas te voir !',
    fullStory: 'Je venais de charger 30 000 litres de carburant au port. Dans le virage vers Kingabwa, deux motards ont voulu me doubler simultanément par la droite, collés à mes roues motrices arrières. Dans ma cabine située à 2,5 mètres de hauteur, ils étaient totalement invisibles. Heureusement, mon aide-chauffeur (convoyeur) a crié à temps en voyant un bout de guidon. Nous nous sommes arrêtés à 15 centimètres de l\'écrasement. Mes jambes tremblaient pendant 2 heures. Les gens pensent qu\'un chauffeur de camion est insensible, mais écraser un jeune wewa brise aussi l\'âme du chauffeur et détruit deux familles à la fois.',
    lessonLearned: 'Ne jamais se tenir à moins de 3 mètres du flanc droit d\'un camion en mouvement. Si vous ne voyez pas les yeux du conducteur dans son miroir, reculez immédiatement.',
    recommendedVideoHook: 'Vue en caméra subjective depuis le siège surélevé du camion montrant la disparition totale d\'une moto garée juste sous la portière droite.',
    imageKey: 'testimony_truck'
  },
  {
    id: 'testimony-yannick-taxi',
    name: 'Yannick Mbuta (dit "Béton")',
    age: 35,
    role: 'Chauffeur de taxi-bus 207 ("Esprit de vie")',
    experienceYears: 9,
    location: 'Ligne UPN - Rond-point Victoire - Gare Centrale',
    category: 'taxi',
    title: 'La panique du versement de 18h : le demi-terrain qui a renversé une maman',
    accidentContext: 'Fin d\'après-midi sur Boulevard Lumumba, il lui manquait 15 000 FC pour compléter le versement exigé par le propriétaire du bus.',
    quoteLingala: 'Naza kofunda motema mabe ya mbangu ya versement. Tolukaka mbongo kasi tokangaka miso na bato bazali kokatisa nzela.',
    quoteFrench: 'Je dénonce cette folie de la vitesse pour le versement du patron. On court après l\'argent en fermant les yeux sur les vies humaines.',
    fullStory: 'À Kinshasa, la pression sur les chauffeurs de 207 est terrible : si à 18h tu n\'as pas les 80$ du patron, on te retire la clé le lendemain matin. Alors tu fais des "demi-terrains", tu t\'arrêtes sans clignotant au milieu de la route pour arracher les clients avant les autres. Un mardi à Limete, j\'ai braqué sèchement pour ramasser trois personnes. Une maman qui traversait a été projetée sur le capot. Elle a survécu avec une hanche brisée. Cette nuit-là au cachot, j\'ai compris que tout le versement d\'une année ne vaut pas une seule goutte de sang. Aujourd\'hui je milite au sein de l\'ACCO pour la fin des versements abusifs et le respect strict des arrêts.',
    lessonLearned: 'Aucun patron de véhicule ne paiera vos nuits en prison ni vos remords de conscience. La vie des passagers prime sur la recette.',
    recommendedVideoHook: 'Gros plan sur les billets froissés de francs congolais tenus dans une main tremblante, contrastés avec le bruit d\'un freinage d\'urgence.',
    imageKey: 'hero'
  }
];

export const EXPERT_INSIGHTS: ExpertInsight[] = [
  {
    id: 'expert-pcr-officer',
    name: 'Commissaire Principale Dorcas Lukusa',
    title: 'Coordinatrice provinciale de la sensibilisation',
    institution: 'Police de Circulation Routière (PCR - Ville de Kinshasa)',
    focusArea: 'Régulation des carrefours, civisme et robots roulants',
    mainRecommendation: 'La sensibilisation vidéo doit humaniser l\'agent régulateur (roulage) et valoriser le conducteur courtois plutôt que de montrer uniquement des crashs sanglants.',
    videoStrategyAdvice: [
      'Montrer des gestes concrets de respect mutuel entre motards, chauffeurs de 207 et agents de la PCR.',
      'Expliquer visuellement le rôle des carrefours à feux tricolores et des robots roulants intelligents kinois.',
      'Ne pas adopter un ton accusateur : le Kinois rejette le sermon, mais s\'incline devant la démonstration fraternelle et l\'humour intelligent.'
    ],
    keyStatistic: 'Plus de 62% des accidents urbains à Kinshasa surviennent suite à des refus de priorité et des dépassements anarchiques par la droite.',
    quote: 'La route de Kinshasa n\'est pas un champ de bataille pour prouver qui est le plus fort. Le vrai patron de la route est celui qui rentre chez lui vivant.',
    imageKey: 'expert_safety'
  },
  {
    id: 'expert-medecin-urgences',
    name: 'Dr. Jean-Paul Kasongo',
    title: 'Chef du service des urgences et traumatologie',
    institution: 'Cliniques Universitaires de Kinshasa (CUK)',
    focusArea: 'Traumatismes crâniens et prise en charge d\'urgence',
    mainRecommendation: 'Montrer la réalité économique et humaine des hôpitaux : le coût exorbitant d\'une réanimation crânienne comparé au prix modique d\'un casque.',
    videoStrategyAdvice: [
      'Utiliser le contraste saisissant : "Un casque certifié coûte 20$ à Victoire, un scanner crânien en urgence coûte 250$ sans compter les opérations".',
      'Interviewer des soignants qui racontent l\'angoisse des familles qui arrivent en pleurs aux urgences la nuit.',
      'Insister sur les premières secondes après l\'accident : ne jamais déplacer un motard inconscient sans stabiliser son cou.'
    ],
    keyStatistic: '7 polytraumatisés sur 10 admis aux urgences des hôpitaux kinois sont des usagers de motos sans casque de protection.',
    quote: 'Quand un jeune de 25 ans arrive aux urgences avec le crâne fracturé, ce n\'est pas seulement un conducteur qu\'on perd, c\'est le soutien de toute une famille élargie.',
    imageKey: 'studio'
  },
  {
    id: 'expert-syndicat-acco',
    name: 'Me Faustin Mbemba',
    title: 'Secrétaire Général Adjoint chargé de la formation',
    institution: 'Association des Chauffeurs du Congo (ACCO)',
    focusArea: 'Conditions de travail des chauffeurs et réforme des versements',
    mainRecommendation: 'Cibler également les propriétaires des véhicules ("bailleurs") qui imposent des objectifs financiers intenables aux conducteurs.',
    videoStrategyAdvice: [
      'Créer des vidéos de dialogue constructif entre un propriétaire de véhicule et son chauffeur autour de la maintenance préventive.',
      'Valoriser les chauffeurs professionnels ayant 10 ou 15 ans d\'expérience sans accident comme des modèles de réussite sociale.',
      'Diffuser les messages directement sur les téléphones des chefs de parking le matin avant la première rotation.'
    ],
    keyStatistic: 'Un véhicule dont les freins et amortisseurs sont entretenus réduit de 80% le risque d\'accident fatal en saison des pluies.',
    quote: 'Nous voulons des chauffeurs fiers de leur métier, respectés par la société et conscients que chaque passager est une vie confiée entre leurs mains.',
    imageKey: 'expert_safety'
  }
];

export const BUDGET_DEFAULT_ITEMS = [
  { id: 'realisateur', label: 'Réalisateur & Directeur de Production local', costUSD: 300, category: 'Équipe' },
  { id: 'cadreur', label: 'Cadreur expérimenté avec stabilisateur (Gimbal 4K)', costUSD: 200, category: 'Équipe' },
  { id: 'ingenieur_son', label: 'Ingénieur du son (Micros HF sans fil + bonnettes)', costUSD: 150, category: 'Équipe' },
  { id: 'acteurs', label: 'Comédiens kinois & figurants réels (chauffeurs)', costUSD: 250, category: 'Artistique' },
  { id: 'autorisations', label: 'Frais de facilitation & encadrement sécuritaire PCR', costUSD: 120, category: 'Administratif' },
  { id: 'logistique', label: 'Transport équipe, carburant & collation/eau minérale', costUSD: 130, category: 'Logistique' },
  { id: 'montage', label: 'Montage vidéo, étalonnage & sous-titrage dynamique', costUSD: 200, category: 'Post-production' },
  { id: 'mixage', label: 'Mixage audio & effets sonores réalistes de Kinshasa', costUSD: 100, category: 'Post-production' },
  { id: 'diffusion', label: 'Sponsoring ciblé Kinshasa sur TikTok, Facebook & WhatsApp', costUSD: 150, category: 'Diffusion' }
];

