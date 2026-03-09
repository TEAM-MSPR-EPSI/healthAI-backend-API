# HealthAI Backend API

API REST complète pour la gestion de la santé, du sport et de la nutrition.

## 🚀 Démarrage

### Prérequis
- Node.js (v14+)
- PostgreSQL
- npm ou yarn

### Installation

```bash
npm install
```

### Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=healthai
DB_USER=postgres
DB_PASSWORD=your_password
```

### Lancement

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

L'API sera accessible sur `http://localhost:5000`

## 📚 Documentation API

La documentation interactive OpenAPI/Swagger est disponible à l'adresse :

**http://localhost:5000/api-docs**

Cette interface vous permet de :
- Explorer tous les endpoints disponibles
- Tester les requêtes directement depuis le navigateur
- Consulter les schémas de données
- Voir les exemples de requêtes/réponses

## 🔗 Endpoints principaux

### Utilisateurs
- `GET /api/users` - Liste tous les utilisateurs
- `POST /api/users` - Créer un utilisateur
- `GET /api/users/:id` - Obtenir un utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Entreprises
- `GET /api/companies` - Liste toutes les entreprises
- `POST /api/companies` - Créer une entreprise
- `GET /api/companies/:id` - Obtenir une entreprise
- `PUT /api/companies/:id` - Mettre à jour une entreprise
- `DELETE /api/companies/:id` - Supprimer une entreprise

### Abonnements
- `GET /api/subscriptions` - Liste tous les abonnements
- `POST /api/subscriptions` - Créer un abonnement
- `GET /api/subscriptions/:id` - Obtenir un abonnement
- `PUT /api/subscriptions/:id` - Mettre à jour un abonnement
- `DELETE /api/subscriptions/:id` - Supprimer un abonnement

### Nutrition
- `GET /api/recipes` - Liste toutes les recettes
- `GET /api/ingredients` - Liste tous les ingrédients
- `GET /api/consumes` - Suivi de la consommation alimentaire
- `GET /api/consumes/user/:userId` - Consommations d'un utilisateur

### Sport
- `GET /api/sport-programs` - Programmes sportifs
- `GET /api/sport-sessions` - Sessions d'entraînement
- `GET /api/sport-exercises` - Exercices sportifs
- `GET /api/sport-equipment` - Équipements sportifs
- `GET /api/session-progress` - Progression des sessions
- `GET /api/session-progress/user/:userId` - Progression d'un utilisateur

### Santé
- `GET /api/user-health-profiles` - Profils de santé
- `GET /api/user-health-profiles/user/:userId` - Profil d'un utilisateur
- `GET /api/user-biometrics` - Données biométriques
- `GET /api/user-biometrics/user/:userId` - Biométrie d'un utilisateur

## 🗄️ Structure de la base de données

Le schéma de base de données PostgreSQL comprend :

### Tables principales
- **user_** - Utilisateurs de l'application
- **company** - Entreprises (pour abonnements B2B)
- **subscription** - Types d'abonnements (Freemium, Premium, Premium+, B2B)
- **recipe** - Recettes nutritionnelles
- **ingredient** - Ingrédients avec valeurs nutritionnelles
- **sport_program** - Programmes d'entraînement
- **sport_session** - Sessions d'entraînement
- **sport_exercise** - Exercices sportifs
- **sport_equipment** - Équipements nécessaires
- **user_health_profile** - Profils de santé des utilisateurs
- **user_biometric** - Données biométriques (poids, sommeil, pas)
- **session_progress** - Suivi de la progression
- **consume** - Suivi de la consommation alimentaire

### Énumérations
- **user_role_enum** : admin, user, company_admin
- **gender_enum** : male, female, other, prefer_not_to_say
- **objective_enum** : weight_loss, muscle_gain, endurance, flexibility, maintenance
- **difficulty_enum** : beginner, intermediate, advanced
- **recipe_type_enum** : breakfast, lunch, dinner, snack, dessert, pleasure, muscle_gain, weight_loss
- **activity_level_enum** : sedentary, lightly_active, moderately_active, very_active, extra_active
- **food_diet_enum** : vegan, vegetarian, pescatarian, gluten_free, lactose_free, halal, kosher, none

## 🏗️ Architecture

```
healthAI-backend-API/
├── config/          # Configuration de la base de données
├── controllers/     # Contrôleurs (logique de requête/réponse)
├── models/          # Modèles Sequelize
├── routes/          # Définition des routes
├── services/        # Logique métier
├── app.js           # Point d'entrée de l'application
├── swagger.js       # Configuration OpenAPI/Swagger
└── package.json     # Dépendances
```

## 🛠️ Technologies utilisées

- **Express.js** - Framework web
- **Sequelize** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données
- **Swagger UI Express** - Documentation interactive
- **dotenv** - Gestion des variables d'environnement

## 📝 Exemples de requêtes

### Créer un utilisateur

```bash
POST /api/users
Content-Type: application/json

{
  "user_username": "johndoe",
  "user_firstname": "John",
  "user_lastname": "Doe",
  "user_birth": "1990-01-01",
  "user_role": "user",
  "user_gender": "male",
  "user_phone": "0600000000",
  "user_size": 180,
  "user_weight": 75.0,
  "user_email": "john@example.com",
  "user_hashpwd": "hashed_password",
  "user_inscription": "2026-03-09"
}
```

### Ajouter une donnée biométrique

```bash
POST /api/user-biometrics
Content-Type: application/json

{
  "biometric_date": "2026-03-09",
  "biometric_sleep": 8,
  "biometric_steps": 10000,
  "biometric_weight": 74.5,
  "user_id": 1
}
```

### Enregistrer une consommation alimentaire

```bash
POST /api/consumes
Content-Type: application/json

{
  "user_id": 1,
  "ingredient_id": 1,
  "ingredient_quantity": 150,
  "consume_date": "2026-03-09"
}
```

## 🔒 Sécurité

⚠️ **Note importante** : Cette API est actuellement en développement et ne dispose pas encore de système d'authentification. Il est recommandé d'ajouter :
- JWT pour l'authentification
- Middleware de validation des données
- Rate limiting
- CORS configuré selon vos besoins

Ce projet est développé dans le cadre d'un projet scolaire MSPR.