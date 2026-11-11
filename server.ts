import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini client only if a real API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
const hasValidKey = geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY' && !geminiApiKey.startsWith('MY_');
let aiClient: GoogleGenAI | null = null;

if (hasValidKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (initErr) {
    console.warn('Gemini client init warning:', initErr);
  }
}

// API endpoint to generate custom road safety video script for Kinshasa
app.post('/api/generate-script', async (req: Request, res: Response) => {
  try {
    const { target, theme, tone, roadAxis, language, duration } = req.body;

    const prompt = `
Tu es un réalisateur et communicant expert en sécurité routière à Kinshasa (République Démocratique du Congo).
Conçois un scénario complet et percutant de capsule vidéo de sensibilisation routière adaptée aux réalités locales kinoises.

Paramètres de la vidéo :
- Public cible : ${target || 'Conducteurs de mototaxis (Wewa)'}
- Thématique principale : ${theme || 'Port obligatoire du casque et limitation de vitesse'}
- Ton de la vidéo : ${tone || 'Choc et réaliste avec une pointe de sagesse kinoise'}
- Axe routier / Quartier kinois ciblé : ${roadAxis || 'Boulevard du 30 Juin / Rond-point Victoire'}
- Langue : ${language || 'Bilingue Lingala et Français'}
- Durée estimée : ${duration || '45 secondes (Format vertical TikTok/WhatsApp Status)'}

Réponds au format JSON strict avec la structure suivante :
{
  "title": "Titre percutant en Français et Lingala",
  "slogan": "Slogan final mémorable en Lingala avec traduction",
  "targetAudience": "Description de la cible",
  "recommendedLocation": "Lieu de tournage recommandé à Kinshasa",
  "durationSeconds": 45,
  "pitch": "Résumé en 2 phrases du concept",
  "keyAdvice": ["Conseil 1", "Conseil 2", "Conseil 3"],
  "scenes": [
    {
      "sceneNumber": 1,
      "timeCode": "00:00 - 00:10",
      "shotType": "Plan large / Gros plan",
      "visualAction": "Description visuelle précise de la scène dans le décor kinois",
      "soundEffects": "Effets sonores (bruit moteur, klaxon, sifflet de roulage PCR)",
      "dialogueLingala": "Paroles ou répliques en Lingala",
      "dialogueFrench": "Traduction ou voix-off en Français",
      "directorNote": "Conseil de mise en scène pour l'équipe technique"
    }
  ]
}
Assure-toi que les dialogues en Lingala utilisent des expressions réelles de Kinshasa respectueuses et percutantes (ex: 'Wewa', 'Roulage', 'Demi-terrain', 'Libateli ya bomoi', 'Keba na makama').`;

    if (aiClient) {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini timeout')), 6000)
        );

        const geminiCall = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            systemInstruction: 'Tu es un directeur artistique et réalisateur congolais spécialisé en communication sociale et campagnes de sécurité routière pour la ville de Kinshasa.',
          },
        });

        const response: any = await Promise.race([geminiCall, timeoutPromise]);

        const responseText = response?.text;
        if (responseText) {
          try {
            const parsed = JSON.parse(responseText);
            return res.json({ success: true, script: parsed, source: 'gemini' });
          } catch (parseErr) {
            console.warn('Failed to parse Gemini output as JSON', parseErr);
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini generateContent error or timeout, using intelligent fallback:', geminiErr);
      }
    }

    // Fallback if no Gemini key is provided or Gemini is unreachable
    const fallbackScript = {
      title: `Campagne Spéciale Kinshasa : ${theme || 'Sécurité Routière'}`,
      slogan: "Kobima na ndako malamu, kozonga na libota malamu ! (Partir en paix, rentrer auprès des siens en paix)",
      targetAudience: target || 'Conducteurs de Kinshasa',
      recommendedLocation: roadAxis || 'Boulevard Lumumba (Échangeur de Limete)',
      durationSeconds: 45,
      pitch: `Une capsule poignante qui met en scène le choix crucial de la prudence sur les routes animées de Kinshasa.`,
      keyAdvice: [
        "Portez systématiquement le casque homologué même sur de courtes distances.",
        "Respectez scrupuleusement les injonctions des agents de la Police de Circulation Routière (PCR).",
        "Ne cédez jamais à la pression des passagers pressés : la vie n'a pas de prix."
      ],
      scenes: [
        {
          sceneNumber: 1,
          timeCode: "00:00 - 00:12",
          shotType: "Plan d'ensemble dynamique",
          visualAction: "Kinshasa au petit matin, grand soleil. Un motard Wewa démarre près du rond-point Ngaba. Un passager sans casque monte en pressant le conducteur.",
          soundEffects: "Vrombissement de moto 125cc, clameur des marchands ambulants, klaxons lointains.",
          dialogueLingala: "Masta, noki noki ! Nakoluka retard na mosala te !",
          dialogueFrench: "Vite vite mon frère ! Je ne veux pas être en retard au travail !",
          directorNote: "Filmer à hauteur d'épaule avec une caméra stabilisée pour retranscrire l'urgence."
        },
        {
          sceneNumber: 2,
          timeCode: "00:12 - 00:28",
          shotType: "Gros plan sur le conducteur",
          visualAction: "Le motard s'arrête net, tend un second casque au passager et montre sa propre fille en photo sur son porte-clés.",
          soundEffects: "Bruit de moteur ralenti, silence soudain de respect.",
          dialogueLingala: "Lata casque oyo d'abord. Na ndako nazali na bana bazali kozela nga. Yo mpe bazali kozela yo.",
          dialogueFrench: "Mets d'abord ce casque. Chez moi j'ai des enfants qui m'attendent. Et chez toi aussi, on t'attend.",
          directorNote: "Plan serré sur le regard franc et digne du motard. Éclairage naturel doux."
        },
        {
          sceneNumber: 3,
          timeCode: "00:28 - 00:45",
          shotType: "Plan moyen suivi de drone ou vue dégagée",
          visualAction: "Le passager sourit, attache la sangle. Ils avancent calmement en respectant le feu tricolore au carrefour.",
          soundEffects: "Sifflet net de l'agent PCR qui fait signe de passer avec le pouce levé, musique rythmée positive.",
          dialogueLingala: "Bomoi ezali na talo ! Tolekisa te, tobatela !",
          dialogueFrench: "La vie est précieuse ! Ne la risquons pas pour quelques minutes de retard.",
          directorNote: "Texte final plein écran blanc sur fond noir avec logo de la campagne."
        }
      ]
    };

    return res.json({ success: true, script: fallbackScript, source: 'template' });
  } catch (error: any) {
    console.error('Error generating script:', error);
    res.status(500).json({ success: false, error: error.message || 'Erreur serveur' });
  }
});

// Setup Vite in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Kin-Sécurité Routière server running at http://0.0.0.0:${port}`);
  });
}

startServer();
