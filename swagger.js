const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HealthAI API',
      version: '1.0.0',
      description: 'API complète pour la gestion de la santé, du sport et de la nutrition',
      contact: {
        name: 'HealthAI Team',
        email: 'contact@healthai.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur de développement'
      }
    ],
    tags: [
      { name: 'Users', description: 'Gestion des utilisateurs' },
      { name: 'Companies', description: 'Gestion des entreprises' },
      { name: 'Subscriptions', description: 'Gestion des abonnements' },
      { name: 'Recipes', description: 'Gestion des recettes' },
      { name: 'Ingredients', description: 'Gestion des ingrédients' },
      { name: 'Sport Programs', description: 'Gestion des programmes sportifs' },
      { name: 'Sport Sessions', description: 'Gestion des sessions sportives' },
      { name: 'Sport Exercises', description: 'Gestion des exercices sportifs' },
      { name: 'Sport Equipment', description: 'Gestion des équipements sportifs' },
      { name: 'User Health Profiles', description: 'Profils de santé des utilisateurs' },
      { name: 'User Biometrics', description: 'Données biométriques des utilisateurs' },
      { name: 'Session Progress', description: 'Progression des sessions sportives' },
      { name: 'Consumes', description: 'Suivi de la consommation alimentaire' }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: { type: 'integer', description: 'ID unique de l\'utilisateur' },
            user_username: { type: 'string', description: 'Nom d\'utilisateur' },
            user_firstname: { type: 'string', description: 'Prénom' },
            user_lastname: { type: 'string', description: 'Nom de famille' },
            user_birth: { type: 'string', format: 'date', description: 'Date de naissance' },
            user_role: { type: 'string', enum: ['admin', 'user', 'company_admin'], description: 'Rôle de l\'utilisateur' },
            user_gender: { type: 'string', enum: ['male', 'female', 'other', 'prefer_not_to_say'], description: 'Genre' },
            user_city: { type: 'string', description: 'Ville' },
            user_country: { type: 'string', description: 'Pays' },
            user_phone: { type: 'string', description: 'Téléphone' },
            user_size: { type: 'integer', description: 'Taille en cm' },
            user_weight: { type: 'number', format: 'float', description: 'Poids en kg' },
            user_last_weight: { type: 'number', format: 'float', description: 'Dernier poids enregistré' },
            user_email: { type: 'string', format: 'email', description: 'Email' },
            user_hashpwd: { type: 'string', description: 'Mot de passe hashé' },
            user_inscription: { type: 'string', format: 'date', description: 'Date d\'inscription' },
            sport_program_id: { type: 'integer', description: 'ID du programme sportif' },
            company_id: { type: 'integer', description: 'ID de l\'entreprise' }
          }
        },
        Company: {
          type: 'object',
          properties: {
            company_id: { type: 'integer', description: 'ID unique de l\'entreprise' },
            company_name: { type: 'string', description: 'Nom de l\'entreprise' },
            company_email: { type: 'string', format: 'email', description: 'Email de l\'entreprise' },
            company_inscription: { type: 'string', format: 'date', description: 'Date d\'inscription' }
          }
        },
        Subscription: {
          type: 'object',
          properties: {
            subscription_id: { type: 'integer', description: 'ID unique de l\'abonnement' },
            subscription_price: { type: 'number', format: 'float', description: 'Prix de l\'abonnement' },
            subscription_name: { type: 'string', enum: ['Freemium', 'Premium', 'Premium+', 'B2B'], description: 'Nom de l\'abonnement' },
            company_id: { type: 'integer', description: 'ID de l\'entreprise (pour B2B)' },
            subscription_company_end: { type: 'string', format: 'date', description: 'Date de fin pour abonnement B2B' }
          }
        },
        Recipe: {
          type: 'object',
          properties: {
            recipe_id: { type: 'integer', description: 'ID unique de la recette' },
            recipe_image: { type: 'string', description: 'URL de l\'image' },
            recipe_name: { type: 'string', description: 'Nom de la recette' },
            recipe_description: { type: 'string', description: 'Description de la recette' },
            recipe_preparation: { type: 'string', description: 'Instructions de préparation' },
            recipe_type: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'pleasure', 'muscle_gain', 'weight_loss'], description: 'Type de recette' }
          }
        },
        Ingredient: {
          type: 'object',
          properties: {
            ingredient_id: { type: 'integer', description: 'ID unique de l\'ingrédient' },
            ingredient_name: { type: 'string', description: 'Nom de l\'ingrédient' },
            ingredient_type: { type: 'string', enum: ['vegetable', 'fruit', 'meat', 'fish', 'dairy', 'grain', 'legume', 'other'], description: 'Type d\'ingrédient' },
            ingredient_energy_100g: { type: 'number', format: 'float', description: 'Énergie pour 100g (kcal)' },
            ingredient_protein_100g: { type: 'number', format: 'float', description: 'Protéines pour 100g (g)' },
            ingredient_fiber_100g: { type: 'number', format: 'float', description: 'Fibres pour 100g (g)' },
            ingredient_sugars_100g: { type: 'number', format: 'float', description: 'Sucres pour 100g (g)' },
            ingredient_carbohydrate_100g: { type: 'number', format: 'float', description: 'Glucides pour 100g (g)' },
            ingredient_salt_100g: { type: 'number', format: 'float', description: 'Sel pour 100g (g)' },
            ingredient_fats_100g: { type: 'number', format: 'float', description: 'Graisses pour 100g (g)' },
            ingredient_saturated_fats_100g: { type: 'number', format: 'float', description: 'Graisses saturées pour 100g (g)' }
          }
        },
        SportProgram: {
          type: 'object',
          properties: {
            sport_program_id: { type: 'integer', description: 'ID unique du programme' },
            sport_program_name: { type: 'string', description: 'Nom du programme' },
            sport_program_objective: { type: 'string', enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'maintenance'], description: 'Objectif du programme' },
            sport_program_sessions: { type: 'integer', description: 'Nombre de sessions' },
            sport_program_duration: { type: 'integer', description: 'Durée en minutes' },
            sport_program_is_active: { type: 'boolean', description: 'Programme actif ou non' }
          }
        },
        SportSession: {
          type: 'object',
          properties: {
            sport_session_id: { type: 'integer', description: 'ID unique de la session' },
            sport_session_name: { type: 'string', description: 'Nom de la session' }
          }
        },
        SportExercise: {
          type: 'object',
          properties: {
            sport_exercise_id: { type: 'integer', description: 'ID unique de l\'exercice' },
            sport_exercise_name: { type: 'string', description: 'Nom de l\'exercice' },
            sport_exercise_objective: { type: 'string', enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'maintenance'], description: 'Objectif de l\'exercice' },
            sport_exercise_difficulty: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'], description: 'Niveau de difficulté' },
            sport_exercise_duration: { type: 'integer', description: 'Durée en minutes' },
            sport_exercise_muscle_group: { type: 'string', enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'glutes', 'quadriceps', 'hamstrings', 'calves', 'full_body'], description: 'Groupe musculaire ciblé' },
            sport_exercise_video: { type: 'string', description: 'URL de la vidéo' },
            sport_exercise_instruction: { type: 'string', description: 'Instructions de l\'exercice' },
            sport_exercise_cal_burned: { type: 'integer', description: 'Calories brûlées' }
          }
        },
        SportEquipment: {
          type: 'object',
          properties: {
            sport_equipment_id: { type: 'integer', description: 'ID unique de l\'équipement' },
            sport_equipment_name: { type: 'string', description: 'Nom de l\'équipement' }
          }
        },
        UserHealthProfile: {
          type: 'object',
          properties: {
            users_health_profile_id: { type: 'integer', description: 'ID unique du profil' },
            user_health_profile_objective: { type: 'string', enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'maintenance'], description: 'Objectif de santé' },
            user_health_profile_activity: { type: 'string', enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'], description: 'Niveau d\'activité' },
            user_health_profile_food_diet: { type: 'string', enum: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'lactose_free', 'halal', 'kosher', 'none'], description: 'Régime alimentaire' },
            user_id: { type: 'integer', description: 'ID de l\'utilisateur' }
          }
        },
        UserBiometric: {
          type: 'object',
          properties: {
            biometric_id: { type: 'integer', description: 'ID unique de la donnée biométrique' },
            biometric_date: { type: 'string', format: 'date', description: 'Date de la mesure' },
            biometric_sleep: { type: 'integer', description: 'Heures de sommeil' },
            biometric_steps: { type: 'integer', description: 'Nombre de pas' },
            biometric_weight: { type: 'number', format: 'float', description: 'Poids en kg' },
            user_id: { type: 'integer', description: 'ID de l\'utilisateur' }
          }
        },
        SessionProgress: {
          type: 'object',
          properties: {
            session_progress_id: { type: 'integer', description: 'ID unique de la progression' },
            session_progress_start: { type: 'string', format: 'date', description: 'Date de début' },
            session_progress_end: { type: 'string', format: 'date', description: 'Date de fin' },
            sport_session_id: { type: 'integer', description: 'ID de la session sportive' },
            user_id: { type: 'integer', description: 'ID de l\'utilisateur' }
          }
        },
        Consume: {
          type: 'object',
          properties: {
            consume_id: { type: 'integer', description: 'ID unique de la consommation' },
            user_id: { type: 'integer', description: 'ID de l\'utilisateur' },
            ingredient_id: { type: 'integer', description: 'ID de l\'ingrédient' },
            ingredient_quantity: { type: 'number', format: 'float', description: 'Quantité consommée en grammes' },
            consume_date: { type: 'string', format: 'date', description: 'Date de consommation' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Message d\'erreur' }
          }
        }
      }
    },
    paths: {
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Récupérer tous les utilisateurs',
          responses: {
            200: {
              description: 'Liste des utilisateurs',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            },
            500: {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        },
        post: {
          tags: ['Users'],
          summary: 'Créer un nouvel utilisateur',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          responses: {
            201: {
              description: 'Utilisateur créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            500: {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        }
      },
      '/api/users/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Récupérer un utilisateur par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          responses: {
            200: {
              description: 'Utilisateur trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            500: {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Users'],
          summary: 'Mettre à jour un utilisateur',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          responses: {
            200: {
              description: 'Utilisateur mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            500: {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Users'],
          summary: 'Supprimer un utilisateur',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          responses: {
            200: {
              description: 'Utilisateur supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            500: {
              description: 'Erreur serveur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            }
          }
        }
      },
      '/api/companies': {
        get: {
          tags: ['Companies'],
          summary: 'Récupérer toutes les entreprises',
          responses: {
            200: {
              description: 'Liste des entreprises',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Company' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Companies'],
          summary: 'Créer une nouvelle entreprise',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Company' }
              }
            }
          },
          responses: {
            201: {
              description: 'Entreprise créée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Company' }
                }
              }
            }
          }
        }
      },
      '/api/companies/{id}': {
        get: {
          tags: ['Companies'],
          summary: 'Récupérer une entreprise par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Entreprise trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Company' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Companies'],
          summary: 'Mettre à jour une entreprise',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Company' }
              }
            }
          },
          responses: {
            200: {
              description: 'Entreprise mise à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Company' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Companies'],
          summary: 'Supprimer une entreprise',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Entreprise supprimée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Company' }
                }
              }
            }
          }
        }
      },
      '/api/subscriptions': {
        get: {
          tags: ['Subscriptions'],
          summary: 'Récupérer tous les abonnements',
          responses: {
            200: {
              description: 'Liste des abonnements',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Subscription' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Subscriptions'],
          summary: 'Créer un nouvel abonnement',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Subscription' }
              }
            }
          },
          responses: {
            201: {
              description: 'Abonnement créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Subscription' }
                }
              }
            }
          }
        }
      },
      '/api/subscriptions/{id}': {
        get: {
          tags: ['Subscriptions'],
          summary: 'Récupérer un abonnement par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Abonnement trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Subscription' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Subscriptions'],
          summary: 'Mettre à jour un abonnement',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Subscription' }
              }
            }
          },
          responses: {
            200: {
              description: 'Abonnement mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Subscription' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Subscriptions'],
          summary: 'Supprimer un abonnement',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Abonnement supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Subscription' }
                }
              }
            }
          }
        }
      },
      '/api/recipes': {
        get: {
          tags: ['Recipes'],
          summary: 'Récupérer toutes les recettes',
          responses: {
            200: {
              description: 'Liste des recettes avec ingrédients',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Recipe' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Recipes'],
          summary: 'Créer une nouvelle recette',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Recipe' }
              }
            }
          },
          responses: {
            201: {
              description: 'Recette créée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Recipe' }
                }
              }
            }
          }
        }
      },
      '/api/recipes/{id}': {
        get: {
          tags: ['Recipes'],
          summary: 'Récupérer une recette par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Recette trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Recipe' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Recipes'],
          summary: 'Mettre à jour une recette',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Recipe' }
              }
            }
          },
          responses: {
            200: {
              description: 'Recette mise à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Recipe' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Recipes'],
          summary: 'Supprimer une recette',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Recette supprimée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Recipe' }
                }
              }
            }
          }
        }
      },
      '/api/ingredients': {
        get: {
          tags: ['Ingredients'],
          summary: 'Récupérer tous les ingrédients',
          responses: {
            200: {
              description: 'Liste des ingrédients avec allergènes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Ingredient' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Ingredients'],
          summary: 'Créer un nouvel ingrédient',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Ingredient' }
              }
            }
          },
          responses: {
            201: {
              description: 'Ingrédient créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Ingredient' }
                }
              }
            }
          }
        }
      },
      '/api/ingredients/{id}': {
        get: {
          tags: ['Ingredients'],
          summary: 'Récupérer un ingrédient par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Ingrédient trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Ingredient' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Ingredients'],
          summary: 'Mettre à jour un ingrédient',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Ingredient' }
              }
            }
          },
          responses: {
            200: {
              description: 'Ingrédient mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Ingredient' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Ingredients'],
          summary: 'Supprimer un ingrédient',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Ingrédient supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Ingredient' }
                }
              }
            }
          }
        }
      },
      '/api/sport-programs': {
        get: {
          tags: ['Sport Programs'],
          summary: 'Récupérer tous les programmes sportifs',
          responses: {
            200: {
              description: 'Liste des programmes sportifs',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SportProgram' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Sport Programs'],
          summary: 'Créer un nouveau programme sportif',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportProgram' }
              }
            }
          },
          responses: {
            201: {
              description: 'Programme sportif créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportProgram' }
                }
              }
            }
          }
        }
      },
      '/api/sport-programs/{id}': {
        get: {
          tags: ['Sport Programs'],
          summary: 'Récupérer un programme sportif par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Programme sportif trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportProgram' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Sport Programs'],
          summary: 'Mettre à jour un programme sportif',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportProgram' }
              }
            }
          },
          responses: {
            200: {
              description: 'Programme sportif mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportProgram' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Sport Programs'],
          summary: 'Supprimer un programme sportif',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Programme sportif supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportProgram' }
                }
              }
            }
          }
        }
      },
      '/api/sport-sessions': {
        get: {
          tags: ['Sport Sessions'],
          summary: 'Récupérer toutes les sessions sportives',
          responses: {
            200: {
              description: 'Liste des sessions sportives',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SportSession' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Sport Sessions'],
          summary: 'Créer une nouvelle session sportive',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportSession' }
              }
            }
          },
          responses: {
            201: {
              description: 'Session sportive créée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportSession' }
                }
              }
            }
          }
        }
      },
      '/api/sport-sessions/{id}': {
        get: {
          tags: ['Sport Sessions'],
          summary: 'Récupérer une session sportive par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Session sportive trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportSession' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Sport Sessions'],
          summary: 'Mettre à jour une session sportive',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportSession' }
              }
            }
          },
          responses: {
            200: {
              description: 'Session sportive mise à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportSession' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Sport Sessions'],
          summary: 'Supprimer une session sportive',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Session sportive supprimée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportSession' }
                }
              }
            }
          }
        }
      },
      '/api/sport-exercises': {
        get: {
          tags: ['Sport Exercises'],
          summary: 'Récupérer tous les exercices sportifs',
          responses: {
            200: {
              description: 'Liste des exercices sportifs',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SportExercise' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Sport Exercises'],
          summary: 'Créer un nouvel exercice sportif',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportExercise' }
              }
            }
          },
          responses: {
            201: {
              description: 'Exercice sportif créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportExercise' }
                }
              }
            }
          }
        }
      },
      '/api/sport-exercises/{id}': {
        get: {
          tags: ['Sport Exercises'],
          summary: 'Récupérer un exercice sportif par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Exercice sportif trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportExercise' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Sport Exercises'],
          summary: 'Mettre à jour un exercice sportif',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportExercise' }
              }
            }
          },
          responses: {
            200: {
              description: 'Exercice sportif mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportExercise' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Sport Exercises'],
          summary: 'Supprimer un exercice sportif',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Exercice sportif supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportExercise' }
                }
              }
            }
          }
        }
      },
      '/api/sport-equipment': {
        get: {
          tags: ['Sport Equipment'],
          summary: 'Récupérer tous les équipements sportifs',
          responses: {
            200: {
              description: 'Liste des équipements sportifs',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SportEquipment' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Sport Equipment'],
          summary: 'Créer un nouvel équipement sportif',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportEquipment' }
              }
            }
          },
          responses: {
            201: {
              description: 'Équipement sportif créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportEquipment' }
                }
              }
            }
          }
        }
      },
      '/api/sport-equipment/{id}': {
        get: {
          tags: ['Sport Equipment'],
          summary: 'Récupérer un équipement sportif par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Équipement sportif trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportEquipment' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Sport Equipment'],
          summary: 'Mettre à jour un équipement sportif',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SportEquipment' }
              }
            }
          },
          responses: {
            200: {
              description: 'Équipement sportif mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportEquipment' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Sport Equipment'],
          summary: 'Supprimer un équipement sportif',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Équipement sportif supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SportEquipment' }
                }
              }
            }
          }
        }
      },
      '/api/user-health-profiles': {
        get: {
          tags: ['User Health Profiles'],
          summary: 'Récupérer tous les profils de santé',
          responses: {
            200: {
              description: 'Liste des profils de santé',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/UserHealthProfile' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['User Health Profiles'],
          summary: 'Créer un nouveau profil de santé',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserHealthProfile' }
              }
            }
          },
          responses: {
            201: {
              description: 'Profil de santé créé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserHealthProfile' }
                }
              }
            }
          }
        }
      },
      '/api/user-health-profiles/{id}': {
        get: {
          tags: ['User Health Profiles'],
          summary: 'Récupérer un profil de santé par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Profil de santé trouvé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserHealthProfile' }
                }
              }
            }
          }
        },
        put: {
          tags: ['User Health Profiles'],
          summary: 'Mettre à jour un profil de santé',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserHealthProfile' }
              }
            }
          },
          responses: {
            200: {
              description: 'Profil de santé mis à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserHealthProfile' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['User Health Profiles'],
          summary: 'Supprimer un profil de santé',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Profil de santé supprimé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserHealthProfile' }
                }
              }
            }
          }
        }
      },
      '/api/user-health-profiles/user/{userId}': {
        get: {
          tags: ['User Health Profiles'],
          summary: 'Récupérer le profil de santé d\'un utilisateur',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          responses: {
            200: {
              description: 'Profil de santé de l\'utilisateur',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserHealthProfile' }
                }
              }
            }
          }
        }
      },
      '/api/user-biometrics': {
        get: {
          tags: ['User Biometrics'],
          summary: 'Récupérer toutes les données biométriques',
          responses: {
            200: {
              description: 'Liste des données biométriques',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/UserBiometric' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['User Biometrics'],
          summary: 'Créer une nouvelle donnée biométrique',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserBiometric' }
              }
            }
          },
          responses: {
            201: {
              description: 'Donnée biométrique créée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserBiometric' }
                }
              }
            }
          }
        }
      },
      '/api/user-biometrics/{id}': {
        get: {
          tags: ['User Biometrics'],
          summary: 'Récupérer une donnée biométrique par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Donnée biométrique trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserBiometric' }
                }
              }
            }
          }
        },
        put: {
          tags: ['User Biometrics'],
          summary: 'Mettre à jour une donnée biométrique',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserBiometric' }
              }
            }
          },
          responses: {
            200: {
              description: 'Donnée biométrique mise à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserBiometric' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['User Biometrics'],
          summary: 'Supprimer une donnée biométrique',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Donnée biométrique supprimée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserBiometric' }
                }
              }
            }
          }
        }
      },
      '/api/user-biometrics/user/{userId}': {
        get: {
          tags: ['User Biometrics'],
          summary: 'Récupérer les données biométriques d\'un utilisateur',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          responses: {
            200: {
              description: 'Données biométriques de l\'utilisateur',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/UserBiometric' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/session-progress': {
        get: {
          tags: ['Session Progress'],
          summary: 'Récupérer toutes les progressions de session',
          responses: {
            200: {
              description: 'Liste des progressions de session',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SessionProgress' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Session Progress'],
          summary: 'Créer une nouvelle progression de session',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SessionProgress' }
              }
            }
          },
          responses: {
            201: {
              description: 'Progression de session créée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SessionProgress' }
                }
              }
            }
          }
        }
      },
      '/api/session-progress/{id}': {
        get: {
          tags: ['Session Progress'],
          summary: 'Récupérer une progression de session par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Progression de session trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SessionProgress' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Session Progress'],
          summary: 'Mettre à jour une progression de session',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SessionProgress' }
              }
            }
          },
          responses: {
            200: {
              description: 'Progression de session mise à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SessionProgress' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Session Progress'],
          summary: 'Supprimer une progression de session',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Progression de session supprimée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SessionProgress' }
                }
              }
            }
          }
        }
      },
      '/api/session-progress/user/{userId}': {
        get: {
          tags: ['Session Progress'],
          summary: 'Récupérer les progressions de session d\'un utilisateur',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          responses: {
            200: {
              description: 'Progressions de session de l\'utilisateur',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SessionProgress' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/consumes': {
        get: {
          tags: ['Consumes'],
          summary: 'Récupérer toutes les consommations alimentaires',
          responses: {
            200: {
              description: 'Liste des consommations alimentaires',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Consume' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Consumes'],
          summary: 'Créer une nouvelle consommation alimentaire',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Consume' }
              }
            }
          },
          responses: {
            201: {
              description: 'Consommation alimentaire créée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Consume' }
                }
              }
            }
          }
        }
      },
      '/api/consumes/{id}': {
        get: {
          tags: ['Consumes'],
          summary: 'Récupérer une consommation alimentaire par ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Consommation alimentaire trouvée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Consume' }
                }
              }
            }
          }
        },
        put: {
          tags: ['Consumes'],
          summary: 'Mettre à jour une consommation alimentaire',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Consume' }
              }
            }
          },
          responses: {
            200: {
              description: 'Consommation alimentaire mise à jour',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Consume' }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Consumes'],
          summary: 'Supprimer une consommation alimentaire',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Consommation alimentaire supprimée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Consume' }
                }
              }
            }
          }
        }
      },
      '/api/consumes/user/{userId}': {
        get: {
          tags: ['Consumes'],
          summary: 'Récupérer les consommations alimentaires d\'un utilisateur',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de l\'utilisateur'
            }
          ],
          responses: {
            200: {
              description: 'Consommations alimentaires de l\'utilisateur',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Consume' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
