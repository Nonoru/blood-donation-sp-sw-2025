package com.nonoru.superapp.config;

import com.nonoru.superapp.dto.UserDetail;
import com.nonoru.superapp.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;
    private List<String> URL_WITHOUT_TOKEN = List.of("/auth/login","/auth/register");
    @Override
    protected void doFilterInternal
            (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        /* Kiểm tra và bỏ qua các url dành cho request không có token */
        if(URL_WITHOUT_TOKEN.contains(request.getServletPath())) {
            filterChain.doFilter(request, response);
            return;
        }

        /* Ký token */
        String authHeader = request.getHeader("Authorization");
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if(jwtTokenProvider.introspectToken(token)) {
                String username = jwtTokenProvider.getUsernameFromToken(token);
                UserDetail userDetail = userService.getUserDetail(username);
//                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetail.getUsername(), null, userDetail.a);
            }
            System.out.println(jwtTokenProvider.introspectToken(token));
        }
        filterChain.doFilter(request, response);
    }
}
