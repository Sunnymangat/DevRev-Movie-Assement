package com.first.myservlets;

import java.util.HashMap;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import com.google.gson.Gson;
import java.io.BufferedReader;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.first.crud.BuildConnection;

@WebServlet("/del")
public class Delete extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4114453318753908402L;

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{
		
		BuildConnection wic=new BuildConnection();
		//res.addHeader("Access-Control-Allow-Origin","http://localhost:3000");
		
		
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
			wic.deleteData(selectedValues);

			String respp=gson.toJson("Success");
			res.getWriter().println(respp);
			
		} catch (Exception e) {
			
			String respp=gson.toJson("Fail");
			res.getWriter().println(respp);
			
		}
		
	}
}
