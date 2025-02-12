/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    pages: Page;
    posts: Post;
    guides: Guide;
    reviews: Review;
    settings: Setting;
    navigation: Navigation;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    guides: GuidesSelect<false> | GuidesSelect<true>;
    reviews: ReviewsSelect<false> | ReviewsSelect<true>;
    settings: SettingsSelect<false> | SettingsSelect<true>;
    navigation: NavigationSelect<false> | NavigationSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name: string;
  roles?: ('admin' | 'editor')[] | null;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  /**
   * Provide a descriptive text that explains the image for screen readers and SEO
   */
  alt?: string | null;
  caption?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    desktop?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  /**
   * Is this the home page?
   */
  isHomePage?: boolean | null;
  parent?: (number | null) | Page;
  slug: string;
  status: 'draft' | 'published';
  /**
   * Date this page was published
   */
  publishedAt?: string | null;
  blocks?:
    | (
        | HeroBlock
        | {
            content: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            heading: string;
            subheading: string;
            features?:
              | {
                  title: string;
                  description: string;
                  icon: 'microscope' | 'scale' | 'filter' | 'truck' | 'heartHandshake' | 'percent';
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'features';
          }
        | {
            heading: string;
            description: string;
            benefits: {
              text: string;
              id?: string | null;
            }[];
            rating: {
              score: string;
              text: string;
            };
            limitedTimeOffer: string;
            primaryButtonText?: string | null;
            primaryButtonLink?: string | null;
            secondaryButtonText?: string | null;
            secondaryButtonLink?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
        | {
            text: string;
            link: {
              text: string;
              url: string;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'referralStrip';
          }
        | {
            heading: string;
            steps?:
              | {
                  title: string;
                  description: string;
                  id?: string | null;
                }[]
              | null;
            image: {
              url: string;
              alt: string;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'howItWorks';
          }
        | {
            heading: string;
            description: string;
            benefits?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            image: {
              url: string;
              alt: string;
            };
            flagImage: {
              url: string;
              alt: string;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'madeInUSA';
          }
        | {
            heading: string;
            description: string;
            tiers: {
              quantity: number;
              discount: number;
              id?: string | null;
            }[];
            footerText: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'bulkOrders';
          }
        | {
            heading: string;
            description: string;
            faqs: {
              question: string;
              answer: string;
              id?: string | null;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'faq';
          }
        | {
            id?: string | null;
            blockName?: string | null;
            blockType: 'contact';
          }
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroBlock".
 */
export interface HeroBlock {
  heading: string;
  description: string;
  mushroomTypes?:
    | {
        type: string;
        id?: string | null;
      }[]
    | null;
  image: number | Media;
  specs?:
    | {
        label: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  content: {
    content: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    id?: string | null;
    blockName?: string | null;
    blockType: 'content';
  }[];
  excerpt: string;
  category: 'growing-guides' | 'mushroom-species' | 'equipment-reviews' | 'success-stories' | 'industry-news';
  /**
   * This image will be used as the cover image for the post
   */
  featuredImage: number | Media;
  status: 'draft' | 'published';
  /**
   * Posts will be published at this date
   */
  publishedAt?: string | null;
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "guides".
 */
export interface Guide {
  id: number;
  title: string;
  content?:
    | {
        content: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'content';
      }[]
    | null;
  excerpt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete: {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks';
  };
  featuredImage: number | Media;
  status: 'draft' | 'published';
  publishedAt?: string | null;
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews".
 */
export interface Review {
  id: number;
  customerName: string;
  /**
   * Rate from 1 to 5 stars
   */
  rating: number;
  reviewText: string;
  purchasedProduct: string;
  customerLocation?: string | null;
  /**
   * Optional customer photo
   */
  customerImage?: (number | null) | Media;
  /**
   * Check if this review is from a verified purchase
   */
  verifiedPurchase?: boolean | null;
  status: 'pending' | 'approved' | 'rejected';
  /**
   * Feature this review on the website
   */
  featured?: boolean | null;
  /**
   * Internal notes about this review
   */
  adminNotes?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings".
 */
export interface Setting {
  id: number;
  siteName: string;
  header: {
    logo: number | Media;
    navigation?: (number | null) | Navigation;
  };
  footer?: {
    navigation?: (number | null) | Navigation;
    socialLinks?:
      | {
          platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'pinterest';
          url: string;
          id?: string | null;
        }[]
      | null;
  };
  contact: {
    email: string;
    phone?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country?: string | null;
    };
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation".
 */
export interface Navigation {
  id: number;
  name: string;
  location: 'header' | 'footer';
  items: {
    label: string;
    link: string;
    subItems?:
      | {
          label: string;
          link: string;
          id?: string | null;
        }[]
      | null;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'guides';
        value: number | Guide;
      } | null)
    | ({
        relationTo: 'reviews';
        value: number | Review;
      } | null)
    | ({
        relationTo: 'settings';
        value: number | Setting;
      } | null)
    | ({
        relationTo: 'navigation';
        value: number | Navigation;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        desktop?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  isHomePage?: T;
  parent?: T;
  slug?: T;
  status?: T;
  publishedAt?: T;
  blocks?:
    | T
    | {
        hero?: T | HeroBlockSelect<T>;
        content?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
        features?:
          | T
          | {
              heading?: T;
              subheading?: T;
              features?:
                | T
                | {
                    title?: T;
                    description?: T;
                    icon?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        cta?:
          | T
          | {
              heading?: T;
              description?: T;
              benefits?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              rating?:
                | T
                | {
                    score?: T;
                    text?: T;
                  };
              limitedTimeOffer?: T;
              primaryButtonText?: T;
              primaryButtonLink?: T;
              secondaryButtonText?: T;
              secondaryButtonLink?: T;
              id?: T;
              blockName?: T;
            };
        referralStrip?:
          | T
          | {
              text?: T;
              link?:
                | T
                | {
                    text?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        howItWorks?:
          | T
          | {
              heading?: T;
              steps?:
                | T
                | {
                    title?: T;
                    description?: T;
                    id?: T;
                  };
              image?:
                | T
                | {
                    url?: T;
                    alt?: T;
                  };
              id?: T;
              blockName?: T;
            };
        madeInUSA?:
          | T
          | {
              heading?: T;
              description?: T;
              benefits?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              image?:
                | T
                | {
                    url?: T;
                    alt?: T;
                  };
              flagImage?:
                | T
                | {
                    url?: T;
                    alt?: T;
                  };
              id?: T;
              blockName?: T;
            };
        bulkOrders?:
          | T
          | {
              heading?: T;
              description?: T;
              tiers?:
                | T
                | {
                    quantity?: T;
                    discount?: T;
                    id?: T;
                  };
              footerText?: T;
              id?: T;
              blockName?: T;
            };
        faq?:
          | T
          | {
              heading?: T;
              description?: T;
              faqs?:
                | T
                | {
                    question?: T;
                    answer?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        contact?:
          | T
          | {
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroBlock_select".
 */
export interface HeroBlockSelect<T extends boolean = true> {
  heading?: T;
  description?: T;
  mushroomTypes?:
    | T
    | {
        type?: T;
        id?: T;
      };
  image?: T;
  specs?:
    | T
    | {
        label?: T;
        value?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  content?:
    | T
    | {
        content?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  excerpt?: T;
  category?: T;
  featuredImage?: T;
  status?: T;
  publishedAt?: T;
  slug?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "guides_select".
 */
export interface GuidesSelect<T extends boolean = true> {
  title?: T;
  content?:
    | T
    | {
        content?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  excerpt?: T;
  difficulty?: T;
  timeToComplete?:
    | T
    | {
        value?: T;
        unit?: T;
      };
  featuredImage?: T;
  status?: T;
  publishedAt?: T;
  slug?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews_select".
 */
export interface ReviewsSelect<T extends boolean = true> {
  customerName?: T;
  rating?: T;
  reviewText?: T;
  purchasedProduct?: T;
  customerLocation?: T;
  customerImage?: T;
  verifiedPurchase?: T;
  status?: T;
  featured?: T;
  adminNotes?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings_select".
 */
export interface SettingsSelect<T extends boolean = true> {
  siteName?: T;
  header?:
    | T
    | {
        logo?: T;
        navigation?: T;
      };
  footer?:
    | T
    | {
        navigation?: T;
        socialLinks?:
          | T
          | {
              platform?: T;
              url?: T;
              id?: T;
            };
      };
  contact?:
    | T
    | {
        email?: T;
        phone?: T;
        address?:
          | T
          | {
              line1?: T;
              line2?: T;
              city?: T;
              state?: T;
              postal_code?: T;
              country?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation_select".
 */
export interface NavigationSelect<T extends boolean = true> {
  name?: T;
  location?: T;
  items?:
    | T
    | {
        label?: T;
        link?: T;
        subItems?:
          | T
          | {
              label?: T;
              link?: T;
              id?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}