package com.web.lab4_back.util;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class PasswordHasher {
    public static String hashPassword(char[] password) {
        int cost = 12; // common used cost factor.
        return BCrypt.withDefaults().hashToString(cost, password);
    }

    public static boolean checkPassword(char[] password, String hashedPassword) {
        return BCrypt.verifyer().verify(password, hashedPassword).verified;
    }
}