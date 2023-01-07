package com.first.myservlets;

import com.first.crud.*;
import com.first.pojo.*;
import java.io.IOException;
import java.util.ArrayList;
import com.google.gson.Gson;
import java.sql.SQLException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/")
public class Fetch extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public Fetch() {
        super();
    }
	
	int currentRes=0,prevRes=0,rowsPerPage=0,currentrowsPerPage,page;
	
	public void doGet(HttpServletRequest req,HttpServletResponse res) throws IOException {
		
		BuildConnection wic=new BuildConnection();
		
		try {
			currentrowsPerPage=Integer.parseInt(req.getHeader("rowsPerPage"));
			page=Integer.parseInt(req.getHeader("page"));
			
			if(currentrowsPerPage!=rowsPerPage || page==-1) {
		
				rowsPerPage=currentrowsPerPage;
				prevRes=0;
				currentRes=prevRes+rowsPerPage;
			
			}else {
				
				currentRes=prevRes+rowsPerPage;
				
			}
			
		}catch(NumberFormatException n) {
			
			currentrowsPerPage=0;
			prevRes=0;
			currentRes=0;
			
		}
		
		
		try {
			ArrayList<HeadClass> wi=wic.getData(prevRes,rowsPerPage);
			
			Gson gson=new Gson();
			String respp=gson.toJson(wi);
			
			res.getWriter().println(respp);
			
			prevRes=currentRes;
			
		} catch (ClassNotFoundException|SQLException|IOException e) {
			
			e.printStackTrace();
			
			res.getWriter().println(new Gson().toJson("Fail"));
		}
		
	}
	
	
	public void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException {
		BuildConnection wic=new BuildConnection();
		
		try {
			
			int rowsize=wic.dbSize();
			Gson gson=new Gson();
			
			String respp=gson.toJson(rowsize);
			res.getWriter().println(respp);
			
		} catch (ClassNotFoundException | SQLException e) {
			
			e.printStackTrace();
			res.getWriter().println(new Gson().toJson("Fail"));
			
		}
	}
}
