package com.first.myservlets;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import com.first.crud.BuildConnection;
import com.first.pojo.HeadClass;
import com.google.gson.Gson;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/userid")
public class ShowBooked  extends HttpServlet{
	private static final long serialVersionUID = 1L;
	public ShowBooked() {
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
			String user_id=req.getHeader("user_id");
			ArrayList<HeadClass> wi=wic.getData(prevRes,rowsPerPage,user_id);
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
		String user_id=req.getHeader("user_id");
		
		try {
			int rowsize=0;
			rowsize=wic.showSize(user_id);
			Gson gson=new Gson();
			String respp=gson.toJson(rowsize);
			res.getWriter().println(respp);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			res.getWriter().println(new Gson().toJson("Fail"));
		}
	}
}
