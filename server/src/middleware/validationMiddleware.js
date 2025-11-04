import Joi from 'joi';

// User validation schemas
export const userSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
      .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit'
      }),
    role: Joi.string().valid('worker', 'business', 'admin').required(),
    profile: Joi.object({
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
      location: Joi.object({
        coordinates: Joi.array().items(Joi.number()).length(2).required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.string().pattern(/^\d{6}$/).required()
      }).required()
    }).required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    profile: Joi.object({
      firstName: Joi.string().min(2).max(50).optional(),
      lastName: Joi.string().min(2).max(50).optional(),
      phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
      avatar: Joi.string().uri().optional(),
      location: Joi.object({
        coordinates: Joi.array().items(Joi.number()).length(2).optional(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        country: Joi.string().optional(),
        pincode: Joi.string().pattern(/^\d{6}$/).optional()
      }).optional()
    }).optional(),
    workerDetails: Joi.object({
      skills: Joi.array().items(Joi.object({
        skill: Joi.string().required(),
        experience: Joi.number().min(0).required(),
        hourlyRate: Joi.number().min(0).required(),
        certificates: Joi.array().items(Joi.string()).optional()
      })).optional(),
      availability: Joi.object({
        schedule: Joi.array().items(Joi.object({
          day: Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday').required(),
          slots: Joi.array().items(Joi.object({
            start: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
            end: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required()
          })).optional()
        })).optional(),
        isAvailableNow: Joi.boolean().optional()
      }).optional()
    }).optional(),
    businessDetails: Joi.object({
      businessName: Joi.string().optional(),
      businessType: Joi.string().optional(),
      gstin: Joi.string().pattern(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/).optional(),
      registrationNumber: Joi.string().optional()
    }).optional()
  })
};

// Job validation schemas
export const jobSchemas = {
  create: Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(20).max(2000).required(),
    category: Joi.string().required(),
    skillsRequired: Joi.array().items(Joi.string()).min(1).required(),
    type: Joi.string().valid('one-time', 'recurring').required(),
    location: Joi.object({
      coordinates: Joi.array().items(Joi.number()).length(2).required(),
      address: Joi.string().required()
    }).required(),
    schedule: Joi.object({
      startDate: Joi.date().greater('now').required(),
      endDate: Joi.date().when('type', { is: 'recurring', then: Joi.required() }),
      isFlexible: Joi.boolean().optional(),
      duration: Joi.number().min(1).optional()
    }).required(),
    budget: Joi.object({
      type: Joi.string().valid('fixed', 'hourly').required(),
      amount: Joi.number().min(1).required(),
      currency: Joi.string().default('INR')
    }).required(),
    requirements: Joi.object({
      experienceNeeded: Joi.number().min(0).optional(),
      certificatesRequired: Joi.array().items(Joi.string()).optional(),
      toolsProvided: Joi.boolean().optional(),
      additionalDetails: Joi.string().optional()
    }).optional(),
    urgency: Joi.string().valid('low', 'medium', 'high', 'immediate').default('medium'),
    visibility: Joi.string().valid('public', 'private', 'invite-only').default('public')
  }),

  apply: Joi.object({
    proposal: Joi.string().min(10).max(500).required(),
    quotedPrice: Joi.number().min(1).required()
  }),

  updateStatus: Joi.object({
    status: Joi.string().valid('open', 'assigned', 'in-progress', 'completed', 'cancelled').required(),
    workerId: Joi.string().when('status', { is: 'assigned', then: Joi.required() })
  }),

  complete: Joi.object({
    rating: Joi.object({
      rating: Joi.number().min(1).max(5).required(),
      review: Joi.string().max(500).optional()
    }).required(),
    proofOfWork: Joi.array().items(Joi.object({
      type: Joi.string().valid('image', 'document', 'video').required(),
      url: Joi.string().uri().required(),
      description: Joi.string().optional()
    })).optional()
  })
};

// Skill validation schemas
export const skillSchemas = {
  upsert: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().required(),
    description: Joi.string().max(500).optional(),
    certifications: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      provider: Joi.string().required(),
      level: Joi.string().required()
    })).optional(),
    averageHourlyRate: Joi.object({
      amount: Joi.number().min(0).required(),
      currency: Joi.string().default('INR')
    }).optional(),
    requirements: Joi.object({
      tools: Joi.array().items(Joi.string()).optional(),
      regulations: Joi.array().items(Joi.string()).optional(),
      physicalDemands: Joi.array().items(Joi.string()).optional()
    }).optional()
  })
};

// Validation middleware function
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }
    next();
  };
};
