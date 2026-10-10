# Séquences e-mail CITYSTAR

Quinze modèles HTML prêts à coller dans un outil d'envoi (Brevo, Mailchimp, HubSpot…), répartis en quatre séquences. La liste avec les objets, les aperçus et les déclencheurs est dans `modeles/index.html`.

| Séquence | Déclencheur | E-mails |
| --- | --- | --- |
| 1. Après la demande de dossier | Formulaire du site ou page `/dossier` | J0, J+1, J+3, J+5, J+8, J+12, J+16, J+21 |
| 2. Rendez-vous et visite | Rendez-vous pris | confirmation, la veille, le lendemain |
| 3. Nouvel acquéreur | Réservation signée | jour J, J+7, puis à chaque étape du chantier |
| 4. Relance « le chantier avance » | Contacts sans réservation, après la séquence 1 | à chaque grande étape |

Sortez un contact de la séquence 1 dès qu'il répond, prend rendez-vous ou réserve.

## Modifier puis régénérer

Les textes sont dans `generer.ts`. Les chiffres (villas, surfaces, livraison, part à la réservation, marché) viennent de `src/config/citystar.ts` : un changement dans la config se retrouve dans les e-mails à la prochaine génération.

```bash
bun marketing/emails/generer.ts
```

`SITE` change l'adresse du site utilisée dans les liens (par défaut le site GitHub Pages). Les images sont servies depuis `SITE/emails/` (dossier `public/emails/` du site) : elles ne sont en ligne qu'une fois le site publié.

## Balises à relier dans l'outil d'envoi

`{{prenom}}`, `{{email}}`, `{{conseiller}}`, `{{desinscription}}`, puis pour la séquence 2 `{{date_visite}}` et `{{heure_visite}}`, et pour les séquences 3 et 4 `{{villa}}`, `{{etape}}`, `{{prochaine_etape}}`, `{{avancement}}`, `{{mot_du_promoteur}}` et `{{villas_restantes}}`. Chaque outil a sa propre syntaxe : par exemple `{{ contact.PRENOM }}` dans Brevo, `*|FNAME|*` dans Mailchimp.

## Avant le premier envoi

- Envoyer depuis un domaine authentifié (SPF, DKIM, DMARC), pas depuis une adresse Gmail.
- Faire un envoi test vers Gmail, Outlook et Apple Mail.
- Remplacer l'image des modèles `p3-etape` et `n1-le-chantier-avance` par une vraie photo du chantier.
- Les modèles sont en français : les autres langues du site restent à traduire.
