// src/main/java/com/dnb/skillassessment/payload/response/MessageResponse.java
package com.dnb.skillassessment.payload.response;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}