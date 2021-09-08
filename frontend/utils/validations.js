import { EMAIL_REGEX } from '~/utils/regex';


export const EMAIL_VALIDATION = (error) => (email) => EMAIL_REGEX.test(email) || error;
