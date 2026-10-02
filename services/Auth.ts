/**
 * Bouden Motorsport - Authentication Configuration & Handlers
 * Official Admin Credentials:
 *   Username: bouden
 *   Password: reda
 */

import { adminLogin, adminVerify, adminLogout, getStoredAdminToken, getStoredAdminUser } from './adminService';
import { userLogin, userRegister, userLogout, getStoredUser, getStoredUserToken } from './authService';

export const ADMIN_CREDENTIALS = {
    username: 'bouden',
    password: 'reda'
} as const;

export const validateAdminCredentials = (username: string, password: string): boolean => {
    return (
        username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
        password.trim() === ADMIN_CREDENTIALS.password
    );
};

export {
    adminLogin,
    adminVerify,
    adminLogout,
    getStoredAdminToken,
    getStoredAdminUser,
    userLogin,
    userRegister,
    userLogout,
    getStoredUser,
    getStoredUserToken
};
