package com.first.myservlets;

import java.util.HashMap;
import java.util.ArrayList;
import java.io.IOException;
import com.google.gson.Gson;
import java.sql.SQLException;
import com.first.pojo.HeadClass;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.first.crud.BuildConnection;

@WebServlet("/advance_search")
public class AdvanceSearching extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2439581227234155986L;
	
	HashMap<String, String> json ;
	
	int currentRes=0,prevRes=0,rowsPerPage=0,currentrowsPerPage,page;	
	String movie_name="";
	
	protected void doGet(HttpServletRequest req,HttpServletResponse res) throws IOException{
		BuildConnection wic=new BuildConnection();
		Gson gson=new Gson();
		json = new HashMap<String,String>();
		movie_name=(req.getHeader("movie_name"));
		String search_date=(req.getHeader("search_date"));
		String  theatre_name=(req.getHeader("theatre_name"));
		
		json.put("movie_name", movie_name);
		json.put("search_date", search_date);
		json.put("theatre_name", theatre_name);
		
		while( json.values().remove("") );
		
		try {
			int rows=wic.advSearchTotal(json);
			res.setIntHeader("movie_name",rows);
			String resp=gson.toJson(rows);
			res.getWriter().println(resp);
		} 
		catch ( NumberFormatException | ClassNotFoundException | SQLException  e) {
			String resp=gson.toJson(0);
			res.getWriter().println(resp);
		}
	}
	
	protected void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{
		BuildConnection wic=new BuildConnection();
		Gson gson=new Gson();
		
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
		
		
		while( json.values().remove("") );
		
		try {
			ArrayList<HeadClass> W=wic.advsearch(json,prevRes,rowsPerPage);
			String resp=gson.toJson(W);
			res.getWriter().println(resp);
			prevRes=currentRes;
		} 
		catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
	}
	
}
