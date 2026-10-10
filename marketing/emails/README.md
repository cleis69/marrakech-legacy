# Séquences e-mail CITYSTAR pour HubSpot

90 modèles HTML : 15 e-mails en 6 langues (`modeles/fr`, `en`, `es`, `it`, `nl`, `no`), répartis en quatre séquences. `modeles/index.html` liste, pour chaque langue, l'objet, le texte d'aperçu, le moment d'envoi et le déclencheur de chaque e-mail.

| Séquence | Déclencheur | E-mails |
| --- | --- | --- |
| 1. Après la demande de dossier | Formulaire « dossier » soumis | J0, J+1, J+3, J+5, J+8, J+12, J+16, J+21 |
| 2. Rendez-vous et visite | Propriété `date_visite` renseignée | tout de suite, la veille, le lendemain |
| 3. Nouvel acquéreur | Réservation signée | jour J, J+7, puis à chaque étape du chantier (envoi manuel) |
| 4. Relance « le chantier avance » | Contacts sans réservation | à chaque grande étape (envoi manuel) |

## Mise en place dans HubSpot

1. **Propriétés de contact** (Paramètres → Propriétés), à créer avec ces noms internes :
   - `villa_citystar` (texte, ex. « 07 ») ;
   - `date_visite` (texte, ex. « 24/10/2026 ») ;
   - `heure_visite` (texte, ex. « 10 h 30 »).
2. **Pied de page** (Paramètres → Marketing → E-mail) : renseigner le nom et l'adresse de la société. Les modèles les reprennent, avec le lien de désinscription obligatoire.
3. **Modèles** : Marketing → Fichiers et modèles → Design Manager → Nouveau fichier → Modèle d'e-mail en HTML codé. Coller le contenu d'un fichier de `modeles/<langue>/` ; le commentaire en tête lui donne son nom (« CITYSTAR FR · d1-dossier »).
4. **E-mails** : créer un e-mail marketing à partir de chaque modèle et reporter l'objet et le texte d'aperçu indiqués dans `index.html`.
5. **Workflows** : un workflow par séquence, avec une branche par langue sur la propriété « Langue préférée » (`hs_language`), et la sortie du workflow dès qu'un contact répond, prend rendez-vous ou réserve.
6. **Signature** : elle affiche le propriétaire du contact (`owner.firstname`, `owner.lastname`), ou « L'équipe CITYSTAR » si aucun conseiller n'est attribué. Attribuer chaque contact à un conseiller dès sa demande.

Les champs surlignés en jaune (`[étape]`, `[avancement]`, `[le mot du promoteur]`…) dans `p3-etape` et `n1-le-chantier-avance` sont à remplacer avant chaque envoi, ainsi que leur image, par une vraie photo du chantier.

Avant le premier envoi :

- envoyer depuis un domaine authentifié dans HubSpot (SPF, DKIM, DMARC), pas depuis une adresse Gmail ;
- faire un envoi test vers Gmail, Outlook et Apple Mail, avec un contact dont le prénom est vide pour vérifier la ponctuation.

## Modifier puis régénérer

Les textes sont dans `textes/<langue>.ts` (la structure est celle du français, `textes/fr.ts`) et la mise en page dans `generer.ts`. Les chiffres (villas, surfaces, livraison, part à la réservation, marché) viennent de `src/config/citystar.ts`, et les adresses des pages de `src/components/citystar/adresses.ts`.

```bash
bun marketing/emails/generer.ts
```

`SITE` change l'adresse du site utilisée dans les liens (par défaut le site GitHub Pages). Les images sont servies depuis `SITE/emails/` (dossier `public/emails/` du site).

Balises disponibles dans les textes, converties en HubL à la génération :

- `[[, prenom]]` : « , Claire » si le prénom est connu, rien sinon ;
- `[[villa]]`, `[[email]]`, `[[date]]`, `[[heure]]` : propriétés du contact ;
- `[[edit:…]]` : champ à compléter, surligné.
