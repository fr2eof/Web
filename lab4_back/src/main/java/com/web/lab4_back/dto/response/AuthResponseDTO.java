package com.web.lab4_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String userId;
    private String accessToken;
    private String refreshToken;

    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }
}
