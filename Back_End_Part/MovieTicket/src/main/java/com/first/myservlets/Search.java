package com.first.myservlets;

import java.io.IOException;
import java.util.ArrayList;
import com.google.gson.Gson;
import java.sql.SQLException;
import com.first.pojo.HeadClass;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.first.crud.BuildConnection;


@WebServlet("/search")
public class Search extends HttpServlet{

	/**
	 * 
	 */
	
	private static final long serialVersionUID = -4338943228267098945L;
	
	int currentRes=0,prevRes=0,rowsPerPage=0,currentrowsPerPage,page;		
	String movie_name="";
	public void doGet(HttpServletRequest req,HttpServletResponse res) throws IOException{
		
		BuildConnection wic=new BuildConnection();
		Gson gson=new Gson();
	
		try {
			String movieId=req.getHeader("movieId");
			int rows=wic.searchAvialable(movieId);

			String resp=gson.toJson(rows);
			res.getWriter().println(resp);
			
		} 
		catch (ClassNotFoundException | NumberFormatException | SQLException e) {
			
			String resp=gson.toJson(0);
			res.getWriter().println(resp);
			
		}
		
	}
	

	public void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{
		BuildConnection wic=new BuildConnection();
		
		try {
			movie_name=req.getHeader("movieId");
			System.out.println(movie_name);
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
			
			ArrayList<HeadClass> wi=wic.getSeachingData(prevRes,rowsPerPage,movie_name);
			Gson gson=new Gson();
		
			String respp=gson.toJson(wi);
			res.getWriter().println(respp);
			
			prevRes=currentRes;
			
		} catch (ClassNotFoundException | SQLException | IOException e) {
			
			e.printStackTrace();
			
			res.getWriter().println(new Gson().toJson("Fail"));
			
		}
		
	}
	
}
