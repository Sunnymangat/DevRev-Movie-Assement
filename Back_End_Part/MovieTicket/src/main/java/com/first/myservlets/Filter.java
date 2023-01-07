package com.first.myservlets;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;    

@WebFilter(asyncSupported = true, urlPatterns = { "/*" })
public class Filter implements jakarta.servlet.Filter {

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        
    	((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST");
        
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Headers", "Content-Type,search_date,movieId,movie_name,movie_type,release_date,theatre_name,show_timings,ticket_price,movie_validity_start,movie_validity_ends,movie_description,cust_number,busniess_year,document_id,invoice_currency,customer_payment_terms,invoice_id,customerId,rowsPerPage,page,totalRows");
        																																																		
         chain.doFilter(request, response);
         
    }

    public void init(FilterConfig fConfig) throws ServletException {
        
    }

    @Override
    public void destroy() {

    }
    
}