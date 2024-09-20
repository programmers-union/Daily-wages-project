import { check } from 'express-validator';


export const validateCommonSignup = [
    check('firstName', 'First Name is required').notEmpty(),
    check('lastName', 'Last Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('phoneNumber', 'Please include a valid phone number').isLength({ min: 14 }),
];


export const validateClientSignup = [
    ...validateCommonSignup, 
    
];


export const validateEmployerSignup = [
    
    ...validateCommonSignup, 
    check('dob', 'Please include a valid date of birth').isDate(),
    check('gender', 'Gender is required').notEmpty(),
    check('address', 'Address is required').notEmpty(),
    check('selectState', 'State selection is required').notEmpty(),
    check('selectDistrict', 'District selection is required').notEmpty(),
    check('selectCity', 'City selection is required').notEmpty(),
    check('pinCode', 'Please include a valid pin code').isPostalCode('any'),
    check('skills', 'Skills are required').notEmpty(),
    check('qualification', 'Qualification is required').notEmpty(),
    check('experience', 'Experience is required').notEmpty(),
    check('skillLevel', 'Skill level is required').notEmpty(),
    // check('holderName', 'Account holder name is required').notEmpty(),
    // check('accoutNumber', 'Account number is required').notEmpty(),
    // check('bank', 'Bank name is required').notEmpty(),
    // check('ifsc', 'IFSC code is required').notEmpty(),
    // check('branch', 'Branch name is required').notEmpty(),
    // check('linkPhoneNumber', 'Linked phone number is required').isLength({ min: 10, max: 14 }),
    check('idProof', 'ID proof is required').notEmpty(),
    check('uniqueId', 'Unique ID is required').notEmpty(),
    // check('idProofFile', 'ID proof file is required').notEmpty(), 
    // check('profilePic', 'profile pic file is required').notEmpty(), 
];
