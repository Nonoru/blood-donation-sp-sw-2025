package com.nonoru.superapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;
    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Mã OTP đặt lại mật khẩu");
        msg.setText("Mã OTP của bạn là: " + otp + "\nMã chỉ có hiệu lực trong 5 phút.");
        mailSender.send(msg);
    }
}