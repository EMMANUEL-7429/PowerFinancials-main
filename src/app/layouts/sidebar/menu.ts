import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.DASHBOARDS.TEXT",
    icon: "bx-home-circle",
    badge: {
      variant: "info",
      text: "MENUITEMS.DASHBOARDS.BADGE",
    },
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.DASHBOARDS.LIST.DEFAULT",
        link: "/dashboard",
        parentId: 2,
      },
      {
        id: 4,
        label: "MENUITEMS.DASHBOARDS.LIST.SAAS",
        link: "/dashboards/saas",
        parentId: 2,
      },
      {
        id: 5,
        label: "MENUITEMS.DASHBOARDS.LIST.CRYPTO",
        link: "/dashboards/crypto",
        parentId: 2,
      },
      {
        id: 6,
        label: "MENUITEMS.DASHBOARDS.LIST.BLOG",
        link: "/dashboards/blog",
        parentId: 2,
      },
      {
        id: 7,
        label: "MENUITEMS.DASHBOARDS.LIST.SYSTEM-USERS",
        link: "/dashboards/system-users",
        parentId: 2,
      },
    ],
  },
  {
    id: 7,
    isLayout: true,
  },
  {
    id: 8,
    label: "SETTINGS",
    isTitle: true,
  },
  {
    id: 9,
    label: "MAIN SETTINGS",
    icon: "bx-wrench",
    subItems: [
      {
        id: 9,
        label: "Prefix Settings",
        link: "/prefix-settings",
        parentId: "9",
      },
      {
        id: 10,
        label: "Numbering Settings",
        link: "/numbering-settings",
        parentId: "9",
      },
      {
        id: 11,
        label: "Setup Settings",
        link: "/setup-settings",
        parentId: "9",
      },
      {
        id: 110,
        label: "Company Branches",
        link: "/CompanyBranches",
        parentId: "9",
      },
      {
        id: 111,
        label: "Setup Information",
        link: "/SetupInformation",
        parentId: "9",
      },
      {
        id: 112,
        label: "Holidays",
        link: "/Holidays",
        parentId: "9",
      },
    ],
  },
  {
    id: 10,
    label: "MEMBER SETTINGS",
    icon: "bx-wrench",
    subItems: [
      {
        id: 11,
        label: "Member Titles",
        link: "/member-titles",
        parentId: 10,
      },
      {
        id: 12,
        label: "Marital Status",
        link: "/marital-status",
        parentId: 10,
      },
      {
        id: 12,
        label: "Level Of Education",
        link: "/level-of-education",
        parentId: 10,
      },
      {
        id: 12,
        label: "Member Status",
        link: "/member-status",
        parentId: 10,
      },
      {
        id: 12,
        label: "Nationalities",
        link: "/nationality",
        parentId: 10,
      },
      {
        id: 12,
        label: "Security Question",
        link: "/security-question",
        parentId: 10,
      },
      {
        id: 12,
        label: "Bank",
        link: "/bank",
        parentId: 10,
      },
      {
        id: 12,
        label: "Bank Branches",
        link: "/bank-branches",
        parentId: 10,
      },
      {
        id: 12,
        label: "Currency",
        link: "/currency",
        parentId: 10,
      },
      {
        id: 12,
        label: "Exchange Rates",
        link: "/exchange-rate",
        parentId: 10,
      },
      {
        id: 12,
        label: "Document Types",
        link: "/document-type",
        parentId: 10,
      },
      {
        id: 12,
        label: "Kin Relations",
        link: "/kin-relation",
        parentId: 10,
      },
      {
        id: 12,
        label: "Structure",
        link: "/structure",
        parentId: 10,
      },
      {
        id: 12,
        label: "Structure Value",
        link: "/Parent-structure-value",
        parentId: 10,
      },
      {
        id: 1210,
        label: "Modes of Payment",
        link: "/Paymodes",
        parentId: 10,
      },
      /*
      {
        id: 12,
        label: "Structure",
        link: "/view-structure",
        parentId: 10,
      },
      {
        id: 12,
        label: "Structure value",
        link: "/structurevalue-list",
        parentId: 10,
      },*/
    ],
  },
  {
    id: 13,
    label: "LOAN SETTINGS",
    icon: "bx-wrench",
    subItems: [
      {
        id: 14,
        label: "Loan Types",
        link: "/loan-type",
        parentId: 13,
      },
      {
        id: 15,
        label: "Loan  Charges",
        link: "/Loan-Charges",
        parentId: 13,
      },
      {
        id: 16,
        label: "Loan Purpose",
        link: "/loan-purpose",
        parentId: 13,
      },
      {
        id: 17,
        label: "Loan Collateral",
        link: "/loan-collateral",
        parentId: 13,
      },
      {
        id: 18,
        label: "Loan Donor",
        link: "/loan-donor",
        parentId: 13,
      },
      {
        id: 19,
        label: "Loan Status",
        link: "/loan-status",
        parentId: 13,
      },
      
      {
        id: 19,
        label: "Company Branches",
        link: "/company-branches",
        parentId: 13,
      },
      {
        id: 19,
        label: "Credit Officer",
        link: "/credit-officer",
        parentId: 13,
      },
      {
        id: 19,
        label: "Loan Recovery Order",
        link: "/loan-recovery-order",
        parentId: 13,
      },
    ],
  },
  {
    id: 9,
    label: "MENUITEMS.APPS.TEXT",
    isTitle: true,
  },

  {
    id: 12,
    label: "MEMBERS",
    icon: "bx-user",
    subItems: [
      {
        id: 12,
        label: "Member Registration",
        link: "/member",
        parentId: 12,
      },
      {
        id: 12,
        label: "Member Documents",
        link: "/document",
        parentId: 12,
      },
    ],
  },

  {
    id: 11,
    label: "CREATE ACCOUNT",
    icon: "bx-receipt",
    subItems: [
      {
        id: 12,
        label: "Add member account",
        link: "/create-account",
        parentId: 11,
      },/*
      {
        id: 12,
        label: "View member account",
        link: "/create-account-list",
        parentId: 11,
      },*/
    ],
  },
  {
    id: 11,
    label: "DEPOSIT PRODUCTS",
    icon: "bx-receipt",
    subItems: [
      {
        id: 12,
        label: "Add Product",
        link: "/products",
        parentId: 11,
      },
      {
        id: 12,
        label: "Add Charge",
        link: "/charges",
        parentId: 11,
      },
      
    ],
  },
  {
    id: 20,
    label: "FIXED DEPOSITS",
    icon: "bx-receipt",
    subItems: [  
      {
        id: 13,
        label: "Add FixedDeposits",
        link: "/FixedDeposit",
        parentId: 20,
      },  
    ],
  },
  {
    id: 16,
    label: "LOANS",
    icon: "bx-home",
    subItems: [
      {
        id: 17,
        label: "Loan Application",
        link: "/loan-application",
        parentId: 16,
      },
      {
        id: 16,
        label: "Loan Appraisal",
        link: "/loan-Appraisals-list",
        parentId: 13,
      },
      {
        id: 18,
        label: "Loan Disbursement",
        link: "/loan-disbersement-list",
        parentId: 16,
      },
     
      {
        id: 17,
        label: "Loan Repayment",
        link: "/loan-repayment",
        parentId: 13,
      },
      {
        id: 18,
        label: "MENUITEMS.ECOMMERCE.LIST.CART",
        link: "/ecommerce/cart",
        parentId: 13,
      },
      {
        id: 19,
        label: "MENUITEMS.ECOMMERCE.LIST.CHECKOUT",
        link: "/ecommerce/checkout",
        parentId: 13,
      },
      
    ],
  },
  {
    id: 22,
    label: "TRANSACTION",
    icon: "bx-bitcoin",
    subItems: [
      {
        id: 23,
        label: "Add Transaction",
        link: "/deposit-transaction",
        parentId: 22,
      },
      {
        id: 23,
        label: "Withdrawals",
        link: "/withdrawal",
        parentId: 21,
      },
    ],
  } /*
    {
        id: 29,
        label: 'MENUITEMS.EMAIL.TEXT',
        icon: 'bx-envelope',
        subItems: [
            {
                id: 30,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '/email/inbox',
                parentId: 29
            },
            {
                id: 31,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '/email/read/1',
                parentId: 29
            },
            {
                id: 32,
                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
                },
                parentId: 29,
                subItems: [
                    {
                        id:33 ,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC',
                        link: '/email/basic',
                        parentId:32 
                    },
                    {
                        id:34 ,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT',
                        link: '/email/alert',
                        parentId:32 
                    },
                    {
                        id:35 ,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING',
                        link: '/email/billing',
                        parentId:32 
                    }
                ]
            }
        ]
    },
    {
        id: 36,
        label: 'MENUITEMS.INVOICES.TEXT',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 37,
                label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                link: '/invoices/list',
                parentId: 36
            },
            {
                id: 38,
                label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
                link: '/invoices/detail',
                parentId: 36
            },
        ]
    },
    {
        id: 39,
        label: 'MENUITEMS.PROJECTS.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 40,
                label: 'MENUITEMS.PROJECTS.LIST.GRID',
                link: '/projects/grid',
                parentId: 38
            },
            {
                id: 41,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTLIST',
                link: '/projects/list',
                parentId: 38
            },
            {
                id: 42,
                label: 'MENUITEMS.PROJECTS.LIST.OVERVIEW',
                link: '/projects/overview',
                parentId: 38
            },
            {
                id: 43,
                label: 'MENUITEMS.PROJECTS.LIST.CREATE',
                link: '/projects/create',
                parentId: 38
            }
        ]
    },
    {
        id: 44,
        label: 'MENUITEMS.TASKS.TEXT',
        icon: 'bx-task',
        subItems: [
            {
                id: 45,
                label: 'MENUITEMS.TASKS.LIST.TASKLIST',
                link: '/tasks/list',
                parentId: 44
            },
            {
                id: 46,
                label: 'MENUITEMS.TASKS.LIST.KANBAN',
                link: '/tasks/kanban',
                parentId: 44
            },
            {
                id: 47,
                label: 'MENUITEMS.TASKS.LIST.CREATETASK',
                link: '/tasks/create',
                parentId: 44
            }
        ]
    },
    {
        id: 48,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 49,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/contacts/grid',
                parentId: 48
            },
            {
                id: 50,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/contacts/list',
                parentId: 48
            },
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/contacts/profile',
                parentId: 48
            }
        ]
    },
    {
        id: 52,
        label: 'MENUITEMS.BLOG.TEXT',
        icon: 'bx-file',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
        },
        subItems: [
            {
                id: 53,
                label: 'MENUITEMS.BLOG.LIST.BLOGLIST',
                link: '/blog/list',
                parentId: 52
            },
            {
                id: 54,
                label: 'MENUITEMS.BLOG.LIST.BLOGGRID',
                link: '/blog/grid',
                parentId: 52
            },
            {
                id: 55,
                label: 'MENUITEMS.BLOG.LIST.DETAIL',
                link: '/blog/detail',
                parentId: 52
            },
        ]
    },
    {
        id: 56,
        label: 'MENUITEMS.PAGES.TEXT',
        isTitle: true
    },
    {
        id: 57,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'bx-user-circle',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.AUTHENTICATION.BADGE',
        },
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
                link: '/account/login',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN2',
                link: '/account/login-2',
                parentId: 57
            },
            {
                id: 60,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
                link: '/account/signup',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER2',
                link: '/account/signup-2',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
                link: '/account/reset-password',
                parentId: 57
            },
            {
                id: 63,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD2',
                link: '/account/recoverpwd-2',
                parentId: 57
            },
            {
                id: 64,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                link: '/pages/lock-screen-1',
                parentId: 57
            },
            {
                id: 65,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN2',
                link: '/pages/lock-screen-2',
                parentId: 57
            },
            {
                id: 66,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL',
                link: '/pages/confirm-mail',
                parentId: 57
            },
            {
                id: 67,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL2',
                link: '/pages/confirm-mail-2',
                parentId: 57
            },
            {
                id: 68,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                link: '/pages/email-verification',
                parentId: 57
            },
            {
                id: 69,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION2',
                link: '/pages/email-verification-2',
                parentId: 57
            },
            {
                id: 70,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                link: '/pages/two-step-verification',
                parentId: 57
            },
            {
                id: 71,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION2',
                link: '/pages/two-step-verification-2',
                parentId: 57
            }
        ]
    },
    {
        id: 72,
        label: 'MENUITEMS.UTILITY.TEXT',
        icon: 'bx-file',
        subItems: [
            {
                id: 73,
                label: 'MENUITEMS.UTILITY.LIST.STARTER',
                link: '/pages/starter',
                parentId: 72
            },
            {
                id: 74,
                label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                link: '/pages/maintenance',
                parentId: 72
            },
            {
                id: 74,
                label: 'Coming Soon',
                link: '/pages/coming-soon',
                parentId: 72
            },
            {
                id: 75,
                label: 'MENUITEMS.UTILITY.LIST.TIMELINE',
                link: '/pages/timeline',
                parentId: 72
            },
            {
                id: 76,
                label: 'MENUITEMS.UTILITY.LIST.FAQS',
                link: '/pages/faqs',
                parentId: 72
            },
            {
                id: 77,
                label: 'MENUITEMS.UTILITY.LIST.PRICING',
                link: '/pages/pricing',
                parentId: 72
            },
            {
                id: 78,
                label: 'MENUITEMS.UTILITY.LIST.ERROR404',
                link: '/pages/404',
                parentId: 72
            },
            {
                id: 79,
                label: 'MENUITEMS.UTILITY.LIST.ERROR500',
                link: '/pages/500',
                parentId: 72
            },
        ]
    },
    {
        id: 80,
        label: 'MENUITEMS.COMPONENTS.TEXT',
        isTitle: true
    },
    {
        id: 81,
        label: 'MENUITEMS.UIELEMENTS.TEXT',
        icon: 'bx-tone',
        subItems: [
            {
                id: 82,
                label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
                link: '/ui/alerts',
                parentId: 81
            },
            {
                id: 83,
                label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
                link: '/ui/buttons',
                parentId: 81
            },
            {
                id: 84,
                label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
                link: '/ui/cards',
                parentId: 81
            },
            {
                id: 85,
                label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
                link: '/ui/carousel',
                parentId: 81
            },
            {
                id: 86,
                label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
                link: '/ui/dropdowns',
                parentId: 81
            },
            {
                id: 87,
                label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
                link: '/ui/grid',
                parentId: 81
            },
            {
                id: 88,
                label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
                link: '/ui/images',
                parentId: 81
            },
            {
                id: 88,
                label: 'MENUITEMS.UIELEMENTS.LIST.LIGHTBOX',
                link: '/ui/lightbox',
                parentId: 81
            },
            {
                id: 89,
                label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
                link: '/ui/modals',
                parentId: 81
            },
            {
                id: 90,
                label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
                link: '/ui/rangeslider',
                parentId: 81
            },
            {
                id: 91,
                label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
                link: '/ui/progressbar',
                parentId: 81
            },
            {
                id: 92,
                label: 'MENUITEMS.UIELEMENTS.LIST.PLACEHOLDER',
                link: '/ui/placeholder',
                parentId: 81
            },
            {
                id: 93,
                label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
                link: '/ui/sweet-alert',
                parentId: 81
            },
            {
                id: 94,
                label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
                link: '/ui/tabs-accordions',
                parentId: 81
            },
            {
                id: 95,
                label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
                link: '/ui/typography',
                parentId: 81
            },
            {
                id: 96,
                label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
                link: '/ui/video',
                parentId: 81
            },
            {
                id: 97,
                label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
                link: '/ui/general',
                parentId: 81
            },
            {
                id: 98,
                label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
                link: '/ui/colors',
                parentId: 81
            },
            {
                id: 99,
                label: 'MENUITEMS.UIELEMENTS.LIST.CROPPER',
                link: '/ui/image-crop',
                parentId: 81
            },
        ]
    },
    {
        id: 100,
        label: 'MENUITEMS.FORMS.TEXT',
        icon: 'bxs-eraser',
        badge: {
            variant: 'danger',
            text: 'MENUITEMS.FORMS.BADGE',
        },
        subItems: [
            {
                id: 101,
                label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
                link: '/form/elements',
                parentId: 100
            },
            {
                id: 102,
                label: 'MENUITEMS.FORMS.LIST.LAYOUTS',
                link: '/form/layouts',
                parentId: 100
            },
            {
                id: 103,
                label: 'MENUITEMS.FORMS.LIST.VALIDATION',
                link: '/form/validation',
                parentId: 100
            },
            {
                id: 104,
                label: 'MENUITEMS.FORMS.LIST.ADVANCED',
                link: '/form/advanced',
                parentId: 100
            },
            {
                id: 105,
                label: 'MENUITEMS.FORMS.LIST.EDITOR',
                link: '/form/editor',
                parentId: 100
            },
            {
                id: 106,
                label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
                link: '/form/uploads',
                parentId: 100
            },
            {
                id: 107,
                label: 'MENUITEMS.FORMS.LIST.REPEATER',
                link: '/form/repeater',
                parentId: 100
            },
            {
                id: 108,
                label: 'MENUITEMS.FORMS.LIST.WIZARD',
                link: '/form/wizard',
                parentId: 100
            },
            {
                id: 109,
                label: 'MENUITEMS.FORMS.LIST.MASK',
                link: '/form/mask',
                parentId: 100
            }
        ]
    },
    {
        id: 110,
        icon: 'bx-list-ul',
        label: 'MENUITEMS.TABLES.TEXT',
        subItems: [
            {
                id: 111,
                label: 'MENUITEMS.TABLES.LIST.BASIC',
                link: '/tables/basic',
                parentId: 110
            },
            {
                id: 112,
                label: 'MENUITEMS.TABLES.LIST.ADVANCED',
                link: '/tables/advanced',
                parentId: 110
            }
        ]
    },
    {
        id: 113,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.CHARTS.TEXT',
        subItems: [
            {
                id: 114,
                label: 'MENUITEMS.CHARTS.LIST.APEX',
                link: '/charts/apex',
                parentId: 113
            },
            {
                id: 115,
                label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
                link: '/charts/chartjs',
                parentId: 113
            },
            {
                id: 116,
                label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
                link: '/charts/chartist',
                parentId: 113
            },
            {
                id: 117,
                label: 'MENUITEMS.CHARTS.LIST.ECHART',
                link: '/charts/echart',
                parentId: 113
            }
        ]
    },
    {
        id: 118,
        label: 'MENUITEMS.ICONS.TEXT',
        icon: 'bx-aperture',
        subItems: [
            {
                id: 119,
                label: 'MENUITEMS.ICONS.LIST.BOXICONS',
                link: '/icons/boxicons',
                parentId: 118
            },
            {
                id: 120,
                label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
                link: '/icons/materialdesign',
                parentId: 118
            },
            {
                id: 121,
                label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
                link: '/icons/dripicons',
                parentId: 118
            },
            {
                id: 122,
                label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
                link: '/icons/fontawesome',
                parentId: 118
            },
        ]
    },
    {
        id: 123,
        label: 'MENUITEMS.MAPS.TEXT',
        icon: 'bx-map',
        subItems: [
            {
                id: 124,
                label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
                link: '/maps/google',
                parentId: 123
            }
        ]
    },
    {
        id: 125,
        label: 'MENUITEMS.MULTILEVEL.TEXT',
        icon: 'bx-share-alt',
        subItems: [
            {
                id: 126,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                link: '#',
                parentId: 125
            },
            {
                id: 127,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                parentId: 125,
                subItems: [
                    {
                        id: 128,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                        parentId: 127,
                    },
                    {
                        id: 129,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                        parentId: 127,
                    }
                ]
            },
        ]
    }*/,
];
