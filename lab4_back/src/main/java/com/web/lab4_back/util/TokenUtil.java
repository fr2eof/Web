package com.web.lab4_back.util;

import org.jetbrains.annotations.NotNull;
import org.mindrot.jbcrypt.BCrypt;

public class TokenUtil {
    public static @NotNull String hashToken(String token) {
        return BCrypt.hashpw(token, BCrypt.gensalt());
    }

    public static boolean verifyToken(String token, String hashedToken) {
        return BCrypt.checkpw(token, hashedToken);
    }
}
