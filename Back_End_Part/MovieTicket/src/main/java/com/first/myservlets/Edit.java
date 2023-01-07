package com.first.myservlets;

import java.util.HashMap;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import com.google.gson.Gson;
import java.io.BufferedReader;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.first.crud.BuildConnection;

@WebServlet("/edit")
public class Edit extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = -901290101891969781L;

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{
		
		BuildConnection wic=new BuildConnection();
		String release_date="",movie_type="",movie_description="",theatre_name="",show_timings="",movie_validity_start="",movie_validity_ends="";
		int ticket_price=0;
		try {
			release_date=req.getHeader("release_date");
			movie_type=req.getHeader("movie_type");
			movie_description=req.getHeader("movie_description");
			theatre_name=req.getHeader("theatre_name");
			show_timings=req.getHeader("show_timings");
			movie_validity_start=req.getHeader("movie_validity_start");
			movie_validity_ends=req.getHeader("movie_validity_ends");
			ticket_price=Integer.parseInt(req.getHeader("ticket_price"));
		}catch(Exception E) {
			String respp=new Gson().toJson("Fail");
			res.getWriter().println(respp);
		}
		
		StringBuffer jb = new StringBuffer();
		String line = null;
		
		BufferedReader reader =req.getReader();
		
		while ((line = reader.readLine()) != null)
			   jb.append(line);
		
		
		Gson gson=new Gson();
		HashMap<Integer, String> json = gson.fromJson(jb.toString(), HashMap.class);
		
		
		Collection<String> values = json.values();
		ArrayList<String> selectedValues= new ArrayList<>(values);
		
		
		try {
			
			wic.editData(release_date,movie_type,movie_description,theatre_name,show_timings,movie_validity_start,movie_validity_ends,ticket_price,selectedValues);
			
			String respp=gson.toJson("Success");
			
			res.getWriter().println(respp);
			
		}
		catch (ClassNotFoundException | SQLException e) {
			
			e.printStackTrace();
			
			res.getWriter().println(new Gson().toJson("Fail"));
		}
		
	}
}
