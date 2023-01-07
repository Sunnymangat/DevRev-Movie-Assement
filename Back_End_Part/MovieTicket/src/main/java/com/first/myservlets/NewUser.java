package com.first.myservlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

import com.first.crud.BuildConnection;
import com.google.gson.Gson;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/newuser")
public class NewUser extends HttpServlet{
	private static final long serialVersionUID = 1L;
	public NewUser() {
		super();
	}
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{
		BuildConnection wic=new BuildConnection();
		StringBuffer jb = new StringBuffer();
		String line = null;
		BufferedReader reader =req.getReader();
		
		while ((line = reader.readLine()) != null)
			   jb.append(line);
		
		Gson gson=new Gson();
		HashMap<String, String> json = gson.fromJson(jb.toString(), HashMap.class);
		int check=0;
		try {
			check=wic.addUser(json);
		}catch(Exception e) {
			check=0;
		}

		if(check==1) {
			String resp=gson.toJson("Success");
			res.getWriter().println(resp);
		}else if(check==0){
			String respp=gson.toJson("Fail");
			res.getWriter().println(respp);
		}
		
	}
}
